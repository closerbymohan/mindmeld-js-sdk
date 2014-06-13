(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var UTIL =  require('./util');

/* Manage the state of the UI */
var MMVoice = {
    is_init : false,
    is_locked : false,
    _lockWhileRecording: false,
    status : false,
    is_first_start : true,
    is_results : false,

    is_voice_ready  : false,

    config: {},

    _recordings: [],
    recordings_length: 0,
    confirmedRecording : {},
    pendingRecording : {},
    selectedEntityMap : {},
    currentEntities: [],
    results_length : -1,
    _entityMap : {},
    _similarEntityMap : {},
    _textEntryMap: {},
    _currentTextEntries: [],
    _height : 0,

    $body : $(),

    $window : $(),
    $cards : $(),
    $mm : $(),
    $mm_parent : $(),
    $mm_close : $(),
    $mm_button : $(),
    $mm_button_icon : $(),
    $mm_pulser : $(),
    $mm_alert : $(),
    $mm_alert_dismiss : $(),
    $tags : $(),
    $history : $(),
    $historyList : $(),
    $results : $(),
    $historyData : $(),
    $historyButton : $(),

    $editable : $(),

    $input : $(),

    // TODO: figure out a better name for this
    makeNewRecordings : function(confirmedTranscript) {
        var previousTranscript = this.confirmedRecording.transcript || '';
        if (previousTranscript.length > 0) {
            this.appendHistory(this.confirmedRecording);
        }
        this.confirmedRecording = this._newRecording(confirmedTranscript);
        this.pendingRecording = this._newRecording();
    },

    _newRecording : function(transcript) {
        transcript = transcript || '';
        return {
            transcript: transcript,
            textEntryID: false
        };
    },

    init : function() {
        var self = this;

        this.$body = $('body');

        this.$window = $(window);
        this.$mm = $('#mindmeld');
        this.$mm_button = $('#mm-button');
        this.$mm_close = $('#close, #mindmeld-overlay');
        this.$mm_pulser = $('#mm-pulser');
        this.$mm_button_icon = $('#mm-button-icon');
        this.$mm_parent = $('#mindmeld-parent');
        this.$mm_alert_dismiss = $('#mm-alert-dismiss');
        this.$mm_alert = $('#mindmeld-alert');
        this.$cards = $('#cards');
        this.$tags = $('#tags');
        this.$history = $('#history');
        this.$historyList = this.$history.find('ul');
        this.$input = this.$historyList.find('.on');
        this.$results = $('#results');
        this.$historyData = $('#history-data');
        this.$historyButton = $('#history-button');

        this.$editable = $('.editable');

        this.makeNewRecordings();

        // Make tags clickable
        function onTagClick() {
            var entityID = $(this).data('entityId');
            self.toggleEntitySelected(entityID);
        }
        this.$tags.on('click', '.tag', onTagClick);
        this.$historyList.on('click', '.tag', onTagClick);

        // Scrollbars
        $('.inner-content-div').slimScroll({
            height: '100%',
            distance: '6px'
        });

        // Resize
        self.$window.on('resize', function(){ self.resize(); });
        self.resize();

        self.setupEditable(true); // true = allow typing into the box

        // Alert dismiss
        self.$mm_alert_dismiss.click(function(e) {
            e.preventDefault();
            self.$mm_alert.removeClass('on');
        });

        // History button
        self.$historyButton.click(function(e) {
            e.preventDefault();

            // Toggle the open/closed-ness of history
            var history_open = self.$history.hasClass('open');
            self.$history.toggleClass('open', !history_open);

            if(!history_open) {
                var scrollHeight = self._historyHeight(self.$historyData[0].scrollHeight);
                self.$history.css(self._prefix('transform'), 'translateY('+scrollHeight+'px)');
                self.$historyButton.text('Close History');
            } else {
                self.$history.css(self._prefix('transform'), '');
                self.$historyButton.text('Expand History');
            }

            // Snap to the bottom
            self.scrollHistory();
        });


        // Listen to post messages
        $(window).on('message', function(e) {
            var event = e.originalEvent;
            var action = event.data.action;
            if (event.data.source != 'mindmeld') {
                return;
            }

            if (action === 'config') {
                self.config = event.data.data;
                self.onConfig();
            }
            if (action === 'open') {
                self.$mm_parent.addClass('open');
                if (self.config.startQuery === null && self.config.listeningMode) {
                    self._do_on_voice_ready(function() {
                        MMVoice.listen(self.config.listeningMode == 'continuous');
                    });
                }
            }
        });

        // Close the modal
        self.$mm_close.click(function(e) {
            e.preventDefault();
            self.close();
        });

        if (!MM.support.speechRecognition) {
            self.$mm_button.hide();
            self.$mm_pulser.hide();
            self.$input.hide();

            self.$body.addClass('no-speech');

            var $text_input = $('<li>', {'class':'text-input'});
            var $form = $('<form>');
            var $input = $('<input>', {
                type: 'text',
                class: 'search',
                placeholder: 'Search query'
            });
            var $button = $('<button>', {
                html: '&nbsp;<span></span>',
                type: 'submit',
                class: 'mm-button-background mm-button-border'
            });

            $form.submit(function(e) {
                e.preventDefault();
                var text = $input.val();

                $input.val("").focus();
                $input.attr("placeholder", text);
                self.appendHistory({transcript: text});

                // Submit!
                self.submitText(text);
            });

            $text_input.append($form);
            $form.append($input);
            $form.append($button);
            self.$historyList.append($text_input);

            $input.focus();
            return;
        }

        // Button Actions
        var button_status = {
            mousedown : false,
            locked : false,
            just_locked : true
        };

        self.$mm_button_icon.on('mousedown', function(e) {
            button_status.mousedown = true;
            button_status.just_locked = false;
            setTimeout(function() {
                if(button_status.mousedown) {
                    button_status.locked = true;
                    button_status.just_locked = true;
                    self.listen(true);
                }
            }, 300);
        });

        self.$mm_button_icon.on('mouseup', function(e) {
            e.preventDefault();
            button_status.mousedown = false;
            if(!button_status.locked) {
                self.listen(false);
            }

            if(button_status.locked && !button_status.just_locked) {
                button_status.locked = false;
                button_status.mousedown = false;
                self.listen(false);
            }

            button_status.just_locked = false;
        });

        // clicking documents
        this.$cards.on('click', '.card', function(e) {

            if (self.config.preventLinks) {
                e.preventDefault();
            }
        });


        this.is_init = true;

    },

    close : function() {
        var self = this;
        self.stopListening();
        self.$mm_parent.removeClass('open results');
        self.$body.removeClass('results');
        self.is_results = false;
        self.results_length = -1;
        setTimeout(function() {
            self.postMessage('close');
        }, 500);
    },

    _do_on_voice_ready : function(fn) {
        var self = this;
        if(self.is_voice_ready) {
            fn();
        } else {
            self.do_on_voice_ready_fn = fn;
        }
    },

    listen : function(lock) {
        if(!MM.support.speechRecognition) return;

        var self = this;
        var statusIsPending = (self.status === 'pending');
        var statusIsListening= (self.status === 'listening');
        if (!lock) {
            if (statusIsPending || statusIsListening) {
                self.stopListening();
            } else {
                self.startListening();
            }
        } else {
            if (!self.is_locked && (statusIsPending || statusIsListening)) {
                self._lockWhileRecording = true;
                self.is_locked = true;
            } else if (self.is_locked) {
                self.stopListening();
            } else {
                self.startListening(true);
            }
        }
        this._updateUI();
    },

    pulse : function(volume) {
        var self = this;
        var scale = ((volume / 100) * 0.5) + 1.4;
        self.$mm_pulser.css('transform', 'scale(' + scale + ')');
    },

    postMessage : function(action, data) {
        parent.postMessage({
            action: action,
            source: 'mindmeld',
            data: data
        }, "*");
    },

    _historyHeight : function(scrollHeight) {
        if(scrollHeight > this._height * 0.8) scrollHeight = this._height * 0.8;
        if(scrollHeight < 270) scrollHeight = 270;
        return scrollHeight;
    },

    setupEditable : function(allowManualEntry) {
        var self = this;
        self.$historyList.on('click', '.on .tag', function() {
            var $this = $(this);
            var entityID = $this.data('entityId');
            var newValue = !(!!self.selectedEntityMap[entityID]);
            $this.toggleClass('selected', newValue);

            // don't focus on text
            self.$editable.blur();
            clearTimeout(self._textFocusTimeout);

            return false; // don't bubble up
        });

        self.$editable.hide();

        if (allowManualEntry) {

            self.$historyList.on('click', '.on', function() {
                // Not already doing something, and not a prompt
                var $prompt = self.$input.find('.mm-prompt');

                if (!self.status && ($prompt.hasClass('mm-prompt-error') || !$prompt.length)) {
                    self.$editable.height(self.$input.height());
                    self.$input.hide();
                    $prompt.empty();
                    var text = self.$input.text().trim();
                    self.$editable.show();
                    self.$editable.focus();
                    self.$editable.val(text);
                }
            });

            self.$editable.focusin(function() {
                if (!self.status) {
                    // delay so we know it's not an entity click
                    self._textFocusTimeout = setTimeout(function() {
                        self.status = 'editing';
                    }, 300);
                } else {
                    self.$editable.blur();
                    self.status = false;
                }
                return false;
            });

            self.$editable.focusout(function() {
                self.$editable.hide();
                self.$input.show();
                self.status = false;
            });

            self.$editable.keypress(function (e) {
                var keyCode = e.originalEvent.keyCode;
                if (keyCode !== 13) {
                    // Update styling?
                    return;
                }

                // User pressed return
                var text = self.$editable.val().trim();
                self.$editable.blur();
                self.$input.text(text);
                self.submitText(text);

                return false;
            });
        }
    },

    _prefix_raw : '',
    _prefix : function(rule) {
        if(!this._prefix_raw) {
            var styles = window.getComputedStyle(document.documentElement, ''),
                pre = (Array.prototype.slice
                    .call(styles)
                    .join('')
                    .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
                    )[1];
            this._prefix_raw = (pre ? '-' + pre + '-' : '') + rule;
        }
        return this._prefix_raw;
    },

    submitText: function(text) {
        var self = this;
        self.status = false;

        var recording = self.confirmedRecording;
        if (recording.textEntryID) {
            MM.activeSession.textentries.delete(recording.textEntryID);
        }
        recording.transcript = text;
        self.$cards.addClass('loading');
        MM.activeSession.textentries.post({
            text: text,
            type: 'text',
            weight: 1.0
        }, function (response) {
            self.onTextEntryPosted(response);
        });
    },

    /*
     resizeResults: function(size) {
     this._height = size;
     this.$results.outerHeight(size);
     this.$history.outerHeight(this._historyHeight(size));
     },
     */

    lockWhileRecording : function() {
        this.is_locked = true;
        this._lockWhileRecording = false;
        MM.activeSession.setListenerConfig({ 'continuous': this.is_locked });
    },

    startListening : function(is_locked) {
        this.is_locked = !!is_locked;
        this.status = 'pending';
        this.is_first_start = true;
        this._currentTextEntries = [];
        MM.activeSession.setListenerConfig({ 'continuous': this.is_locked });
        MM.activeSession.listener.start();

        this._updateUI();
    },

    stopListening : function() {
        if(MM.support.speechRecognition) {
            MM.activeSession.listener.cancel();
            this.is_locked = false;
        }
        this._updateUI();
    },

    showResults : function(data) {
        this.results_length = data.length;
        this._updateCards(data);
        this._updateUI();
    },

    setTextEntries : function(data) {
        var self = this;
        $.each(data, function(k, textEntry) {
            if (typeof self._textEntryMap[textEntry.textentryid] === 'undefined') {
                textEntry.entityIDs = [];
                self._textEntryMap[textEntry.textentryid] = textEntry;
            }
        });
    },

    toggleEntitySelected : function(entityID) {
        var self = this;

        var entityText = self._entityMap[entityID].text;
        var similarEntities = self._similarEntityMap[entityText];
        for (var i = 0, l = similarEntities.length; i < l; i++) {
            var similarEntityID = similarEntities[i];
            var $tagsToToggle = $('.tag[data-entity-id="' + similarEntityID + '"]');
            if (self.selectedEntityMap[similarEntityID]) {
                delete self.selectedEntityMap[similarEntityID];
                $tagsToToggle.removeClass('selected');
            } else {
                self.selectedEntityMap[similarEntityID] = true;
                $tagsToToggle.addClass('selected');
            }
        }

        self._updateUI();
        self.getDocuments();
    },

    setEntities : function(data) {
        var self = this;
        var i = 0;

        self.$tags.empty();
        self._similarEntityMap = {};

        $.each(data, function(k, entity) {
            if (entity.entitytype === 'segment' ||
                entity.entitytype === 'keyphrase') {
                return; // ignore these entities
            }

            var text = entity.text;
            if (text.split(' ').length > 10) {
                return; // ignore long entities
            }

            if (self._currentTextEntries.indexOf(entity.textentryid) === -1) {
                return; // ignore entities from past text entries
            }

            var textEntry = self._textEntryMap[entity.textentryid];
            if (typeof textEntry !== 'undefined') {
                textEntry.entityIDs.push(entity.entityid);
            } else {
                UTIL.log('did not find text entry for entity');
            }
            self._entityMap[entity.entityid] = entity;

            // TODO(jj): should we look at type here as well as text
            var similarEntities = self._similarEntityMap[entity.text];
            if (typeof similarEntities === 'undefined') {
                similarEntities = self._similarEntityMap[entity.text] = [];

                // only create tag for first version of an entity
                var $a = $('<a>', {
                    href: '#',
                    class: 'tag',
                    text: entity.text
                });
                self.$tags.append($a);
                i++;
                $a.attr('data-entity-id', entity.entityid);
                self._entityMap[entity.entityid] = entity;

                if (self.selectedEntityMap[entity.entityid]) {
                    $a.addClass('selected');
                }
            }
            similarEntities.push(entity.entityid);
        });

        self.$tags.toggle(!!i);

        self.currentEntities = self.entitiesForTextEntry(self.confirmedRecording.textEntryID);
        self._restyleHistory();
    },

    entitiesForTextEntry : function(textEntryID, entities) {
        if (typeof textEntryID === 'undefined') {
            return [];
        }

        var self = this;
        var textEntry = self._textEntryMap[textEntryID];
        if (typeof entities === 'undefined') {
            entities = [];
        }
        if (typeof textEntry === 'undefined') {
            return entities;
        }
        for (var i = 0; i < textEntry.entityIDs.length; i++) {
            var entityID = textEntry.entityIDs[i];
            var entity = self._entityMap[entityID];
            entities.push(entity);
        }
        return entities;
    },

    _isotope_config : {
        itemSelector: '.card',
        sortBy: 'sort',
        layoutMode: 'masonry',
        filter: ':not(.removed)',
        getSortData: {
            sort: '[data-sort] parseInt'
        }
    },

    _createCard : function(doc) {
        var self = this;
        var $card = $('<a>', {
            class: 'card new',
            id: 'doc_' + doc.documentid,
            href: doc.originurl,
            target: self.config.cardAnchorTarget || '_parent'
        });
        $card.attr('data-document-id', doc.documentid);

        if (self.config.cardLayout === 'custom') {
            var html = self.cardTemplate(doc);
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
            if (typeof self.config.cardFields !== 'undefined') {
                function getFormattedString(format, value) {
                    switch (format) {
                        case 'date':
                            var date = new Date(value * 1000);
                            return (date.getMonth() + 1) + '/' + date.getDay() + '/' + date.getFullYear();
                        default:
                            return value.substr(0, 100) + (value.length > 100 ? "&hellip;" : "");
                    }
                }

                var cardFields = self.config.cardFields;
                $.each(cardFields, function(k2, field) {
                    var value = doc[field.key] || field.placeholder;
                    if (typeof value !== 'undefined' && value !== '') {
                        // If a label is specified, add a label
                        if (typeof field.label !== 'undefined' && field.label !== '') {
                            var $label = $('<span>', {
                                class: 'label',
                                html: field.label
                            });
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
                        var $field = $('<p>', {
                            class: 'mm-doc-field'
                        });
                        if (typeof field.class !== 'undefined' && field.class !== '') {
                            $field.addClass(field.class);
                        }
                        $field.append($label).append($value);
                        $card.append($field);
                    }
                });
            }
        }
        return $card;
    },

    _updateCards : function(data) {
        var self = this;
        var newCards = [];

        // Remove the "No results" message if present
        $('.no-results', this.$cards).remove(); // TODO: animate this nicely?

        // Remove the cards filtered out last time
        // Leave one card to prevent the single column isotope bug
        $('.card.removed:not(.single-column-fix)', this.$cards).remove();

        // Mark current to be deleted; we'll un-mark them if they exist
        $('.card', this.$cards).each(function(k, card) {
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
            var $card = self._createCard(doc);
            $card.attr('data-sort', k);
            newCards.push($card);
        });

        // Filter out unused cards (we don't delete yet b/c we want them to fade out)
        $('.card.to-delete', this.$cards).removeClass('to-delete').addClass('removed');

        var $newCards = $.makeArray(newCards);

        self.$cards.append( $newCards );
        if (!self.$cards.hasClass('isotope')) {
            // No isotope instance yet; create it.
            self.$cards.addClass('isotope');
            self.$cards.isotope(self._isotope_config);

        } else {
            // Isotope instance already exists

            // Single out the new cards, and 'append' them to isotope (they're already in the DOM)
            $newCards = $('.new', self.$cards);
            self.$cards.isotope( 'appended' , $newCards );
            self.$cards.isotope( 'updateSortData' ).isotope(self._isotope_config);
        }

        self.$cards.removeClass('loading');
        self.$cards.imagesLoaded(function() {
            $('.not-loaded').removeClass('not-loaded');
            setTimeout(function() {
                self.$cards.isotope(self._isotope_config);
            }, 10);
        });

        // TODO: animate this nicely?
        if ($('.card:not(.removed)', this.$cards).length === 0) {
            this.$cards.append($('<div>', {
                class: 'no-results',
                html: 'No results'
            }));
        }

        $('.new', this.$cards).removeClass('new');
    },

    appendHistory : function(recording) {
        if (recording.transcript) {
            this._recordings.push(recording);

            // Append to the history
            var $new_history = $('<li>', {
                data: {
                    'recording': recording,
                },
                html: this.$input.html(),
            });

            this.$input.before($new_history);
            console.log($new_history);

            // Create the new one
            this.$input.html("&nbsp;");

            var self = this;
            setTimeout(function() {
                self.$input.removeClass('hide');
                self.scrollHistory();
            }, 100);

            this._restyleHistory();
            this._updateUI();
        }
    },

    lettering : function($el, text, parentClass) {
        $el.empty();
        text = text.split('');
        var $el_parent = $('<div>', {'class': parentClass});
        for(var i=0; i < text.length; i++) {
            $el_parent.append($('<span>', { text: text[i] }));
        }
        $el.append($el_parent);
    },

    _restyleHistory: function () {
        var self = this, i;
        //this.$historyList.empty();
        this.$historyList.find('li').each(function() {
            var recording = $(this).data('recording');
            if(!recording) return;

            // entities for recording
            var entities = self.entitiesForTextEntry(recording.textEntryID);

            var stats = highlightEntities(entities, recording.transcript);
            var $div = $('<div>', {'html': stats.markup});

            var $li = $(this);
            $li.empty();
            $li.append($div);
            $li.attr('data-text-entry-id', recording.textEntryID);

            $li.find('.tag').each(function(k, $tag) {
                var $this = $(this);
                var entityID = $this.data('entityId');
                if (self.selectedEntityMap[entityID]) {
                    $this.addClass('selected');
                } else {
                    $this.removeClass('selected');
                }
            });

            if (i === self._recordings.length - 1 && self.recordings_length !== self._recordings.length) {
                (function($div) {
                    setTimeout(function () {
                        $div.addClass('on');
                    }, 100);
                })($div);
            } else {
                $div.addClass('old');
            }
        });

        self.scrollHistory();

        // So we can tell if there's a new one
        this.recordings_length = this._recordings.length;
    },

    scrollHistory : function() {
        var self = this;
        self.$historyData.scrollTop(self.$historyData[0].scrollHeight);
    },

    _documentLock : {
        canRequestDocuments: function() {
            return (this.lastDocumentsRequest + 500 < Date.now());
        },
        lastDocumentsRequest: 0
    },

    _documentsCache: {},

    _numColumns : function () {
        var self = this;
        var cardWidth = 218;
        var cardPadding = 20;
        var widthRemaining = self.$cards.width() - cardPadding;
        var numCols = 0;
        while (widthRemaining >= 0) {
            numCols++;
            widthRemaining -= cardWidth + cardPadding;
        }
        return numCols;
    },

    _numDocuments : function () {
        var self = this;
        if (typeof self.config.numResults !== 'undefined') {
            return self.config.numResults;
        }

        var numCols = self._numColumns();
        var numDocs = Math.max(numCols * 2, 8);
        if (numDocs % numCols !== 0) {
            numDocs += numCols - (numDocs % numCols);
        }
        return numDocs;
    },

    getDocuments : function() {
        UTIL.log('getting documents');
        var self = this;

        var queryParams = { limit: self.config.numResults || 14 };
        var requestKey = 'default';
        var selectedEntityIDs = Object.keys(MMVoice.selectedEntityMap);
        if (selectedEntityIDs.length > 0) {
            requestKey = JSON.stringify(selectedEntityIDs);
            queryParams.entityids = requestKey;
        } else {
            queryParams.textentryids = JSON.stringify(self._currentTextEntries);
        }

        // Return cached response if it exists and has not expired (expire time of 10 minutes)
        if (self._documentsCache.hasOwnProperty(requestKey) &&
            Date.now() - self._documentsCache[requestKey].requestTime < 600000) {
            onSuccess(self._documentsCache[requestKey].result, true);
            return;
        }

        if (!self._documentLock.canRequestDocuments()) {
            return;
        }

        var requestTime = this._documentLock.lastDocumentsRequest = Date.now();
        function onSuccess(result, cached) {
            cached = !!cached;

            if (!cached) {
                self._documentsCache[requestKey] = {
                    result: result,
                    requestTime: requestTime
                };
                UTIL.log("Got documents");
            } else {
                UTIL.log("Got documents from cache");
            }

            var numDocuments = self._numDocuments();
            if (result.data.length > numDocuments) {
                result.data.splice(numDocuments, result.data.length - numDocuments);
            }
            MMVoice.showResults(result.data);
        }

        function onError(error) {
            UTIL.log("Error getting documents:  (Type " + error.code +
                " - " + error.type + "): " + error.message);
        }
        MM.activeSession.documents.get(queryParams, onSuccess, onError);
    },

    resize : function(e) {
        if(this.is_results) {
            var size = this.$mm_parent.height();
            this._height = size;
            this.$results.outerHeight(size);
            this.$history.outerHeight(this._historyHeight(size));
        }
    },

    update_text : function() {
        var self = this;

        var fullText = self.confirmedRecording.transcript + self.pendingRecording.transcript;

        if (fullText.length) {
            this.$input.empty();
        }

        // TODO: animate transition to highlighted entities ?
        var confirmedStats = highlightEntities(this.currentEntities, this.confirmedRecording.transcript);
        this.$input.append($('<span>', {
            html: confirmedStats.markup
        }));
        this.$input.append($('<span>', {
            class: 'pending',
            html: self.pendingRecording.transcript
        }));
        this.$input.attr('data-text', fullText);
    },

    onTextEntryPosted: function(response) {
        var self = MMVoice;
        UTIL.log('text entry posted');
        var textEntryID = MMVoice.confirmedRecording.textEntryID = response.data.textentryid;
        self.$input.data('textentryid', textEntryID);
        self._currentTextEntries.push(textEntryID);
        delete self._documentsCache['default'];
        self.selectedEntityMap = {};
        MMVoice.getDocuments();
    },

    _listenerConfig : {
        onResult: function(result /*, resultIndex, results, event  <-- unused */) {
            UTIL.log("Listener: onResult", result);
            if (result.final) {
                MMVoice.makeNewRecordings(result.transcript);
            } else {
                MMVoice.pendingRecording.transcript = result.transcript;
            }
            MMVoice._updateUI();
        },
        onStart: function(event) {
            UTIL.log("Listener: onStart");
            if (MMVoice.is_first_start) {
                MMVoice.makeNewRecordings();
                MMVoice.is_first_start = false;
                MMVoice.status = 'listening';
                MMVoice._updateUI();
                startVolumeMonitor();
                MMVoice.$cards.addClass('loading');
            }
        },
        onEnd: function(event) {
            UTIL.log("Listener: onEnd");
            var self = this;
            var pendingTranscript = MMVoice.pendingRecording.transcript;
            if (pendingTranscript.length > 0) {
                MMVoice.makeNewRecordings(pendingTranscript);
            } else {
                MMVoice.$cards.removeClass('loading');
            }
            if (MMVoice.is_locked) {
                if (MMVoice._lockWhileRecording) {
                    MMVoice.lockWhileRecording();
                }
                MM.activeSession.listener.start();
            } else {
                MMVoice.status = false;

                var fullText = MMVoice.confirmedRecording.transcript + MMVoice.pendingRecording.transcript;
                if(!fullText.length) {
                    MMVoice.lettering(MMVoice.$input, 'Whoops, we didn\'t get that...', 'mm-prompt mm-prompt-error');
                }

                UTIL.log('full text', fullText);

                // Play the sound
                $('#audio-done')[0].play();
            }

            MMVoice._updateUI();
        },
        onError: function(event) {
            if (event.error === 'aborted') {
                return; // ignore aborted errors
            }
            UTIL.log("Listener: onError - ", event.error, event.message);
            switch (event.error) {
                case 'not-allowed':
                case 'service-not-allowed':
                    // TODO: do something here
                    break;

                case 'language-not-supported':
                // TODO: handle this when we allow setting language

                // Ignore the rest for now
                case 'bad-grammar':
                case 'network':
                case "no-speech":
                case 'audio-capture':
                case 'service-not-allowed':
                    break;
                default:
                    break;
            }

        },
        onTextEntryPosted: function(response) {
            MMVoice.onTextEntryPosted(response);
        }
    },

    _changed_cached : {},

    // This will broadcast updated variables to the modal
    _isChanged : function(name) {
        var currentValue = this[name];
        if (typeof this[name] === 'object') {
            currentValue = JSON.stringify(this[name]);
        }
        if (this._changed_cached[name] != currentValue) {
            this._changed_cached[name] = currentValue;
            return true;
        }
        return false;
    },

    // Do a dirty check of all variables to see what changed
    _getUpdated : function(items) {
        var self = this;
        var updated = {};
        $.each(items, function(k, v) {
            if (typeof v !== 'function' && k[0] != "_" && k[0] != "$") {
                if (self._isChanged(k)) {
                    updated[k] = v;
                }
            }
        });
        return updated;
    },

    // Update the UI to reflect the site
    _updateUI : function() {
        var self = this;
        var updates = self._getUpdated(this);

        if('recordings_length' in updates) {
            if(updates.recordings_length == 1) {
                self.$body.addClass('hashistory');
                self.$historyButton.show();
            }
            if(updates.recordings_length >= 1) {
                self.$mm_button.addClass('shadow');
            }
        }

        if('is_voice_ready' in updates) {
            if(self.do_on_voice_ready_fn) {
                self.do_on_voice_ready_fn();
                delete self.do_on_voice_ready_fn;
            }
        }

        if('results_length' in updates) {
            if(updates.results_length >= 0 && !self.is_results) {
                self.$body.addClass('results');
                self.$mm_parent.addClass('results');
                self.is_results = true;
                self.resize();
            }
        }

        if('status' in updates) {
            self.$mm_button.removeClass('status-pending');
            self.$mm_button.removeClass('status-listening');
            self.status = updates.status;
            if (updates.status !== false) {
                self.$mm_button.addClass('status-' + updates.status);
            }
            if (updates.status === 'listening') {
                self.$input.empty();
                self.lettering(self.$input, 'Start speaking now...', 'mm-prompt');
                //this.$mm.addClass('open');
            }
            if (updates.status === false) {
                self.$mm_pulser.css('transform', 'scale(0)');
            }

            setTimeout(function() {
                self.$mm_alert.toggleClass('on', updates.status === 'pending');
            }, 10);
        }

        if('is_locked' in updates) {
            self.$mm_button.toggleClass('lock', updates.is_locked);
        }

        var textNeedsUpdate = false;
        if ('currentEntities' in updates) {
            self.currentEntities = updates.currentEntities;
            textNeedsUpdate = true;
        }

        var hasConfirmedRecording = 'confirmedRecording' in updates;
        var hasPendingRecording = 'pendingRecording' in updates;
        if (hasConfirmedRecording) {
            self.confirmedRecording = updates.confirmedRecording;
        }
        if (hasPendingRecording) {
            self.pendingRecording = updates.pendingRecording;
        }
        textNeedsUpdate = textNeedsUpdate || hasConfirmedRecording || hasPendingRecording;

        if (textNeedsUpdate && self.status !== 'editing') {
            self.update_text();
        }

    }

};

MMVoice.onConfig = function() {
    MMVoice._currentTextEntries = [];

    var voiceNavOptions = MMVoice.config;

    var initialText;
    if (voiceNavOptions.startQuery === null) {
        initialText = 'Enable the microphone...';
    }
    else {
        initialText = voiceNavOptions.startQuery;
    }
    $('#initialText').text(initialText);

    if (voiceNavOptions.startQuery !== null && !MM.support.speechRecognition) {
        $('input.search').val(voiceNavOptions.startQuery);
    }

    if (MMVoice.is_voice_ready && voiceNavOptions.startQuery !== null) { // we have init before
        MMVoice.submitText(voiceNavOptions.startQuery);
        MMVoice._updateUI();
    }
    else {
        if (typeof MMVoice.config.baseZIndex !== 'undefined') {
            var baseZIndex = parseInt(MMVoice.config.baseZIndex);
            MMVoice.$mm_button.css('z-index', baseZIndex + 100);
            MMVoice.$mm_button.find('#icon-microphone, #icon-mute, #icon-lock').css('z-index', baseZIndex + 10);
            MMVoice.$mm_alert.css('z-index', baseZIndex + 1000);
        }

        if (MMVoice.config.resetCardsCSS) {
            $('#cards-css').remove();
        }

        if (typeof MMVoice.config.customCSSURL !== 'undefined') {
            var cssLink = document.createElement('link');
            cssLink.href = MMVoice.config.customCSSURL;
            cssLink.rel = 'stylesheet';
            cssLink.type = 'text/css';
            document.head.appendChild(cssLink);
        }

        if (typeof MMVoice.config.customCSS !== 'undefined') {
            var cssStyle = document.createElement('style');
            cssStyle.type = 'text/css';
            cssStyle.innerHTML = MMVoice.config.customCSS;
            document.head.appendChild(cssStyle);
        }

        if (MMVoice.config.cardLayout === 'custom') {
            try {
                MMVoice.cardTemplate = _.template(MMVoice.config.cardTemplate);
            } catch (e) {
                UTIL.log('Voice Navigator was unable to parse card template');
                MMVoice.config.cardLayout = 'default';
            }
        }

        var MM_USER_ID_PREFIX = 'vnu';
        var MM_USER_NAME = 'Voice Navigator User';
        var MM_USER_ID_COOKIE = 'voice_navigator_user_id';

        var MM_CONFIG = {
            appid: voiceNavOptions.appID,
            onInit: onMMInit
        };
        if (typeof voiceNavOptions.cleanUrl !== 'undefined') {
            MM_CONFIG.cleanUrl = voiceNavOptions.cleanUrl;
        }
        if (typeof voiceNavOptions.fayeClientUrl !== 'undefined') {
            MM_CONFIG.fayeClientUrl = voiceNavOptions.fayeClientUrl;
        }
        MM.init(MM_CONFIG);
    }

    function onMMInit () {
        if (voiceNavOptions.mmCredentials) {
            // No need to fetch token, user, or create session
            MM.setToken(voiceNavOptions.mmCredentials.token);
            MM.setActiveUserID(voiceNavOptions.mmCredentials.userID);
            MM.setActiveSessionID(voiceNavOptions.mmCredentials.sessionID);
            onSessionStart();
        }
        else {
            getToken();
        }
    }

    function guid() {
        return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        }));
    }

    function getUserID() {
        // get user id cookie
        var userID = $.cookie(MM_USER_ID_COOKIE);
        if (typeof userID === 'undefined') {
            userID = MM_USER_ID_PREFIX + '-' + guid();
            $.cookie(MM_USER_ID_COOKIE, userID);
        }
        return userID;
    }

    function getToken() {
        function onSuccess(result) {
            UTIL.log('Successfully got token');
            setUser(result.user.userid);
        }
        function onError (error) {
            UTIL.log('Token was not valid');
        }

        var userID = getUserID();
        MM.getToken({
            anonymous: {
                userid: userID,
                name: MM_USER_NAME,
                domain: window.location.hostname
            }
            //*/
        }, onSuccess, onError);
    }

    function setUser(userID) {
        function onSuccess(result) {
            createSession();
        }
        function onError (error) {
            UTIL.log("Error setting user session:  (Type " + error.code +
                " - " + error.type + "): " + error.message);
        }
        MM.setActiveUserID(userID, onSuccess, onError);
    }

    function createSession() {
        function onSuccess(result) {
            setSession(result.data.sessionid);
        }
        function onError (error) {
            UTIL.log("Error creating new session:  (Type " + error.code +
                " - " + error.type + "): " + error.message);
        }
        var date = new Date();
        var sessionName = "Voice Navigator - " + date.toTimeString() + " " + date.toDateString();
        MM.activeUser.sessions.post({
            name: sessionName,
            privacymode: 'inviteonly'
        }, onSuccess, onError);
    }

    function setSession(sessionID) {
        function onError (error) {
            UTIL.log("Error setting session:  (Type " + error.code +
                " - " + error.type + "): " + error.message);
        }
        MM.setActiveSessionID(sessionID, onSessionStart, onError);
    }

    function onSessionStart () {
        subscribeToTextEntries();
        subscribeToEntities();
        setupSessionListener();
        MMVoice.is_voice_ready = true;
        MMVoice._updateUI();
    }

    function subscribeToTextEntries() {
        function onSuccess(result) {
            UTIL.log("Subscribed to text entries!");
            // Optionally submit start query
            if (voiceNavOptions.startQuery !== null) {
                MMVoice.submitText(voiceNavOptions.startQuery);
            }
        }
        function onError() {
            UTIL.log("Error subscribing to text entries:  (Type " + error.code +
                " - " + error.type + "): " + error.message);
        }
        MM.activeSession.textentries.onUpdate(function(result) {
            MMVoice.setTextEntries(result.data);
        }, onSuccess, onError);
    }
    function subscribeToEntities() {
        function onSuccess(result) {
            UTIL.log("Subscribed to entities!");
        }
        function onError (error) {
            UTIL.log("Error subscribing to entities:  (Type " + error.code +
                " - " + error.type + "): " + error.message);
        }
        MM.activeSession.entities.onUpdate(function(result) {
            UTIL.log('Received entities update');
            MMVoice.setEntities(result.data);
        }, onSuccess, onError);
    }

    function setupSessionListener() {
        MM.activeSession.setListenerConfig(MMVoice._listenerConfig);
    }
};

