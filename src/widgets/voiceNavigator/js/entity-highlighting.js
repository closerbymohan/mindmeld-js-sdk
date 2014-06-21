  // This method takes a list of hypothesis entity candidates, the list of known reference entities as
  // well as the original text.  It this identifies all true positive, false positive, and false
  // entityList: hypothesis entity candidates
  // originalText: the original text
  //  {
  //     matchlist:      [ { index: <char position in text matching entity>, entity: <entity json object> } ],
  //     markup:         <html string fragment containing text with markup to show matching entities>,
  //     unrecognized:   [<entity json object>, <entity json object>, ...],
  //     overlapping:    [<entity json object>, <entity json object>, ...]
  //  }
  //
  // Note that each each entity object is an object that can contain a variety of different data fields,
  // depending on what is returned by the entity extraction provider.  Typical fields are 'text',
  // 'entitytype', 'url', etc.  Also note that 'unrecognized' entities are ones that are returned by
  // the provider but cannot be found in the text; 'overlapping' entities are ones that occurred in the
  // same text range as another entity.
  function highlightEntities(entityList, originalText) {
    if (!entityList || entityList.length === 0 ||
        !originalText || originalText.length === 0) {
      return {
        matchlist: {},
        markup: originalText || '',
        unrecognized: entityList || [],
        overlapping: []
      };
    }
    var i, j, stats = {}, allMatches = [];

    // For each entity, find all of the possible matches in the text.
    var unrecognized = [];
    for (i = 0; i < entityList.length; i++) {
      var matches = getMatches(originalText, entityList[i].text);
      if (matches.length > 0) {
        allMatches.push({
          'entity': entityList[i],
          'matches': matches
        });
      } else {
        unrecognized.push(entityList[i]);
      }
    }
    stats.unrecognized = unrecognized; // These are entities that did not match anywhere in the text.

    // For all the possible matches, identify the most likely unique match for each entity using the algorithm below.
    var finalMatches = []; // entities that match something in the given text
    var overlapping = [];
    var entity;
    var finalMatchesOverlaps = [];// entities that match something in the given text and overlap with other matches
    while (allMatches.length > 0) {
      allMatches.sort(matchSort); //sort on number of possible matches
      if (allMatches[0].matches.length === 0) {
        continue;
      }

      var remainingMatches = allMatches.slice(1);
      entity = allMatches[0].entity;
      for (i = 0; i < allMatches[0].matches.length; i++) {
        var indexStart = allMatches[0].matches[i]; // start index of possible match
        var indexEnd = indexStart + entity.text.length;
        finalMatches.push({
          'entity': entity,
          'index': indexStart
        });
        var overlaps = purgeIndexRange(indexStart, indexEnd, remainingMatches); // remove other entities that may match with given entity
        for (j = 0; j < overlaps.length; j++) {
          overlapping.push(overlaps[j]);
          var matchesForOverlap = getMatches(originalText, overlaps[j].text);
          finalMatchesOverlaps.push({
            'entity': overlaps[j],
            'matches': matchesForOverlap
          });
        }
      }
      allMatches = remainingMatches;
    }

    // From the overlapping matches, remove from the list of possible matches, the indexes that are already matched to
    // the entity in final matches
    for (i = 0; i < finalMatches.length; i++) {
      for (j = 0; j < finalMatchesOverlaps.length; j++) {
        if (finalMatches[i].entity.text === finalMatchesOverlaps[j].entity.text) {
          var idx = finalMatches[i].index;
          var overlapIdx = finalMatchesOverlaps[j].matches.indexOf(idx);
          if (overlapIdx != -1) {
            finalMatchesOverlaps[j].matches.splice(overlapIdx, 1);
          }
         }
      }
    }
    finalMatches.sort(indexSort);
    stats.overlapping = overlapping;
    stats.overlappingWithMatches = finalMatchesOverlaps;

    stats.matchlist = finalMatches;

    // Create marked-up text based on the matched true positives and false positives.  Highlight
    // the character ranges corresponding to false positives.
    var markup = '', pointer = 0;
    for (i = 0; i < stats.matchlist.length; i++) {
      var start = stats.matchlist[i].index;
      entity = stats.matchlist[i].entity;
      markup += originalText.substring(pointer, start); // any text between matches
      var entityText = entity.text;
      var end = start + entityText.length;
      var tag = "<a href='#' class='tag' data-entity-id='" + entity.entityid + "'>" + entityText + "</a>";
      markup += tag;
      pointer = end;
    }
    markup += originalText.substring(pointer); // the rest of the text
    stats.markup = markup;
    return stats;
  }

