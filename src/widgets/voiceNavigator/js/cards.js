/* jshint undef: true, unused: true */
/* global document, require, window, MM, module */

var UTIL =  require('./util');
var $ = require('./vendor/jquery-1.11.1');
var _ = require('lodash/dist/lodash.compat');
var Isotope = require('./vendor/isotope.pkgd');

var $cards = $();

var __config = null;

var __isotope_config = {
  itemSelector: '.card',
  sortBy: 'sort',
  layoutMode: 'masonry',
  filter: ':not(.removed)',
  getSortData: {
    sort: '[data-sort] parseInt'
  }
};

var __cardTemplate = null;


var Cards = {
  init : function(config) {
    __config = config;
    $cards = $('#cards');

    // clicking documents
    $cards.on('click', '.card', function(e) {

      if (__config.cardLinkBehavior === false) {
        e.preventDefault();
      }
    });

    if (__config.cardLayout === 'custom') {
      try {
        __cardTemplate = _.template(__config.cardTemplate);
      } catch (e) {
        UTIL.log('Voice Navigator was unable to parse card template');
        __config.cardLayout = 'default';
      }
    }

  },

  setLoading: function(isLoading) {
    $cards.toggleClass('loading', isLoading);
  },

  cardsWidth: function() {
    return $cards.width();
  },

  updateCards : function(data) {
    var newCards = [];

    // Remove the "No results" message if present
    $('.no-results', $cards).remove(); // TODO: animate this nicely?

    // Remove the cards filtered out last time
    // Leave one card to prevent the single column isotope bug
    $('.card.removed:not(.single-column-fix)', $cards).remove();

    // Mark current to be deleted; we'll un-mark them if they exist
    $('.card', $cards).each(function(k, card) {
      var $card = $(card);
      $card.addClass('to-delete');
      $card.attr('data-sort', k + 1000);
    });

    $.each(data, function(k, doc) {
      // Card exists, so update sort order and keep it
      if ($('#doc_' + doc.documentid).length) {
        $('#doc_' + doc.documentid).removeClass('to-delete').attr('data-sort', k);
        return true;
      }

      // Card doesn't exist, so create it. (TODO: Maybe use a templating system?)
      var $card = Cards._createCard(doc);
      $card.attr('data-sort', k);
      newCards.push($card);
    });

    // Filter out unused cards (we don't delete yet b/c we want them to fade out)
    $('.card.to-delete', $cards).removeClass('to-delete').addClass('removed');

    var $newCards = $.makeArray(newCards);

    $cards.append( $newCards );
    if (!$cards.hasClass('isotope')) {
      // No isotope instance yet; create it.
      $cards.addClass('isotope');
      $cards.isotope(__isotope_config);

    } else {
      // Isotope instance already exists

      // Single out the new cards, and 'append' them to isotope (they're already in the DOM)
      $newCards = $('.new', $cards);
      $cards.isotope( 'appended' , $newCards );
      $cards.isotope( 'updateSortData' ).isotope(__isotope_config);
    }

    $cards.removeClass('loading');
    $cards.imagesLoaded(function() {
      $('.not-loaded').removeClass('not-loaded');
      window.setTimeout(function() {
        $cards.isotope(__isotope_config);
      }, 10);
    });

    // TODO: animate this nicely?
    if ($('.card:not(.removed)', $cards).length === 0) {
      $cards.append($('<div>', {
        class: 'no-results',
        html: 'No results'
      }));
    }

    $('.new', $cards).removeClass('new');
  },

  _createCard : function(doc) {
    var $card = $('<a>', {
      class: 'card new',
      id: 'doc_' + doc.documentid,
      href: doc.originurl,
      target: __config.cardLinkBehavior || '_parent'
    });
    $card.attr('data-document-id', doc.documentid);

    if (__config.cardLayout === 'custom') {
      var html = __cardTemplate(doc);
      $card.html(html);
    } else {
      var $title = $('<h2>', {
        class: 'title',
        html: doc.title
      });
      $card.append($title);

      var imageURL = false;
      if (typeof doc.image !== 'undefined') {
        if (typeof doc.image.url !== 'undefined') {
          imageURL = doc.image.url;
        } else if (typeof doc.image.thumburl !== 'undefined') {
          imageURL = doc.image.thumburl;
        }
      }
      if (imageURL) {
        var $image = $('<p>', {
          class: 'image not-loaded'
        });

        $image.append($('<img>', {
          src: imageURL
        }));
        $card.append($image);
      }

      var description;
      if (typeof doc.description === 'string') {
        description = doc.description.substr(0, 150) + (doc.description.length > 150 ? "&hellip;" : "");
      } else {
        description = "No description";
      }
      $card.append($('<p>', {
        html: description,
        class: 'description'
      }));

      // fields
      if (typeof __config.cardFields !== 'undefined') {
        var getFormattedString = function(format, value) {
          switch (format) {
          case 'date':
            var date = new Date(value * 1000);
            return (date.getMonth() + 1) + '/' + date.getDay() + '/' + date.getFullYear();
          default:
            return value.substr(0, 100) + (value.length > 100 ? "&hellip;" : "");
          }
        };

        var cardFields = __config.cardFields;
        $.each(cardFields, function(k2, field) {
          var value = doc[field.key] || field.placeholder;
          if (typeof value !== 'undefined' && value !== '') {
            var $field = $('<p>', {
              class: 'mm-doc-field'
            });
            if (typeof field.class !== 'undefined' && field.class !== '') {
              $field.addClass(field.class);
            }

            // If a label is specified, add a label
            if (typeof field.label !== 'undefined' && field.label !== '') {
              var $label = $('<span>', {
                class: 'label',
                html: field.label
              });
              $field.append($label);
            }

            var $value = $('<span>', {
              class: 'value'
            });
            // if we aren't using placeholder, format the string
            if (value !== field.placeholder) {
              value = getFormattedString(field.format, value);
            } else {
              $value.addClass('placeholder'); // other wise add placeholder class
            }
            $value.text(value);
            $field.append($value);
            $card.append($field);
          }
        });
      }
    }
    return $card;
  },


};


module.exports = {
  init: Cards.init,
  updateCards: Cards.updateCards,
  setLoading: Cards.setLoading,
  cardsWidth: Cards.cardsWidth
};