$(function () {
    MMVoice.init();
});

var a = {
    stream : false,
    context : false,
    analyzer : false,
    frequencies : false,
    times : false,
    audio_started : false
};
function startVolumeMonitor() {
    if (!a.audio_started) {
        // GETUSERMEDIA INPUT
        navigator.getMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);
        window.AudioContext = window.AudioContext || window.webkitAudioContext;

        a.context = new AudioContext();
        a.analyzer = a.context.createAnalyser();
        a.analyzer.smoothingTimeConstant = 0.18;
        a.analyzer.fftSize = 256;

        a.frequencies = new Uint8Array( a.analyzer.frequencyBinCount );
        a.times = new Uint8Array( a.analyzer.frequencyBinCount );

        navigator.getMedia ( { audio: true }, microphoneReady, function(err) {
            UTIL.log("The following error occured: " + err);
        });

        a.audio_started = true;

    } else {
        loop();
    }

    function microphoneReady(stream) {
        a.stream = stream;
        var stream_source = a.context.createMediaStreamSource( stream );
        stream_source.connect( a.analyzer );
        loop();
    }

    function loop() {
        if (!MMVoice.status || status === 'editing') {
            // stop recording
            a.stream.stop();
            a.audio_started = false;
            return;
        }

        a.analyzer.getByteFrequencyData( a.frequencies );
        a.analyzer.getByteTimeDomainData( a.times );

        MMVoice.pulse(getVolume());

        setTimeout(loop, 75);
    }

    function getVolume() {
        return parseInt( getFreqencyRange( 0, a.analyzer.frequencyBinCount - 1 ), 10 );
    }

    function getFreqencyRange(from, to) {
        var volume = 0;

        for ( var i = from; i < to; i++ ) {
            volume += a.frequencies[i];
        }

        return volume / ( to - from );
    }
};

},{"./util":2}],2:[function(require,module,exports){
require('./vendor/contentloaded');

/* A wrapper for dom elements, basically a lite version of jQuery's $ */
exports.el = function(el) {
    return {
        on: function(event, func) {
            if(el.addEventListener) {
                el.addEventListener(event,func,false);
            } else if(el.attachEvent) {
                el.attachEvent("on"+event,func);
            }
        },

        click: function(func) {
            this.on('click', func);
        },

        keypress: function (func) {
            this.on('keypress', func);
        },

        removeClass: function(className) {
            el.className = el.className.replace(
                new RegExp('(^|\\s+)' + className + '(\\s+|$)', 'g'),
                '$1'
            );
        },

        addClass: function(className) {
            el.className = el.className + " " + className;
        },

        remove: function() {
            el.parentNode.removeChild(el);
        },

        el: function() {
            return el;
        }
    };
};

exports.convertToAbsolutePath = function(href) {
    var anchor = document.createElement('a');
    anchor.href = href;
    return (anchor.protocol + '//' + anchor.host + anchor.pathname + anchor.search + anchor.hash);
};

function addLeadingZeros(number, digits) {
    var base = Math.pow(10, digits);
    number += base;
    number = number.toString();
    return number.substring(number.length - digits);
}

exports.timestamp = function (date) {
    date = date || new Date();
    return addLeadingZeros(date.getFullYear(), 4) + '.'
        + addLeadingZeros(date.getMonth() + 1, 2) + '.'
        + addLeadingZeros(date.getDate(), 2) + ' ' + date.toTimeString();
};

exports.log = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    args.splice(0, 0, exports.timestamp());
    console.log.apply(console, args);
};

exports.contentLoaded = contentLoaded;
},{"./vendor/contentloaded":3}],3:[function(require,module,exports){
/*!
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 *
 */

// @win window reference
// @fn function reference
window.contentLoaded = function contentLoaded(win, fn) {

	var done = false, top = true,

	doc = win.document, root = doc.documentElement,

	add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
	rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
	pre = doc.addEventListener ? '' : 'on',

	init = function(e) {
		if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
		(e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
		if (!done && (done = true)) fn.call(win, e.type || e);
	},

	poll = function() {
		try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
		init('poll');
	};

	if (doc.readyState == 'complete') fn.call(win, 'lazy');
	else {
		if (doc.createEventObject && root.doScroll) {
			try { top = !win.frameElement; } catch(e) { }
			if (top) poll();
		}
		doc[add](pre + 'DOMContentLoaded', init, false);
		doc[add](pre + 'readystatechange', init, false);
		win[add](pre + 'load', init, false);
	}

}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL21vZGFsLmpzIiwiL1VzZXJzL2pqL0RvY3VtZW50cy9Db2RlL2V4cGVjdC1sYWJzL21pbmRtZWxkLWpzLXNkay9zcmMvd2lkZ2V0cy92b2ljZU5hdmlnYXRvci9qcy91dGlsLmpzIiwiL1VzZXJzL2pqL0RvY3VtZW50cy9Db2RlL2V4cGVjdC1sYWJzL21pbmRtZWxkLWpzLXNkay9zcmMvd2lkZ2V0cy92b2ljZU5hdmlnYXRvci9qcy92ZW5kb3IvY29udGVudGxvYWRlZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4NkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgVVRJTCA9ICByZXF1aXJlKCcuL3V0aWwnKTtcblxuLyogTWFuYWdlIHRoZSBzdGF0ZSBvZiB0aGUgVUkgKi9cbnZhciBNTVZvaWNlID0ge1xuICAgIGlzX2luaXQgOiBmYWxzZSxcbiAgICBpc19sb2NrZWQgOiBmYWxzZSxcbiAgICBfbG9ja1doaWxlUmVjb3JkaW5nOiBmYWxzZSxcbiAgICBzdGF0dXMgOiBmYWxzZSxcbiAgICBpc19maXJzdF9zdGFydCA6IHRydWUsXG4gICAgaXNfcmVzdWx0cyA6IGZhbHNlLFxuXG4gICAgaXNfdm9pY2VfcmVhZHkgIDogZmFsc2UsXG5cbiAgICBjb25maWc6IHt9LFxuXG4gICAgX3JlY29yZGluZ3M6IFtdLFxuICAgIHJlY29yZGluZ3NfbGVuZ3RoOiAwLFxuICAgIGNvbmZpcm1lZFJlY29yZGluZyA6IHt9LFxuICAgIHBlbmRpbmdSZWNvcmRpbmcgOiB7fSxcbiAgICBzZWxlY3RlZEVudGl0eU1hcCA6IHt9LFxuICAgIGN1cnJlbnRFbnRpdGllczogW10sXG4gICAgcmVzdWx0c19sZW5ndGggOiAtMSxcbiAgICBfZW50aXR5TWFwIDoge30sXG4gICAgX3NpbWlsYXJFbnRpdHlNYXAgOiB7fSxcbiAgICBfdGV4dEVudHJ5TWFwOiB7fSxcbiAgICBfY3VycmVudFRleHRFbnRyaWVzOiBbXSxcbiAgICBfaGVpZ2h0IDogMCxcblxuICAgICRib2R5IDogJCgpLFxuXG4gICAgJHdpbmRvdyA6ICQoKSxcbiAgICAkY2FyZHMgOiAkKCksXG4gICAgJG1tIDogJCgpLFxuICAgICRtbV9wYXJlbnQgOiAkKCksXG4gICAgJG1tX2Nsb3NlIDogJCgpLFxuICAgICRtbV9idXR0b24gOiAkKCksXG4gICAgJG1tX2J1dHRvbl9pY29uIDogJCgpLFxuICAgICRtbV9wdWxzZXIgOiAkKCksXG4gICAgJG1tX2FsZXJ0IDogJCgpLFxuICAgICRtbV9hbGVydF9kaXNtaXNzIDogJCgpLFxuICAgICR0YWdzIDogJCgpLFxuICAgICRoaXN0b3J5IDogJCgpLFxuICAgICRoaXN0b3J5TGlzdCA6ICQoKSxcbiAgICAkcmVzdWx0cyA6ICQoKSxcbiAgICAkaGlzdG9yeURhdGEgOiAkKCksXG4gICAgJGhpc3RvcnlCdXR0b24gOiAkKCksXG5cbiAgICAkZWRpdGFibGUgOiAkKCksXG5cbiAgICAkaW5wdXQgOiAkKCksXG5cbiAgICAvLyBUT0RPOiBmaWd1cmUgb3V0IGEgYmV0dGVyIG5hbWUgZm9yIHRoaXNcbiAgICBtYWtlTmV3UmVjb3JkaW5ncyA6IGZ1bmN0aW9uKGNvbmZpcm1lZFRyYW5zY3JpcHQpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzVHJhbnNjcmlwdCA9IHRoaXMuY29uZmlybWVkUmVjb3JkaW5nLnRyYW5zY3JpcHQgfHwgJyc7XG4gICAgICAgIGlmIChwcmV2aW91c1RyYW5zY3JpcHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5hcHBlbmRIaXN0b3J5KHRoaXMuY29uZmlybWVkUmVjb3JkaW5nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbmZpcm1lZFJlY29yZGluZyA9IHRoaXMuX25ld1JlY29yZGluZyhjb25maXJtZWRUcmFuc2NyaXB0KTtcbiAgICAgICAgdGhpcy5wZW5kaW5nUmVjb3JkaW5nID0gdGhpcy5fbmV3UmVjb3JkaW5nKCk7XG4gICAgfSxcblxuICAgIF9uZXdSZWNvcmRpbmcgOiBmdW5jdGlvbih0cmFuc2NyaXB0KSB7XG4gICAgICAgIHRyYW5zY3JpcHQgPSB0cmFuc2NyaXB0IHx8ICcnO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHJhbnNjcmlwdDogdHJhbnNjcmlwdCxcbiAgICAgICAgICAgIHRleHRFbnRyeUlEOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBpbml0IDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLiRib2R5ID0gJCgnYm9keScpO1xuXG4gICAgICAgIHRoaXMuJHdpbmRvdyA9ICQod2luZG93KTtcbiAgICAgICAgdGhpcy4kbW0gPSAkKCcjbWluZG1lbGQnKTtcbiAgICAgICAgdGhpcy4kbW1fYnV0dG9uID0gJCgnI21tLWJ1dHRvbicpO1xuICAgICAgICB0aGlzLiRtbV9jbG9zZSA9ICQoJyNjbG9zZSwgI21pbmRtZWxkLW92ZXJsYXknKTtcbiAgICAgICAgdGhpcy4kbW1fcHVsc2VyID0gJCgnI21tLXB1bHNlcicpO1xuICAgICAgICB0aGlzLiRtbV9idXR0b25faWNvbiA9ICQoJyNtbS1idXR0b24taWNvbicpO1xuICAgICAgICB0aGlzLiRtbV9wYXJlbnQgPSAkKCcjbWluZG1lbGQtcGFyZW50Jyk7XG4gICAgICAgIHRoaXMuJG1tX2FsZXJ0X2Rpc21pc3MgPSAkKCcjbW0tYWxlcnQtZGlzbWlzcycpO1xuICAgICAgICB0aGlzLiRtbV9hbGVydCA9ICQoJyNtaW5kbWVsZC1hbGVydCcpO1xuICAgICAgICB0aGlzLiRjYXJkcyA9ICQoJyNjYXJkcycpO1xuICAgICAgICB0aGlzLiR0YWdzID0gJCgnI3RhZ3MnKTtcbiAgICAgICAgdGhpcy4kaGlzdG9yeSA9ICQoJyNoaXN0b3J5Jyk7XG4gICAgICAgIHRoaXMuJGhpc3RvcnlMaXN0ID0gdGhpcy4kaGlzdG9yeS5maW5kKCd1bCcpO1xuICAgICAgICB0aGlzLiRpbnB1dCA9IHRoaXMuJGhpc3RvcnlMaXN0LmZpbmQoJy5vbicpO1xuICAgICAgICB0aGlzLiRyZXN1bHRzID0gJCgnI3Jlc3VsdHMnKTtcbiAgICAgICAgdGhpcy4kaGlzdG9yeURhdGEgPSAkKCcjaGlzdG9yeS1kYXRhJyk7XG4gICAgICAgIHRoaXMuJGhpc3RvcnlCdXR0b24gPSAkKCcjaGlzdG9yeS1idXR0b24nKTtcblxuICAgICAgICB0aGlzLiRlZGl0YWJsZSA9ICQoJy5lZGl0YWJsZScpO1xuXG4gICAgICAgIHRoaXMubWFrZU5ld1JlY29yZGluZ3MoKTtcblxuICAgICAgICAvLyBNYWtlIHRhZ3MgY2xpY2thYmxlXG4gICAgICAgIGZ1bmN0aW9uIG9uVGFnQ2xpY2soKSB7XG4gICAgICAgICAgICB2YXIgZW50aXR5SUQgPSAkKHRoaXMpLmRhdGEoJ2VudGl0eUlkJyk7XG4gICAgICAgICAgICBzZWxmLnRvZ2dsZUVudGl0eVNlbGVjdGVkKGVudGl0eUlEKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiR0YWdzLm9uKCdjbGljaycsICcudGFnJywgb25UYWdDbGljayk7XG4gICAgICAgIHRoaXMuJGhpc3RvcnlMaXN0Lm9uKCdjbGljaycsICcudGFnJywgb25UYWdDbGljayk7XG5cbiAgICAgICAgLy8gU2Nyb2xsYmFyc1xuICAgICAgICAkKCcuaW5uZXItY29udGVudC1kaXYnKS5zbGltU2Nyb2xsKHtcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgZGlzdGFuY2U6ICc2cHgnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlc2l6ZVxuICAgICAgICBzZWxmLiR3aW5kb3cub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCl7IHNlbGYucmVzaXplKCk7IH0pO1xuICAgICAgICBzZWxmLnJlc2l6ZSgpO1xuXG4gICAgICAgIHNlbGYuc2V0dXBFZGl0YWJsZSh0cnVlKTsgLy8gdHJ1ZSA9IGFsbG93IHR5cGluZyBpbnRvIHRoZSBib3hcblxuICAgICAgICAvLyBBbGVydCBkaXNtaXNzXG4gICAgICAgIHNlbGYuJG1tX2FsZXJ0X2Rpc21pc3MuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgc2VsZi4kbW1fYWxlcnQucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEhpc3RvcnkgYnV0dG9uXG4gICAgICAgIHNlbGYuJGhpc3RvcnlCdXR0b24uY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBUb2dnbGUgdGhlIG9wZW4vY2xvc2VkLW5lc3Mgb2YgaGlzdG9yeVxuICAgICAgICAgICAgdmFyIGhpc3Rvcnlfb3BlbiA9IHNlbGYuJGhpc3RvcnkuaGFzQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgIHNlbGYuJGhpc3RvcnkudG9nZ2xlQ2xhc3MoJ29wZW4nLCAhaGlzdG9yeV9vcGVuKTtcblxuICAgICAgICAgICAgaWYoIWhpc3Rvcnlfb3Blbikge1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSBzZWxmLl9oaXN0b3J5SGVpZ2h0KHNlbGYuJGhpc3RvcnlEYXRhWzBdLnNjcm9sbEhlaWdodCk7XG4gICAgICAgICAgICAgICAgc2VsZi4kaGlzdG9yeS5jc3Moc2VsZi5fcHJlZml4KCd0cmFuc2Zvcm0nKSwgJ3RyYW5zbGF0ZVkoJytzY3JvbGxIZWlnaHQrJ3B4KScpO1xuICAgICAgICAgICAgICAgIHNlbGYuJGhpc3RvcnlCdXR0b24udGV4dCgnQ2xvc2UgSGlzdG9yeScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRoaXN0b3J5LmNzcyhzZWxmLl9wcmVmaXgoJ3RyYW5zZm9ybScpLCAnJyk7XG4gICAgICAgICAgICAgICAgc2VsZi4kaGlzdG9yeUJ1dHRvbi50ZXh0KCdFeHBhbmQgSGlzdG9yeScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTbmFwIHRvIHRoZSBib3R0b21cbiAgICAgICAgICAgIHNlbGYuc2Nyb2xsSGlzdG9yeSgpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vIExpc3RlbiB0byBwb3N0IG1lc3NhZ2VzXG4gICAgICAgICQod2luZG93KS5vbignbWVzc2FnZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBldmVudCA9IGUub3JpZ2luYWxFdmVudDtcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBldmVudC5kYXRhLmFjdGlvbjtcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhLnNvdXJjZSAhPSAnbWluZG1lbGQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWN0aW9uID09PSAnY29uZmlnJykge1xuICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnID0gZXZlbnQuZGF0YS5kYXRhO1xuICAgICAgICAgICAgICAgIHNlbGYub25Db25maWcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdvcGVuJykge1xuICAgICAgICAgICAgICAgIHNlbGYuJG1tX3BhcmVudC5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy5zdGFydFF1ZXJ5ID09PSBudWxsICYmIHNlbGYuY29uZmlnLmxpc3RlbmluZ01vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fZG9fb25fdm9pY2VfcmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBNTVZvaWNlLmxpc3RlbihzZWxmLmNvbmZpZy5saXN0ZW5pbmdNb2RlID09ICdjb250aW51b3VzJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ2xvc2UgdGhlIG1vZGFsXG4gICAgICAgIHNlbGYuJG1tX2Nsb3NlLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHNlbGYuY2xvc2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFNTS5zdXBwb3J0LnNwZWVjaFJlY29nbml0aW9uKSB7XG4gICAgICAgICAgICBzZWxmLiRtbV9idXR0b24uaGlkZSgpO1xuICAgICAgICAgICAgc2VsZi4kbW1fcHVsc2VyLmhpZGUoKTtcbiAgICAgICAgICAgIHNlbGYuJGlucHV0LmhpZGUoKTtcblxuICAgICAgICAgICAgc2VsZi4kYm9keS5hZGRDbGFzcygnbm8tc3BlZWNoJyk7XG5cbiAgICAgICAgICAgIHZhciAkdGV4dF9pbnB1dCA9ICQoJzxsaT4nLCB7J2NsYXNzJzondGV4dC1pbnB1dCd9KTtcbiAgICAgICAgICAgIHZhciAkZm9ybSA9ICQoJzxmb3JtPicpO1xuICAgICAgICAgICAgdmFyICRpbnB1dCA9ICQoJzxpbnB1dD4nLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgIGNsYXNzOiAnc2VhcmNoJyxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1NlYXJjaCBxdWVyeSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyICRidXR0b24gPSAkKCc8YnV0dG9uPicsIHtcbiAgICAgICAgICAgICAgICBodG1sOiAnJm5ic3A7PHNwYW4+PC9zcGFuPicsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N1Ym1pdCcsXG4gICAgICAgICAgICAgICAgY2xhc3M6ICdtbS1idXR0b24tYmFja2dyb3VuZCBtbS1idXR0b24tYm9yZGVyJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRmb3JtLnN1Ym1pdChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJGlucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgJGlucHV0LnZhbChcIlwiKS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICRpbnB1dC5hdHRyKFwicGxhY2Vob2xkZXJcIiwgdGV4dCk7XG4gICAgICAgICAgICAgICAgc2VsZi5hcHBlbmRIaXN0b3J5KHt0cmFuc2NyaXB0OiB0ZXh0fSk7XG5cbiAgICAgICAgICAgICAgICAvLyBTdWJtaXQhXG4gICAgICAgICAgICAgICAgc2VsZi5zdWJtaXRUZXh0KHRleHQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICR0ZXh0X2lucHV0LmFwcGVuZCgkZm9ybSk7XG4gICAgICAgICAgICAkZm9ybS5hcHBlbmQoJGlucHV0KTtcbiAgICAgICAgICAgICRmb3JtLmFwcGVuZCgkYnV0dG9uKTtcbiAgICAgICAgICAgIHNlbGYuJGhpc3RvcnlMaXN0LmFwcGVuZCgkdGV4dF9pbnB1dCk7XG5cbiAgICAgICAgICAgICRpbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQnV0dG9uIEFjdGlvbnNcbiAgICAgICAgdmFyIGJ1dHRvbl9zdGF0dXMgPSB7XG4gICAgICAgICAgICBtb3VzZWRvd24gOiBmYWxzZSxcbiAgICAgICAgICAgIGxvY2tlZCA6IGZhbHNlLFxuICAgICAgICAgICAganVzdF9sb2NrZWQgOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi4kbW1fYnV0dG9uX2ljb24ub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGJ1dHRvbl9zdGF0dXMubW91c2Vkb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIGJ1dHRvbl9zdGF0dXMuanVzdF9sb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYoYnV0dG9uX3N0YXR1cy5tb3VzZWRvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uX3N0YXR1cy5sb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBidXR0b25fc3RhdHVzLmp1c3RfbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5saXN0ZW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi4kbW1fYnV0dG9uX2ljb24ub24oJ21vdXNldXAnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBidXR0b25fc3RhdHVzLm1vdXNlZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgaWYoIWJ1dHRvbl9zdGF0dXMubG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5saXN0ZW4oZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihidXR0b25fc3RhdHVzLmxvY2tlZCAmJiAhYnV0dG9uX3N0YXR1cy5qdXN0X2xvY2tlZCkge1xuICAgICAgICAgICAgICAgIGJ1dHRvbl9zdGF0dXMubG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnV0dG9uX3N0YXR1cy5tb3VzZWRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxmLmxpc3RlbihmYWxzZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJ1dHRvbl9zdGF0dXMuanVzdF9sb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2xpY2tpbmcgZG9jdW1lbnRzXG4gICAgICAgIHRoaXMuJGNhcmRzLm9uKCdjbGljaycsICcuY2FyZCcsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLnByZXZlbnRMaW5rcykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICB0aGlzLmlzX2luaXQgPSB0cnVlO1xuXG4gICAgfSxcblxuICAgIGNsb3NlIDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5zdG9wTGlzdGVuaW5nKCk7XG4gICAgICAgIHNlbGYuJG1tX3BhcmVudC5yZW1vdmVDbGFzcygnb3BlbiByZXN1bHRzJyk7XG4gICAgICAgIHNlbGYuJGJvZHkucmVtb3ZlQ2xhc3MoJ3Jlc3VsdHMnKTtcbiAgICAgICAgc2VsZi5pc19yZXN1bHRzID0gZmFsc2U7XG4gICAgICAgIHNlbGYucmVzdWx0c19sZW5ndGggPSAtMTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoJ2Nsb3NlJyk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfSxcblxuICAgIF9kb19vbl92b2ljZV9yZWFkeSA6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYoc2VsZi5pc192b2ljZV9yZWFkeSkge1xuICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuZG9fb25fdm9pY2VfcmVhZHlfZm4gPSBmbjtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBsaXN0ZW4gOiBmdW5jdGlvbihsb2NrKSB7XG4gICAgICAgIGlmKCFNTS5zdXBwb3J0LnNwZWVjaFJlY29nbml0aW9uKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgc3RhdHVzSXNQZW5kaW5nID0gKHNlbGYuc3RhdHVzID09PSAncGVuZGluZycpO1xuICAgICAgICB2YXIgc3RhdHVzSXNMaXN0ZW5pbmc9IChzZWxmLnN0YXR1cyA9PT0gJ2xpc3RlbmluZycpO1xuICAgICAgICBpZiAoIWxvY2spIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXNJc1BlbmRpbmcgfHwgc3RhdHVzSXNMaXN0ZW5pbmcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnN0b3BMaXN0ZW5pbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zdGFydExpc3RlbmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFzZWxmLmlzX2xvY2tlZCAmJiAoc3RhdHVzSXNQZW5kaW5nIHx8IHN0YXR1c0lzTGlzdGVuaW5nKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuX2xvY2tXaGlsZVJlY29yZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5pc19sb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmLmlzX2xvY2tlZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuc3RvcExpc3RlbmluZygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0TGlzdGVuaW5nKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZVVJKCk7XG4gICAgfSxcblxuICAgIHB1bHNlIDogZnVuY3Rpb24odm9sdW1lKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHNjYWxlID0gKCh2b2x1bWUgLyAxMDApICogMC41KSArIDEuNDtcbiAgICAgICAgc2VsZi4kbW1fcHVsc2VyLmNzcygndHJhbnNmb3JtJywgJ3NjYWxlKCcgKyBzY2FsZSArICcpJyk7XG4gICAgfSxcblxuICAgIHBvc3RNZXNzYWdlIDogZnVuY3Rpb24oYWN0aW9uLCBkYXRhKSB7XG4gICAgICAgIHBhcmVudC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIHNvdXJjZTogJ21pbmRtZWxkJyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSwgXCIqXCIpO1xuICAgIH0sXG5cbiAgICBfaGlzdG9yeUhlaWdodCA6IGZ1bmN0aW9uKHNjcm9sbEhlaWdodCkge1xuICAgICAgICBpZihzY3JvbGxIZWlnaHQgPiB0aGlzLl9oZWlnaHQgKiAwLjgpIHNjcm9sbEhlaWdodCA9IHRoaXMuX2hlaWdodCAqIDAuODtcbiAgICAgICAgaWYoc2Nyb2xsSGVpZ2h0IDwgMjcwKSBzY3JvbGxIZWlnaHQgPSAyNzA7XG4gICAgICAgIHJldHVybiBzY3JvbGxIZWlnaHQ7XG4gICAgfSxcblxuICAgIHNldHVwRWRpdGFibGUgOiBmdW5jdGlvbihhbGxvd01hbnVhbEVudHJ5KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi4kaGlzdG9yeUxpc3Qub24oJ2NsaWNrJywgJy5vbiAudGFnJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgdmFyIGVudGl0eUlEID0gJHRoaXMuZGF0YSgnZW50aXR5SWQnKTtcbiAgICAgICAgICAgIHZhciBuZXdWYWx1ZSA9ICEoISFzZWxmLnNlbGVjdGVkRW50aXR5TWFwW2VudGl0eUlEXSk7XG4gICAgICAgICAgICAkdGhpcy50b2dnbGVDbGFzcygnc2VsZWN0ZWQnLCBuZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIC8vIGRvbid0IGZvY3VzIG9uIHRleHRcbiAgICAgICAgICAgIHNlbGYuJGVkaXRhYmxlLmJsdXIoKTtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChzZWxmLl90ZXh0Rm9jdXNUaW1lb3V0KTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBkb24ndCBidWJibGUgdXBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi4kZWRpdGFibGUuaGlkZSgpO1xuXG4gICAgICAgIGlmIChhbGxvd01hbnVhbEVudHJ5KSB7XG5cbiAgICAgICAgICAgIHNlbGYuJGhpc3RvcnlMaXN0Lm9uKCdjbGljaycsICcub24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBOb3QgYWxyZWFkeSBkb2luZyBzb21ldGhpbmcsIGFuZCBub3QgYSBwcm9tcHRcbiAgICAgICAgICAgICAgICB2YXIgJHByb21wdCA9IHNlbGYuJGlucHV0LmZpbmQoJy5tbS1wcm9tcHQnKTtcblxuICAgICAgICAgICAgICAgIGlmICghc2VsZi5zdGF0dXMgJiYgKCRwcm9tcHQuaGFzQ2xhc3MoJ21tLXByb21wdC1lcnJvcicpIHx8ICEkcHJvbXB0Lmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWRpdGFibGUuaGVpZ2h0KHNlbGYuJGlucHV0LmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kaW5wdXQuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAkcHJvbXB0LmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gc2VsZi4kaW5wdXQudGV4dCgpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWRpdGFibGUuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlZGl0YWJsZS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlZGl0YWJsZS52YWwodGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGYuJGVkaXRhYmxlLmZvY3VzaW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLnN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAvLyBkZWxheSBzbyB3ZSBrbm93IGl0J3Mgbm90IGFuIGVudGl0eSBjbGlja1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl90ZXh0Rm9jdXNUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdHVzID0gJ2VkaXRpbmcnO1xuICAgICAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVkaXRhYmxlLmJsdXIoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGYuJGVkaXRhYmxlLmZvY3Vzb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuJGVkaXRhYmxlLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBzZWxmLiRpbnB1dC5zaG93KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLiRlZGl0YWJsZS5rZXlwcmVzcyhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciBrZXlDb2RlID0gZS5vcmlnaW5hbEV2ZW50LmtleUNvZGU7XG4gICAgICAgICAgICAgICAgaWYgKGtleUNvZGUgIT09IDEzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBzdHlsaW5nP1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gVXNlciBwcmVzc2VkIHJldHVyblxuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gc2VsZi4kZWRpdGFibGUudmFsKCkudHJpbSgpO1xuICAgICAgICAgICAgICAgIHNlbGYuJGVkaXRhYmxlLmJsdXIoKTtcbiAgICAgICAgICAgICAgICBzZWxmLiRpbnB1dC50ZXh0KHRleHQpO1xuICAgICAgICAgICAgICAgIHNlbGYuc3VibWl0VGV4dCh0ZXh0KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9wcmVmaXhfcmF3IDogJycsXG4gICAgX3ByZWZpeCA6IGZ1bmN0aW9uKHJ1bGUpIHtcbiAgICAgICAgaWYoIXRoaXMuX3ByZWZpeF9yYXcpIHtcbiAgICAgICAgICAgIHZhciBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICcnKSxcbiAgICAgICAgICAgICAgICBwcmUgPSAoQXJyYXkucHJvdG90eXBlLnNsaWNlXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKHN0eWxlcylcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oJycpXG4gICAgICAgICAgICAgICAgICAgIC5tYXRjaCgvLShtb3p8d2Via2l0fG1zKS0vKSB8fCAoc3R5bGVzLk9MaW5rID09PSAnJyAmJiBbJycsICdvJ10pXG4gICAgICAgICAgICAgICAgICAgIClbMV07XG4gICAgICAgICAgICB0aGlzLl9wcmVmaXhfcmF3ID0gKHByZSA/ICctJyArIHByZSArICctJyA6ICcnKSArIHJ1bGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3ByZWZpeF9yYXc7XG4gICAgfSxcblxuICAgIHN1Ym1pdFRleHQ6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnN0YXR1cyA9IGZhbHNlO1xuXG4gICAgICAgIHZhciByZWNvcmRpbmcgPSBzZWxmLmNvbmZpcm1lZFJlY29yZGluZztcbiAgICAgICAgaWYgKHJlY29yZGluZy50ZXh0RW50cnlJRCkge1xuICAgICAgICAgICAgTU0uYWN0aXZlU2Vzc2lvbi50ZXh0ZW50cmllcy5kZWxldGUocmVjb3JkaW5nLnRleHRFbnRyeUlEKTtcbiAgICAgICAgfVxuICAgICAgICByZWNvcmRpbmcudHJhbnNjcmlwdCA9IHRleHQ7XG4gICAgICAgIHNlbGYuJGNhcmRzLmFkZENsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgIE1NLmFjdGl2ZVNlc3Npb24udGV4dGVudHJpZXMucG9zdCh7XG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgd2VpZ2h0OiAxLjBcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBzZWxmLm9uVGV4dEVudHJ5UG9zdGVkKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgIHJlc2l6ZVJlc3VsdHM6IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgdGhpcy5faGVpZ2h0ID0gc2l6ZTtcbiAgICAgdGhpcy4kcmVzdWx0cy5vdXRlckhlaWdodChzaXplKTtcbiAgICAgdGhpcy4kaGlzdG9yeS5vdXRlckhlaWdodCh0aGlzLl9oaXN0b3J5SGVpZ2h0KHNpemUpKTtcbiAgICAgfSxcbiAgICAgKi9cblxuICAgIGxvY2tXaGlsZVJlY29yZGluZyA6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmlzX2xvY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2xvY2tXaGlsZVJlY29yZGluZyA9IGZhbHNlO1xuICAgICAgICBNTS5hY3RpdmVTZXNzaW9uLnNldExpc3RlbmVyQ29uZmlnKHsgJ2NvbnRpbnVvdXMnOiB0aGlzLmlzX2xvY2tlZCB9KTtcbiAgICB9LFxuXG4gICAgc3RhcnRMaXN0ZW5pbmcgOiBmdW5jdGlvbihpc19sb2NrZWQpIHtcbiAgICAgICAgdGhpcy5pc19sb2NrZWQgPSAhIWlzX2xvY2tlZDtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAncGVuZGluZyc7XG4gICAgICAgIHRoaXMuaXNfZmlyc3Rfc3RhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jdXJyZW50VGV4dEVudHJpZXMgPSBbXTtcbiAgICAgICAgTU0uYWN0aXZlU2Vzc2lvbi5zZXRMaXN0ZW5lckNvbmZpZyh7ICdjb250aW51b3VzJzogdGhpcy5pc19sb2NrZWQgfSk7XG4gICAgICAgIE1NLmFjdGl2ZVNlc3Npb24ubGlzdGVuZXIuc3RhcnQoKTtcblxuICAgICAgICB0aGlzLl91cGRhdGVVSSgpO1xuICAgIH0sXG5cbiAgICBzdG9wTGlzdGVuaW5nIDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKE1NLnN1cHBvcnQuc3BlZWNoUmVjb2duaXRpb24pIHtcbiAgICAgICAgICAgIE1NLmFjdGl2ZVNlc3Npb24ubGlzdGVuZXIuY2FuY2VsKCk7XG4gICAgICAgICAgICB0aGlzLmlzX2xvY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZVVJKCk7XG4gICAgfSxcblxuICAgIHNob3dSZXN1bHRzIDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB0aGlzLnJlc3VsdHNfbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNhcmRzKGRhdGEpO1xuICAgICAgICB0aGlzLl91cGRhdGVVSSgpO1xuICAgIH0sXG5cbiAgICBzZXRUZXh0RW50cmllcyA6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAkLmVhY2goZGF0YSwgZnVuY3Rpb24oaywgdGV4dEVudHJ5KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlbGYuX3RleHRFbnRyeU1hcFt0ZXh0RW50cnkudGV4dGVudHJ5aWRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRleHRFbnRyeS5lbnRpdHlJRHMgPSBbXTtcbiAgICAgICAgICAgICAgICBzZWxmLl90ZXh0RW50cnlNYXBbdGV4dEVudHJ5LnRleHRlbnRyeWlkXSA9IHRleHRFbnRyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHRvZ2dsZUVudGl0eVNlbGVjdGVkIDogZnVuY3Rpb24oZW50aXR5SUQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHZhciBlbnRpdHlUZXh0ID0gc2VsZi5fZW50aXR5TWFwW2VudGl0eUlEXS50ZXh0O1xuICAgICAgICB2YXIgc2ltaWxhckVudGl0aWVzID0gc2VsZi5fc2ltaWxhckVudGl0eU1hcFtlbnRpdHlUZXh0XTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzaW1pbGFyRW50aXRpZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc2ltaWxhckVudGl0eUlEID0gc2ltaWxhckVudGl0aWVzW2ldO1xuICAgICAgICAgICAgdmFyICR0YWdzVG9Ub2dnbGUgPSAkKCcudGFnW2RhdGEtZW50aXR5LWlkPVwiJyArIHNpbWlsYXJFbnRpdHlJRCArICdcIl0nKTtcbiAgICAgICAgICAgIGlmIChzZWxmLnNlbGVjdGVkRW50aXR5TWFwW3NpbWlsYXJFbnRpdHlJRF0pIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgc2VsZi5zZWxlY3RlZEVudGl0eU1hcFtzaW1pbGFyRW50aXR5SURdO1xuICAgICAgICAgICAgICAgICR0YWdzVG9Ub2dnbGUucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRFbnRpdHlNYXBbc2ltaWxhckVudGl0eUlEXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgJHRhZ3NUb1RvZ2dsZS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuX3VwZGF0ZVVJKCk7XG4gICAgICAgIHNlbGYuZ2V0RG9jdW1lbnRzKCk7XG4gICAgfSxcblxuICAgIHNldEVudGl0aWVzIDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBpID0gMDtcblxuICAgICAgICBzZWxmLiR0YWdzLmVtcHR5KCk7XG4gICAgICAgIHNlbGYuX3NpbWlsYXJFbnRpdHlNYXAgPSB7fTtcblxuICAgICAgICAkLmVhY2goZGF0YSwgZnVuY3Rpb24oaywgZW50aXR5KSB7XG4gICAgICAgICAgICBpZiAoZW50aXR5LmVudGl0eXR5cGUgPT09ICdzZWdtZW50JyB8fFxuICAgICAgICAgICAgICAgIGVudGl0eS5lbnRpdHl0eXBlID09PSAna2V5cGhyYXNlJykge1xuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gaWdub3JlIHRoZXNlIGVudGl0aWVzXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0ZXh0ID0gZW50aXR5LnRleHQ7XG4gICAgICAgICAgICBpZiAodGV4dC5zcGxpdCgnICcpLmxlbmd0aCA+IDEwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBpZ25vcmUgbG9uZyBlbnRpdGllc1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2VsZi5fY3VycmVudFRleHRFbnRyaWVzLmluZGV4T2YoZW50aXR5LnRleHRlbnRyeWlkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGlnbm9yZSBlbnRpdGllcyBmcm9tIHBhc3QgdGV4dCBlbnRyaWVzXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0ZXh0RW50cnkgPSBzZWxmLl90ZXh0RW50cnlNYXBbZW50aXR5LnRleHRlbnRyeWlkXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGV4dEVudHJ5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRleHRFbnRyeS5lbnRpdHlJRHMucHVzaChlbnRpdHkuZW50aXR5aWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBVVElMLmxvZygnZGlkIG5vdCBmaW5kIHRleHQgZW50cnkgZm9yIGVudGl0eScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5fZW50aXR5TWFwW2VudGl0eS5lbnRpdHlpZF0gPSBlbnRpdHk7XG5cbiAgICAgICAgICAgIC8vIFRPRE8oamopOiBzaG91bGQgd2UgbG9vayBhdCB0eXBlIGhlcmUgYXMgd2VsbCBhcyB0ZXh0XG4gICAgICAgICAgICB2YXIgc2ltaWxhckVudGl0aWVzID0gc2VsZi5fc2ltaWxhckVudGl0eU1hcFtlbnRpdHkudGV4dF07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNpbWlsYXJFbnRpdGllcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzaW1pbGFyRW50aXRpZXMgPSBzZWxmLl9zaW1pbGFyRW50aXR5TWFwW2VudGl0eS50ZXh0XSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgLy8gb25seSBjcmVhdGUgdGFnIGZvciBmaXJzdCB2ZXJzaW9uIG9mIGFuIGVudGl0eVxuICAgICAgICAgICAgICAgIHZhciAkYSA9ICQoJzxhPicsIHtcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogJyMnLFxuICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3RhZycsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGVudGl0eS50ZXh0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2VsZi4kdGFncy5hcHBlbmQoJGEpO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAkYS5hdHRyKCdkYXRhLWVudGl0eS1pZCcsIGVudGl0eS5lbnRpdHlpZCk7XG4gICAgICAgICAgICAgICAgc2VsZi5fZW50aXR5TWFwW2VudGl0eS5lbnRpdHlpZF0gPSBlbnRpdHk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZWxlY3RlZEVudGl0eU1hcFtlbnRpdHkuZW50aXR5aWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICRhLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNpbWlsYXJFbnRpdGllcy5wdXNoKGVudGl0eS5lbnRpdHlpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYuJHRhZ3MudG9nZ2xlKCEhaSk7XG5cbiAgICAgICAgc2VsZi5jdXJyZW50RW50aXRpZXMgPSBzZWxmLmVudGl0aWVzRm9yVGV4dEVudHJ5KHNlbGYuY29uZmlybWVkUmVjb3JkaW5nLnRleHRFbnRyeUlEKTtcbiAgICAgICAgc2VsZi5fcmVzdHlsZUhpc3RvcnkoKTtcbiAgICB9LFxuXG4gICAgZW50aXRpZXNGb3JUZXh0RW50cnkgOiBmdW5jdGlvbih0ZXh0RW50cnlJRCwgZW50aXRpZXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0ZXh0RW50cnlJRCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHRleHRFbnRyeSA9IHNlbGYuX3RleHRFbnRyeU1hcFt0ZXh0RW50cnlJRF07XG4gICAgICAgIGlmICh0eXBlb2YgZW50aXRpZXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBlbnRpdGllcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdGV4dEVudHJ5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0aWVzO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dEVudHJ5LmVudGl0eUlEcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVudGl0eUlEID0gdGV4dEVudHJ5LmVudGl0eUlEc1tpXTtcbiAgICAgICAgICAgIHZhciBlbnRpdHkgPSBzZWxmLl9lbnRpdHlNYXBbZW50aXR5SURdO1xuICAgICAgICAgICAgZW50aXRpZXMucHVzaChlbnRpdHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbnRpdGllcztcbiAgICB9LFxuXG4gICAgX2lzb3RvcGVfY29uZmlnIDoge1xuICAgICAgICBpdGVtU2VsZWN0b3I6ICcuY2FyZCcsXG4gICAgICAgIHNvcnRCeTogJ3NvcnQnLFxuICAgICAgICBsYXlvdXRNb2RlOiAnbWFzb25yeScsXG4gICAgICAgIGZpbHRlcjogJzpub3QoLnJlbW92ZWQpJyxcbiAgICAgICAgZ2V0U29ydERhdGE6IHtcbiAgICAgICAgICAgIHNvcnQ6ICdbZGF0YS1zb3J0XSBwYXJzZUludCdcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfY3JlYXRlQ2FyZCA6IGZ1bmN0aW9uKGRvYykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciAkY2FyZCA9ICQoJzxhPicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAnY2FyZCBuZXcnLFxuICAgICAgICAgICAgaWQ6ICdkb2NfJyArIGRvYy5kb2N1bWVudGlkLFxuICAgICAgICAgICAgaHJlZjogZG9jLm9yaWdpbnVybCxcbiAgICAgICAgICAgIHRhcmdldDogc2VsZi5jb25maWcuY2FyZEFuY2hvclRhcmdldCB8fCAnX3BhcmVudCdcbiAgICAgICAgfSk7XG4gICAgICAgICRjYXJkLmF0dHIoJ2RhdGEtZG9jdW1lbnQtaWQnLCBkb2MuZG9jdW1lbnRpZCk7XG5cbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLmNhcmRMYXlvdXQgPT09ICdjdXN0b20nKSB7XG4gICAgICAgICAgICB2YXIgaHRtbCA9IHNlbGYuY2FyZFRlbXBsYXRlKGRvYyk7XG4gICAgICAgICAgICAkY2FyZC5odG1sKGh0bWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyICR0aXRsZSA9ICQoJzxoMj4nLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6ICd0aXRsZScsXG4gICAgICAgICAgICAgICAgaHRtbDogZG9jLnRpdGxlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRjYXJkLmFwcGVuZCgkdGl0bGUpO1xuXG4gICAgICAgICAgICB2YXIgaW1hZ2VVUkwgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZG9jLmltYWdlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZG9jLmltYWdlLnVybCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VVUkwgPSBkb2MuaW1hZ2UudXJsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRvYy5pbWFnZS50aHVtYnVybCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VVUkwgPSBkb2MuaW1hZ2UudGh1bWJ1cmw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGltYWdlVVJMKSB7XG4gICAgICAgICAgICAgICAgdmFyICRpbWFnZSA9ICQoJzxwPicsIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdpbWFnZSBub3QtbG9hZGVkJ1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJGltYWdlLmFwcGVuZCgkKCc8aW1nPicsIHtcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBpbWFnZVVSTFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAkY2FyZC5hcHBlbmQoJGltYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkb2MuZGVzY3JpcHRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBkb2MuZGVzY3JpcHRpb24uc3Vic3RyKDAsIDE1MCkgKyAoZG9jLmRlc2NyaXB0aW9uLmxlbmd0aCA+IDE1MCA/IFwiJmhlbGxpcDtcIiA6IFwiXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IFwiTm8gZGVzY3JpcHRpb25cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRjYXJkLmFwcGVuZCgkKCc8cD4nLCB7XG4gICAgICAgICAgICAgICAgaHRtbDogZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgY2xhc3M6ICdkZXNjcmlwdGlvbidcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgLy8gZmllbGRzXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlbGYuY29uZmlnLmNhcmRGaWVsZHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0Rm9ybWF0dGVkU3RyaW5nKGZvcm1hdCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodmFsdWUgKiAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGRhdGUuZ2V0TW9udGgoKSArIDEpICsgJy8nICsgZGF0ZS5nZXREYXkoKSArICcvJyArIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnN1YnN0cigwLCAxMDApICsgKHZhbHVlLmxlbmd0aCA+IDEwMCA/IFwiJmhlbGxpcDtcIiA6IFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGNhcmRGaWVsZHMgPSBzZWxmLmNvbmZpZy5jYXJkRmllbGRzO1xuICAgICAgICAgICAgICAgICQuZWFjaChjYXJkRmllbGRzLCBmdW5jdGlvbihrMiwgZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZG9jW2ZpZWxkLmtleV0gfHwgZmllbGQucGxhY2Vob2xkZXI7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgYSBsYWJlbCBpcyBzcGVjaWZpZWQsIGFkZCBhIGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmxhYmVsICE9PSAndW5kZWZpbmVkJyAmJiBmaWVsZC5sYWJlbCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGxhYmVsID0gJCgnPHNwYW4+Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2xhYmVsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogZmllbGQubGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkdmFsdWUgPSAkKCc8c3Bhbj4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICd2YWx1ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgd2UgYXJlbid0IHVzaW5nIHBsYWNlaG9sZGVyLCBmb3JtYXQgdGhlIHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBmaWVsZC5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZ2V0Rm9ybWF0dGVkU3RyaW5nKGZpZWxkLmZvcm1hdCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdmFsdWUuYWRkQ2xhc3MoJ3BsYWNlaG9sZGVyJyk7IC8vIG90aGVyIHdpc2UgYWRkIHBsYWNlaG9sZGVyIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAkdmFsdWUudGV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGZpZWxkID0gJCgnPHA+Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnbW0tZG9jLWZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmNsYXNzICE9PSAndW5kZWZpbmVkJyAmJiBmaWVsZC5jbGFzcyAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZmllbGQuYWRkQ2xhc3MoZmllbGQuY2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgJGZpZWxkLmFwcGVuZCgkbGFiZWwpLmFwcGVuZCgkdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNhcmQuYXBwZW5kKCRmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJGNhcmQ7XG4gICAgfSxcblxuICAgIF91cGRhdGVDYXJkcyA6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbmV3Q2FyZHMgPSBbXTtcblxuICAgICAgICAvLyBSZW1vdmUgdGhlIFwiTm8gcmVzdWx0c1wiIG1lc3NhZ2UgaWYgcHJlc2VudFxuICAgICAgICAkKCcubm8tcmVzdWx0cycsIHRoaXMuJGNhcmRzKS5yZW1vdmUoKTsgLy8gVE9ETzogYW5pbWF0ZSB0aGlzIG5pY2VseT9cblxuICAgICAgICAvLyBSZW1vdmUgdGhlIGNhcmRzIGZpbHRlcmVkIG91dCBsYXN0IHRpbWVcbiAgICAgICAgLy8gTGVhdmUgb25lIGNhcmQgdG8gcHJldmVudCB0aGUgc2luZ2xlIGNvbHVtbiBpc290b3BlIGJ1Z1xuICAgICAgICAkKCcuY2FyZC5yZW1vdmVkOm5vdCguc2luZ2xlLWNvbHVtbi1maXgpJywgdGhpcy4kY2FyZHMpLnJlbW92ZSgpO1xuXG4gICAgICAgIC8vIE1hcmsgY3VycmVudCB0byBiZSBkZWxldGVkOyB3ZSdsbCB1bi1tYXJrIHRoZW0gaWYgdGhleSBleGlzdFxuICAgICAgICAkKCcuY2FyZCcsIHRoaXMuJGNhcmRzKS5lYWNoKGZ1bmN0aW9uKGssIGNhcmQpIHtcbiAgICAgICAgICAgIHZhciAkY2FyZCA9ICQoY2FyZCk7XG4gICAgICAgICAgICAkY2FyZC5hZGRDbGFzcygndG8tZGVsZXRlJyk7XG4gICAgICAgICAgICAkY2FyZC5hdHRyKCdkYXRhLXNvcnQnLCBrICsgMTAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQuZWFjaChkYXRhLCBmdW5jdGlvbihrLCBkb2MpIHtcbiAgICAgICAgICAgIC8vIENhcmQgZXhpc3RzLCBzbyB1cGRhdGUgc29ydCBvcmRlciBhbmQga2VlcCBpdFxuICAgICAgICAgICAgaWYgKCQoJyNkb2NfJyArIGRvYy5kb2N1bWVudGlkKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKCcjZG9jXycgKyBkb2MuZG9jdW1lbnRpZCkucmVtb3ZlQ2xhc3MoJ3RvLWRlbGV0ZScpLmF0dHIoJ2RhdGEtc29ydCcsIGspO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDYXJkIGRvZXNuJ3QgZXhpc3QsIHNvIGNyZWF0ZSBpdC4gKFRPRE86IE1heWJlIHVzZSBhIHRlbXBsYXRpbmcgc3lzdGVtPylcbiAgICAgICAgICAgIHZhciAkY2FyZCA9IHNlbGYuX2NyZWF0ZUNhcmQoZG9jKTtcbiAgICAgICAgICAgICRjYXJkLmF0dHIoJ2RhdGEtc29ydCcsIGspO1xuICAgICAgICAgICAgbmV3Q2FyZHMucHVzaCgkY2FyZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEZpbHRlciBvdXQgdW51c2VkIGNhcmRzICh3ZSBkb24ndCBkZWxldGUgeWV0IGIvYyB3ZSB3YW50IHRoZW0gdG8gZmFkZSBvdXQpXG4gICAgICAgICQoJy5jYXJkLnRvLWRlbGV0ZScsIHRoaXMuJGNhcmRzKS5yZW1vdmVDbGFzcygndG8tZGVsZXRlJykuYWRkQ2xhc3MoJ3JlbW92ZWQnKTtcblxuICAgICAgICB2YXIgJG5ld0NhcmRzID0gJC5tYWtlQXJyYXkobmV3Q2FyZHMpO1xuXG4gICAgICAgIHNlbGYuJGNhcmRzLmFwcGVuZCggJG5ld0NhcmRzICk7XG4gICAgICAgIGlmICghc2VsZi4kY2FyZHMuaGFzQ2xhc3MoJ2lzb3RvcGUnKSkge1xuICAgICAgICAgICAgLy8gTm8gaXNvdG9wZSBpbnN0YW5jZSB5ZXQ7IGNyZWF0ZSBpdC5cbiAgICAgICAgICAgIHNlbGYuJGNhcmRzLmFkZENsYXNzKCdpc290b3BlJyk7XG4gICAgICAgICAgICBzZWxmLiRjYXJkcy5pc290b3BlKHNlbGYuX2lzb3RvcGVfY29uZmlnKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSXNvdG9wZSBpbnN0YW5jZSBhbHJlYWR5IGV4aXN0c1xuXG4gICAgICAgICAgICAvLyBTaW5nbGUgb3V0IHRoZSBuZXcgY2FyZHMsIGFuZCAnYXBwZW5kJyB0aGVtIHRvIGlzb3RvcGUgKHRoZXkncmUgYWxyZWFkeSBpbiB0aGUgRE9NKVxuICAgICAgICAgICAgJG5ld0NhcmRzID0gJCgnLm5ldycsIHNlbGYuJGNhcmRzKTtcbiAgICAgICAgICAgIHNlbGYuJGNhcmRzLmlzb3RvcGUoICdhcHBlbmRlZCcgLCAkbmV3Q2FyZHMgKTtcbiAgICAgICAgICAgIHNlbGYuJGNhcmRzLmlzb3RvcGUoICd1cGRhdGVTb3J0RGF0YScgKS5pc290b3BlKHNlbGYuX2lzb3RvcGVfY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuJGNhcmRzLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgIHNlbGYuJGNhcmRzLmltYWdlc0xvYWRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoJy5ub3QtbG9hZGVkJykucmVtb3ZlQ2xhc3MoJ25vdC1sb2FkZWQnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kY2FyZHMuaXNvdG9wZShzZWxmLl9pc290b3BlX2NvbmZpZyk7XG4gICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRPRE86IGFuaW1hdGUgdGhpcyBuaWNlbHk/XG4gICAgICAgIGlmICgkKCcuY2FyZDpub3QoLnJlbW92ZWQpJywgdGhpcy4kY2FyZHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy4kY2FyZHMuYXBwZW5kKCQoJzxkaXY+Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzOiAnbm8tcmVzdWx0cycsXG4gICAgICAgICAgICAgICAgaHRtbDogJ05vIHJlc3VsdHMnXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCcubmV3JywgdGhpcy4kY2FyZHMpLnJlbW92ZUNsYXNzKCduZXcnKTtcbiAgICB9LFxuXG4gICAgYXBwZW5kSGlzdG9yeSA6IGZ1bmN0aW9uKHJlY29yZGluZykge1xuICAgICAgICBpZiAocmVjb3JkaW5nLnRyYW5zY3JpcHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlY29yZGluZ3MucHVzaChyZWNvcmRpbmcpO1xuXG4gICAgICAgICAgICAvLyBBcHBlbmQgdG8gdGhlIGhpc3RvcnlcbiAgICAgICAgICAgIHZhciAkbmV3X2hpc3RvcnkgPSAkKCc8bGk+Jywge1xuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3JlY29yZGluZyc6IHJlY29yZGluZyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGh0bWw6IHRoaXMuJGlucHV0Lmh0bWwoKSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiRpbnB1dC5iZWZvcmUoJG5ld19oaXN0b3J5KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRuZXdfaGlzdG9yeSk7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgbmV3IG9uZVxuICAgICAgICAgICAgdGhpcy4kaW5wdXQuaHRtbChcIiZuYnNwO1wiKTtcblxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRpbnB1dC5yZW1vdmVDbGFzcygnaGlkZScpO1xuICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsSGlzdG9yeSgpO1xuICAgICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgICAgdGhpcy5fcmVzdHlsZUhpc3RvcnkoKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVVJKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbGV0dGVyaW5nIDogZnVuY3Rpb24oJGVsLCB0ZXh0LCBwYXJlbnRDbGFzcykge1xuICAgICAgICAkZWwuZW1wdHkoKTtcbiAgICAgICAgdGV4dCA9IHRleHQuc3BsaXQoJycpO1xuICAgICAgICB2YXIgJGVsX3BhcmVudCA9ICQoJzxkaXY+JywgeydjbGFzcyc6IHBhcmVudENsYXNzfSk7XG4gICAgICAgIGZvcih2YXIgaT0wOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgJGVsX3BhcmVudC5hcHBlbmQoJCgnPHNwYW4+JywgeyB0ZXh0OiB0ZXh0W2ldIH0pKTtcbiAgICAgICAgfVxuICAgICAgICAkZWwuYXBwZW5kKCRlbF9wYXJlbnQpO1xuICAgIH0sXG5cbiAgICBfcmVzdHlsZUhpc3Rvcnk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLCBpO1xuICAgICAgICAvL3RoaXMuJGhpc3RvcnlMaXN0LmVtcHR5KCk7XG4gICAgICAgIHRoaXMuJGhpc3RvcnlMaXN0LmZpbmQoJ2xpJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZWNvcmRpbmcgPSAkKHRoaXMpLmRhdGEoJ3JlY29yZGluZycpO1xuICAgICAgICAgICAgaWYoIXJlY29yZGluZykgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBlbnRpdGllcyBmb3IgcmVjb3JkaW5nXG4gICAgICAgICAgICB2YXIgZW50aXRpZXMgPSBzZWxmLmVudGl0aWVzRm9yVGV4dEVudHJ5KHJlY29yZGluZy50ZXh0RW50cnlJRCk7XG5cbiAgICAgICAgICAgIHZhciBzdGF0cyA9IGhpZ2hsaWdodEVudGl0aWVzKGVudGl0aWVzLCByZWNvcmRpbmcudHJhbnNjcmlwdCk7XG4gICAgICAgICAgICB2YXIgJGRpdiA9ICQoJzxkaXY+JywgeydodG1sJzogc3RhdHMubWFya3VwfSk7XG5cbiAgICAgICAgICAgIHZhciAkbGkgPSAkKHRoaXMpO1xuICAgICAgICAgICAgJGxpLmVtcHR5KCk7XG4gICAgICAgICAgICAkbGkuYXBwZW5kKCRkaXYpO1xuICAgICAgICAgICAgJGxpLmF0dHIoJ2RhdGEtdGV4dC1lbnRyeS1pZCcsIHJlY29yZGluZy50ZXh0RW50cnlJRCk7XG5cbiAgICAgICAgICAgICRsaS5maW5kKCcudGFnJykuZWFjaChmdW5jdGlvbihrLCAkdGFnKSB7XG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICB2YXIgZW50aXR5SUQgPSAkdGhpcy5kYXRhKCdlbnRpdHlJZCcpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNlbGVjdGVkRW50aXR5TWFwW2VudGl0eUlEXSkge1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGkgPT09IHNlbGYuX3JlY29yZGluZ3MubGVuZ3RoIC0gMSAmJiBzZWxmLnJlY29yZGluZ3NfbGVuZ3RoICE9PSBzZWxmLl9yZWNvcmRpbmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIChmdW5jdGlvbigkZGl2KSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGRpdi5hZGRDbGFzcygnb24nKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICB9KSgkZGl2KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGRpdi5hZGRDbGFzcygnb2xkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYuc2Nyb2xsSGlzdG9yeSgpO1xuXG4gICAgICAgIC8vIFNvIHdlIGNhbiB0ZWxsIGlmIHRoZXJlJ3MgYSBuZXcgb25lXG4gICAgICAgIHRoaXMucmVjb3JkaW5nc19sZW5ndGggPSB0aGlzLl9yZWNvcmRpbmdzLmxlbmd0aDtcbiAgICB9LFxuXG4gICAgc2Nyb2xsSGlzdG9yeSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuJGhpc3RvcnlEYXRhLnNjcm9sbFRvcChzZWxmLiRoaXN0b3J5RGF0YVswXS5zY3JvbGxIZWlnaHQpO1xuICAgIH0sXG5cbiAgICBfZG9jdW1lbnRMb2NrIDoge1xuICAgICAgICBjYW5SZXF1ZXN0RG9jdW1lbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5sYXN0RG9jdW1lbnRzUmVxdWVzdCArIDUwMCA8IERhdGUubm93KCkpO1xuICAgICAgICB9LFxuICAgICAgICBsYXN0RG9jdW1lbnRzUmVxdWVzdDogMFxuICAgIH0sXG5cbiAgICBfZG9jdW1lbnRzQ2FjaGU6IHt9LFxuXG4gICAgX251bUNvbHVtbnMgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGNhcmRXaWR0aCA9IDIxODtcbiAgICAgICAgdmFyIGNhcmRQYWRkaW5nID0gMjA7XG4gICAgICAgIHZhciB3aWR0aFJlbWFpbmluZyA9IHNlbGYuJGNhcmRzLndpZHRoKCkgLSBjYXJkUGFkZGluZztcbiAgICAgICAgdmFyIG51bUNvbHMgPSAwO1xuICAgICAgICB3aGlsZSAod2lkdGhSZW1haW5pbmcgPj0gMCkge1xuICAgICAgICAgICAgbnVtQ29scysrO1xuICAgICAgICAgICAgd2lkdGhSZW1haW5pbmcgLT0gY2FyZFdpZHRoICsgY2FyZFBhZGRpbmc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bUNvbHM7XG4gICAgfSxcblxuICAgIF9udW1Eb2N1bWVudHMgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmNvbmZpZy5udW1SZXN1bHRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm51bVJlc3VsdHM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbnVtQ29scyA9IHNlbGYuX251bUNvbHVtbnMoKTtcbiAgICAgICAgdmFyIG51bURvY3MgPSBNYXRoLm1heChudW1Db2xzICogMiwgOCk7XG4gICAgICAgIGlmIChudW1Eb2NzICUgbnVtQ29scyAhPT0gMCkge1xuICAgICAgICAgICAgbnVtRG9jcyArPSBudW1Db2xzIC0gKG51bURvY3MgJSBudW1Db2xzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVtRG9jcztcbiAgICB9LFxuXG4gICAgZ2V0RG9jdW1lbnRzIDogZnVuY3Rpb24oKSB7XG4gICAgICAgIFVUSUwubG9nKCdnZXR0aW5nIGRvY3VtZW50cycpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHF1ZXJ5UGFyYW1zID0geyBsaW1pdDogc2VsZi5jb25maWcubnVtUmVzdWx0cyB8fCAxNCB9O1xuICAgICAgICB2YXIgcmVxdWVzdEtleSA9ICdkZWZhdWx0JztcbiAgICAgICAgdmFyIHNlbGVjdGVkRW50aXR5SURzID0gT2JqZWN0LmtleXMoTU1Wb2ljZS5zZWxlY3RlZEVudGl0eU1hcCk7XG4gICAgICAgIGlmIChzZWxlY3RlZEVudGl0eUlEcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXF1ZXN0S2V5ID0gSlNPTi5zdHJpbmdpZnkoc2VsZWN0ZWRFbnRpdHlJRHMpO1xuICAgICAgICAgICAgcXVlcnlQYXJhbXMuZW50aXR5aWRzID0gcmVxdWVzdEtleTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zLnRleHRlbnRyeWlkcyA9IEpTT04uc3RyaW5naWZ5KHNlbGYuX2N1cnJlbnRUZXh0RW50cmllcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gY2FjaGVkIHJlc3BvbnNlIGlmIGl0IGV4aXN0cyBhbmQgaGFzIG5vdCBleHBpcmVkIChleHBpcmUgdGltZSBvZiAxMCBtaW51dGVzKVxuICAgICAgICBpZiAoc2VsZi5fZG9jdW1lbnRzQ2FjaGUuaGFzT3duUHJvcGVydHkocmVxdWVzdEtleSkgJiZcbiAgICAgICAgICAgIERhdGUubm93KCkgLSBzZWxmLl9kb2N1bWVudHNDYWNoZVtyZXF1ZXN0S2V5XS5yZXF1ZXN0VGltZSA8IDYwMDAwMCkge1xuICAgICAgICAgICAgb25TdWNjZXNzKHNlbGYuX2RvY3VtZW50c0NhY2hlW3JlcXVlc3RLZXldLnJlc3VsdCwgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNlbGYuX2RvY3VtZW50TG9jay5jYW5SZXF1ZXN0RG9jdW1lbnRzKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXF1ZXN0VGltZSA9IHRoaXMuX2RvY3VtZW50TG9jay5sYXN0RG9jdW1lbnRzUmVxdWVzdCA9IERhdGUubm93KCk7XG4gICAgICAgIGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXN1bHQsIGNhY2hlZCkge1xuICAgICAgICAgICAgY2FjaGVkID0gISFjYWNoZWQ7XG5cbiAgICAgICAgICAgIGlmICghY2FjaGVkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fZG9jdW1lbnRzQ2FjaGVbcmVxdWVzdEtleV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0VGltZTogcmVxdWVzdFRpbWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFVUSUwubG9nKFwiR290IGRvY3VtZW50c1wiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgVVRJTC5sb2coXCJHb3QgZG9jdW1lbnRzIGZyb20gY2FjaGVcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBudW1Eb2N1bWVudHMgPSBzZWxmLl9udW1Eb2N1bWVudHMoKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5sZW5ndGggPiBudW1Eb2N1bWVudHMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGF0YS5zcGxpY2UobnVtRG9jdW1lbnRzLCByZXN1bHQuZGF0YS5sZW5ndGggLSBudW1Eb2N1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgTU1Wb2ljZS5zaG93UmVzdWx0cyhyZXN1bHQuZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvbkVycm9yKGVycm9yKSB7XG4gICAgICAgICAgICBVVElMLmxvZyhcIkVycm9yIGdldHRpbmcgZG9jdW1lbnRzOiAgKFR5cGUgXCIgKyBlcnJvci5jb2RlICtcbiAgICAgICAgICAgICAgICBcIiAtIFwiICsgZXJyb3IudHlwZSArIFwiKTogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBNTS5hY3RpdmVTZXNzaW9uLmRvY3VtZW50cy5nZXQocXVlcnlQYXJhbXMsIG9uU3VjY2Vzcywgb25FcnJvcik7XG4gICAgfSxcblxuICAgIHJlc2l6ZSA6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYodGhpcy5pc19yZXN1bHRzKSB7XG4gICAgICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuJG1tX3BhcmVudC5oZWlnaHQoKTtcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IHNpemU7XG4gICAgICAgICAgICB0aGlzLiRyZXN1bHRzLm91dGVySGVpZ2h0KHNpemUpO1xuICAgICAgICAgICAgdGhpcy4kaGlzdG9yeS5vdXRlckhlaWdodCh0aGlzLl9oaXN0b3J5SGVpZ2h0KHNpemUpKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGVfdGV4dCA6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGZ1bGxUZXh0ID0gc2VsZi5jb25maXJtZWRSZWNvcmRpbmcudHJhbnNjcmlwdCArIHNlbGYucGVuZGluZ1JlY29yZGluZy50cmFuc2NyaXB0O1xuXG4gICAgICAgIGlmIChmdWxsVGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuJGlucHV0LmVtcHR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPOiBhbmltYXRlIHRyYW5zaXRpb24gdG8gaGlnaGxpZ2h0ZWQgZW50aXRpZXMgP1xuICAgICAgICB2YXIgY29uZmlybWVkU3RhdHMgPSBoaWdobGlnaHRFbnRpdGllcyh0aGlzLmN1cnJlbnRFbnRpdGllcywgdGhpcy5jb25maXJtZWRSZWNvcmRpbmcudHJhbnNjcmlwdCk7XG4gICAgICAgIHRoaXMuJGlucHV0LmFwcGVuZCgkKCc8c3Bhbj4nLCB7XG4gICAgICAgICAgICBodG1sOiBjb25maXJtZWRTdGF0cy5tYXJrdXBcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLiRpbnB1dC5hcHBlbmQoJCgnPHNwYW4+Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdwZW5kaW5nJyxcbiAgICAgICAgICAgIGh0bWw6IHNlbGYucGVuZGluZ1JlY29yZGluZy50cmFuc2NyaXB0XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy4kaW5wdXQuYXR0cignZGF0YS10ZXh0JywgZnVsbFRleHQpO1xuICAgIH0sXG5cbiAgICBvblRleHRFbnRyeVBvc3RlZDogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIHNlbGYgPSBNTVZvaWNlO1xuICAgICAgICBVVElMLmxvZygndGV4dCBlbnRyeSBwb3N0ZWQnKTtcbiAgICAgICAgdmFyIHRleHRFbnRyeUlEID0gTU1Wb2ljZS5jb25maXJtZWRSZWNvcmRpbmcudGV4dEVudHJ5SUQgPSByZXNwb25zZS5kYXRhLnRleHRlbnRyeWlkO1xuICAgICAgICBzZWxmLiRpbnB1dC5kYXRhKCd0ZXh0ZW50cnlpZCcsIHRleHRFbnRyeUlEKTtcbiAgICAgICAgc2VsZi5fY3VycmVudFRleHRFbnRyaWVzLnB1c2godGV4dEVudHJ5SUQpO1xuICAgICAgICBkZWxldGUgc2VsZi5fZG9jdW1lbnRzQ2FjaGVbJ2RlZmF1bHQnXTtcbiAgICAgICAgc2VsZi5zZWxlY3RlZEVudGl0eU1hcCA9IHt9O1xuICAgICAgICBNTVZvaWNlLmdldERvY3VtZW50cygpO1xuICAgIH0sXG5cbiAgICBfbGlzdGVuZXJDb25maWcgOiB7XG4gICAgICAgIG9uUmVzdWx0OiBmdW5jdGlvbihyZXN1bHQgLyosIHJlc3VsdEluZGV4LCByZXN1bHRzLCBldmVudCAgPC0tIHVudXNlZCAqLykge1xuICAgICAgICAgICAgVVRJTC5sb2coXCJMaXN0ZW5lcjogb25SZXN1bHRcIiwgcmVzdWx0KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZmluYWwpIHtcbiAgICAgICAgICAgICAgICBNTVZvaWNlLm1ha2VOZXdSZWNvcmRpbmdzKHJlc3VsdC50cmFuc2NyaXB0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgTU1Wb2ljZS5wZW5kaW5nUmVjb3JkaW5nLnRyYW5zY3JpcHQgPSByZXN1bHQudHJhbnNjcmlwdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE1NVm9pY2UuX3VwZGF0ZVVJKCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU3RhcnQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBVVElMLmxvZyhcIkxpc3RlbmVyOiBvblN0YXJ0XCIpO1xuICAgICAgICAgICAgaWYgKE1NVm9pY2UuaXNfZmlyc3Rfc3RhcnQpIHtcbiAgICAgICAgICAgICAgICBNTVZvaWNlLm1ha2VOZXdSZWNvcmRpbmdzKCk7XG4gICAgICAgICAgICAgICAgTU1Wb2ljZS5pc19maXJzdF9zdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIE1NVm9pY2Uuc3RhdHVzID0gJ2xpc3RlbmluZyc7XG4gICAgICAgICAgICAgICAgTU1Wb2ljZS5fdXBkYXRlVUkoKTtcbiAgICAgICAgICAgICAgICBzdGFydFZvbHVtZU1vbml0b3IoKTtcbiAgICAgICAgICAgICAgICBNTVZvaWNlLiRjYXJkcy5hZGRDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbkVuZDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIFVUSUwubG9nKFwiTGlzdGVuZXI6IG9uRW5kXCIpO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHBlbmRpbmdUcmFuc2NyaXB0ID0gTU1Wb2ljZS5wZW5kaW5nUmVjb3JkaW5nLnRyYW5zY3JpcHQ7XG4gICAgICAgICAgICBpZiAocGVuZGluZ1RyYW5zY3JpcHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIE1NVm9pY2UubWFrZU5ld1JlY29yZGluZ3MocGVuZGluZ1RyYW5zY3JpcHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBNTVZvaWNlLiRjYXJkcy5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE1NVm9pY2UuaXNfbG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1NVm9pY2UuX2xvY2tXaGlsZVJlY29yZGluZykge1xuICAgICAgICAgICAgICAgICAgICBNTVZvaWNlLmxvY2tXaGlsZVJlY29yZGluZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBNTS5hY3RpdmVTZXNzaW9uLmxpc3RlbmVyLnN0YXJ0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIE1NVm9pY2Uuc3RhdHVzID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgZnVsbFRleHQgPSBNTVZvaWNlLmNvbmZpcm1lZFJlY29yZGluZy50cmFuc2NyaXB0ICsgTU1Wb2ljZS5wZW5kaW5nUmVjb3JkaW5nLnRyYW5zY3JpcHQ7XG4gICAgICAgICAgICAgICAgaWYoIWZ1bGxUZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBNTVZvaWNlLmxldHRlcmluZyhNTVZvaWNlLiRpbnB1dCwgJ1dob29wcywgd2UgZGlkblxcJ3QgZ2V0IHRoYXQuLi4nLCAnbW0tcHJvbXB0IG1tLXByb21wdC1lcnJvcicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIFVUSUwubG9nKCdmdWxsIHRleHQnLCBmdWxsVGV4dCk7XG5cbiAgICAgICAgICAgICAgICAvLyBQbGF5IHRoZSBzb3VuZFxuICAgICAgICAgICAgICAgICQoJyNhdWRpby1kb25lJylbMF0ucGxheSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBNTVZvaWNlLl91cGRhdGVVSSgpO1xuICAgICAgICB9LFxuICAgICAgICBvbkVycm9yOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09PSAnYWJvcnRlZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGlnbm9yZSBhYm9ydGVkIGVycm9yc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgVVRJTC5sb2coXCJMaXN0ZW5lcjogb25FcnJvciAtIFwiLCBldmVudC5lcnJvciwgZXZlbnQubWVzc2FnZSk7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmVycm9yKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbm90LWFsbG93ZWQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3NlcnZpY2Utbm90LWFsbG93ZWQnOlxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkbyBzb21ldGhpbmcgaGVyZVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xhbmd1YWdlLW5vdC1zdXBwb3J0ZWQnOlxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGhhbmRsZSB0aGlzIHdoZW4gd2UgYWxsb3cgc2V0dGluZyBsYW5ndWFnZVxuXG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIHRoZSByZXN0IGZvciBub3dcbiAgICAgICAgICAgICAgICBjYXNlICdiYWQtZ3JhbW1hcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnbmV0d29yayc6XG4gICAgICAgICAgICAgICAgY2FzZSBcIm5vLXNwZWVjaFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2F1ZGlvLWNhcHR1cmUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3NlcnZpY2Utbm90LWFsbG93ZWQnOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuICAgICAgICBvblRleHRFbnRyeVBvc3RlZDogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIE1NVm9pY2Uub25UZXh0RW50cnlQb3N0ZWQocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9jaGFuZ2VkX2NhY2hlZCA6IHt9LFxuXG4gICAgLy8gVGhpcyB3aWxsIGJyb2FkY2FzdCB1cGRhdGVkIHZhcmlhYmxlcyB0byB0aGUgbW9kYWxcbiAgICBfaXNDaGFuZ2VkIDogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB2YXIgY3VycmVudFZhbHVlID0gdGhpc1tuYW1lXTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzW25hbWVdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY3VycmVudFZhbHVlID0gSlNPTi5zdHJpbmdpZnkodGhpc1tuYW1lXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NoYW5nZWRfY2FjaGVkW25hbWVdICE9IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlZF9jYWNoZWRbbmFtZV0gPSBjdXJyZW50VmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIC8vIERvIGEgZGlydHkgY2hlY2sgb2YgYWxsIHZhcmlhYmxlcyB0byBzZWUgd2hhdCBjaGFuZ2VkXG4gICAgX2dldFVwZGF0ZWQgOiBmdW5jdGlvbihpdGVtcykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciB1cGRhdGVkID0ge307XG4gICAgICAgICQuZWFjaChpdGVtcywgZnVuY3Rpb24oaywgdikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2ICE9PSAnZnVuY3Rpb24nICYmIGtbMF0gIT0gXCJfXCIgJiYga1swXSAhPSBcIiRcIikge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLl9pc0NoYW5nZWQoaykpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZFtrXSA9IHY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgfSxcblxuICAgIC8vIFVwZGF0ZSB0aGUgVUkgdG8gcmVmbGVjdCB0aGUgc2l0ZVxuICAgIF91cGRhdGVVSSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciB1cGRhdGVzID0gc2VsZi5fZ2V0VXBkYXRlZCh0aGlzKTtcblxuICAgICAgICBpZigncmVjb3JkaW5nc19sZW5ndGgnIGluIHVwZGF0ZXMpIHtcbiAgICAgICAgICAgIGlmKHVwZGF0ZXMucmVjb3JkaW5nc19sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlbGYuJGJvZHkuYWRkQ2xhc3MoJ2hhc2hpc3RvcnknKTtcbiAgICAgICAgICAgICAgICBzZWxmLiRoaXN0b3J5QnV0dG9uLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHVwZGF0ZXMucmVjb3JkaW5nc19sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgICAgIHNlbGYuJG1tX2J1dHRvbi5hZGRDbGFzcygnc2hhZG93Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZignaXNfdm9pY2VfcmVhZHknIGluIHVwZGF0ZXMpIHtcbiAgICAgICAgICAgIGlmKHNlbGYuZG9fb25fdm9pY2VfcmVhZHlfZm4pIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRvX29uX3ZvaWNlX3JlYWR5X2ZuKCk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHNlbGYuZG9fb25fdm9pY2VfcmVhZHlfZm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZigncmVzdWx0c19sZW5ndGgnIGluIHVwZGF0ZXMpIHtcbiAgICAgICAgICAgIGlmKHVwZGF0ZXMucmVzdWx0c19sZW5ndGggPj0gMCAmJiAhc2VsZi5pc19yZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kYm9keS5hZGRDbGFzcygncmVzdWx0cycpO1xuICAgICAgICAgICAgICAgIHNlbGYuJG1tX3BhcmVudC5hZGRDbGFzcygncmVzdWx0cycpO1xuICAgICAgICAgICAgICAgIHNlbGYuaXNfcmVzdWx0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5yZXNpemUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCdzdGF0dXMnIGluIHVwZGF0ZXMpIHtcbiAgICAgICAgICAgIHNlbGYuJG1tX2J1dHRvbi5yZW1vdmVDbGFzcygnc3RhdHVzLXBlbmRpbmcnKTtcbiAgICAgICAgICAgIHNlbGYuJG1tX2J1dHRvbi5yZW1vdmVDbGFzcygnc3RhdHVzLWxpc3RlbmluZycpO1xuICAgICAgICAgICAgc2VsZi5zdGF0dXMgPSB1cGRhdGVzLnN0YXR1cztcbiAgICAgICAgICAgIGlmICh1cGRhdGVzLnN0YXR1cyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRtbV9idXR0b24uYWRkQ2xhc3MoJ3N0YXR1cy0nICsgdXBkYXRlcy5zdGF0dXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVwZGF0ZXMuc3RhdHVzID09PSAnbGlzdGVuaW5nJykge1xuICAgICAgICAgICAgICAgIHNlbGYuJGlucHV0LmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5sZXR0ZXJpbmcoc2VsZi4kaW5wdXQsICdTdGFydCBzcGVha2luZyBub3cuLi4nLCAnbW0tcHJvbXB0Jyk7XG4gICAgICAgICAgICAgICAgLy90aGlzLiRtbS5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVwZGF0ZXMuc3RhdHVzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuJG1tX3B1bHNlci5jc3MoJ3RyYW5zZm9ybScsICdzY2FsZSgwKScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuJG1tX2FsZXJ0LnRvZ2dsZUNsYXNzKCdvbicsIHVwZGF0ZXMuc3RhdHVzID09PSAncGVuZGluZycpO1xuICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoJ2lzX2xvY2tlZCcgaW4gdXBkYXRlcykge1xuICAgICAgICAgICAgc2VsZi4kbW1fYnV0dG9uLnRvZ2dsZUNsYXNzKCdsb2NrJywgdXBkYXRlcy5pc19sb2NrZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRleHROZWVkc1VwZGF0ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoJ2N1cnJlbnRFbnRpdGllcycgaW4gdXBkYXRlcykge1xuICAgICAgICAgICAgc2VsZi5jdXJyZW50RW50aXRpZXMgPSB1cGRhdGVzLmN1cnJlbnRFbnRpdGllcztcbiAgICAgICAgICAgIHRleHROZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGFzQ29uZmlybWVkUmVjb3JkaW5nID0gJ2NvbmZpcm1lZFJlY29yZGluZycgaW4gdXBkYXRlcztcbiAgICAgICAgdmFyIGhhc1BlbmRpbmdSZWNvcmRpbmcgPSAncGVuZGluZ1JlY29yZGluZycgaW4gdXBkYXRlcztcbiAgICAgICAgaWYgKGhhc0NvbmZpcm1lZFJlY29yZGluZykge1xuICAgICAgICAgICAgc2VsZi5jb25maXJtZWRSZWNvcmRpbmcgPSB1cGRhdGVzLmNvbmZpcm1lZFJlY29yZGluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzUGVuZGluZ1JlY29yZGluZykge1xuICAgICAgICAgICAgc2VsZi5wZW5kaW5nUmVjb3JkaW5nID0gdXBkYXRlcy5wZW5kaW5nUmVjb3JkaW5nO1xuICAgICAgICB9XG4gICAgICAgIHRleHROZWVkc1VwZGF0ZSA9IHRleHROZWVkc1VwZGF0ZSB8fCBoYXNDb25maXJtZWRSZWNvcmRpbmcgfHwgaGFzUGVuZGluZ1JlY29yZGluZztcblxuICAgICAgICBpZiAodGV4dE5lZWRzVXBkYXRlICYmIHNlbGYuc3RhdHVzICE9PSAnZWRpdGluZycpIHtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlX3RleHQoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59O1xuXG5NTVZvaWNlLm9uQ29uZmlnID0gZnVuY3Rpb24oKSB7XG4gICAgTU1Wb2ljZS5fY3VycmVudFRleHRFbnRyaWVzID0gW107XG5cbiAgICB2YXIgdm9pY2VOYXZPcHRpb25zID0gTU1Wb2ljZS5jb25maWc7XG5cbiAgICB2YXIgaW5pdGlhbFRleHQ7XG4gICAgaWYgKHZvaWNlTmF2T3B0aW9ucy5zdGFydFF1ZXJ5ID09PSBudWxsKSB7XG4gICAgICAgIGluaXRpYWxUZXh0ID0gJ0VuYWJsZSB0aGUgbWljcm9waG9uZS4uLic7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpbml0aWFsVGV4dCA9IHZvaWNlTmF2T3B0aW9ucy5zdGFydFF1ZXJ5O1xuICAgIH1cbiAgICAkKCcjaW5pdGlhbFRleHQnKS50ZXh0KGluaXRpYWxUZXh0KTtcblxuICAgIGlmICh2b2ljZU5hdk9wdGlvbnMuc3RhcnRRdWVyeSAhPT0gbnVsbCAmJiAhTU0uc3VwcG9ydC5zcGVlY2hSZWNvZ25pdGlvbikge1xuICAgICAgICAkKCdpbnB1dC5zZWFyY2gnKS52YWwodm9pY2VOYXZPcHRpb25zLnN0YXJ0UXVlcnkpO1xuICAgIH1cblxuICAgIGlmIChNTVZvaWNlLmlzX3ZvaWNlX3JlYWR5ICYmIHZvaWNlTmF2T3B0aW9ucy5zdGFydFF1ZXJ5ICE9PSBudWxsKSB7IC8vIHdlIGhhdmUgaW5pdCBiZWZvcmVcbiAgICAgICAgTU1Wb2ljZS5zdWJtaXRUZXh0KHZvaWNlTmF2T3B0aW9ucy5zdGFydFF1ZXJ5KTtcbiAgICAgICAgTU1Wb2ljZS5fdXBkYXRlVUkoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2YgTU1Wb2ljZS5jb25maWcuYmFzZVpJbmRleCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZhciBiYXNlWkluZGV4ID0gcGFyc2VJbnQoTU1Wb2ljZS5jb25maWcuYmFzZVpJbmRleCk7XG4gICAgICAgICAgICBNTVZvaWNlLiRtbV9idXR0b24uY3NzKCd6LWluZGV4JywgYmFzZVpJbmRleCArIDEwMCk7XG4gICAgICAgICAgICBNTVZvaWNlLiRtbV9idXR0b24uZmluZCgnI2ljb24tbWljcm9waG9uZSwgI2ljb24tbXV0ZSwgI2ljb24tbG9jaycpLmNzcygnei1pbmRleCcsIGJhc2VaSW5kZXggKyAxMCk7XG4gICAgICAgICAgICBNTVZvaWNlLiRtbV9hbGVydC5jc3MoJ3otaW5kZXgnLCBiYXNlWkluZGV4ICsgMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTU1Wb2ljZS5jb25maWcucmVzZXRDYXJkc0NTUykge1xuICAgICAgICAgICAgJCgnI2NhcmRzLWNzcycpLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBNTVZvaWNlLmNvbmZpZy5jdXN0b21DU1NVUkwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB2YXIgY3NzTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgICAgICAgIGNzc0xpbmsuaHJlZiA9IE1NVm9pY2UuY29uZmlnLmN1c3RvbUNTU1VSTDtcbiAgICAgICAgICAgIGNzc0xpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICAgICAgY3NzTGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoY3NzTGluayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIE1NVm9pY2UuY29uZmlnLmN1c3RvbUNTUyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZhciBjc3NTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICBjc3NTdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgICAgIGNzc1N0eWxlLmlubmVySFRNTCA9IE1NVm9pY2UuY29uZmlnLmN1c3RvbUNTUztcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoY3NzU3R5bGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE1NVm9pY2UuY29uZmlnLmNhcmRMYXlvdXQgPT09ICdjdXN0b20nKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIE1NVm9pY2UuY2FyZFRlbXBsYXRlID0gXy50ZW1wbGF0ZShNTVZvaWNlLmNvbmZpZy5jYXJkVGVtcGxhdGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIFVUSUwubG9nKCdWb2ljZSBOYXZpZ2F0b3Igd2FzIHVuYWJsZSB0byBwYXJzZSBjYXJkIHRlbXBsYXRlJyk7XG4gICAgICAgICAgICAgICAgTU1Wb2ljZS5jb25maWcuY2FyZExheW91dCA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBNTV9VU0VSX0lEX1BSRUZJWCA9ICd2bnUnO1xuICAgICAgICB2YXIgTU1fVVNFUl9OQU1FID0gJ1ZvaWNlIE5hdmlnYXRvciBVc2VyJztcbiAgICAgICAgdmFyIE1NX1VTRVJfSURfQ09PS0lFID0gJ3ZvaWNlX25hdmlnYXRvcl91c2VyX2lkJztcblxuICAgICAgICB2YXIgTU1fQ09ORklHID0ge1xuICAgICAgICAgICAgYXBwaWQ6IHZvaWNlTmF2T3B0aW9ucy5hcHBJRCxcbiAgICAgICAgICAgIG9uSW5pdDogb25NTUluaXRcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHR5cGVvZiB2b2ljZU5hdk9wdGlvbnMuY2xlYW5VcmwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBNTV9DT05GSUcuY2xlYW5VcmwgPSB2b2ljZU5hdk9wdGlvbnMuY2xlYW5Vcmw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2b2ljZU5hdk9wdGlvbnMuZmF5ZUNsaWVudFVybCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIE1NX0NPTkZJRy5mYXllQ2xpZW50VXJsID0gdm9pY2VOYXZPcHRpb25zLmZheWVDbGllbnRVcmw7XG4gICAgICAgIH1cbiAgICAgICAgTU0uaW5pdChNTV9DT05GSUcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTU1Jbml0ICgpIHtcbiAgICAgICAgaWYgKHZvaWNlTmF2T3B0aW9ucy5tbUNyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAvLyBObyBuZWVkIHRvIGZldGNoIHRva2VuLCB1c2VyLCBvciBjcmVhdGUgc2Vzc2lvblxuICAgICAgICAgICAgTU0uc2V0VG9rZW4odm9pY2VOYXZPcHRpb25zLm1tQ3JlZGVudGlhbHMudG9rZW4pO1xuICAgICAgICAgICAgTU0uc2V0QWN0aXZlVXNlcklEKHZvaWNlTmF2T3B0aW9ucy5tbUNyZWRlbnRpYWxzLnVzZXJJRCk7XG4gICAgICAgICAgICBNTS5zZXRBY3RpdmVTZXNzaW9uSUQodm9pY2VOYXZPcHRpb25zLm1tQ3JlZGVudGlhbHMuc2Vzc2lvbklEKTtcbiAgICAgICAgICAgIG9uU2Vzc2lvblN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnZXRUb2tlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ3VpZCgpIHtcbiAgICAgICAgcmV0dXJuICgneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICAgIHZhciByID0gTWF0aC5yYW5kb20oKSoxNnwwLCB2ID0gYyA9PSAneCcgPyByIDogKHImMHgzfDB4OCk7XG4gICAgICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRVc2VySUQoKSB7XG4gICAgICAgIC8vIGdldCB1c2VyIGlkIGNvb2tpZVxuICAgICAgICB2YXIgdXNlcklEID0gJC5jb29raWUoTU1fVVNFUl9JRF9DT09LSUUpO1xuICAgICAgICBpZiAodHlwZW9mIHVzZXJJRCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHVzZXJJRCA9IE1NX1VTRVJfSURfUFJFRklYICsgJy0nICsgZ3VpZCgpO1xuICAgICAgICAgICAgJC5jb29raWUoTU1fVVNFUl9JRF9DT09LSUUsIHVzZXJJRCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVzZXJJRDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUb2tlbigpIHtcbiAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgVVRJTC5sb2coJ1N1Y2Nlc3NmdWxseSBnb3QgdG9rZW4nKTtcbiAgICAgICAgICAgIHNldFVzZXIocmVzdWx0LnVzZXIudXNlcmlkKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvbkVycm9yIChlcnJvcikge1xuICAgICAgICAgICAgVVRJTC5sb2coJ1Rva2VuIHdhcyBub3QgdmFsaWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB1c2VySUQgPSBnZXRVc2VySUQoKTtcbiAgICAgICAgTU0uZ2V0VG9rZW4oe1xuICAgICAgICAgICAgYW5vbnltb3VzOiB7XG4gICAgICAgICAgICAgICAgdXNlcmlkOiB1c2VySUQsXG4gICAgICAgICAgICAgICAgbmFtZTogTU1fVVNFUl9OQU1FLFxuICAgICAgICAgICAgICAgIGRvbWFpbjogd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyovXG4gICAgICAgIH0sIG9uU3VjY2Vzcywgb25FcnJvcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0VXNlcih1c2VySUQpIHtcbiAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgY3JlYXRlU2Vzc2lvbigpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IgKGVycm9yKSB7XG4gICAgICAgICAgICBVVElMLmxvZyhcIkVycm9yIHNldHRpbmcgdXNlciBzZXNzaW9uOiAgKFR5cGUgXCIgKyBlcnJvci5jb2RlICtcbiAgICAgICAgICAgICAgICBcIiAtIFwiICsgZXJyb3IudHlwZSArIFwiKTogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBNTS5zZXRBY3RpdmVVc2VySUQodXNlcklELCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNlc3Npb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgIHNldFNlc3Npb24ocmVzdWx0LmRhdGEuc2Vzc2lvbmlkKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvbkVycm9yIChlcnJvcikge1xuICAgICAgICAgICAgVVRJTC5sb2coXCJFcnJvciBjcmVhdGluZyBuZXcgc2Vzc2lvbjogIChUeXBlIFwiICsgZXJyb3IuY29kZSArXG4gICAgICAgICAgICAgICAgXCIgLSBcIiArIGVycm9yLnR5cGUgKyBcIik6IFwiICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB2YXIgc2Vzc2lvbk5hbWUgPSBcIlZvaWNlIE5hdmlnYXRvciAtIFwiICsgZGF0ZS50b1RpbWVTdHJpbmcoKSArIFwiIFwiICsgZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgTU0uYWN0aXZlVXNlci5zZXNzaW9ucy5wb3N0KHtcbiAgICAgICAgICAgIG5hbWU6IHNlc3Npb25OYW1lLFxuICAgICAgICAgICAgcHJpdmFjeW1vZGU6ICdpbnZpdGVvbmx5J1xuICAgICAgICB9LCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFNlc3Npb24oc2Vzc2lvbklEKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IgKGVycm9yKSB7XG4gICAgICAgICAgICBVVElMLmxvZyhcIkVycm9yIHNldHRpbmcgc2Vzc2lvbjogIChUeXBlIFwiICsgZXJyb3IuY29kZSArXG4gICAgICAgICAgICAgICAgXCIgLSBcIiArIGVycm9yLnR5cGUgKyBcIik6IFwiICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgTU0uc2V0QWN0aXZlU2Vzc2lvbklEKHNlc3Npb25JRCwgb25TZXNzaW9uU3RhcnQsIG9uRXJyb3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uU2Vzc2lvblN0YXJ0ICgpIHtcbiAgICAgICAgc3Vic2NyaWJlVG9UZXh0RW50cmllcygpO1xuICAgICAgICBzdWJzY3JpYmVUb0VudGl0aWVzKCk7XG4gICAgICAgIHNldHVwU2Vzc2lvbkxpc3RlbmVyKCk7XG4gICAgICAgIE1NVm9pY2UuaXNfdm9pY2VfcmVhZHkgPSB0cnVlO1xuICAgICAgICBNTVZvaWNlLl91cGRhdGVVSSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1YnNjcmliZVRvVGV4dEVudHJpZXMoKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgIFVUSUwubG9nKFwiU3Vic2NyaWJlZCB0byB0ZXh0IGVudHJpZXMhXCIpO1xuICAgICAgICAgICAgLy8gT3B0aW9uYWxseSBzdWJtaXQgc3RhcnQgcXVlcnlcbiAgICAgICAgICAgIGlmICh2b2ljZU5hdk9wdGlvbnMuc3RhcnRRdWVyeSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIE1NVm9pY2Uuc3VibWl0VGV4dCh2b2ljZU5hdk9wdGlvbnMuc3RhcnRRdWVyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25FcnJvcigpIHtcbiAgICAgICAgICAgIFVUSUwubG9nKFwiRXJyb3Igc3Vic2NyaWJpbmcgdG8gdGV4dCBlbnRyaWVzOiAgKFR5cGUgXCIgKyBlcnJvci5jb2RlICtcbiAgICAgICAgICAgICAgICBcIiAtIFwiICsgZXJyb3IudHlwZSArIFwiKTogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBNTS5hY3RpdmVTZXNzaW9uLnRleHRlbnRyaWVzLm9uVXBkYXRlKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgTU1Wb2ljZS5zZXRUZXh0RW50cmllcyhyZXN1bHQuZGF0YSk7XG4gICAgICAgIH0sIG9uU3VjY2Vzcywgb25FcnJvcik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN1YnNjcmliZVRvRW50aXRpZXMoKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgIFVUSUwubG9nKFwiU3Vic2NyaWJlZCB0byBlbnRpdGllcyFcIik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25FcnJvciAoZXJyb3IpIHtcbiAgICAgICAgICAgIFVUSUwubG9nKFwiRXJyb3Igc3Vic2NyaWJpbmcgdG8gZW50aXRpZXM6ICAoVHlwZSBcIiArIGVycm9yLmNvZGUgK1xuICAgICAgICAgICAgICAgIFwiIC0gXCIgKyBlcnJvci50eXBlICsgXCIpOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIE1NLmFjdGl2ZVNlc3Npb24uZW50aXRpZXMub25VcGRhdGUoZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICBVVElMLmxvZygnUmVjZWl2ZWQgZW50aXRpZXMgdXBkYXRlJyk7XG4gICAgICAgICAgICBNTVZvaWNlLnNldEVudGl0aWVzKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgfSwgb25TdWNjZXNzLCBvbkVycm9yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cFNlc3Npb25MaXN0ZW5lcigpIHtcbiAgICAgICAgTU0uYWN0aXZlU2Vzc2lvbi5zZXRMaXN0ZW5lckNvbmZpZyhNTVZvaWNlLl9saXN0ZW5lckNvbmZpZyk7XG4gICAgfVxufTtcblxuJChmdW5jdGlvbiAoKSB7XG4gICAgTU1Wb2ljZS5pbml0KCk7XG59KTtcblxudmFyIGEgPSB7XG4gICAgc3RyZWFtIDogZmFsc2UsXG4gICAgY29udGV4dCA6IGZhbHNlLFxuICAgIGFuYWx5emVyIDogZmFsc2UsXG4gICAgZnJlcXVlbmNpZXMgOiBmYWxzZSxcbiAgICB0aW1lcyA6IGZhbHNlLFxuICAgIGF1ZGlvX3N0YXJ0ZWQgOiBmYWxzZVxufTtcbmZ1bmN0aW9uIHN0YXJ0Vm9sdW1lTW9uaXRvcigpIHtcbiAgICBpZiAoIWEuYXVkaW9fc3RhcnRlZCkge1xuICAgICAgICAvLyBHRVRVU0VSTUVESUEgSU5QVVRcbiAgICAgICAgbmF2aWdhdG9yLmdldE1lZGlhID0gKG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgfHxcbiAgICAgICAgICAgIG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgfHxcbiAgICAgICAgICAgIG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEgfHxcbiAgICAgICAgICAgIG5hdmlnYXRvci5tc0dldFVzZXJNZWRpYSk7XG4gICAgICAgIHdpbmRvdy5BdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG5cbiAgICAgICAgYS5jb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICAgICAgICBhLmFuYWx5emVyID0gYS5jb250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7XG4gICAgICAgIGEuYW5hbHl6ZXIuc21vb3RoaW5nVGltZUNvbnN0YW50ID0gMC4xODtcbiAgICAgICAgYS5hbmFseXplci5mZnRTaXplID0gMjU2O1xuXG4gICAgICAgIGEuZnJlcXVlbmNpZXMgPSBuZXcgVWludDhBcnJheSggYS5hbmFseXplci5mcmVxdWVuY3lCaW5Db3VudCApO1xuICAgICAgICBhLnRpbWVzID0gbmV3IFVpbnQ4QXJyYXkoIGEuYW5hbHl6ZXIuZnJlcXVlbmN5QmluQ291bnQgKTtcblxuICAgICAgICBuYXZpZ2F0b3IuZ2V0TWVkaWEgKCB7IGF1ZGlvOiB0cnVlIH0sIG1pY3JvcGhvbmVSZWFkeSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBVVElMLmxvZyhcIlRoZSBmb2xsb3dpbmcgZXJyb3Igb2NjdXJlZDogXCIgKyBlcnIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhLmF1ZGlvX3N0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbG9vcCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1pY3JvcGhvbmVSZWFkeShzdHJlYW0pIHtcbiAgICAgICAgYS5zdHJlYW0gPSBzdHJlYW07XG4gICAgICAgIHZhciBzdHJlYW1fc291cmNlID0gYS5jb250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKCBzdHJlYW0gKTtcbiAgICAgICAgc3RyZWFtX3NvdXJjZS5jb25uZWN0KCBhLmFuYWx5emVyICk7XG4gICAgICAgIGxvb3AoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICBpZiAoIU1NVm9pY2Uuc3RhdHVzIHx8IHN0YXR1cyA9PT0gJ2VkaXRpbmcnKSB7XG4gICAgICAgICAgICAvLyBzdG9wIHJlY29yZGluZ1xuICAgICAgICAgICAgYS5zdHJlYW0uc3RvcCgpO1xuICAgICAgICAgICAgYS5hdWRpb19zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBhLmFuYWx5emVyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKCBhLmZyZXF1ZW5jaWVzICk7XG4gICAgICAgIGEuYW5hbHl6ZXIuZ2V0Qnl0ZVRpbWVEb21haW5EYXRhKCBhLnRpbWVzICk7XG5cbiAgICAgICAgTU1Wb2ljZS5wdWxzZShnZXRWb2x1bWUoKSk7XG5cbiAgICAgICAgc2V0VGltZW91dChsb29wLCA3NSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Vm9sdW1lKCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoIGdldEZyZXFlbmN5UmFuZ2UoIDAsIGEuYW5hbHl6ZXIuZnJlcXVlbmN5QmluQ291bnQgLSAxICksIDEwICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RnJlcWVuY3lSYW5nZShmcm9tLCB0bykge1xuICAgICAgICB2YXIgdm9sdW1lID0gMDtcblxuICAgICAgICBmb3IgKCB2YXIgaSA9IGZyb207IGkgPCB0bzsgaSsrICkge1xuICAgICAgICAgICAgdm9sdW1lICs9IGEuZnJlcXVlbmNpZXNbaV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdm9sdW1lIC8gKCB0byAtIGZyb20gKTtcbiAgICB9XG59O1xuIiwicmVxdWlyZSgnLi92ZW5kb3IvY29udGVudGxvYWRlZCcpO1xuXG4vKiBBIHdyYXBwZXIgZm9yIGRvbSBlbGVtZW50cywgYmFzaWNhbGx5IGEgbGl0ZSB2ZXJzaW9uIG9mIGpRdWVyeSdzICQgKi9cbmV4cG9ydHMuZWwgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBmdW5jdGlvbihldmVudCwgZnVuYykge1xuICAgICAgICAgICAgaWYoZWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsZnVuYyxmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoZWwuYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBlbC5hdHRhY2hFdmVudChcIm9uXCIrZXZlbnQsZnVuYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMub24oJ2NsaWNrJywgZnVuYyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAga2V5cHJlc3M6IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgICAgICB0aGlzLm9uKCdrZXlwcmVzcycsIGZ1bmMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoJyhefFxcXFxzKyknICsgY2xhc3NOYW1lICsgJyhcXFxccyt8JCknLCAnZycpLFxuICAgICAgICAgICAgICAgICckMSdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lICsgXCIgXCIgKyBjbGFzc05hbWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnRzLmNvbnZlcnRUb0Fic29sdXRlUGF0aCA9IGZ1bmN0aW9uKGhyZWYpIHtcbiAgICB2YXIgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGFuY2hvci5ocmVmID0gaHJlZjtcbiAgICByZXR1cm4gKGFuY2hvci5wcm90b2NvbCArICcvLycgKyBhbmNob3IuaG9zdCArIGFuY2hvci5wYXRobmFtZSArIGFuY2hvci5zZWFyY2ggKyBhbmNob3IuaGFzaCk7XG59O1xuXG5mdW5jdGlvbiBhZGRMZWFkaW5nWmVyb3MobnVtYmVyLCBkaWdpdHMpIHtcbiAgICB2YXIgYmFzZSA9IE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICAgIG51bWJlciArPSBiYXNlO1xuICAgIG51bWJlciA9IG51bWJlci50b1N0cmluZygpO1xuICAgIHJldHVybiBudW1iZXIuc3Vic3RyaW5nKG51bWJlci5sZW5ndGggLSBkaWdpdHMpO1xufVxuXG5leHBvcnRzLnRpbWVzdGFtcCA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgZGF0ZSA9IGRhdGUgfHwgbmV3IERhdGUoKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0RnVsbFllYXIoKSwgNCkgKyAnLidcbiAgICAgICAgKyBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRNb250aCgpICsgMSwgMikgKyAnLidcbiAgICAgICAgKyBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXREYXRlKCksIDIpICsgJyAnICsgZGF0ZS50b1RpbWVTdHJpbmcoKTtcbn07XG5cbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGFyZ3Muc3BsaWNlKDAsIDAsIGV4cG9ydHMudGltZXN0YW1wKCkpO1xuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xufTtcblxuZXhwb3J0cy5jb250ZW50TG9hZGVkID0gY29udGVudExvYWRlZDsiLCIvKiFcbiAqIGNvbnRlbnRsb2FkZWQuanNcbiAqXG4gKiBBdXRob3I6IERpZWdvIFBlcmluaSAoZGllZ28ucGVyaW5pIGF0IGdtYWlsLmNvbSlcbiAqIFN1bW1hcnk6IGNyb3NzLWJyb3dzZXIgd3JhcHBlciBmb3IgRE9NQ29udGVudExvYWRlZFxuICogVXBkYXRlZDogMjAxMDEwMjBcbiAqIExpY2Vuc2U6IE1JVFxuICogVmVyc2lvbjogMS4yXG4gKlxuICogVVJMOlxuICogaHR0cDovL2phdmFzY3JpcHQubndib3guY29tL0NvbnRlbnRMb2FkZWQvXG4gKiBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vQ29udGVudExvYWRlZC9NSVQtTElDRU5TRVxuICpcbiAqL1xuXG4vLyBAd2luIHdpbmRvdyByZWZlcmVuY2Vcbi8vIEBmbiBmdW5jdGlvbiByZWZlcmVuY2VcbndpbmRvdy5jb250ZW50TG9hZGVkID0gZnVuY3Rpb24gY29udGVudExvYWRlZCh3aW4sIGZuKSB7XG5cblx0dmFyIGRvbmUgPSBmYWxzZSwgdG9wID0gdHJ1ZSxcblxuXHRkb2MgPSB3aW4uZG9jdW1lbnQsIHJvb3QgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuXG5cdGFkZCA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ2F0dGFjaEV2ZW50Jyxcblx0cmVtID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnZGV0YWNoRXZlbnQnLFxuXHRwcmUgPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICcnIDogJ29uJyxcblxuXHRpbml0ID0gZnVuY3Rpb24oZSkge1xuXHRcdGlmIChlLnR5cGUgPT0gJ3JlYWR5c3RhdGVjaGFuZ2UnICYmIGRvYy5yZWFkeVN0YXRlICE9ICdjb21wbGV0ZScpIHJldHVybjtcblx0XHQoZS50eXBlID09ICdsb2FkJyA/IHdpbiA6IGRvYylbcmVtXShwcmUgKyBlLnR5cGUsIGluaXQsIGZhbHNlKTtcblx0XHRpZiAoIWRvbmUgJiYgKGRvbmUgPSB0cnVlKSkgZm4uY2FsbCh3aW4sIGUudHlwZSB8fCBlKTtcblx0fSxcblxuXHRwb2xsID0gZnVuY3Rpb24oKSB7XG5cdFx0dHJ5IHsgcm9vdC5kb1Njcm9sbCgnbGVmdCcpOyB9IGNhdGNoKGUpIHsgc2V0VGltZW91dChwb2xsLCA1MCk7IHJldHVybjsgfVxuXHRcdGluaXQoJ3BvbGwnKTtcblx0fTtcblxuXHRpZiAoZG9jLnJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJykgZm4uY2FsbCh3aW4sICdsYXp5Jyk7XG5cdGVsc2Uge1xuXHRcdGlmIChkb2MuY3JlYXRlRXZlbnRPYmplY3QgJiYgcm9vdC5kb1Njcm9sbCkge1xuXHRcdFx0dHJ5IHsgdG9wID0gIXdpbi5mcmFtZUVsZW1lbnQ7IH0gY2F0Y2goZSkgeyB9XG5cdFx0XHRpZiAodG9wKSBwb2xsKCk7XG5cdFx0fVxuXHRcdGRvY1thZGRdKHByZSArICdET01Db250ZW50TG9hZGVkJywgaW5pdCwgZmFsc2UpO1xuXHRcdGRvY1thZGRdKHByZSArICdyZWFkeXN0YXRlY2hhbmdlJywgaW5pdCwgZmFsc2UpO1xuXHRcdHdpblthZGRdKHByZSArICdsb2FkJywgaW5pdCwgZmFsc2UpO1xuXHR9XG5cbn1cbiJdfQ==
