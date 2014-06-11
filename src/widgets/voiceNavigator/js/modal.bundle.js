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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL21vZGFsLmpzIiwiL1VzZXJzL2pqL0RvY3VtZW50cy9Db2RlL2V4cGVjdC1sYWJzL21pbmRtZWxkLWpzLXNkay9zcmMvd2lkZ2V0cy92b2ljZU5hdmlnYXRvci9qcy91dGlsLmpzIiwiL1VzZXJzL2pqL0RvY3VtZW50cy9Db2RlL2V4cGVjdC1sYWJzL21pbmRtZWxkLWpzLXNkay9zcmMvd2lkZ2V0cy92b2ljZU5hdmlnYXRvci9qcy92ZW5kb3IvY29udGVudGxvYWRlZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcDZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFVUSUwgPSAgcmVxdWlyZSgnLi91dGlsJyk7XG5cbi8qIE1hbmFnZSB0aGUgc3RhdGUgb2YgdGhlIFVJICovXG52YXIgTU1Wb2ljZSA9IHtcbiAgICBpc19pbml0IDogZmFsc2UsXG4gICAgaXNfbG9ja2VkIDogZmFsc2UsXG4gICAgX2xvY2tXaGlsZVJlY29yZGluZzogZmFsc2UsXG4gICAgc3RhdHVzIDogZmFsc2UsXG4gICAgaXNfZmlyc3Rfc3RhcnQgOiB0cnVlLFxuICAgIGlzX3Jlc3VsdHMgOiBmYWxzZSxcblxuICAgIGlzX3ZvaWNlX3JlYWR5ICA6IGZhbHNlLFxuXG4gICAgY29uZmlnOiB7fSxcblxuICAgIF9yZWNvcmRpbmdzOiBbXSxcbiAgICByZWNvcmRpbmdzX2xlbmd0aDogMCxcbiAgICBjb25maXJtZWRSZWNvcmRpbmcgOiB7fSxcbiAgICBwZW5kaW5nUmVjb3JkaW5nIDoge30sXG4gICAgc2VsZWN0ZWRFbnRpdHlNYXAgOiB7fSxcbiAgICBjdXJyZW50RW50aXRpZXM6IFtdLFxuICAgIHJlc3VsdHNfbGVuZ3RoIDogLTEsXG4gICAgX2VudGl0eU1hcCA6IHt9LFxuICAgIF9zaW1pbGFyRW50aXR5TWFwIDoge30sXG4gICAgX3RleHRFbnRyeU1hcDoge30sXG4gICAgX2N1cnJlbnRUZXh0RW50cmllczogW10sXG4gICAgX2hlaWdodCA6IDAsXG5cbiAgICAkYm9keSA6ICQoKSxcblxuICAgICR3aW5kb3cgOiAkKCksXG4gICAgJGNhcmRzIDogJCgpLFxuICAgICRtbSA6ICQoKSxcbiAgICAkbW1fcGFyZW50IDogJCgpLFxuICAgICRtbV9jbG9zZSA6ICQoKSxcbiAgICAkbW1fYnV0dG9uIDogJCgpLFxuICAgICRtbV9idXR0b25faWNvbiA6ICQoKSxcbiAgICAkbW1fcHVsc2VyIDogJCgpLFxuICAgICRtbV9hbGVydCA6ICQoKSxcbiAgICAkbW1fYWxlcnRfZGlzbWlzcyA6ICQoKSxcbiAgICAkdGFncyA6ICQoKSxcbiAgICAkaGlzdG9yeSA6ICQoKSxcbiAgICAkaGlzdG9yeUxpc3QgOiAkKCksXG4gICAgJHJlc3VsdHMgOiAkKCksXG4gICAgJGhpc3RvcnlEYXRhIDogJCgpLFxuICAgICRoaXN0b3J5QnV0dG9uIDogJCgpLFxuXG4gICAgJGVkaXRhYmxlIDogJCgpLFxuXG4gICAgJGlucHV0IDogJCgpLFxuXG4gICAgLy8gVE9ETzogZmlndXJlIG91dCBhIGJldHRlciBuYW1lIGZvciB0aGlzXG4gICAgbWFrZU5ld1JlY29yZGluZ3MgOiBmdW5jdGlvbihjb25maXJtZWRUcmFuc2NyaXB0KSB7XG4gICAgICAgIHZhciBwcmV2aW91c1RyYW5zY3JpcHQgPSB0aGlzLmNvbmZpcm1lZFJlY29yZGluZy50cmFuc2NyaXB0IHx8ICcnO1xuICAgICAgICBpZiAocHJldmlvdXNUcmFuc2NyaXB0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kSGlzdG9yeSh0aGlzLmNvbmZpcm1lZFJlY29yZGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maXJtZWRSZWNvcmRpbmcgPSB0aGlzLl9uZXdSZWNvcmRpbmcoY29uZmlybWVkVHJhbnNjcmlwdCk7XG4gICAgICAgIHRoaXMucGVuZGluZ1JlY29yZGluZyA9IHRoaXMuX25ld1JlY29yZGluZygpO1xuICAgIH0sXG5cbiAgICBfbmV3UmVjb3JkaW5nIDogZnVuY3Rpb24odHJhbnNjcmlwdCkge1xuICAgICAgICB0cmFuc2NyaXB0ID0gdHJhbnNjcmlwdCB8fCAnJztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRyYW5zY3JpcHQ6IHRyYW5zY3JpcHQsXG4gICAgICAgICAgICB0ZXh0RW50cnlJRDogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgaW5pdCA6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy4kYm9keSA9ICQoJ2JvZHknKTtcblxuICAgICAgICB0aGlzLiR3aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgICAgIHRoaXMuJG1tID0gJCgnI21pbmRtZWxkJyk7XG4gICAgICAgIHRoaXMuJG1tX2J1dHRvbiA9ICQoJyNtbS1idXR0b24nKTtcbiAgICAgICAgdGhpcy4kbW1fY2xvc2UgPSAkKCcjY2xvc2UsICNtaW5kbWVsZC1vdmVybGF5Jyk7XG4gICAgICAgIHRoaXMuJG1tX3B1bHNlciA9ICQoJyNtbS1wdWxzZXInKTtcbiAgICAgICAgdGhpcy4kbW1fYnV0dG9uX2ljb24gPSAkKCcjbW0tYnV0dG9uLWljb24nKTtcbiAgICAgICAgdGhpcy4kbW1fcGFyZW50ID0gJCgnI21pbmRtZWxkLXBhcmVudCcpO1xuICAgICAgICB0aGlzLiRtbV9hbGVydF9kaXNtaXNzID0gJCgnI21tLWFsZXJ0LWRpc21pc3MnKTtcbiAgICAgICAgdGhpcy4kbW1fYWxlcnQgPSAkKCcjbWluZG1lbGQtYWxlcnQnKTtcbiAgICAgICAgdGhpcy4kY2FyZHMgPSAkKCcjY2FyZHMnKTtcbiAgICAgICAgdGhpcy4kdGFncyA9ICQoJyN0YWdzJyk7XG4gICAgICAgIHRoaXMuJGhpc3RvcnkgPSAkKCcjaGlzdG9yeScpO1xuICAgICAgICB0aGlzLiRoaXN0b3J5TGlzdCA9IHRoaXMuJGhpc3RvcnkuZmluZCgndWwnKTtcbiAgICAgICAgdGhpcy4kaW5wdXQgPSB0aGlzLiRoaXN0b3J5TGlzdC5maW5kKCcub24nKTtcbiAgICAgICAgdGhpcy4kcmVzdWx0cyA9ICQoJyNyZXN1bHRzJyk7XG4gICAgICAgIHRoaXMuJGhpc3RvcnlEYXRhID0gJCgnI2hpc3RvcnktZGF0YScpO1xuICAgICAgICB0aGlzLiRoaXN0b3J5QnV0dG9uID0gJCgnI2hpc3RvcnktYnV0dG9uJyk7XG5cbiAgICAgICAgdGhpcy4kZWRpdGFibGUgPSAkKCcuZWRpdGFibGUnKTtcblxuICAgICAgICB0aGlzLm1ha2VOZXdSZWNvcmRpbmdzKCk7XG5cbiAgICAgICAgLy8gTWFrZSB0YWdzIGNsaWNrYWJsZVxuICAgICAgICBmdW5jdGlvbiBvblRhZ0NsaWNrKCkge1xuICAgICAgICAgICAgdmFyIGVudGl0eUlEID0gJCh0aGlzKS5kYXRhKCdlbnRpdHlJZCcpO1xuICAgICAgICAgICAgc2VsZi50b2dnbGVFbnRpdHlTZWxlY3RlZChlbnRpdHlJRCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kdGFncy5vbignY2xpY2snLCAnLnRhZycsIG9uVGFnQ2xpY2spO1xuICAgICAgICB0aGlzLiRoaXN0b3J5TGlzdC5vbignY2xpY2snLCAnLnRhZycsIG9uVGFnQ2xpY2spO1xuXG4gICAgICAgIC8vIFNjcm9sbGJhcnNcbiAgICAgICAgJCgnLmlubmVyLWNvbnRlbnQtZGl2Jykuc2xpbVNjcm9sbCh7XG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgIGRpc3RhbmNlOiAnNnB4J1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZXNpemVcbiAgICAgICAgc2VsZi4kd2luZG93Lm9uKCdyZXNpemUnLCBmdW5jdGlvbigpeyBzZWxmLnJlc2l6ZSgpOyB9KTtcbiAgICAgICAgc2VsZi5yZXNpemUoKTtcblxuICAgICAgICBzZWxmLnNldHVwRWRpdGFibGUodHJ1ZSk7IC8vIHRydWUgPSBhbGxvdyB0eXBpbmcgaW50byB0aGUgYm94XG5cbiAgICAgICAgLy8gQWxlcnQgZGlzbWlzc1xuICAgICAgICBzZWxmLiRtbV9hbGVydF9kaXNtaXNzLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHNlbGYuJG1tX2FsZXJ0LnJlbW92ZUNsYXNzKCdvbicpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBIaXN0b3J5IGJ1dHRvblxuICAgICAgICBzZWxmLiRoaXN0b3J5QnV0dG9uLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gVG9nZ2xlIHRoZSBvcGVuL2Nsb3NlZC1uZXNzIG9mIGhpc3RvcnlcbiAgICAgICAgICAgIHZhciBoaXN0b3J5X29wZW4gPSBzZWxmLiRoaXN0b3J5Lmhhc0NsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICBzZWxmLiRoaXN0b3J5LnRvZ2dsZUNsYXNzKCdvcGVuJywgIWhpc3Rvcnlfb3Blbik7XG5cbiAgICAgICAgICAgIGlmKCFoaXN0b3J5X29wZW4pIHtcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gc2VsZi5faGlzdG9yeUhlaWdodChzZWxmLiRoaXN0b3J5RGF0YVswXS5zY3JvbGxIZWlnaHQpO1xuICAgICAgICAgICAgICAgIHNlbGYuJGhpc3RvcnkuY3NzKHNlbGYuX3ByZWZpeCgndHJhbnNmb3JtJyksICd0cmFuc2xhdGVZKCcrc2Nyb2xsSGVpZ2h0KydweCknKTtcbiAgICAgICAgICAgICAgICBzZWxmLiRoaXN0b3J5QnV0dG9uLnRleHQoJ0Nsb3NlIEhpc3RvcnknKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kaGlzdG9yeS5jc3Moc2VsZi5fcHJlZml4KCd0cmFuc2Zvcm0nKSwgJycpO1xuICAgICAgICAgICAgICAgIHNlbGYuJGhpc3RvcnlCdXR0b24udGV4dCgnRXhwYW5kIEhpc3RvcnknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU25hcCB0byB0aGUgYm90dG9tXG4gICAgICAgICAgICBzZWxmLnNjcm9sbEhpc3RvcnkoKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvLyBMaXN0ZW4gdG8gcG9zdCBtZXNzYWdlc1xuICAgICAgICAkKHdpbmRvdykub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gZXZlbnQuZGF0YS5hY3Rpb247XG4gICAgICAgICAgICBpZiAoZXZlbnQuZGF0YS5zb3VyY2UgIT0gJ21pbmRtZWxkJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2NvbmZpZycpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZyA9IGV2ZW50LmRhdGEuZGF0YTtcbiAgICAgICAgICAgICAgICBzZWxmLm9uQ29uZmlnKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWN0aW9uID09PSAnb3BlbicpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRtbV9wYXJlbnQuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5jb25maWcuc3RhcnRRdWVyeSA9PT0gbnVsbCAmJiBzZWxmLmNvbmZpZy5saXN0ZW5pbmdNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2RvX29uX3ZvaWNlX3JlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTU1Wb2ljZS5saXN0ZW4oc2VsZi5jb25maWcubGlzdGVuaW5nTW9kZSA9PSAnY29udGludW91cycpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENsb3NlIHRoZSBtb2RhbFxuICAgICAgICBzZWxmLiRtbV9jbG9zZS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBzZWxmLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghTU0uc3VwcG9ydC5zcGVlY2hSZWNvZ25pdGlvbikge1xuICAgICAgICAgICAgc2VsZi4kbW1fYnV0dG9uLmhpZGUoKTtcbiAgICAgICAgICAgIHNlbGYuJG1tX3B1bHNlci5oaWRlKCk7XG4gICAgICAgICAgICBzZWxmLiRpbnB1dC5oaWRlKCk7XG5cbiAgICAgICAgICAgIHNlbGYuJGJvZHkuYWRkQ2xhc3MoJ25vLXNwZWVjaCcpO1xuXG4gICAgICAgICAgICB2YXIgJHRleHRfaW5wdXQgPSAkKCc8bGk+JywgeydjbGFzcyc6J3RleHQtaW5wdXQnfSk7XG4gICAgICAgICAgICB2YXIgJGZvcm0gPSAkKCc8Zm9ybT4nKTtcbiAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKCc8aW5wdXQ+Jywge1xuICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICBjbGFzczogJ3NlYXJjaCcsXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdTZWFyY2ggcXVlcnknXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciAkYnV0dG9uID0gJCgnPGJ1dHRvbj4nLCB7XG4gICAgICAgICAgICAgICAgaHRtbDogJyZuYnNwOzxzcGFuPjwvc3Bhbj4nLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICAgICAgICAgIGNsYXNzOiAnbW0tYnV0dG9uLWJhY2tncm91bmQgbW0tYnV0dG9uLWJvcmRlcidcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkZm9ybS5zdWJtaXQoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICRpbnB1dC52YWwoKTtcblxuICAgICAgICAgICAgICAgICRpbnB1dC52YWwoXCJcIikuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAkaW5wdXQuYXR0cihcInBsYWNlaG9sZGVyXCIsIHRleHQpO1xuICAgICAgICAgICAgICAgIHNlbGYuYXBwZW5kSGlzdG9yeSh7dHJhbnNjcmlwdDogdGV4dH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gU3VibWl0IVxuICAgICAgICAgICAgICAgIHNlbGYuc3VibWl0VGV4dCh0ZXh0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkdGV4dF9pbnB1dC5hcHBlbmQoJGZvcm0pO1xuICAgICAgICAgICAgJGZvcm0uYXBwZW5kKCRpbnB1dCk7XG4gICAgICAgICAgICAkZm9ybS5hcHBlbmQoJGJ1dHRvbik7XG4gICAgICAgICAgICBzZWxmLiRoaXN0b3J5TGlzdC5hcHBlbmQoJHRleHRfaW5wdXQpO1xuXG4gICAgICAgICAgICAkaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJ1dHRvbiBBY3Rpb25zXG4gICAgICAgIHZhciBidXR0b25fc3RhdHVzID0ge1xuICAgICAgICAgICAgbW91c2Vkb3duIDogZmFsc2UsXG4gICAgICAgICAgICBsb2NrZWQgOiBmYWxzZSxcbiAgICAgICAgICAgIGp1c3RfbG9ja2VkIDogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuJG1tX2J1dHRvbl9pY29uLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBidXR0b25fc3RhdHVzLm1vdXNlZG93biA9IHRydWU7XG4gICAgICAgICAgICBidXR0b25fc3RhdHVzLmp1c3RfbG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKGJ1dHRvbl9zdGF0dXMubW91c2Vkb3duKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbl9zdGF0dXMubG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uX3N0YXR1cy5qdXN0X2xvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGlzdGVuKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYuJG1tX2J1dHRvbl9pY29uLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnV0dG9uX3N0YXR1cy5tb3VzZWRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgIGlmKCFidXR0b25fc3RhdHVzLmxvY2tlZCkge1xuICAgICAgICAgICAgICAgIHNlbGYubGlzdGVuKGZhbHNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoYnV0dG9uX3N0YXR1cy5sb2NrZWQgJiYgIWJ1dHRvbl9zdGF0dXMuanVzdF9sb2NrZWQpIHtcbiAgICAgICAgICAgICAgICBidXR0b25fc3RhdHVzLmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJ1dHRvbl9zdGF0dXMubW91c2Vkb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZi5saXN0ZW4oZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBidXR0b25fc3RhdHVzLmp1c3RfbG9ja2VkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNsaWNraW5nIGRvY3VtZW50c1xuICAgICAgICB0aGlzLiRjYXJkcy5vbignY2xpY2snLCAnLmNhcmQnLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy5wcmV2ZW50TGlua3MpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhpcy5pc19pbml0ID0gdHJ1ZTtcblxuICAgIH0sXG5cbiAgICBjbG9zZSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuc3RvcExpc3RlbmluZygpO1xuICAgICAgICBzZWxmLiRtbV9wYXJlbnQucmVtb3ZlQ2xhc3MoJ29wZW4gcmVzdWx0cycpO1xuICAgICAgICBzZWxmLiRib2R5LnJlbW92ZUNsYXNzKCdyZXN1bHRzJyk7XG4gICAgICAgIHNlbGYuaXNfcmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICBzZWxmLnJlc3VsdHNfbGVuZ3RoID0gLTE7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKCdjbG9zZScpO1xuICAgICAgICB9LCA1MDApO1xuICAgIH0sXG5cbiAgICBfZG9fb25fdm9pY2VfcmVhZHkgOiBmdW5jdGlvbihmbikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmKHNlbGYuaXNfdm9pY2VfcmVhZHkpIHtcbiAgICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmRvX29uX3ZvaWNlX3JlYWR5X2ZuID0gZm47XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbGlzdGVuIDogZnVuY3Rpb24obG9jaykge1xuICAgICAgICBpZighTU0uc3VwcG9ydC5zcGVlY2hSZWNvZ25pdGlvbikgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHN0YXR1c0lzUGVuZGluZyA9IChzZWxmLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKTtcbiAgICAgICAgdmFyIHN0YXR1c0lzTGlzdGVuaW5nPSAoc2VsZi5zdGF0dXMgPT09ICdsaXN0ZW5pbmcnKTtcbiAgICAgICAgaWYgKCFsb2NrKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzSXNQZW5kaW5nIHx8IHN0YXR1c0lzTGlzdGVuaW5nKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zdG9wTGlzdGVuaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRMaXN0ZW5pbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghc2VsZi5pc19sb2NrZWQgJiYgKHN0YXR1c0lzUGVuZGluZyB8fCBzdGF0dXNJc0xpc3RlbmluZykpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9sb2NrV2hpbGVSZWNvcmRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNlbGYuaXNfbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5pc19sb2NrZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnN0b3BMaXN0ZW5pbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zdGFydExpc3RlbmluZyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVVSSgpO1xuICAgIH0sXG5cbiAgICBwdWxzZSA6IGZ1bmN0aW9uKHZvbHVtZSkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBzY2FsZSA9ICgodm9sdW1lIC8gMTAwKSAqIDAuNSkgKyAxLjQ7XG4gICAgICAgIHNlbGYuJG1tX3B1bHNlci5jc3MoJ3RyYW5zZm9ybScsICdzY2FsZSgnICsgc2NhbGUgKyAnKScpO1xuICAgIH0sXG5cbiAgICBwb3N0TWVzc2FnZSA6IGZ1bmN0aW9uKGFjdGlvbiwgZGF0YSkge1xuICAgICAgICBwYXJlbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBzb3VyY2U6ICdtaW5kbWVsZCcsXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0sIFwiKlwiKTtcbiAgICB9LFxuXG4gICAgX2hpc3RvcnlIZWlnaHQgOiBmdW5jdGlvbihzY3JvbGxIZWlnaHQpIHtcbiAgICAgICAgaWYoc2Nyb2xsSGVpZ2h0ID4gdGhpcy5faGVpZ2h0ICogMC44KSBzY3JvbGxIZWlnaHQgPSB0aGlzLl9oZWlnaHQgKiAwLjg7XG4gICAgICAgIGlmKHNjcm9sbEhlaWdodCA8IDI3MCkgc2Nyb2xsSGVpZ2h0ID0gMjcwO1xuICAgICAgICByZXR1cm4gc2Nyb2xsSGVpZ2h0O1xuICAgIH0sXG5cbiAgICBzZXR1cEVkaXRhYmxlIDogZnVuY3Rpb24oYWxsb3dNYW51YWxFbnRyeSkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuJGhpc3RvcnlMaXN0Lm9uKCdjbGljaycsICcub24gLnRhZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBlbnRpdHlJRCA9ICR0aGlzLmRhdGEoJ2VudGl0eUlkJyk7XG4gICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSAhKCEhc2VsZi5zZWxlY3RlZEVudGl0eU1hcFtlbnRpdHlJRF0pO1xuICAgICAgICAgICAgJHRoaXMudG9nZ2xlQ2xhc3MoJ3NlbGVjdGVkJywgbmV3VmFsdWUpO1xuXG4gICAgICAgICAgICAvLyBkb24ndCBmb2N1cyBvbiB0ZXh0XG4gICAgICAgICAgICBzZWxmLiRlZGl0YWJsZS5ibHVyKCk7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoc2VsZi5fdGV4dEZvY3VzVGltZW91dCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gZG9uJ3QgYnViYmxlIHVwXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYuJGVkaXRhYmxlLmhpZGUoKTtcblxuICAgICAgICBpZiAoYWxsb3dNYW51YWxFbnRyeSkge1xuXG4gICAgICAgICAgICBzZWxmLiRoaXN0b3J5TGlzdC5vbignY2xpY2snLCAnLm9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gTm90IGFscmVhZHkgZG9pbmcgc29tZXRoaW5nLCBhbmQgbm90IGEgcHJvbXB0XG4gICAgICAgICAgICAgICAgdmFyICRwcm9tcHQgPSBzZWxmLiRpbnB1dC5maW5kKCcubW0tcHJvbXB0Jyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuc3RhdHVzICYmICgkcHJvbXB0Lmhhc0NsYXNzKCdtbS1wcm9tcHQtZXJyb3InKSB8fCAhJHByb21wdC5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVkaXRhYmxlLmhlaWdodChzZWxmLiRpbnB1dC5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGlucHV0LmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgJHByb21wdC5lbXB0eSgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IHNlbGYuJGlucHV0LnRleHQoKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVkaXRhYmxlLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWRpdGFibGUuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWRpdGFibGUudmFsKHRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLiRlZGl0YWJsZS5mb2N1c2luKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICghc2VsZi5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVsYXkgc28gd2Uga25vdyBpdCdzIG5vdCBhbiBlbnRpdHkgY2xpY2tcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fdGV4dEZvY3VzVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXR1cyA9ICdlZGl0aW5nJztcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlZGl0YWJsZS5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLiRlZGl0YWJsZS5mb2N1c291dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRlZGl0YWJsZS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgc2VsZi4kaW5wdXQuc2hvdygpO1xuICAgICAgICAgICAgICAgIHNlbGYuc3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2VsZi4kZWRpdGFibGUua2V5cHJlc3MoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5Q29kZSA9IGUub3JpZ2luYWxFdmVudC5rZXlDb2RlO1xuICAgICAgICAgICAgICAgIGlmIChrZXlDb2RlICE9PSAxMykge1xuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgc3R5bGluZz9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFVzZXIgcHJlc3NlZCByZXR1cm5cbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IHNlbGYuJGVkaXRhYmxlLnZhbCgpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICBzZWxmLiRlZGl0YWJsZS5ibHVyKCk7XG4gICAgICAgICAgICAgICAgc2VsZi4kaW5wdXQudGV4dCh0ZXh0KTtcbiAgICAgICAgICAgICAgICBzZWxmLnN1Ym1pdFRleHQodGV4dCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfcHJlZml4X3JhdyA6ICcnLFxuICAgIF9wcmVmaXggOiBmdW5jdGlvbihydWxlKSB7XG4gICAgICAgIGlmKCF0aGlzLl9wcmVmaXhfcmF3KSB7XG4gICAgICAgICAgICB2YXIgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnJyksXG4gICAgICAgICAgICAgICAgcHJlID0gKEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgICAgICAgICAgICAgICAuY2FsbChzdHlsZXMpXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKCcnKVxuICAgICAgICAgICAgICAgICAgICAubWF0Y2goLy0obW96fHdlYmtpdHxtcyktLykgfHwgKHN0eWxlcy5PTGluayA9PT0gJycgJiYgWycnLCAnbyddKVxuICAgICAgICAgICAgICAgICAgICApWzFdO1xuICAgICAgICAgICAgdGhpcy5fcHJlZml4X3JhdyA9IChwcmUgPyAnLScgKyBwcmUgKyAnLScgOiAnJykgKyBydWxlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmVmaXhfcmF3O1xuICAgIH0sXG5cbiAgICBzdWJtaXRUZXh0OiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5zdGF0dXMgPSBmYWxzZTtcblxuICAgICAgICB2YXIgcmVjb3JkaW5nID0gc2VsZi5jb25maXJtZWRSZWNvcmRpbmc7XG4gICAgICAgIGlmIChyZWNvcmRpbmcudGV4dEVudHJ5SUQpIHtcbiAgICAgICAgICAgIE1NLmFjdGl2ZVNlc3Npb24udGV4dGVudHJpZXMuZGVsZXRlKHJlY29yZGluZy50ZXh0RW50cnlJRCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVjb3JkaW5nLnRyYW5zY3JpcHQgPSB0ZXh0O1xuICAgICAgICBzZWxmLiRjYXJkcy5hZGRDbGFzcygnbG9hZGluZycpO1xuICAgICAgICBNTS5hY3RpdmVTZXNzaW9uLnRleHRlbnRyaWVzLnBvc3Qoe1xuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIHdlaWdodDogMS4wXG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgc2VsZi5vblRleHRFbnRyeVBvc3RlZChyZXNwb25zZSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICByZXNpemVSZXN1bHRzOiBmdW5jdGlvbihzaXplKSB7XG4gICAgIHRoaXMuX2hlaWdodCA9IHNpemU7XG4gICAgIHRoaXMuJHJlc3VsdHMub3V0ZXJIZWlnaHQoc2l6ZSk7XG4gICAgIHRoaXMuJGhpc3Rvcnkub3V0ZXJIZWlnaHQodGhpcy5faGlzdG9yeUhlaWdodChzaXplKSk7XG4gICAgIH0sXG4gICAgICovXG5cbiAgICBsb2NrV2hpbGVSZWNvcmRpbmcgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5pc19sb2NrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9sb2NrV2hpbGVSZWNvcmRpbmcgPSBmYWxzZTtcbiAgICAgICAgTU0uYWN0aXZlU2Vzc2lvbi5zZXRMaXN0ZW5lckNvbmZpZyh7ICdjb250aW51b3VzJzogdGhpcy5pc19sb2NrZWQgfSk7XG4gICAgfSxcblxuICAgIHN0YXJ0TGlzdGVuaW5nIDogZnVuY3Rpb24oaXNfbG9ja2VkKSB7XG4gICAgICAgIHRoaXMuaXNfbG9ja2VkID0gISFpc19sb2NrZWQ7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gJ3BlbmRpbmcnO1xuICAgICAgICB0aGlzLmlzX2ZpcnN0X3N0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY3VycmVudFRleHRFbnRyaWVzID0gW107XG4gICAgICAgIE1NLmFjdGl2ZVNlc3Npb24uc2V0TGlzdGVuZXJDb25maWcoeyAnY29udGludW91cyc6IHRoaXMuaXNfbG9ja2VkIH0pO1xuICAgICAgICBNTS5hY3RpdmVTZXNzaW9uLmxpc3RlbmVyLnN0YXJ0KCk7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlVUkoKTtcbiAgICB9LFxuXG4gICAgc3RvcExpc3RlbmluZyA6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZihNTS5zdXBwb3J0LnNwZWVjaFJlY29nbml0aW9uKSB7XG4gICAgICAgICAgICBNTS5hY3RpdmVTZXNzaW9uLmxpc3RlbmVyLmNhbmNlbCgpO1xuICAgICAgICAgICAgdGhpcy5pc19sb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVVSSgpO1xuICAgIH0sXG5cbiAgICBzaG93UmVzdWx0cyA6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdGhpcy5yZXN1bHRzX2xlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgICAgICB0aGlzLl91cGRhdGVDYXJkcyhkYXRhKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlVUkoKTtcbiAgICB9LFxuXG4gICAgc2V0VGV4dEVudHJpZXMgOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgJC5lYWNoKGRhdGEsIGZ1bmN0aW9uKGssIHRleHRFbnRyeSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxmLl90ZXh0RW50cnlNYXBbdGV4dEVudHJ5LnRleHRlbnRyeWlkXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0ZXh0RW50cnkuZW50aXR5SURzID0gW107XG4gICAgICAgICAgICAgICAgc2VsZi5fdGV4dEVudHJ5TWFwW3RleHRFbnRyeS50ZXh0ZW50cnlpZF0gPSB0ZXh0RW50cnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB0b2dnbGVFbnRpdHlTZWxlY3RlZCA6IGZ1bmN0aW9uKGVudGl0eUlEKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB2YXIgZW50aXR5VGV4dCA9IHNlbGYuX2VudGl0eU1hcFtlbnRpdHlJRF0udGV4dDtcbiAgICAgICAgdmFyIHNpbWlsYXJFbnRpdGllcyA9IHNlbGYuX3NpbWlsYXJFbnRpdHlNYXBbZW50aXR5VGV4dF07XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gc2ltaWxhckVudGl0aWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNpbWlsYXJFbnRpdHlJRCA9IHNpbWlsYXJFbnRpdGllc1tpXTtcbiAgICAgICAgICAgIHZhciAkdGFnc1RvVG9nZ2xlID0gJCgnLnRhZ1tkYXRhLWVudGl0eS1pZD1cIicgKyBzaW1pbGFyRW50aXR5SUQgKyAnXCJdJyk7XG4gICAgICAgICAgICBpZiAoc2VsZi5zZWxlY3RlZEVudGl0eU1hcFtzaW1pbGFyRW50aXR5SURdKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHNlbGYuc2VsZWN0ZWRFbnRpdHlNYXBbc2ltaWxhckVudGl0eUlEXTtcbiAgICAgICAgICAgICAgICAkdGFnc1RvVG9nZ2xlLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkRW50aXR5TWFwW3NpbWlsYXJFbnRpdHlJRF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICR0YWdzVG9Ub2dnbGUuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLl91cGRhdGVVSSgpO1xuICAgICAgICBzZWxmLmdldERvY3VtZW50cygpO1xuICAgIH0sXG5cbiAgICBzZXRFbnRpdGllcyA6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgaSA9IDA7XG5cbiAgICAgICAgc2VsZi4kdGFncy5lbXB0eSgpO1xuICAgICAgICBzZWxmLl9zaW1pbGFyRW50aXR5TWFwID0ge307XG5cbiAgICAgICAgJC5lYWNoKGRhdGEsIGZ1bmN0aW9uKGssIGVudGl0eSkge1xuICAgICAgICAgICAgaWYgKGVudGl0eS5lbnRpdHl0eXBlID09PSAnc2VnbWVudCcgfHxcbiAgICAgICAgICAgICAgICBlbnRpdHkuZW50aXR5dHlwZSA9PT0gJ2tleXBocmFzZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGlnbm9yZSB0aGVzZSBlbnRpdGllc1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdGV4dCA9IGVudGl0eS50ZXh0O1xuICAgICAgICAgICAgaWYgKHRleHQuc3BsaXQoJyAnKS5sZW5ndGggPiAxMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gaWdub3JlIGxvbmcgZW50aXRpZXNcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNlbGYuX2N1cnJlbnRUZXh0RW50cmllcy5pbmRleE9mKGVudGl0eS50ZXh0ZW50cnlpZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBpZ25vcmUgZW50aXRpZXMgZnJvbSBwYXN0IHRleHQgZW50cmllc1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdGV4dEVudHJ5ID0gc2VsZi5fdGV4dEVudHJ5TWFwW2VudGl0eS50ZXh0ZW50cnlpZF07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRleHRFbnRyeSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0ZXh0RW50cnkuZW50aXR5SURzLnB1c2goZW50aXR5LmVudGl0eWlkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgVVRJTC5sb2coJ2RpZCBub3QgZmluZCB0ZXh0IGVudHJ5IGZvciBlbnRpdHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuX2VudGl0eU1hcFtlbnRpdHkuZW50aXR5aWRdID0gZW50aXR5O1xuXG4gICAgICAgICAgICAvLyBUT0RPKGpqKTogc2hvdWxkIHdlIGxvb2sgYXQgdHlwZSBoZXJlIGFzIHdlbGwgYXMgdGV4dFxuICAgICAgICAgICAgdmFyIHNpbWlsYXJFbnRpdGllcyA9IHNlbGYuX3NpbWlsYXJFbnRpdHlNYXBbZW50aXR5LnRleHRdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzaW1pbGFyRW50aXRpZXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2ltaWxhckVudGl0aWVzID0gc2VsZi5fc2ltaWxhckVudGl0eU1hcFtlbnRpdHkudGV4dF0gPSBbXTtcblxuICAgICAgICAgICAgICAgIC8vIG9ubHkgY3JlYXRlIHRhZyBmb3IgZmlyc3QgdmVyc2lvbiBvZiBhbiBlbnRpdHlcbiAgICAgICAgICAgICAgICB2YXIgJGEgPSAkKCc8YT4nLCB7XG4gICAgICAgICAgICAgICAgICAgIGhyZWY6ICcjJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICd0YWcnLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBlbnRpdHkudGV4dFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNlbGYuJHRhZ3MuYXBwZW5kKCRhKTtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgJGEuYXR0cignZGF0YS1lbnRpdHktaWQnLCBlbnRpdHkuZW50aXR5aWQpO1xuICAgICAgICAgICAgICAgIHNlbGYuX2VudGl0eU1hcFtlbnRpdHkuZW50aXR5aWRdID0gZW50aXR5O1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWRFbnRpdHlNYXBbZW50aXR5LmVudGl0eWlkXSkge1xuICAgICAgICAgICAgICAgICAgICAkYS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaW1pbGFyRW50aXRpZXMucHVzaChlbnRpdHkuZW50aXR5aWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLiR0YWdzLnRvZ2dsZSghIWkpO1xuXG4gICAgICAgIHNlbGYuY3VycmVudEVudGl0aWVzID0gc2VsZi5lbnRpdGllc0ZvclRleHRFbnRyeShzZWxmLmNvbmZpcm1lZFJlY29yZGluZy50ZXh0RW50cnlJRCk7XG4gICAgICAgIHNlbGYuX3Jlc3R5bGVIaXN0b3J5KCk7XG4gICAgfSxcblxuICAgIGVudGl0aWVzRm9yVGV4dEVudHJ5IDogZnVuY3Rpb24odGV4dEVudHJ5SUQsIGVudGl0aWVzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGV4dEVudHJ5SUQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciB0ZXh0RW50cnkgPSBzZWxmLl90ZXh0RW50cnlNYXBbdGV4dEVudHJ5SURdO1xuICAgICAgICBpZiAodHlwZW9mIGVudGl0aWVzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgZW50aXRpZXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHRleHRFbnRyeSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdGllcztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHRFbnRyeS5lbnRpdHlJRHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbnRpdHlJRCA9IHRleHRFbnRyeS5lbnRpdHlJRHNbaV07XG4gICAgICAgICAgICB2YXIgZW50aXR5ID0gc2VsZi5fZW50aXR5TWFwW2VudGl0eUlEXTtcbiAgICAgICAgICAgIGVudGl0aWVzLnB1c2goZW50aXR5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW50aXRpZXM7XG4gICAgfSxcblxuICAgIF9pc290b3BlX2NvbmZpZyA6IHtcbiAgICAgICAgaXRlbVNlbGVjdG9yOiAnLmNhcmQnLFxuICAgICAgICBzb3J0Qnk6ICdzb3J0JyxcbiAgICAgICAgbGF5b3V0TW9kZTogJ21hc29ucnknLFxuICAgICAgICBmaWx0ZXI6ICc6bm90KC5yZW1vdmVkKScsXG4gICAgICAgIGdldFNvcnREYXRhOiB7XG4gICAgICAgICAgICBzb3J0OiAnW2RhdGEtc29ydF0gcGFyc2VJbnQnXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2NyZWF0ZUNhcmQgOiBmdW5jdGlvbihkb2MpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgJGNhcmQgPSAkKCc8YT4nLCB7XG4gICAgICAgICAgICBjbGFzczogJ2NhcmQgbmV3JyxcbiAgICAgICAgICAgIGlkOiAnZG9jXycgKyBkb2MuZG9jdW1lbnRpZCxcbiAgICAgICAgICAgIGhyZWY6IGRvYy5vcmlnaW51cmwsXG4gICAgICAgICAgICB0YXJnZXQ6IHNlbGYuY29uZmlnLmNhcmRBbmNob3JUYXJnZXQgfHwgJ19wYXJlbnQnXG4gICAgICAgIH0pO1xuICAgICAgICAkY2FyZC5hdHRyKCdkYXRhLWRvY3VtZW50LWlkJywgZG9jLmRvY3VtZW50aWQpO1xuXG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5jYXJkTGF5b3V0ID09PSAnY3VzdG9tJykge1xuICAgICAgICAgICAgdmFyIGh0bWwgPSBzZWxmLmNhcmRUZW1wbGF0ZShkb2MpO1xuICAgICAgICAgICAgJGNhcmQuaHRtbChodG1sKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciAkdGl0bGUgPSAkKCc8aDI+Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzOiAndGl0bGUnLFxuICAgICAgICAgICAgICAgIGh0bWw6IGRvYy50aXRsZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkY2FyZC5hcHBlbmQoJHRpdGxlKTtcblxuICAgICAgICAgICAgdmFyIGltYWdlVVJMID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvYy5pbWFnZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRvYy5pbWFnZS51cmwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlVVJMID0gZG9jLmltYWdlLnVybDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkb2MuaW1hZ2UudGh1bWJ1cmwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlVVJMID0gZG9jLmltYWdlLnRodW1idXJsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbWFnZVVSTCkge1xuICAgICAgICAgICAgICAgIHZhciAkaW1hZ2UgPSAkKCc8cD4nLCB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnaW1hZ2Ugbm90LWxvYWRlZCdcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRpbWFnZS5hcHBlbmQoJCgnPGltZz4nLCB7XG4gICAgICAgICAgICAgICAgICAgIHNyYzogaW1hZ2VVUkxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgJGNhcmQuYXBwZW5kKCRpbWFnZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZG9jLmRlc2NyaXB0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gZG9jLmRlc2NyaXB0aW9uLnN1YnN0cigwLCAxNTApICsgKGRvYy5kZXNjcmlwdGlvbi5sZW5ndGggPiAxNTAgPyBcIiZoZWxsaXA7XCIgOiBcIlwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBcIk5vIGRlc2NyaXB0aW9uXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkY2FyZC5hcHBlbmQoJCgnPHA+Jywge1xuICAgICAgICAgICAgICAgIGh0bWw6IGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIGNsYXNzOiAnZGVzY3JpcHRpb24nXG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIC8vIGZpZWxkc1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmNvbmZpZy5jYXJkRmllbGRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldEZvcm1hdHRlZFN0cmluZyhmb3JtYXQsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHZhbHVlICogMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkYXRlLmdldE1vbnRoKCkgKyAxKSArICcvJyArIGRhdGUuZ2V0RGF5KCkgKyAnLycgKyBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5zdWJzdHIoMCwgMTAwKSArICh2YWx1ZS5sZW5ndGggPiAxMDAgPyBcIiZoZWxsaXA7XCIgOiBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBjYXJkRmllbGRzID0gc2VsZi5jb25maWcuY2FyZEZpZWxkcztcbiAgICAgICAgICAgICAgICAkLmVhY2goY2FyZEZpZWxkcywgZnVuY3Rpb24oazIsIGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGRvY1tmaWVsZC5rZXldIHx8IGZpZWxkLnBsYWNlaG9sZGVyO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGEgbGFiZWwgaXMgc3BlY2lmaWVkLCBhZGQgYSBsYWJlbFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5sYWJlbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZmllbGQubGFiZWwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRsYWJlbCA9ICQoJzxzcGFuPicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdsYWJlbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IGZpZWxkLmxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHZhbHVlID0gJCgnPHNwYW4+Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAndmFsdWUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHdlIGFyZW4ndCB1c2luZyBwbGFjZWhvbGRlciwgZm9ybWF0IHRoZSBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gZmllbGQucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGdldEZvcm1hdHRlZFN0cmluZyhmaWVsZC5mb3JtYXQsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHZhbHVlLmFkZENsYXNzKCdwbGFjZWhvbGRlcicpOyAvLyBvdGhlciB3aXNlIGFkZCBwbGFjZWhvbGRlciBjbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgJHZhbHVlLnRleHQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRmaWVsZCA9ICQoJzxwPicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ21tLWRvYy1maWVsZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5jbGFzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZmllbGQuY2xhc3MgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpZWxkLmFkZENsYXNzKGZpZWxkLmNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICRmaWVsZC5hcHBlbmQoJGxhYmVsKS5hcHBlbmQoJHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjYXJkLmFwcGVuZCgkZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICRjYXJkO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlQ2FyZHMgOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG5ld0NhcmRzID0gW107XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBcIk5vIHJlc3VsdHNcIiBtZXNzYWdlIGlmIHByZXNlbnRcbiAgICAgICAgJCgnLm5vLXJlc3VsdHMnLCB0aGlzLiRjYXJkcykucmVtb3ZlKCk7IC8vIFRPRE86IGFuaW1hdGUgdGhpcyBuaWNlbHk/XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBjYXJkcyBmaWx0ZXJlZCBvdXQgbGFzdCB0aW1lXG4gICAgICAgIC8vIExlYXZlIG9uZSBjYXJkIHRvIHByZXZlbnQgdGhlIHNpbmdsZSBjb2x1bW4gaXNvdG9wZSBidWdcbiAgICAgICAgJCgnLmNhcmQucmVtb3ZlZDpub3QoLnNpbmdsZS1jb2x1bW4tZml4KScsIHRoaXMuJGNhcmRzKS5yZW1vdmUoKTtcblxuICAgICAgICAvLyBNYXJrIGN1cnJlbnQgdG8gYmUgZGVsZXRlZDsgd2UnbGwgdW4tbWFyayB0aGVtIGlmIHRoZXkgZXhpc3RcbiAgICAgICAgJCgnLmNhcmQnLCB0aGlzLiRjYXJkcykuZWFjaChmdW5jdGlvbihrLCBjYXJkKSB7XG4gICAgICAgICAgICB2YXIgJGNhcmQgPSAkKGNhcmQpO1xuICAgICAgICAgICAgJGNhcmQuYWRkQ2xhc3MoJ3RvLWRlbGV0ZScpO1xuICAgICAgICAgICAgJGNhcmQuYXR0cignZGF0YS1zb3J0JywgayArIDEwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICAkLmVhY2goZGF0YSwgZnVuY3Rpb24oaywgZG9jKSB7XG4gICAgICAgICAgICAvLyBDYXJkIGV4aXN0cywgc28gdXBkYXRlIHNvcnQgb3JkZXIgYW5kIGtlZXAgaXRcbiAgICAgICAgICAgIGlmICgkKCcjZG9jXycgKyBkb2MuZG9jdW1lbnRpZCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnI2RvY18nICsgZG9jLmRvY3VtZW50aWQpLnJlbW92ZUNsYXNzKCd0by1kZWxldGUnKS5hdHRyKCdkYXRhLXNvcnQnLCBrKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ2FyZCBkb2Vzbid0IGV4aXN0LCBzbyBjcmVhdGUgaXQuIChUT0RPOiBNYXliZSB1c2UgYSB0ZW1wbGF0aW5nIHN5c3RlbT8pXG4gICAgICAgICAgICB2YXIgJGNhcmQgPSBzZWxmLl9jcmVhdGVDYXJkKGRvYyk7XG4gICAgICAgICAgICAkY2FyZC5hdHRyKCdkYXRhLXNvcnQnLCBrKTtcbiAgICAgICAgICAgIG5ld0NhcmRzLnB1c2goJGNhcmQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBGaWx0ZXIgb3V0IHVudXNlZCBjYXJkcyAod2UgZG9uJ3QgZGVsZXRlIHlldCBiL2Mgd2Ugd2FudCB0aGVtIHRvIGZhZGUgb3V0KVxuICAgICAgICAkKCcuY2FyZC50by1kZWxldGUnLCB0aGlzLiRjYXJkcykucmVtb3ZlQ2xhc3MoJ3RvLWRlbGV0ZScpLmFkZENsYXNzKCdyZW1vdmVkJyk7XG5cbiAgICAgICAgdmFyICRuZXdDYXJkcyA9ICQubWFrZUFycmF5KG5ld0NhcmRzKTtcblxuICAgICAgICBzZWxmLiRjYXJkcy5hcHBlbmQoICRuZXdDYXJkcyApO1xuICAgICAgICBpZiAoIXNlbGYuJGNhcmRzLmhhc0NsYXNzKCdpc290b3BlJykpIHtcbiAgICAgICAgICAgIC8vIE5vIGlzb3RvcGUgaW5zdGFuY2UgeWV0OyBjcmVhdGUgaXQuXG4gICAgICAgICAgICBzZWxmLiRjYXJkcy5hZGRDbGFzcygnaXNvdG9wZScpO1xuICAgICAgICAgICAgc2VsZi4kY2FyZHMuaXNvdG9wZShzZWxmLl9pc290b3BlX2NvbmZpZyk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIElzb3RvcGUgaW5zdGFuY2UgYWxyZWFkeSBleGlzdHNcblxuICAgICAgICAgICAgLy8gU2luZ2xlIG91dCB0aGUgbmV3IGNhcmRzLCBhbmQgJ2FwcGVuZCcgdGhlbSB0byBpc290b3BlICh0aGV5J3JlIGFscmVhZHkgaW4gdGhlIERPTSlcbiAgICAgICAgICAgICRuZXdDYXJkcyA9ICQoJy5uZXcnLCBzZWxmLiRjYXJkcyk7XG4gICAgICAgICAgICBzZWxmLiRjYXJkcy5pc290b3BlKCAnYXBwZW5kZWQnICwgJG5ld0NhcmRzICk7XG4gICAgICAgICAgICBzZWxmLiRjYXJkcy5pc290b3BlKCAndXBkYXRlU29ydERhdGEnICkuaXNvdG9wZShzZWxmLl9pc290b3BlX2NvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLiRjYXJkcy5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICBzZWxmLiRjYXJkcy5pbWFnZXNMb2FkZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKCcubm90LWxvYWRlZCcpLnJlbW92ZUNsYXNzKCdub3QtbG9hZGVkJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuJGNhcmRzLmlzb3RvcGUoc2VsZi5faXNvdG9wZV9jb25maWcpO1xuICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBUT0RPOiBhbmltYXRlIHRoaXMgbmljZWx5P1xuICAgICAgICBpZiAoJCgnLmNhcmQ6bm90KC5yZW1vdmVkKScsIHRoaXMuJGNhcmRzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuJGNhcmRzLmFwcGVuZCgkKCc8ZGl2PicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ25vLXJlc3VsdHMnLFxuICAgICAgICAgICAgICAgIGh0bWw6ICdObyByZXN1bHRzJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnLm5ldycsIHRoaXMuJGNhcmRzKS5yZW1vdmVDbGFzcygnbmV3Jyk7XG4gICAgfSxcblxuICAgIGFwcGVuZEhpc3RvcnkgOiBmdW5jdGlvbihyZWNvcmRpbmcpIHtcbiAgICAgICAgaWYgKHJlY29yZGluZy50cmFuc2NyaXB0KSB7XG4gICAgICAgICAgICB0aGlzLl9yZWNvcmRpbmdzLnB1c2gocmVjb3JkaW5nKTtcblxuICAgICAgICAgICAgLy8gQXBwZW5kIHRvIHRoZSBoaXN0b3J5XG4gICAgICAgICAgICB2YXIgJG5ld19oaXN0b3J5ID0gJCgnPGxpPicsIHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICdyZWNvcmRpbmcnOiByZWNvcmRpbmcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBodG1sOiB0aGlzLiRpbnB1dC5odG1sKCksXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy4kaW5wdXQuYmVmb3JlKCRuZXdfaGlzdG9yeSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkbmV3X2hpc3RvcnkpO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIG5ldyBvbmVcbiAgICAgICAgICAgIHRoaXMuJGlucHV0Lmh0bWwoXCImbmJzcDtcIik7XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kaW5wdXQucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbEhpc3RvcnkoKTtcbiAgICAgICAgICAgIH0sIDEwMCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3Jlc3R5bGVIaXN0b3J5KCk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVVSSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGxldHRlcmluZyA6IGZ1bmN0aW9uKCRlbCwgdGV4dCwgcGFyZW50Q2xhc3MpIHtcbiAgICAgICAgJGVsLmVtcHR5KCk7XG4gICAgICAgIHRleHQgPSB0ZXh0LnNwbGl0KCcnKTtcbiAgICAgICAgdmFyICRlbF9wYXJlbnQgPSAkKCc8ZGl2PicsIHsnY2xhc3MnOiBwYXJlbnRDbGFzc30pO1xuICAgICAgICBmb3IodmFyIGk9MDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICRlbF9wYXJlbnQuYXBwZW5kKCQoJzxzcGFuPicsIHsgdGV4dDogdGV4dFtpXSB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgJGVsLmFwcGVuZCgkZWxfcGFyZW50KTtcbiAgICB9LFxuXG4gICAgX3Jlc3R5bGVIaXN0b3J5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcywgaTtcbiAgICAgICAgLy90aGlzLiRoaXN0b3J5TGlzdC5lbXB0eSgpO1xuICAgICAgICB0aGlzLiRoaXN0b3J5TGlzdC5maW5kKCdsaScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVjb3JkaW5nID0gJCh0aGlzKS5kYXRhKCdyZWNvcmRpbmcnKTtcbiAgICAgICAgICAgIGlmKCFyZWNvcmRpbmcpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gZW50aXRpZXMgZm9yIHJlY29yZGluZ1xuICAgICAgICAgICAgdmFyIGVudGl0aWVzID0gc2VsZi5lbnRpdGllc0ZvclRleHRFbnRyeShyZWNvcmRpbmcudGV4dEVudHJ5SUQpO1xuXG4gICAgICAgICAgICB2YXIgc3RhdHMgPSBoaWdobGlnaHRFbnRpdGllcyhlbnRpdGllcywgcmVjb3JkaW5nLnRyYW5zY3JpcHQpO1xuICAgICAgICAgICAgdmFyICRkaXYgPSAkKCc8ZGl2PicsIHsnaHRtbCc6IHN0YXRzLm1hcmt1cH0pO1xuXG4gICAgICAgICAgICB2YXIgJGxpID0gJCh0aGlzKTtcbiAgICAgICAgICAgICRsaS5lbXB0eSgpO1xuICAgICAgICAgICAgJGxpLmFwcGVuZCgkZGl2KTtcbiAgICAgICAgICAgICRsaS5hdHRyKCdkYXRhLXRleHQtZW50cnktaWQnLCByZWNvcmRpbmcudGV4dEVudHJ5SUQpO1xuXG4gICAgICAgICAgICAkbGkuZmluZCgnLnRhZycpLmVhY2goZnVuY3Rpb24oaywgJHRhZykge1xuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIGVudGl0eUlEID0gJHRoaXMuZGF0YSgnZW50aXR5SWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZWxlY3RlZEVudGl0eU1hcFtlbnRpdHlJRF0pIHtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChpID09PSBzZWxmLl9yZWNvcmRpbmdzLmxlbmd0aCAtIDEgJiYgc2VsZi5yZWNvcmRpbmdzX2xlbmd0aCAhPT0gc2VsZi5fcmVjb3JkaW5ncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24oJGRpdikge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRkaXYuYWRkQ2xhc3MoJ29uJyk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgfSkoJGRpdik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRkaXYuYWRkQ2xhc3MoJ29sZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLnNjcm9sbEhpc3RvcnkoKTtcblxuICAgICAgICAvLyBTbyB3ZSBjYW4gdGVsbCBpZiB0aGVyZSdzIGEgbmV3IG9uZVxuICAgICAgICB0aGlzLnJlY29yZGluZ3NfbGVuZ3RoID0gdGhpcy5fcmVjb3JkaW5ncy5sZW5ndGg7XG4gICAgfSxcblxuICAgIHNjcm9sbEhpc3RvcnkgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLiRoaXN0b3J5RGF0YS5zY3JvbGxUb3Aoc2VsZi4kaGlzdG9yeURhdGFbMF0uc2Nyb2xsSGVpZ2h0KTtcbiAgICB9LFxuXG4gICAgX2RvY3VtZW50TG9jayA6IHtcbiAgICAgICAgY2FuUmVxdWVzdERvY3VtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMubGFzdERvY3VtZW50c1JlcXVlc3QgKyA1MDAgPCBEYXRlLm5vdygpKTtcbiAgICAgICAgfSxcbiAgICAgICAgbGFzdERvY3VtZW50c1JlcXVlc3Q6IDBcbiAgICB9LFxuXG4gICAgX2RvY3VtZW50c0NhY2hlOiB7fSxcblxuICAgIF9udW1Db2x1bW5zIDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjYXJkV2lkdGggPSAyMTg7XG4gICAgICAgIHZhciBjYXJkUGFkZGluZyA9IDIwO1xuICAgICAgICB2YXIgd2lkdGhSZW1haW5pbmcgPSBzZWxmLiRjYXJkcy53aWR0aCgpIC0gY2FyZFBhZGRpbmc7XG4gICAgICAgIHZhciBudW1Db2xzID0gMDtcbiAgICAgICAgd2hpbGUgKHdpZHRoUmVtYWluaW5nID49IDApIHtcbiAgICAgICAgICAgIG51bUNvbHMrKztcbiAgICAgICAgICAgIHdpZHRoUmVtYWluaW5nIC09IGNhcmRXaWR0aCArIGNhcmRQYWRkaW5nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW1Db2xzO1xuICAgIH0sXG5cbiAgICBfbnVtRG9jdW1lbnRzIDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZi5jb25maWcubnVtUmVzdWx0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5udW1SZXN1bHRzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG51bUNvbHMgPSBzZWxmLl9udW1Db2x1bW5zKCk7XG4gICAgICAgIHZhciBudW1Eb2NzID0gTWF0aC5tYXgobnVtQ29scyAqIDIsIDgpO1xuICAgICAgICBpZiAobnVtRG9jcyAlIG51bUNvbHMgIT09IDApIHtcbiAgICAgICAgICAgIG51bURvY3MgKz0gbnVtQ29scyAtIChudW1Eb2NzICUgbnVtQ29scyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bURvY3M7XG4gICAgfSxcblxuICAgIGdldERvY3VtZW50cyA6IGZ1bmN0aW9uKCkge1xuICAgICAgICBVVElMLmxvZygnZ2V0dGluZyBkb2N1bWVudHMnKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHZhciBxdWVyeVBhcmFtcyA9IHsgbGltaXQ6IHNlbGYuY29uZmlnLm51bVJlc3VsdHMgfHwgMTQgfTtcbiAgICAgICAgdmFyIHJlcXVlc3RLZXkgPSAnZGVmYXVsdCc7XG4gICAgICAgIHZhciBzZWxlY3RlZEVudGl0eUlEcyA9IE9iamVjdC5rZXlzKE1NVm9pY2Uuc2VsZWN0ZWRFbnRpdHlNYXApO1xuICAgICAgICBpZiAoc2VsZWN0ZWRFbnRpdHlJRHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVxdWVzdEtleSA9IEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkRW50aXR5SURzKTtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zLmVudGl0eWlkcyA9IHJlcXVlc3RLZXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtcy50ZXh0ZW50cnlpZHMgPSBKU09OLnN0cmluZ2lmeShzZWxmLl9jdXJyZW50VGV4dEVudHJpZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmV0dXJuIGNhY2hlZCByZXNwb25zZSBpZiBpdCBleGlzdHMgYW5kIGhhcyBub3QgZXhwaXJlZCAoZXhwaXJlIHRpbWUgb2YgMTAgbWludXRlcylcbiAgICAgICAgaWYgKHNlbGYuX2RvY3VtZW50c0NhY2hlLmhhc093blByb3BlcnR5KHJlcXVlc3RLZXkpICYmXG4gICAgICAgICAgICBEYXRlLm5vdygpIC0gc2VsZi5fZG9jdW1lbnRzQ2FjaGVbcmVxdWVzdEtleV0ucmVxdWVzdFRpbWUgPCA2MDAwMDApIHtcbiAgICAgICAgICAgIG9uU3VjY2VzcyhzZWxmLl9kb2N1bWVudHNDYWNoZVtyZXF1ZXN0S2V5XS5yZXN1bHQsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzZWxmLl9kb2N1bWVudExvY2suY2FuUmVxdWVzdERvY3VtZW50cygpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVxdWVzdFRpbWUgPSB0aGlzLl9kb2N1bWVudExvY2subGFzdERvY3VtZW50c1JlcXVlc3QgPSBEYXRlLm5vdygpO1xuICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3MocmVzdWx0LCBjYWNoZWQpIHtcbiAgICAgICAgICAgIGNhY2hlZCA9ICEhY2FjaGVkO1xuXG4gICAgICAgICAgICBpZiAoIWNhY2hlZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuX2RvY3VtZW50c0NhY2hlW3JlcXVlc3RLZXldID0ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFRpbWU6IHJlcXVlc3RUaW1lXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBVVElMLmxvZyhcIkdvdCBkb2N1bWVudHNcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFVUSUwubG9nKFwiR290IGRvY3VtZW50cyBmcm9tIGNhY2hlXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbnVtRG9jdW1lbnRzID0gc2VsZi5fbnVtRG9jdW1lbnRzKCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEubGVuZ3RoID4gbnVtRG9jdW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRhdGEuc3BsaWNlKG51bURvY3VtZW50cywgcmVzdWx0LmRhdGEubGVuZ3RoIC0gbnVtRG9jdW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE1NVm9pY2Uuc2hvd1Jlc3VsdHMocmVzdWx0LmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb25FcnJvcihlcnJvcikge1xuICAgICAgICAgICAgVVRJTC5sb2coXCJFcnJvciBnZXR0aW5nIGRvY3VtZW50czogIChUeXBlIFwiICsgZXJyb3IuY29kZSArXG4gICAgICAgICAgICAgICAgXCIgLSBcIiArIGVycm9yLnR5cGUgKyBcIik6IFwiICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgTU0uYWN0aXZlU2Vzc2lvbi5kb2N1bWVudHMuZ2V0KHF1ZXJ5UGFyYW1zLCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICAgIH0sXG5cbiAgICByZXNpemUgOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKHRoaXMuaXNfcmVzdWx0cykge1xuICAgICAgICAgICAgdmFyIHNpemUgPSB0aGlzLiRtbV9wYXJlbnQuaGVpZ2h0KCk7XG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSBzaXplO1xuICAgICAgICAgICAgdGhpcy4kcmVzdWx0cy5vdXRlckhlaWdodChzaXplKTtcbiAgICAgICAgICAgIHRoaXMuJGhpc3Rvcnkub3V0ZXJIZWlnaHQodGhpcy5faGlzdG9yeUhlaWdodChzaXplKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlX3RleHQgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHZhciBmdWxsVGV4dCA9IHNlbGYuY29uZmlybWVkUmVjb3JkaW5nLnRyYW5zY3JpcHQgKyBzZWxmLnBlbmRpbmdSZWNvcmRpbmcudHJhbnNjcmlwdDtcblxuICAgICAgICBpZiAoZnVsbFRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLiRpbnB1dC5lbXB0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETzogYW5pbWF0ZSB0cmFuc2l0aW9uIHRvIGhpZ2hsaWdodGVkIGVudGl0aWVzID9cbiAgICAgICAgdmFyIGNvbmZpcm1lZFN0YXRzID0gaGlnaGxpZ2h0RW50aXRpZXModGhpcy5jdXJyZW50RW50aXRpZXMsIHRoaXMuY29uZmlybWVkUmVjb3JkaW5nLnRyYW5zY3JpcHQpO1xuICAgICAgICB0aGlzLiRpbnB1dC5hcHBlbmQoJCgnPHNwYW4+Jywge1xuICAgICAgICAgICAgaHRtbDogY29uZmlybWVkU3RhdHMubWFya3VwXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy4kaW5wdXQuYXBwZW5kKCQoJzxzcGFuPicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncGVuZGluZycsXG4gICAgICAgICAgICBodG1sOiBzZWxmLnBlbmRpbmdSZWNvcmRpbmcudHJhbnNjcmlwdFxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMuJGlucHV0LmF0dHIoJ2RhdGEtdGV4dCcsIGZ1bGxUZXh0KTtcbiAgICB9LFxuXG4gICAgb25UZXh0RW50cnlQb3N0ZWQ6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBzZWxmID0gTU1Wb2ljZTtcbiAgICAgICAgVVRJTC5sb2coJ3RleHQgZW50cnkgcG9zdGVkJyk7XG4gICAgICAgIHZhciB0ZXh0RW50cnlJRCA9IE1NVm9pY2UuY29uZmlybWVkUmVjb3JkaW5nLnRleHRFbnRyeUlEID0gcmVzcG9uc2UuZGF0YS50ZXh0ZW50cnlpZDtcbiAgICAgICAgc2VsZi4kaW5wdXQuZGF0YSgndGV4dGVudHJ5aWQnLCB0ZXh0RW50cnlJRCk7XG4gICAgICAgIHNlbGYuX2N1cnJlbnRUZXh0RW50cmllcy5wdXNoKHRleHRFbnRyeUlEKTtcbiAgICAgICAgZGVsZXRlIHNlbGYuX2RvY3VtZW50c0NhY2hlWydkZWZhdWx0J107XG4gICAgICAgIHNlbGYuc2VsZWN0ZWRFbnRpdHlNYXAgPSB7fTtcbiAgICAgICAgTU1Wb2ljZS5nZXREb2N1bWVudHMoKTtcbiAgICB9LFxuXG4gICAgX2xpc3RlbmVyQ29uZmlnIDoge1xuICAgICAgICBvblJlc3VsdDogZnVuY3Rpb24ocmVzdWx0IC8qLCByZXN1bHRJbmRleCwgcmVzdWx0cywgZXZlbnQgIDwtLSB1bnVzZWQgKi8pIHtcbiAgICAgICAgICAgIFVUSUwubG9nKFwiTGlzdGVuZXI6IG9uUmVzdWx0XCIsIHJlc3VsdCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmZpbmFsKSB7XG4gICAgICAgICAgICAgICAgTU1Wb2ljZS5tYWtlTmV3UmVjb3JkaW5ncyhyZXN1bHQudHJhbnNjcmlwdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIE1NVm9pY2UucGVuZGluZ1JlY29yZGluZy50cmFuc2NyaXB0ID0gcmVzdWx0LnRyYW5zY3JpcHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBNTVZvaWNlLl91cGRhdGVVSSgpO1xuICAgICAgICB9LFxuICAgICAgICBvblN0YXJ0OiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgVVRJTC5sb2coXCJMaXN0ZW5lcjogb25TdGFydFwiKTtcbiAgICAgICAgICAgIGlmIChNTVZvaWNlLmlzX2ZpcnN0X3N0YXJ0KSB7XG4gICAgICAgICAgICAgICAgTU1Wb2ljZS5tYWtlTmV3UmVjb3JkaW5ncygpO1xuICAgICAgICAgICAgICAgIE1NVm9pY2UuaXNfZmlyc3Rfc3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBNTVZvaWNlLnN0YXR1cyA9ICdsaXN0ZW5pbmcnO1xuICAgICAgICAgICAgICAgIE1NVm9pY2UuX3VwZGF0ZVVJKCk7XG4gICAgICAgICAgICAgICAgc3RhcnRWb2x1bWVNb25pdG9yKCk7XG4gICAgICAgICAgICAgICAgTU1Wb2ljZS4kY2FyZHMuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25FbmQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBVVElMLmxvZyhcIkxpc3RlbmVyOiBvbkVuZFwiKTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHZhciBwZW5kaW5nVHJhbnNjcmlwdCA9IE1NVm9pY2UucGVuZGluZ1JlY29yZGluZy50cmFuc2NyaXB0O1xuICAgICAgICAgICAgaWYgKHBlbmRpbmdUcmFuc2NyaXB0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBNTVZvaWNlLm1ha2VOZXdSZWNvcmRpbmdzKHBlbmRpbmdUcmFuc2NyaXB0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgTU1Wb2ljZS4kY2FyZHMucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChNTVZvaWNlLmlzX2xvY2tlZCkge1xuICAgICAgICAgICAgICAgIGlmIChNTVZvaWNlLl9sb2NrV2hpbGVSZWNvcmRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgTU1Wb2ljZS5sb2NrV2hpbGVSZWNvcmRpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgTU0uYWN0aXZlU2Vzc2lvbi5saXN0ZW5lci5zdGFydCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBNTVZvaWNlLnN0YXR1cyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdmFyIGZ1bGxUZXh0ID0gTU1Wb2ljZS5jb25maXJtZWRSZWNvcmRpbmcudHJhbnNjcmlwdCArIE1NVm9pY2UucGVuZGluZ1JlY29yZGluZy50cmFuc2NyaXB0O1xuICAgICAgICAgICAgICAgIGlmKCFmdWxsVGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgTU1Wb2ljZS5sZXR0ZXJpbmcoTU1Wb2ljZS4kaW5wdXQsICdXaG9vcHMsIHdlIGRpZG5cXCd0IGdldCB0aGF0Li4uJywgJ21tLXByb21wdCBtbS1wcm9tcHQtZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBVVElMLmxvZygnZnVsbCB0ZXh0JywgZnVsbFRleHQpO1xuXG4gICAgICAgICAgICAgICAgLy8gUGxheSB0aGUgc291bmRcbiAgICAgICAgICAgICAgICAkKCcjYXVkaW8tZG9uZScpWzBdLnBsYXkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTU1Wb2ljZS5fdXBkYXRlVUkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25FcnJvcjogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5lcnJvciA9PT0gJ2Fib3J0ZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBpZ25vcmUgYWJvcnRlZCBlcnJvcnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFVUSUwubG9nKFwiTGlzdGVuZXI6IG9uRXJyb3IgLSBcIiwgZXZlbnQuZXJyb3IsIGV2ZW50Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC5lcnJvcikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ25vdC1hbGxvd2VkJzpcbiAgICAgICAgICAgICAgICBjYXNlICdzZXJ2aWNlLW5vdC1hbGxvd2VkJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG8gc29tZXRoaW5nIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdsYW5ndWFnZS1ub3Qtc3VwcG9ydGVkJzpcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBoYW5kbGUgdGhpcyB3aGVuIHdlIGFsbG93IHNldHRpbmcgbGFuZ3VhZ2VcblxuICAgICAgICAgICAgICAgIC8vIElnbm9yZSB0aGUgcmVzdCBmb3Igbm93XG4gICAgICAgICAgICAgICAgY2FzZSAnYmFkLWdyYW1tYXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ25ldHdvcmsnOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJuby1zcGVlY2hcIjpcbiAgICAgICAgICAgICAgICBjYXNlICdhdWRpby1jYXB0dXJlJzpcbiAgICAgICAgICAgICAgICBjYXNlICdzZXJ2aWNlLW5vdC1hbGxvd2VkJzpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICAgICAgb25UZXh0RW50cnlQb3N0ZWQ6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBNTVZvaWNlLm9uVGV4dEVudHJ5UG9zdGVkKHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfY2hhbmdlZF9jYWNoZWQgOiB7fSxcblxuICAgIC8vIFRoaXMgd2lsbCBicm9hZGNhc3QgdXBkYXRlZCB2YXJpYWJsZXMgdG8gdGhlIG1vZGFsXG4gICAgX2lzQ2hhbmdlZCA6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IHRoaXNbbmFtZV07XG4gICAgICAgIGlmICh0eXBlb2YgdGhpc1tuYW1lXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IEpTT04uc3RyaW5naWZ5KHRoaXNbbmFtZV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jaGFuZ2VkX2NhY2hlZFtuYW1lXSAhPSBjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZWRfY2FjaGVkW25hbWVdID0gY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvLyBEbyBhIGRpcnR5IGNoZWNrIG9mIGFsbCB2YXJpYWJsZXMgdG8gc2VlIHdoYXQgY2hhbmdlZFxuICAgIF9nZXRVcGRhdGVkIDogZnVuY3Rpb24oaXRlbXMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgdXBkYXRlZCA9IHt9O1xuICAgICAgICAkLmVhY2goaXRlbXMsIGZ1bmN0aW9uKGssIHYpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdiAhPT0gJ2Z1bmN0aW9uJyAmJiBrWzBdICE9IFwiX1wiICYmIGtbMF0gIT0gXCIkXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5faXNDaGFuZ2VkKGspKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRba10gPSB2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgIH0sXG5cbiAgICAvLyBVcGRhdGUgdGhlIFVJIHRvIHJlZmxlY3QgdGhlIHNpdGVcbiAgICBfdXBkYXRlVUkgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgdXBkYXRlcyA9IHNlbGYuX2dldFVwZGF0ZWQodGhpcyk7XG5cbiAgICAgICAgaWYoJ3JlY29yZGluZ3NfbGVuZ3RoJyBpbiB1cGRhdGVzKSB7XG4gICAgICAgICAgICBpZih1cGRhdGVzLnJlY29yZGluZ3NfbGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRib2R5LmFkZENsYXNzKCdoYXNoaXN0b3J5Jyk7XG4gICAgICAgICAgICAgICAgc2VsZi4kaGlzdG9yeUJ1dHRvbi5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih1cGRhdGVzLnJlY29yZGluZ3NfbGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRtbV9idXR0b24uYWRkQ2xhc3MoJ3NoYWRvdycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoJ2lzX3ZvaWNlX3JlYWR5JyBpbiB1cGRhdGVzKSB7XG4gICAgICAgICAgICBpZihzZWxmLmRvX29uX3ZvaWNlX3JlYWR5X2ZuKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kb19vbl92b2ljZV9yZWFkeV9mbigpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBzZWxmLmRvX29uX3ZvaWNlX3JlYWR5X2ZuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoJ3Jlc3VsdHNfbGVuZ3RoJyBpbiB1cGRhdGVzKSB7XG4gICAgICAgICAgICBpZih1cGRhdGVzLnJlc3VsdHNfbGVuZ3RoID49IDAgJiYgIXNlbGYuaXNfcmVzdWx0cykge1xuICAgICAgICAgICAgICAgIHNlbGYuJGJvZHkuYWRkQ2xhc3MoJ3Jlc3VsdHMnKTtcbiAgICAgICAgICAgICAgICBzZWxmLiRtbV9wYXJlbnQuYWRkQ2xhc3MoJ3Jlc3VsdHMnKTtcbiAgICAgICAgICAgICAgICBzZWxmLmlzX3Jlc3VsdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNlbGYucmVzaXplKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZignc3RhdHVzJyBpbiB1cGRhdGVzKSB7XG4gICAgICAgICAgICBzZWxmLiRtbV9idXR0b24ucmVtb3ZlQ2xhc3MoJ3N0YXR1cy1wZW5kaW5nJyk7XG4gICAgICAgICAgICBzZWxmLiRtbV9idXR0b24ucmVtb3ZlQ2xhc3MoJ3N0YXR1cy1saXN0ZW5pbmcnKTtcbiAgICAgICAgICAgIHNlbGYuc3RhdHVzID0gdXBkYXRlcy5zdGF0dXM7XG4gICAgICAgICAgICBpZiAodXBkYXRlcy5zdGF0dXMgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kbW1fYnV0dG9uLmFkZENsYXNzKCdzdGF0dXMtJyArIHVwZGF0ZXMuc3RhdHVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1cGRhdGVzLnN0YXR1cyA9PT0gJ2xpc3RlbmluZycpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRpbnB1dC5lbXB0eSgpO1xuICAgICAgICAgICAgICAgIHNlbGYubGV0dGVyaW5nKHNlbGYuJGlucHV0LCAnU3RhcnQgc3BlYWtpbmcgbm93Li4uJywgJ21tLXByb21wdCcpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy4kbW0uYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1cGRhdGVzLnN0YXR1cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRtbV9wdWxzZXIuY3NzKCd0cmFuc2Zvcm0nLCAnc2NhbGUoMCknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRtbV9hbGVydC50b2dnbGVDbGFzcygnb24nLCB1cGRhdGVzLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKTtcbiAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCdpc19sb2NrZWQnIGluIHVwZGF0ZXMpIHtcbiAgICAgICAgICAgIHNlbGYuJG1tX2J1dHRvbi50b2dnbGVDbGFzcygnbG9jaycsIHVwZGF0ZXMuaXNfbG9ja2VkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0ZXh0TmVlZHNVcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgaWYgKCdjdXJyZW50RW50aXRpZXMnIGluIHVwZGF0ZXMpIHtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudEVudGl0aWVzID0gdXBkYXRlcy5jdXJyZW50RW50aXRpZXM7XG4gICAgICAgICAgICB0ZXh0TmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhc0NvbmZpcm1lZFJlY29yZGluZyA9ICdjb25maXJtZWRSZWNvcmRpbmcnIGluIHVwZGF0ZXM7XG4gICAgICAgIHZhciBoYXNQZW5kaW5nUmVjb3JkaW5nID0gJ3BlbmRpbmdSZWNvcmRpbmcnIGluIHVwZGF0ZXM7XG4gICAgICAgIGlmIChoYXNDb25maXJtZWRSZWNvcmRpbmcpIHtcbiAgICAgICAgICAgIHNlbGYuY29uZmlybWVkUmVjb3JkaW5nID0gdXBkYXRlcy5jb25maXJtZWRSZWNvcmRpbmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc1BlbmRpbmdSZWNvcmRpbmcpIHtcbiAgICAgICAgICAgIHNlbGYucGVuZGluZ1JlY29yZGluZyA9IHVwZGF0ZXMucGVuZGluZ1JlY29yZGluZztcbiAgICAgICAgfVxuICAgICAgICB0ZXh0TmVlZHNVcGRhdGUgPSB0ZXh0TmVlZHNVcGRhdGUgfHwgaGFzQ29uZmlybWVkUmVjb3JkaW5nIHx8IGhhc1BlbmRpbmdSZWNvcmRpbmc7XG5cbiAgICAgICAgaWYgKHRleHROZWVkc1VwZGF0ZSAmJiBzZWxmLnN0YXR1cyAhPT0gJ2VkaXRpbmcnKSB7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZV90ZXh0KCk7XG4gICAgICAgIH1cblxuICAgIH1cblxufTtcblxuTU1Wb2ljZS5vbkNvbmZpZyA9IGZ1bmN0aW9uKCkge1xuICAgIE1NVm9pY2UuX2N1cnJlbnRUZXh0RW50cmllcyA9IFtdO1xuXG4gICAgdmFyIHZvaWNlTmF2T3B0aW9ucyA9IE1NVm9pY2UuY29uZmlnO1xuXG4gICAgdmFyIGluaXRpYWxUZXh0O1xuICAgIGlmICh2b2ljZU5hdk9wdGlvbnMuc3RhcnRRdWVyeSA9PT0gbnVsbCkge1xuICAgICAgICBpbml0aWFsVGV4dCA9ICdFbmFibGUgdGhlIG1pY3JvcGhvbmUuLi4nO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaW5pdGlhbFRleHQgPSB2b2ljZU5hdk9wdGlvbnMuc3RhcnRRdWVyeTtcbiAgICB9XG4gICAgJCgnI2luaXRpYWxUZXh0JykudGV4dChpbml0aWFsVGV4dCk7XG5cbiAgICBpZiAoTU1Wb2ljZS5pc192b2ljZV9yZWFkeSAmJiB2b2ljZU5hdk9wdGlvbnMuc3RhcnRRdWVyeSAhPT0gbnVsbCkgeyAvLyB3ZSBoYXZlIGluaXQgYmVmb3JlXG4gICAgICAgIE1NVm9pY2Uuc3VibWl0VGV4dCh2b2ljZU5hdk9wdGlvbnMuc3RhcnRRdWVyeSk7XG4gICAgICAgIE1NVm9pY2UuX3VwZGF0ZVVJKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIE1NVm9pY2UuY29uZmlnLmJhc2VaSW5kZXggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB2YXIgYmFzZVpJbmRleCA9IHBhcnNlSW50KE1NVm9pY2UuY29uZmlnLmJhc2VaSW5kZXgpO1xuICAgICAgICAgICAgTU1Wb2ljZS4kbW1fYnV0dG9uLmNzcygnei1pbmRleCcsIGJhc2VaSW5kZXggKyAxMDApO1xuICAgICAgICAgICAgTU1Wb2ljZS4kbW1fYnV0dG9uLmZpbmQoJyNpY29uLW1pY3JvcGhvbmUsICNpY29uLW11dGUsICNpY29uLWxvY2snKS5jc3MoJ3otaW5kZXgnLCBiYXNlWkluZGV4ICsgMTApO1xuICAgICAgICAgICAgTU1Wb2ljZS4kbW1fYWxlcnQuY3NzKCd6LWluZGV4JywgYmFzZVpJbmRleCArIDEwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE1NVm9pY2UuY29uZmlnLnJlc2V0Q2FyZHNDU1MpIHtcbiAgICAgICAgICAgICQoJyNjYXJkcy1jc3MnKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgTU1Wb2ljZS5jb25maWcuY3VzdG9tQ1NTVVJMICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFyIGNzc0xpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICAgICAgICBjc3NMaW5rLmhyZWYgPSBNTVZvaWNlLmNvbmZpZy5jdXN0b21DU1NVUkw7XG4gICAgICAgICAgICBjc3NMaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgICAgICAgIGNzc0xpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGNzc0xpbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBNTVZvaWNlLmNvbmZpZy5jdXN0b21DU1MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB2YXIgY3NzU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgY3NzU3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgICAgICBjc3NTdHlsZS5pbm5lckhUTUwgPSBNTVZvaWNlLmNvbmZpZy5jdXN0b21DU1M7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGNzc1N0eWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChNTVZvaWNlLmNvbmZpZy5jYXJkTGF5b3V0ID09PSAnY3VzdG9tJykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBNTVZvaWNlLmNhcmRUZW1wbGF0ZSA9IF8udGVtcGxhdGUoTU1Wb2ljZS5jb25maWcuY2FyZFRlbXBsYXRlKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBVVElMLmxvZygnVm9pY2UgTmF2aWdhdG9yIHdhcyB1bmFibGUgdG8gcGFyc2UgY2FyZCB0ZW1wbGF0ZScpO1xuICAgICAgICAgICAgICAgIE1NVm9pY2UuY29uZmlnLmNhcmRMYXlvdXQgPSAnZGVmYXVsdCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgTU1fVVNFUl9JRF9QUkVGSVggPSAndm51JztcbiAgICAgICAgdmFyIE1NX1VTRVJfTkFNRSA9ICdWb2ljZSBOYXZpZ2F0b3IgVXNlcic7XG4gICAgICAgIHZhciBNTV9VU0VSX0lEX0NPT0tJRSA9ICd2b2ljZV9uYXZpZ2F0b3JfdXNlcl9pZCc7XG5cbiAgICAgICAgdmFyIE1NX0NPTkZJRyA9IHtcbiAgICAgICAgICAgIGFwcGlkOiB2b2ljZU5hdk9wdGlvbnMuYXBwSUQsXG4gICAgICAgICAgICBvbkluaXQ6IG9uTU1Jbml0XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2Ygdm9pY2VOYXZPcHRpb25zLmNsZWFuVXJsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgTU1fQ09ORklHLmNsZWFuVXJsID0gdm9pY2VOYXZPcHRpb25zLmNsZWFuVXJsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygdm9pY2VOYXZPcHRpb25zLmZheWVDbGllbnRVcmwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBNTV9DT05GSUcuZmF5ZUNsaWVudFVybCA9IHZvaWNlTmF2T3B0aW9ucy5mYXllQ2xpZW50VXJsO1xuICAgICAgICB9XG4gICAgICAgIE1NLmluaXQoTU1fQ09ORklHKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1NSW5pdCAoKSB7XG4gICAgICAgIGlmICh2b2ljZU5hdk9wdGlvbnMubW1DcmVkZW50aWFscykge1xuICAgICAgICAgICAgLy8gTm8gbmVlZCB0byBmZXRjaCB0b2tlbiwgdXNlciwgb3IgY3JlYXRlIHNlc3Npb25cbiAgICAgICAgICAgIE1NLnNldFRva2VuKHZvaWNlTmF2T3B0aW9ucy5tbUNyZWRlbnRpYWxzLnRva2VuKTtcbiAgICAgICAgICAgIE1NLnNldEFjdGl2ZVVzZXJJRCh2b2ljZU5hdk9wdGlvbnMubW1DcmVkZW50aWFscy51c2VySUQpO1xuICAgICAgICAgICAgTU0uc2V0QWN0aXZlU2Vzc2lvbklEKHZvaWNlTmF2T3B0aW9ucy5tbUNyZWRlbnRpYWxzLnNlc3Npb25JRCk7XG4gICAgICAgICAgICBvblNlc3Npb25TdGFydCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ2V0VG9rZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGd1aWQoKSB7XG4gICAgICAgIHJldHVybiAoJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbihjKSB7XG4gICAgICAgICAgICB2YXIgciA9IE1hdGgucmFuZG9tKCkqMTZ8MCwgdiA9IGMgPT0gJ3gnID8gciA6IChyJjB4M3wweDgpO1xuICAgICAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VXNlcklEKCkge1xuICAgICAgICAvLyBnZXQgdXNlciBpZCBjb29raWVcbiAgICAgICAgdmFyIHVzZXJJRCA9ICQuY29va2llKE1NX1VTRVJfSURfQ09PS0lFKTtcbiAgICAgICAgaWYgKHR5cGVvZiB1c2VySUQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB1c2VySUQgPSBNTV9VU0VSX0lEX1BSRUZJWCArICctJyArIGd1aWQoKTtcbiAgICAgICAgICAgICQuY29va2llKE1NX1VTRVJfSURfQ09PS0lFLCB1c2VySUQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1c2VySUQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VG9rZW4oKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgIFVUSUwubG9nKCdTdWNjZXNzZnVsbHkgZ290IHRva2VuJyk7XG4gICAgICAgICAgICBzZXRVc2VyKHJlc3VsdC51c2VyLnVzZXJpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25FcnJvciAoZXJyb3IpIHtcbiAgICAgICAgICAgIFVUSUwubG9nKCdUb2tlbiB3YXMgbm90IHZhbGlkJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdXNlcklEID0gZ2V0VXNlcklEKCk7XG4gICAgICAgIE1NLmdldFRva2VuKHtcbiAgICAgICAgICAgIGFub255bW91czoge1xuICAgICAgICAgICAgICAgIHVzZXJpZDogdXNlcklELFxuICAgICAgICAgICAgICAgIG5hbWU6IE1NX1VTRVJfTkFNRSxcbiAgICAgICAgICAgICAgICBkb21haW46IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8qL1xuICAgICAgICB9LCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFVzZXIodXNlcklEKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgIGNyZWF0ZVNlc3Npb24oKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvbkVycm9yIChlcnJvcikge1xuICAgICAgICAgICAgVVRJTC5sb2coXCJFcnJvciBzZXR0aW5nIHVzZXIgc2Vzc2lvbjogIChUeXBlIFwiICsgZXJyb3IuY29kZSArXG4gICAgICAgICAgICAgICAgXCIgLSBcIiArIGVycm9yLnR5cGUgKyBcIik6IFwiICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgTU0uc2V0QWN0aXZlVXNlcklEKHVzZXJJRCwgb25TdWNjZXNzLCBvbkVycm9yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTZXNzaW9uKCkge1xuICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3MocmVzdWx0KSB7XG4gICAgICAgICAgICBzZXRTZXNzaW9uKHJlc3VsdC5kYXRhLnNlc3Npb25pZCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25FcnJvciAoZXJyb3IpIHtcbiAgICAgICAgICAgIFVUSUwubG9nKFwiRXJyb3IgY3JlYXRpbmcgbmV3IHNlc3Npb246ICAoVHlwZSBcIiArIGVycm9yLmNvZGUgK1xuICAgICAgICAgICAgICAgIFwiIC0gXCIgKyBlcnJvci50eXBlICsgXCIpOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIHNlc3Npb25OYW1lID0gXCJWb2ljZSBOYXZpZ2F0b3IgLSBcIiArIGRhdGUudG9UaW1lU3RyaW5nKCkgKyBcIiBcIiArIGRhdGUudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIE1NLmFjdGl2ZVVzZXIuc2Vzc2lvbnMucG9zdCh7XG4gICAgICAgICAgICBuYW1lOiBzZXNzaW9uTmFtZSxcbiAgICAgICAgICAgIHByaXZhY3ltb2RlOiAnaW52aXRlb25seSdcbiAgICAgICAgfSwgb25TdWNjZXNzLCBvbkVycm9yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRTZXNzaW9uKHNlc3Npb25JRCkge1xuICAgICAgICBmdW5jdGlvbiBvbkVycm9yIChlcnJvcikge1xuICAgICAgICAgICAgVVRJTC5sb2coXCJFcnJvciBzZXR0aW5nIHNlc3Npb246ICAoVHlwZSBcIiArIGVycm9yLmNvZGUgK1xuICAgICAgICAgICAgICAgIFwiIC0gXCIgKyBlcnJvci50eXBlICsgXCIpOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIE1NLnNldEFjdGl2ZVNlc3Npb25JRChzZXNzaW9uSUQsIG9uU2Vzc2lvblN0YXJ0LCBvbkVycm9yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblNlc3Npb25TdGFydCAoKSB7XG4gICAgICAgIHN1YnNjcmliZVRvVGV4dEVudHJpZXMoKTtcbiAgICAgICAgc3Vic2NyaWJlVG9FbnRpdGllcygpO1xuICAgICAgICBzZXR1cFNlc3Npb25MaXN0ZW5lcigpO1xuICAgICAgICBNTVZvaWNlLmlzX3ZvaWNlX3JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgTU1Wb2ljZS5fdXBkYXRlVUkoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdWJzY3JpYmVUb1RleHRFbnRyaWVzKCkge1xuICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3MocmVzdWx0KSB7XG4gICAgICAgICAgICBVVElMLmxvZyhcIlN1YnNjcmliZWQgdG8gdGV4dCBlbnRyaWVzIVwiKTtcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsbHkgc3VibWl0IHN0YXJ0IHF1ZXJ5XG4gICAgICAgICAgICBpZiAodm9pY2VOYXZPcHRpb25zLnN0YXJ0UXVlcnkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBNTVZvaWNlLnN1Ym1pdFRleHQodm9pY2VOYXZPcHRpb25zLnN0YXJ0UXVlcnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IoKSB7XG4gICAgICAgICAgICBVVElMLmxvZyhcIkVycm9yIHN1YnNjcmliaW5nIHRvIHRleHQgZW50cmllczogIChUeXBlIFwiICsgZXJyb3IuY29kZSArXG4gICAgICAgICAgICAgICAgXCIgLSBcIiArIGVycm9yLnR5cGUgKyBcIik6IFwiICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgTU0uYWN0aXZlU2Vzc2lvbi50ZXh0ZW50cmllcy5vblVwZGF0ZShmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgIE1NVm9pY2Uuc2V0VGV4dEVudHJpZXMocmVzdWx0LmRhdGEpO1xuICAgICAgICB9LCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdWJzY3JpYmVUb0VudGl0aWVzKCkge1xuICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3MocmVzdWx0KSB7XG4gICAgICAgICAgICBVVElMLmxvZyhcIlN1YnNjcmliZWQgdG8gZW50aXRpZXMhXCIpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IgKGVycm9yKSB7XG4gICAgICAgICAgICBVVElMLmxvZyhcIkVycm9yIHN1YnNjcmliaW5nIHRvIGVudGl0aWVzOiAgKFR5cGUgXCIgKyBlcnJvci5jb2RlICtcbiAgICAgICAgICAgICAgICBcIiAtIFwiICsgZXJyb3IudHlwZSArIFwiKTogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBNTS5hY3RpdmVTZXNzaW9uLmVudGl0aWVzLm9uVXBkYXRlKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgVVRJTC5sb2coJ1JlY2VpdmVkIGVudGl0aWVzIHVwZGF0ZScpO1xuICAgICAgICAgICAgTU1Wb2ljZS5zZXRFbnRpdGllcyhyZXN1bHQuZGF0YSk7XG4gICAgICAgIH0sIG9uU3VjY2Vzcywgb25FcnJvcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dXBTZXNzaW9uTGlzdGVuZXIoKSB7XG4gICAgICAgIE1NLmFjdGl2ZVNlc3Npb24uc2V0TGlzdGVuZXJDb25maWcoTU1Wb2ljZS5fbGlzdGVuZXJDb25maWcpO1xuICAgIH1cbn07XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIE1NVm9pY2UuaW5pdCgpO1xufSk7XG5cbnZhciBhID0ge1xuICAgIHN0cmVhbSA6IGZhbHNlLFxuICAgIGNvbnRleHQgOiBmYWxzZSxcbiAgICBhbmFseXplciA6IGZhbHNlLFxuICAgIGZyZXF1ZW5jaWVzIDogZmFsc2UsXG4gICAgdGltZXMgOiBmYWxzZSxcbiAgICBhdWRpb19zdGFydGVkIDogZmFsc2Vcbn07XG5mdW5jdGlvbiBzdGFydFZvbHVtZU1vbml0b3IoKSB7XG4gICAgaWYgKCFhLmF1ZGlvX3N0YXJ0ZWQpIHtcbiAgICAgICAgLy8gR0VUVVNFUk1FRElBIElOUFVUXG4gICAgICAgIG5hdmlnYXRvci5nZXRNZWRpYSA9IChuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhIHx8XG4gICAgICAgICAgICBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhIHx8XG4gICAgICAgICAgICBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhIHx8XG4gICAgICAgICAgICBuYXZpZ2F0b3IubXNHZXRVc2VyTWVkaWEpO1xuICAgICAgICB3aW5kb3cuQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuXG4gICAgICAgIGEuY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAgICAgICAgYS5hbmFseXplciA9IGEuY29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xuICAgICAgICBhLmFuYWx5emVyLnNtb290aGluZ1RpbWVDb25zdGFudCA9IDAuMTg7XG4gICAgICAgIGEuYW5hbHl6ZXIuZmZ0U2l6ZSA9IDI1NjtcblxuICAgICAgICBhLmZyZXF1ZW5jaWVzID0gbmV3IFVpbnQ4QXJyYXkoIGEuYW5hbHl6ZXIuZnJlcXVlbmN5QmluQ291bnQgKTtcbiAgICAgICAgYS50aW1lcyA9IG5ldyBVaW50OEFycmF5KCBhLmFuYWx5emVyLmZyZXF1ZW5jeUJpbkNvdW50ICk7XG5cbiAgICAgICAgbmF2aWdhdG9yLmdldE1lZGlhICggeyBhdWRpbzogdHJ1ZSB9LCBtaWNyb3Bob25lUmVhZHksIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgVVRJTC5sb2coXCJUaGUgZm9sbG93aW5nIGVycm9yIG9jY3VyZWQ6IFwiICsgZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYS5hdWRpb19zdGFydGVkID0gdHJ1ZTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIGxvb3AoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtaWNyb3Bob25lUmVhZHkoc3RyZWFtKSB7XG4gICAgICAgIGEuc3RyZWFtID0gc3RyZWFtO1xuICAgICAgICB2YXIgc3RyZWFtX3NvdXJjZSA9IGEuY29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZSggc3RyZWFtICk7XG4gICAgICAgIHN0cmVhbV9zb3VyY2UuY29ubmVjdCggYS5hbmFseXplciApO1xuICAgICAgICBsb29wKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgICAgaWYgKCFNTVZvaWNlLnN0YXR1cyB8fCBzdGF0dXMgPT09ICdlZGl0aW5nJykge1xuICAgICAgICAgICAgLy8gc3RvcCByZWNvcmRpbmdcbiAgICAgICAgICAgIGEuc3RyZWFtLnN0b3AoKTtcbiAgICAgICAgICAgIGEuYXVkaW9fc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYS5hbmFseXplci5nZXRCeXRlRnJlcXVlbmN5RGF0YSggYS5mcmVxdWVuY2llcyApO1xuICAgICAgICBhLmFuYWx5emVyLmdldEJ5dGVUaW1lRG9tYWluRGF0YSggYS50aW1lcyApO1xuXG4gICAgICAgIE1NVm9pY2UucHVsc2UoZ2V0Vm9sdW1lKCkpO1xuXG4gICAgICAgIHNldFRpbWVvdXQobG9vcCwgNzUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFZvbHVtZSgpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KCBnZXRGcmVxZW5jeVJhbmdlKCAwLCBhLmFuYWx5emVyLmZyZXF1ZW5jeUJpbkNvdW50IC0gMSApLCAxMCApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZyZXFlbmN5UmFuZ2UoZnJvbSwgdG8pIHtcbiAgICAgICAgdmFyIHZvbHVtZSA9IDA7XG5cbiAgICAgICAgZm9yICggdmFyIGkgPSBmcm9tOyBpIDwgdG87IGkrKyApIHtcbiAgICAgICAgICAgIHZvbHVtZSArPSBhLmZyZXF1ZW5jaWVzW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZvbHVtZSAvICggdG8gLSBmcm9tICk7XG4gICAgfVxufTtcbiIsInJlcXVpcmUoJy4vdmVuZG9yL2NvbnRlbnRsb2FkZWQnKTtcblxuLyogQSB3cmFwcGVyIGZvciBkb20gZWxlbWVudHMsIGJhc2ljYWxseSBhIGxpdGUgdmVyc2lvbiBvZiBqUXVlcnkncyAkICovXG5leHBvcnRzLmVsID0gZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvbjogZnVuY3Rpb24oZXZlbnQsIGZ1bmMpIHtcbiAgICAgICAgICAgIGlmKGVsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LGZ1bmMsZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGVsLmF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgZWwuYXR0YWNoRXZlbnQoXCJvblwiK2V2ZW50LGZ1bmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNsaWNrOiBmdW5jdGlvbihmdW5jKSB7XG4gICAgICAgICAgICB0aGlzLm9uKCdjbGljaycsIGZ1bmMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGtleXByZXNzOiBmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICAgICAgdGhpcy5vbigna2V5cHJlc3MnLCBmdW5jKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVDbGFzczogZnVuY3Rpb24oY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKCcoXnxcXFxccyspJyArIGNsYXNzTmFtZSArICcoXFxcXHMrfCQpJywgJ2cnKSxcbiAgICAgICAgICAgICAgICAnJDEnXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFkZENsYXNzOiBmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZSArIFwiIFwiICsgY2xhc3NOYW1lO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgfSxcblxuICAgICAgICBlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0cy5jb252ZXJ0VG9BYnNvbHV0ZVBhdGggPSBmdW5jdGlvbihocmVmKSB7XG4gICAgdmFyIGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhbmNob3IuaHJlZiA9IGhyZWY7XG4gICAgcmV0dXJuIChhbmNob3IucHJvdG9jb2wgKyAnLy8nICsgYW5jaG9yLmhvc3QgKyBhbmNob3IucGF0aG5hbWUgKyBhbmNob3Iuc2VhcmNoICsgYW5jaG9yLmhhc2gpO1xufTtcblxuZnVuY3Rpb24gYWRkTGVhZGluZ1plcm9zKG51bWJlciwgZGlnaXRzKSB7XG4gICAgdmFyIGJhc2UgPSBNYXRoLnBvdygxMCwgZGlnaXRzKTtcbiAgICBudW1iZXIgKz0gYmFzZTtcbiAgICBudW1iZXIgPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gbnVtYmVyLnN1YnN0cmluZyhudW1iZXIubGVuZ3RoIC0gZGlnaXRzKTtcbn1cblxuZXhwb3J0cy50aW1lc3RhbXAgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIGRhdGUgPSBkYXRlIHx8IG5ldyBEYXRlKCk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldEZ1bGxZZWFyKCksIDQpICsgJy4nXG4gICAgICAgICsgYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpICsgJy4nXG4gICAgICAgICsgYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0RGF0ZSgpLCAyKSArICcgJyArIGRhdGUudG9UaW1lU3RyaW5nKCk7XG59O1xuXG5leHBvcnRzLmxvZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICBhcmdzLnNwbGljZSgwLCAwLCBleHBvcnRzLnRpbWVzdGFtcCgpKTtcbiAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcbn07XG5cbmV4cG9ydHMuY29udGVudExvYWRlZCA9IGNvbnRlbnRMb2FkZWQ7IiwiLyohXG4gKiBjb250ZW50bG9hZGVkLmpzXG4gKlxuICogQXV0aG9yOiBEaWVnbyBQZXJpbmkgKGRpZWdvLnBlcmluaSBhdCBnbWFpbC5jb20pXG4gKiBTdW1tYXJ5OiBjcm9zcy1icm93c2VyIHdyYXBwZXIgZm9yIERPTUNvbnRlbnRMb2FkZWRcbiAqIFVwZGF0ZWQ6IDIwMTAxMDIwXG4gKiBMaWNlbnNlOiBNSVRcbiAqIFZlcnNpb246IDEuMlxuICpcbiAqIFVSTDpcbiAqIGh0dHA6Ly9qYXZhc2NyaXB0Lm53Ym94LmNvbS9Db250ZW50TG9hZGVkL1xuICogaHR0cDovL2phdmFzY3JpcHQubndib3guY29tL0NvbnRlbnRMb2FkZWQvTUlULUxJQ0VOU0VcbiAqXG4gKi9cblxuLy8gQHdpbiB3aW5kb3cgcmVmZXJlbmNlXG4vLyBAZm4gZnVuY3Rpb24gcmVmZXJlbmNlXG53aW5kb3cuY29udGVudExvYWRlZCA9IGZ1bmN0aW9uIGNvbnRlbnRMb2FkZWQod2luLCBmbikge1xuXG5cdHZhciBkb25lID0gZmFsc2UsIHRvcCA9IHRydWUsXG5cblx0ZG9jID0gd2luLmRvY3VtZW50LCByb290ID0gZG9jLmRvY3VtZW50RWxlbWVudCxcblxuXHRhZGQgPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdhdHRhY2hFdmVudCcsXG5cdHJlbSA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2RldGFjaEV2ZW50Jyxcblx0cHJlID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAnJyA6ICdvbicsXG5cblx0aW5pdCA9IGZ1bmN0aW9uKGUpIHtcblx0XHRpZiAoZS50eXBlID09ICdyZWFkeXN0YXRlY2hhbmdlJyAmJiBkb2MucmVhZHlTdGF0ZSAhPSAnY29tcGxldGUnKSByZXR1cm47XG5cdFx0KGUudHlwZSA9PSAnbG9hZCcgPyB3aW4gOiBkb2MpW3JlbV0ocHJlICsgZS50eXBlLCBpbml0LCBmYWxzZSk7XG5cdFx0aWYgKCFkb25lICYmIChkb25lID0gdHJ1ZSkpIGZuLmNhbGwod2luLCBlLnR5cGUgfHwgZSk7XG5cdH0sXG5cblx0cG9sbCA9IGZ1bmN0aW9uKCkge1xuXHRcdHRyeSB7IHJvb3QuZG9TY3JvbGwoJ2xlZnQnKTsgfSBjYXRjaChlKSB7IHNldFRpbWVvdXQocG9sbCwgNTApOyByZXR1cm47IH1cblx0XHRpbml0KCdwb2xsJyk7XG5cdH07XG5cblx0aWYgKGRvYy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIGZuLmNhbGwod2luLCAnbGF6eScpO1xuXHRlbHNlIHtcblx0XHRpZiAoZG9jLmNyZWF0ZUV2ZW50T2JqZWN0ICYmIHJvb3QuZG9TY3JvbGwpIHtcblx0XHRcdHRyeSB7IHRvcCA9ICF3aW4uZnJhbWVFbGVtZW50OyB9IGNhdGNoKGUpIHsgfVxuXHRcdFx0aWYgKHRvcCkgcG9sbCgpO1xuXHRcdH1cblx0XHRkb2NbYWRkXShwcmUgKyAnRE9NQ29udGVudExvYWRlZCcsIGluaXQsIGZhbHNlKTtcblx0XHRkb2NbYWRkXShwcmUgKyAncmVhZHlzdGF0ZWNoYW5nZScsIGluaXQsIGZhbHNlKTtcblx0XHR3aW5bYWRkXShwcmUgKyAnbG9hZCcsIGluaXQsIGZhbHNlKTtcblx0fVxuXG59XG4iXX0=