// Checks if an entity at a given index is a substring of a word in the document
  function isEntitySubstr(entity, index, text) {
    var patt1 = /[\w']/;
    var end = index + entity.length - 1; //last character of entity
    var nextChar = text.charAt(end + 1); //next character after entity
    var matchChar = nextChar.match(patt1);
    //if (entity == 'Nokia')
    //	console.log(!matchChar);
    if (!matchChar) {
      return false;
    } else {
      return true;
    }
  }

//checks if 2 ranges [start1, end1] and [start2,end2] overlap
  function doRangesOverlap(start1, end1, start2, end2) {
    if ((start1 >= start2) && (start1 < end2)) {
      return true;
    }
    if ((start2 >= start1) && (start2 < end1)) {
      return true;
    }
    return false;
  }

  // This removes any index values in matchedEntityArray that lie between the start and end values.  The matchedEntityArray is of the
  // form [{'entity':{'text': 'Jones'}, 'matches':[22, 47, 108]}, {'entity':{'text': 'Smith'}, 'matches':[59, 254]}, ...]
  function purgeIndexRange(start, end, matchedEntityArray) {
    var overlapping = [];
    for (var i = matchedEntityArray.length - 1; i >= 0; i--) {
      var matchedEntity = matchedEntityArray[i];
      var matches = matchedEntity.matches;
      for (var j = matches.length - 1; j >= 0; j--) {
        var matchIndexStart = matches[j];
        var matchIndexEnd = matchIndexStart + matchedEntity.entity.text.length;

        // remove all possible matches that may overlap with current entities
        if (doRangesOverlap(matchIndexStart, matchIndexEnd, start, end)) {
          matches.splice(j, 1);
        }
      }
      if (matches.length === 0) {
        overlapping.push(matchedEntity.entity);
        matchedEntityArray.splice(i, 1);
      }
    }
    return overlapping;
  }

  function compareEntityNames(e1, e2) {
    return (e1.toLowerCase() === e2.toLowerCase());
  }

  function matchSort(a, b) {
    // Sort first on the number of appearances in the text and then on the length of the entity (

    if (a.matches.length !== b.matches.length) {
      return a.matches.length - b.matches.length;
//    } else if (a.entity.score !== b.entity.score) {
//      return b.entity.score - a.entity.score; // TODO: should we use score here?
    } else { // if matches length are equal, sort on reverse order of length of entity
      return b.entity.text.length - a.entity.text.length;
    }
  }

// Sort based on the 'index' key.
  function indexSort(a, b) {
    return a.index - b.index;
  }

// This method takes a given text string, needle, and finds all of its occurances in the text haystack.
// An array is returned containing the start index for each match.
  function getMatches(haystack, needle) {
    if (needle && haystack) {
      var matches = [], ind = 0, l = needle.length;
      var t = haystack.toLowerCase();
      var regex = new RegExp('\\b' + needle.toLowerCase() + '\\b');
      while (true) {
        var localIndex = t.search(regex);
        if (localIndex == -1) { break; }
        t = t.slice(localIndex + l);
        ind += localIndex;
        matches.push(ind);
        ind += l;
      }
      return matches;
    }
    return [];
  }

if (typeof module !== 'undefined') {
  module.exports = highlightEntities;
} else if (typeof window !== 'undefined') {
  window.highlightEntities = highlightEntities;
}
