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

        if (!$('.card:not(.single-column-fix)', self.$cards).length) {
            if (self.$cards.hasClass('isotope')) {
                self.$cards.isotope('destroy');
            }

            // No isotope instance yet; create it.

            self.$cards.append($newCards);
            self.$cards.isotope(self._isotope_config);
            self.$cards.removeClass('loading');
            self.$cards.imagesLoaded(function() {
                $('.not-loaded').removeClass('not-loaded');
                setTimeout(function() {
                    self.$cards.isotope(self._isotope_config);
                }, 10);
            });
        } else {
            // Isotope already exists, append cards to it

            this.$cards.append( $newCards );

            // Single out the new cards, and 'append' them to isotope (they're already in the DOM)
            $newCards = $('.new', self.$cards);
            self.$cards.isotope( 'appended' , $newCards );
            self.$cards.isotope( 'updateSortData' ).isotope(self._isotope_config);
            self.$cards.removeClass('loading');
            self.$cards.imagesLoaded(function() {
                $('.not-loaded').removeClass('not-loaded');
                setTimeout(function() {
                    self.$cards.isotope(self._isotope_config);
                }, 10);
            });
        }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL21vZGFsLmpzIiwiL1VzZXJzL2pqL0RvY3VtZW50cy9Db2RlL2V4cGVjdC1sYWJzL21pbmRtZWxkLWpzLXNkay9zcmMvd2lkZ2V0cy92b2ljZU5hdmlnYXRvci9qcy91dGlsLmpzIiwiL1VzZXJzL2pqL0RvY3VtZW50cy9Db2RlL2V4cGVjdC1sYWJzL21pbmRtZWxkLWpzLXNkay9zcmMvd2lkZ2V0cy92b2ljZU5hdmlnYXRvci9qcy92ZW5kb3IvY29udGVudGxvYWRlZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy82Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBVVElMID0gIHJlcXVpcmUoJy4vdXRpbCcpO1xuXG4vKiBNYW5hZ2UgdGhlIHN0YXRlIG9mIHRoZSBVSSAqL1xudmFyIE1NVm9pY2UgPSB7XG4gICAgaXNfaW5pdCA6IGZhbHNlLFxuICAgIGlzX2xvY2tlZCA6IGZhbHNlLFxuICAgIF9sb2NrV2hpbGVSZWNvcmRpbmc6IGZhbHNlLFxuICAgIHN0YXR1cyA6IGZhbHNlLFxuICAgIGlzX2ZpcnN0X3N0YXJ0IDogdHJ1ZSxcbiAgICBpc19yZXN1bHRzIDogZmFsc2UsXG5cbiAgICBpc192b2ljZV9yZWFkeSAgOiBmYWxzZSxcblxuICAgIGNvbmZpZzoge30sXG5cbiAgICBfcmVjb3JkaW5nczogW10sXG4gICAgcmVjb3JkaW5nc19sZW5ndGg6IDAsXG4gICAgY29uZmlybWVkUmVjb3JkaW5nIDoge30sXG4gICAgcGVuZGluZ1JlY29yZGluZyA6IHt9LFxuICAgIHNlbGVjdGVkRW50aXR5TWFwIDoge30sXG4gICAgY3VycmVudEVudGl0aWVzOiBbXSxcbiAgICByZXN1bHRzX2xlbmd0aCA6IC0xLFxuICAgIF9lbnRpdHlNYXAgOiB7fSxcbiAgICBfc2ltaWxhckVudGl0eU1hcCA6IHt9LFxuICAgIF90ZXh0RW50cnlNYXA6IHt9LFxuICAgIF9jdXJyZW50VGV4dEVudHJpZXM6IFtdLFxuICAgIF9oZWlnaHQgOiAwLFxuXG4gICAgJGJvZHkgOiAkKCksXG5cbiAgICAkd2luZG93IDogJCgpLFxuICAgICRjYXJkcyA6ICQoKSxcbiAgICAkbW0gOiAkKCksXG4gICAgJG1tX3BhcmVudCA6ICQoKSxcbiAgICAkbW1fY2xvc2UgOiAkKCksXG4gICAgJG1tX2J1dHRvbiA6ICQoKSxcbiAgICAkbW1fYnV0dG9uX2ljb24gOiAkKCksXG4gICAgJG1tX3B1bHNlciA6ICQoKSxcbiAgICAkbW1fYWxlcnQgOiAkKCksXG4gICAgJG1tX2FsZXJ0X2Rpc21pc3MgOiAkKCksXG4gICAgJHRhZ3MgOiAkKCksXG4gICAgJGhpc3RvcnkgOiAkKCksXG4gICAgJGhpc3RvcnlMaXN0IDogJCgpLFxuICAgICRyZXN1bHRzIDogJCgpLFxuICAgICRoaXN0b3J5RGF0YSA6ICQoKSxcbiAgICAkaGlzdG9yeUJ1dHRvbiA6ICQoKSxcblxuICAgICRlZGl0YWJsZSA6ICQoKSxcblxuICAgICRpbnB1dCA6ICQoKSxcblxuICAgIC8vIFRPRE86IGZpZ3VyZSBvdXQgYSBiZXR0ZXIgbmFtZSBmb3IgdGhpc1xuICAgIG1ha2VOZXdSZWNvcmRpbmdzIDogZnVuY3Rpb24oY29uZmlybWVkVHJhbnNjcmlwdCkge1xuICAgICAgICB2YXIgcHJldmlvdXNUcmFuc2NyaXB0ID0gdGhpcy5jb25maXJtZWRSZWNvcmRpbmcudHJhbnNjcmlwdCB8fCAnJztcbiAgICAgICAgaWYgKHByZXZpb3VzVHJhbnNjcmlwdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZEhpc3RvcnkodGhpcy5jb25maXJtZWRSZWNvcmRpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uZmlybWVkUmVjb3JkaW5nID0gdGhpcy5fbmV3UmVjb3JkaW5nKGNvbmZpcm1lZFRyYW5zY3JpcHQpO1xuICAgICAgICB0aGlzLnBlbmRpbmdSZWNvcmRpbmcgPSB0aGlzLl9uZXdSZWNvcmRpbmcoKTtcbiAgICB9LFxuXG4gICAgX25ld1JlY29yZGluZyA6IGZ1bmN0aW9uKHRyYW5zY3JpcHQpIHtcbiAgICAgICAgdHJhbnNjcmlwdCA9IHRyYW5zY3JpcHQgfHwgJyc7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmFuc2NyaXB0OiB0cmFuc2NyaXB0LFxuICAgICAgICAgICAgdGV4dEVudHJ5SUQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGluaXQgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuJGJvZHkgPSAkKCdib2R5Jyk7XG5cbiAgICAgICAgdGhpcy4kd2luZG93ID0gJCh3aW5kb3cpO1xuICAgICAgICB0aGlzLiRtbSA9ICQoJyNtaW5kbWVsZCcpO1xuICAgICAgICB0aGlzLiRtbV9idXR0b24gPSAkKCcjbW0tYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuJG1tX2Nsb3NlID0gJCgnI2Nsb3NlLCAjbWluZG1lbGQtb3ZlcmxheScpO1xuICAgICAgICB0aGlzLiRtbV9wdWxzZXIgPSAkKCcjbW0tcHVsc2VyJyk7XG4gICAgICAgIHRoaXMuJG1tX2J1dHRvbl9pY29uID0gJCgnI21tLWJ1dHRvbi1pY29uJyk7XG4gICAgICAgIHRoaXMuJG1tX3BhcmVudCA9ICQoJyNtaW5kbWVsZC1wYXJlbnQnKTtcbiAgICAgICAgdGhpcy4kbW1fYWxlcnRfZGlzbWlzcyA9ICQoJyNtbS1hbGVydC1kaXNtaXNzJyk7XG4gICAgICAgIHRoaXMuJG1tX2FsZXJ0ID0gJCgnI21pbmRtZWxkLWFsZXJ0Jyk7XG4gICAgICAgIHRoaXMuJGNhcmRzID0gJCgnI2NhcmRzJyk7XG4gICAgICAgIHRoaXMuJHRhZ3MgPSAkKCcjdGFncycpO1xuICAgICAgICB0aGlzLiRoaXN0b3J5ID0gJCgnI2hpc3RvcnknKTtcbiAgICAgICAgdGhpcy4kaGlzdG9yeUxpc3QgPSB0aGlzLiRoaXN0b3J5LmZpbmQoJ3VsJyk7XG4gICAgICAgIHRoaXMuJGlucHV0ID0gdGhpcy4kaGlzdG9yeUxpc3QuZmluZCgnLm9uJyk7XG4gICAgICAgIHRoaXMuJHJlc3VsdHMgPSAkKCcjcmVzdWx0cycpO1xuICAgICAgICB0aGlzLiRoaXN0b3J5RGF0YSA9ICQoJyNoaXN0b3J5LWRhdGEnKTtcbiAgICAgICAgdGhpcy4kaGlzdG9yeUJ1dHRvbiA9ICQoJyNoaXN0b3J5LWJ1dHRvbicpO1xuXG4gICAgICAgIHRoaXMuJGVkaXRhYmxlID0gJCgnLmVkaXRhYmxlJyk7XG5cbiAgICAgICAgdGhpcy5tYWtlTmV3UmVjb3JkaW5ncygpO1xuXG4gICAgICAgIC8vIE1ha2UgdGFncyBjbGlja2FibGVcbiAgICAgICAgZnVuY3Rpb24gb25UYWdDbGljaygpIHtcbiAgICAgICAgICAgIHZhciBlbnRpdHlJRCA9ICQodGhpcykuZGF0YSgnZW50aXR5SWQnKTtcbiAgICAgICAgICAgIHNlbGYudG9nZ2xlRW50aXR5U2VsZWN0ZWQoZW50aXR5SUQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJHRhZ3Mub24oJ2NsaWNrJywgJy50YWcnLCBvblRhZ0NsaWNrKTtcbiAgICAgICAgdGhpcy4kaGlzdG9yeUxpc3Qub24oJ2NsaWNrJywgJy50YWcnLCBvblRhZ0NsaWNrKTtcblxuICAgICAgICAvLyBTY3JvbGxiYXJzXG4gICAgICAgICQoJy5pbm5lci1jb250ZW50LWRpdicpLnNsaW1TY3JvbGwoe1xuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICBkaXN0YW5jZTogJzZweCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVzaXplXG4gICAgICAgIHNlbGYuJHdpbmRvdy5vbigncmVzaXplJywgZnVuY3Rpb24oKXsgc2VsZi5yZXNpemUoKTsgfSk7XG4gICAgICAgIHNlbGYucmVzaXplKCk7XG5cbiAgICAgICAgc2VsZi5zZXR1cEVkaXRhYmxlKHRydWUpOyAvLyB0cnVlID0gYWxsb3cgdHlwaW5nIGludG8gdGhlIGJveFxuXG4gICAgICAgIC8vIEFsZXJ0IGRpc21pc3NcbiAgICAgICAgc2VsZi4kbW1fYWxlcnRfZGlzbWlzcy5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBzZWxmLiRtbV9hbGVydC5yZW1vdmVDbGFzcygnb24nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSGlzdG9yeSBidXR0b25cbiAgICAgICAgc2VsZi4kaGlzdG9yeUJ1dHRvbi5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIFRvZ2dsZSB0aGUgb3Blbi9jbG9zZWQtbmVzcyBvZiBoaXN0b3J5XG4gICAgICAgICAgICB2YXIgaGlzdG9yeV9vcGVuID0gc2VsZi4kaGlzdG9yeS5oYXNDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgc2VsZi4kaGlzdG9yeS50b2dnbGVDbGFzcygnb3BlbicsICFoaXN0b3J5X29wZW4pO1xuXG4gICAgICAgICAgICBpZighaGlzdG9yeV9vcGVuKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IHNlbGYuX2hpc3RvcnlIZWlnaHQoc2VsZi4kaGlzdG9yeURhdGFbMF0uc2Nyb2xsSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBzZWxmLiRoaXN0b3J5LmNzcyhzZWxmLl9wcmVmaXgoJ3RyYW5zZm9ybScpLCAndHJhbnNsYXRlWSgnK3Njcm9sbEhlaWdodCsncHgpJyk7XG4gICAgICAgICAgICAgICAgc2VsZi4kaGlzdG9yeUJ1dHRvbi50ZXh0KCdDbG9zZSBIaXN0b3J5Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuJGhpc3RvcnkuY3NzKHNlbGYuX3ByZWZpeCgndHJhbnNmb3JtJyksICcnKTtcbiAgICAgICAgICAgICAgICBzZWxmLiRoaXN0b3J5QnV0dG9uLnRleHQoJ0V4cGFuZCBIaXN0b3J5Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNuYXAgdG8gdGhlIGJvdHRvbVxuICAgICAgICAgICAgc2VsZi5zY3JvbGxIaXN0b3J5KCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy8gTGlzdGVuIHRvIHBvc3QgbWVzc2FnZXNcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIGV2ZW50ID0gZS5vcmlnaW5hbEV2ZW50O1xuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGV2ZW50LmRhdGEuYWN0aW9uO1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEuc291cmNlICE9ICdtaW5kbWVsZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdjb25maWcnKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb25maWcgPSBldmVudC5kYXRhLmRhdGE7XG4gICAgICAgICAgICAgICAgc2VsZi5vbkNvbmZpZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ29wZW4nKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kbW1fcGFyZW50LmFkZENsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLnN0YXJ0UXVlcnkgPT09IG51bGwgJiYgc2VsZi5jb25maWcubGlzdGVuaW5nTW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9kb19vbl92b2ljZV9yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1NVm9pY2UubGlzdGVuKHNlbGYuY29uZmlnLmxpc3RlbmluZ01vZGUgPT0gJ2NvbnRpbnVvdXMnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDbG9zZSB0aGUgbW9kYWxcbiAgICAgICAgc2VsZi4kbW1fY2xvc2UuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIU1NLnN1cHBvcnQuc3BlZWNoUmVjb2duaXRpb24pIHtcbiAgICAgICAgICAgIHNlbGYuJG1tX2J1dHRvbi5oaWRlKCk7XG4gICAgICAgICAgICBzZWxmLiRtbV9wdWxzZXIuaGlkZSgpO1xuICAgICAgICAgICAgc2VsZi4kaW5wdXQuaGlkZSgpO1xuXG4gICAgICAgICAgICBzZWxmLiRib2R5LmFkZENsYXNzKCduby1zcGVlY2gnKTtcblxuICAgICAgICAgICAgdmFyICR0ZXh0X2lucHV0ID0gJCgnPGxpPicsIHsnY2xhc3MnOid0ZXh0LWlucHV0J30pO1xuICAgICAgICAgICAgdmFyICRmb3JtID0gJCgnPGZvcm0+Jyk7XG4gICAgICAgICAgICB2YXIgJGlucHV0ID0gJCgnPGlucHV0PicsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgY2xhc3M6ICdzZWFyY2gnLFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnU2VhcmNoIHF1ZXJ5J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgJGJ1dHRvbiA9ICQoJzxidXR0b24+Jywge1xuICAgICAgICAgICAgICAgIGh0bWw6ICcmbmJzcDs8c3Bhbj48L3NwYW4+JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VibWl0JyxcbiAgICAgICAgICAgICAgICBjbGFzczogJ21tLWJ1dHRvbi1iYWNrZ3JvdW5kIG1tLWJ1dHRvbi1ib3JkZXInXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJGZvcm0uc3VibWl0KGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSAkaW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAkaW5wdXQudmFsKFwiXCIpLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgJGlucHV0LmF0dHIoXCJwbGFjZWhvbGRlclwiLCB0ZXh0KTtcbiAgICAgICAgICAgICAgICBzZWxmLmFwcGVuZEhpc3Rvcnkoe3RyYW5zY3JpcHQ6IHRleHR9KTtcblxuICAgICAgICAgICAgICAgIC8vIFN1Ym1pdCFcbiAgICAgICAgICAgICAgICBzZWxmLnN1Ym1pdFRleHQodGV4dCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHRleHRfaW5wdXQuYXBwZW5kKCRmb3JtKTtcbiAgICAgICAgICAgICRmb3JtLmFwcGVuZCgkaW5wdXQpO1xuICAgICAgICAgICAgJGZvcm0uYXBwZW5kKCRidXR0b24pO1xuICAgICAgICAgICAgc2VsZi4kaGlzdG9yeUxpc3QuYXBwZW5kKCR0ZXh0X2lucHV0KTtcblxuICAgICAgICAgICAgJGlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCdXR0b24gQWN0aW9uc1xuICAgICAgICB2YXIgYnV0dG9uX3N0YXR1cyA9IHtcbiAgICAgICAgICAgIG1vdXNlZG93biA6IGZhbHNlLFxuICAgICAgICAgICAgbG9ja2VkIDogZmFsc2UsXG4gICAgICAgICAgICBqdXN0X2xvY2tlZCA6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLiRtbV9idXR0b25faWNvbi5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgYnV0dG9uX3N0YXR1cy5tb3VzZWRvd24gPSB0cnVlO1xuICAgICAgICAgICAgYnV0dG9uX3N0YXR1cy5qdXN0X2xvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZihidXR0b25fc3RhdHVzLm1vdXNlZG93bikge1xuICAgICAgICAgICAgICAgICAgICBidXR0b25fc3RhdHVzLmxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbl9zdGF0dXMuanVzdF9sb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxpc3Rlbih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLiRtbV9idXR0b25faWNvbi5vbignbW91c2V1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJ1dHRvbl9zdGF0dXMubW91c2Vkb3duID0gZmFsc2U7XG4gICAgICAgICAgICBpZighYnV0dG9uX3N0YXR1cy5sb2NrZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmxpc3RlbihmYWxzZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGJ1dHRvbl9zdGF0dXMubG9ja2VkICYmICFidXR0b25fc3RhdHVzLmp1c3RfbG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgYnV0dG9uX3N0YXR1cy5sb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBidXR0b25fc3RhdHVzLm1vdXNlZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGYubGlzdGVuKGZhbHNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnV0dG9uX3N0YXR1cy5qdXN0X2xvY2tlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjbGlja2luZyBkb2N1bWVudHNcbiAgICAgICAgdGhpcy4kY2FyZHMub24oJ2NsaWNrJywgJy5jYXJkJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICBpZiAoc2VsZi5jb25maWcucHJldmVudExpbmtzKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgICAgIHRoaXMuaXNfaW5pdCA9IHRydWU7XG5cbiAgICB9LFxuXG4gICAgY2xvc2UgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnN0b3BMaXN0ZW5pbmcoKTtcbiAgICAgICAgc2VsZi4kbW1fcGFyZW50LnJlbW92ZUNsYXNzKCdvcGVuIHJlc3VsdHMnKTtcbiAgICAgICAgc2VsZi4kYm9keS5yZW1vdmVDbGFzcygncmVzdWx0cycpO1xuICAgICAgICBzZWxmLmlzX3Jlc3VsdHMgPSBmYWxzZTtcbiAgICAgICAgc2VsZi5yZXN1bHRzX2xlbmd0aCA9IC0xO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSgnY2xvc2UnKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICB9LFxuXG4gICAgX2RvX29uX3ZvaWNlX3JlYWR5IDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZihzZWxmLmlzX3ZvaWNlX3JlYWR5KSB7XG4gICAgICAgICAgICBmbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5kb19vbl92b2ljZV9yZWFkeV9mbiA9IGZuO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGxpc3RlbiA6IGZ1bmN0aW9uKGxvY2spIHtcbiAgICAgICAgaWYoIU1NLnN1cHBvcnQuc3BlZWNoUmVjb2duaXRpb24pIHJldHVybjtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBzdGF0dXNJc1BlbmRpbmcgPSAoc2VsZi5zdGF0dXMgPT09ICdwZW5kaW5nJyk7XG4gICAgICAgIHZhciBzdGF0dXNJc0xpc3RlbmluZz0gKHNlbGYuc3RhdHVzID09PSAnbGlzdGVuaW5nJyk7XG4gICAgICAgIGlmICghbG9jaykge1xuICAgICAgICAgICAgaWYgKHN0YXR1c0lzUGVuZGluZyB8fCBzdGF0dXNJc0xpc3RlbmluZykge1xuICAgICAgICAgICAgICAgIHNlbGYuc3RvcExpc3RlbmluZygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0TGlzdGVuaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXNlbGYuaXNfbG9ja2VkICYmIChzdGF0dXNJc1BlbmRpbmcgfHwgc3RhdHVzSXNMaXN0ZW5pbmcpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fbG9ja1doaWxlUmVjb3JkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzZWxmLmlzX2xvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuaXNfbG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zdG9wTGlzdGVuaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRMaXN0ZW5pbmcodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlVUkoKTtcbiAgICB9LFxuXG4gICAgcHVsc2UgOiBmdW5jdGlvbih2b2x1bWUpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgc2NhbGUgPSAoKHZvbHVtZSAvIDEwMCkgKiAwLjUpICsgMS40O1xuICAgICAgICBzZWxmLiRtbV9wdWxzZXIuY3NzKCd0cmFuc2Zvcm0nLCAnc2NhbGUoJyArIHNjYWxlICsgJyknKTtcbiAgICB9LFxuXG4gICAgcG9zdE1lc3NhZ2UgOiBmdW5jdGlvbihhY3Rpb24sIGRhdGEpIHtcbiAgICAgICAgcGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgc291cmNlOiAnbWluZG1lbGQnLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9LCBcIipcIik7XG4gICAgfSxcblxuICAgIF9oaXN0b3J5SGVpZ2h0IDogZnVuY3Rpb24oc2Nyb2xsSGVpZ2h0KSB7XG4gICAgICAgIGlmKHNjcm9sbEhlaWdodCA+IHRoaXMuX2hlaWdodCAqIDAuOCkgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5faGVpZ2h0ICogMC44O1xuICAgICAgICBpZihzY3JvbGxIZWlnaHQgPCAyNzApIHNjcm9sbEhlaWdodCA9IDI3MDtcbiAgICAgICAgcmV0dXJuIHNjcm9sbEhlaWdodDtcbiAgICB9LFxuXG4gICAgc2V0dXBFZGl0YWJsZSA6IGZ1bmN0aW9uKGFsbG93TWFudWFsRW50cnkpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLiRoaXN0b3J5TGlzdC5vbignY2xpY2snLCAnLm9uIC50YWcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICB2YXIgZW50aXR5SUQgPSAkdGhpcy5kYXRhKCdlbnRpdHlJZCcpO1xuICAgICAgICAgICAgdmFyIG5ld1ZhbHVlID0gISghIXNlbGYuc2VsZWN0ZWRFbnRpdHlNYXBbZW50aXR5SURdKTtcbiAgICAgICAgICAgICR0aGlzLnRvZ2dsZUNsYXNzKCdzZWxlY3RlZCcsIG5ld1ZhbHVlKTtcblxuICAgICAgICAgICAgLy8gZG9uJ3QgZm9jdXMgb24gdGV4dFxuICAgICAgICAgICAgc2VsZi4kZWRpdGFibGUuYmx1cigpO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX3RleHRGb2N1c1RpbWVvdXQpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIGRvbid0IGJ1YmJsZSB1cFxuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLiRlZGl0YWJsZS5oaWRlKCk7XG5cbiAgICAgICAgaWYgKGFsbG93TWFudWFsRW50cnkpIHtcblxuICAgICAgICAgICAgc2VsZi4kaGlzdG9yeUxpc3Qub24oJ2NsaWNrJywgJy5vbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIE5vdCBhbHJlYWR5IGRvaW5nIHNvbWV0aGluZywgYW5kIG5vdCBhIHByb21wdFxuICAgICAgICAgICAgICAgIHZhciAkcHJvbXB0ID0gc2VsZi4kaW5wdXQuZmluZCgnLm1tLXByb21wdCcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLnN0YXR1cyAmJiAoJHByb21wdC5oYXNDbGFzcygnbW0tcHJvbXB0LWVycm9yJykgfHwgISRwcm9tcHQubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlZGl0YWJsZS5oZWlnaHQoc2VsZi4kaW5wdXQuaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRpbnB1dC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICRwcm9tcHQuZW1wdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSBzZWxmLiRpbnB1dC50ZXh0KCkudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlZGl0YWJsZS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVkaXRhYmxlLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVkaXRhYmxlLnZhbCh0ZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2VsZi4kZWRpdGFibGUuZm9jdXNpbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRlbGF5IHNvIHdlIGtub3cgaXQncyBub3QgYW4gZW50aXR5IGNsaWNrXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX3RleHRGb2N1c1RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0dXMgPSAnZWRpdGluZyc7XG4gICAgICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWRpdGFibGUuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2VsZi4kZWRpdGFibGUuZm9jdXNvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWRpdGFibGUuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHNlbGYuJGlucHV0LnNob3coKTtcbiAgICAgICAgICAgICAgICBzZWxmLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGYuJGVkaXRhYmxlLmtleXByZXNzKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleUNvZGUgPSBlLm9yaWdpbmFsRXZlbnQua2V5Q29kZTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5Q29kZSAhPT0gMTMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHN0eWxpbmc/XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBVc2VyIHByZXNzZWQgcmV0dXJuXG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSBzZWxmLiRlZGl0YWJsZS52YWwoKS50cmltKCk7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWRpdGFibGUuYmx1cigpO1xuICAgICAgICAgICAgICAgIHNlbGYuJGlucHV0LnRleHQodGV4dCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zdWJtaXRUZXh0KHRleHQpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3ByZWZpeF9yYXcgOiAnJyxcbiAgICBfcHJlZml4IDogZnVuY3Rpb24ocnVsZSkge1xuICAgICAgICBpZighdGhpcy5fcHJlZml4X3Jhdykge1xuICAgICAgICAgICAgdmFyIHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJycpLFxuICAgICAgICAgICAgICAgIHByZSA9IChBcnJheS5wcm90b3R5cGUuc2xpY2VcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoc3R5bGVzKVxuICAgICAgICAgICAgICAgICAgICAuam9pbignJylcbiAgICAgICAgICAgICAgICAgICAgLm1hdGNoKC8tKG1venx3ZWJraXR8bXMpLS8pIHx8IChzdHlsZXMuT0xpbmsgPT09ICcnICYmIFsnJywgJ28nXSlcbiAgICAgICAgICAgICAgICAgICAgKVsxXTtcbiAgICAgICAgICAgIHRoaXMuX3ByZWZpeF9yYXcgPSAocHJlID8gJy0nICsgcHJlICsgJy0nIDogJycpICsgcnVsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcHJlZml4X3JhdztcbiAgICB9LFxuXG4gICAgc3VibWl0VGV4dDogZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuc3RhdHVzID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIHJlY29yZGluZyA9IHNlbGYuY29uZmlybWVkUmVjb3JkaW5nO1xuICAgICAgICBpZiAocmVjb3JkaW5nLnRleHRFbnRyeUlEKSB7XG4gICAgICAgICAgICBNTS5hY3RpdmVTZXNzaW9uLnRleHRlbnRyaWVzLmRlbGV0ZShyZWNvcmRpbmcudGV4dEVudHJ5SUQpO1xuICAgICAgICB9XG4gICAgICAgIHJlY29yZGluZy50cmFuc2NyaXB0ID0gdGV4dDtcbiAgICAgICAgc2VsZi4kY2FyZHMuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgTU0uYWN0aXZlU2Vzc2lvbi50ZXh0ZW50cmllcy5wb3N0KHtcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICB3ZWlnaHQ6IDEuMFxuICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHNlbGYub25UZXh0RW50cnlQb3N0ZWQocmVzcG9uc2UpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgcmVzaXplUmVzdWx0czogZnVuY3Rpb24oc2l6ZSkge1xuICAgICB0aGlzLl9oZWlnaHQgPSBzaXplO1xuICAgICB0aGlzLiRyZXN1bHRzLm91dGVySGVpZ2h0KHNpemUpO1xuICAgICB0aGlzLiRoaXN0b3J5Lm91dGVySGVpZ2h0KHRoaXMuX2hpc3RvcnlIZWlnaHQoc2l6ZSkpO1xuICAgICB9LFxuICAgICAqL1xuXG4gICAgbG9ja1doaWxlUmVjb3JkaW5nIDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuaXNfbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbG9ja1doaWxlUmVjb3JkaW5nID0gZmFsc2U7XG4gICAgICAgIE1NLmFjdGl2ZVNlc3Npb24uc2V0TGlzdGVuZXJDb25maWcoeyAnY29udGludW91cyc6IHRoaXMuaXNfbG9ja2VkIH0pO1xuICAgIH0sXG5cbiAgICBzdGFydExpc3RlbmluZyA6IGZ1bmN0aW9uKGlzX2xvY2tlZCkge1xuICAgICAgICB0aGlzLmlzX2xvY2tlZCA9ICEhaXNfbG9ja2VkO1xuICAgICAgICB0aGlzLnN0YXR1cyA9ICdwZW5kaW5nJztcbiAgICAgICAgdGhpcy5pc19maXJzdF9zdGFydCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRUZXh0RW50cmllcyA9IFtdO1xuICAgICAgICBNTS5hY3RpdmVTZXNzaW9uLnNldExpc3RlbmVyQ29uZmlnKHsgJ2NvbnRpbnVvdXMnOiB0aGlzLmlzX2xvY2tlZCB9KTtcbiAgICAgICAgTU0uYWN0aXZlU2Vzc2lvbi5saXN0ZW5lci5zdGFydCgpO1xuXG4gICAgICAgIHRoaXMuX3VwZGF0ZVVJKCk7XG4gICAgfSxcblxuICAgIHN0b3BMaXN0ZW5pbmcgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoTU0uc3VwcG9ydC5zcGVlY2hSZWNvZ25pdGlvbikge1xuICAgICAgICAgICAgTU0uYWN0aXZlU2Vzc2lvbi5saXN0ZW5lci5jYW5jZWwoKTtcbiAgICAgICAgICAgIHRoaXMuaXNfbG9ja2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlVUkoKTtcbiAgICB9LFxuXG4gICAgc2hvd1Jlc3VsdHMgOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHRoaXMucmVzdWx0c19sZW5ndGggPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2FyZHMoZGF0YSk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVVJKCk7XG4gICAgfSxcblxuICAgIHNldFRleHRFbnRyaWVzIDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICQuZWFjaChkYXRhLCBmdW5jdGlvbihrLCB0ZXh0RW50cnkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5fdGV4dEVudHJ5TWFwW3RleHRFbnRyeS50ZXh0ZW50cnlpZF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEVudHJ5LmVudGl0eUlEcyA9IFtdO1xuICAgICAgICAgICAgICAgIHNlbGYuX3RleHRFbnRyeU1hcFt0ZXh0RW50cnkudGV4dGVudHJ5aWRdID0gdGV4dEVudHJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlRW50aXR5U2VsZWN0ZWQgOiBmdW5jdGlvbihlbnRpdHlJRCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGVudGl0eVRleHQgPSBzZWxmLl9lbnRpdHlNYXBbZW50aXR5SURdLnRleHQ7XG4gICAgICAgIHZhciBzaW1pbGFyRW50aXRpZXMgPSBzZWxmLl9zaW1pbGFyRW50aXR5TWFwW2VudGl0eVRleHRdO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHNpbWlsYXJFbnRpdGllcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzaW1pbGFyRW50aXR5SUQgPSBzaW1pbGFyRW50aXRpZXNbaV07XG4gICAgICAgICAgICB2YXIgJHRhZ3NUb1RvZ2dsZSA9ICQoJy50YWdbZGF0YS1lbnRpdHktaWQ9XCInICsgc2ltaWxhckVudGl0eUlEICsgJ1wiXScpO1xuICAgICAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWRFbnRpdHlNYXBbc2ltaWxhckVudGl0eUlEXSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBzZWxmLnNlbGVjdGVkRW50aXR5TWFwW3NpbWlsYXJFbnRpdHlJRF07XG4gICAgICAgICAgICAgICAgJHRhZ3NUb1RvZ2dsZS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZEVudGl0eU1hcFtzaW1pbGFyRW50aXR5SURdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAkdGFnc1RvVG9nZ2xlLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5fdXBkYXRlVUkoKTtcbiAgICAgICAgc2VsZi5nZXREb2N1bWVudHMoKTtcbiAgICB9LFxuXG4gICAgc2V0RW50aXRpZXMgOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGkgPSAwO1xuXG4gICAgICAgIHNlbGYuJHRhZ3MuZW1wdHkoKTtcbiAgICAgICAgc2VsZi5fc2ltaWxhckVudGl0eU1hcCA9IHt9O1xuXG4gICAgICAgICQuZWFjaChkYXRhLCBmdW5jdGlvbihrLCBlbnRpdHkpIHtcbiAgICAgICAgICAgIGlmIChlbnRpdHkuZW50aXR5dHlwZSA9PT0gJ3NlZ21lbnQnIHx8XG4gICAgICAgICAgICAgICAgZW50aXR5LmVudGl0eXR5cGUgPT09ICdrZXlwaHJhc2UnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBpZ25vcmUgdGhlc2UgZW50aXRpZXNcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHRleHQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgICAgIGlmICh0ZXh0LnNwbGl0KCcgJykubGVuZ3RoID4gMTApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGlnbm9yZSBsb25nIGVudGl0aWVzXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzZWxmLl9jdXJyZW50VGV4dEVudHJpZXMuaW5kZXhPZihlbnRpdHkudGV4dGVudHJ5aWQpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gaWdub3JlIGVudGl0aWVzIGZyb20gcGFzdCB0ZXh0IGVudHJpZXNcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHRleHRFbnRyeSA9IHNlbGYuX3RleHRFbnRyeU1hcFtlbnRpdHkudGV4dGVudHJ5aWRdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0ZXh0RW50cnkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEVudHJ5LmVudGl0eUlEcy5wdXNoKGVudGl0eS5lbnRpdHlpZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFVUSUwubG9nKCdkaWQgbm90IGZpbmQgdGV4dCBlbnRyeSBmb3IgZW50aXR5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLl9lbnRpdHlNYXBbZW50aXR5LmVudGl0eWlkXSA9IGVudGl0eTtcblxuICAgICAgICAgICAgLy8gVE9ETyhqaik6IHNob3VsZCB3ZSBsb29rIGF0IHR5cGUgaGVyZSBhcyB3ZWxsIGFzIHRleHRcbiAgICAgICAgICAgIHZhciBzaW1pbGFyRW50aXRpZXMgPSBzZWxmLl9zaW1pbGFyRW50aXR5TWFwW2VudGl0eS50ZXh0XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2ltaWxhckVudGl0aWVzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHNpbWlsYXJFbnRpdGllcyA9IHNlbGYuX3NpbWlsYXJFbnRpdHlNYXBbZW50aXR5LnRleHRdID0gW107XG5cbiAgICAgICAgICAgICAgICAvLyBvbmx5IGNyZWF0ZSB0YWcgZm9yIGZpcnN0IHZlcnNpb24gb2YgYW4gZW50aXR5XG4gICAgICAgICAgICAgICAgdmFyICRhID0gJCgnPGE+Jywge1xuICAgICAgICAgICAgICAgICAgICBocmVmOiAnIycsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiAndGFnJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogZW50aXR5LnRleHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZWxmLiR0YWdzLmFwcGVuZCgkYSk7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICRhLmF0dHIoJ2RhdGEtZW50aXR5LWlkJywgZW50aXR5LmVudGl0eWlkKTtcbiAgICAgICAgICAgICAgICBzZWxmLl9lbnRpdHlNYXBbZW50aXR5LmVudGl0eWlkXSA9IGVudGl0eTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNlbGVjdGVkRW50aXR5TWFwW2VudGl0eS5lbnRpdHlpZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgJGEuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2ltaWxhckVudGl0aWVzLnB1c2goZW50aXR5LmVudGl0eWlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi4kdGFncy50b2dnbGUoISFpKTtcblxuICAgICAgICBzZWxmLmN1cnJlbnRFbnRpdGllcyA9IHNlbGYuZW50aXRpZXNGb3JUZXh0RW50cnkoc2VsZi5jb25maXJtZWRSZWNvcmRpbmcudGV4dEVudHJ5SUQpO1xuICAgICAgICBzZWxmLl9yZXN0eWxlSGlzdG9yeSgpO1xuICAgIH0sXG5cbiAgICBlbnRpdGllc0ZvclRleHRFbnRyeSA6IGZ1bmN0aW9uKHRleHRFbnRyeUlELCBlbnRpdGllcykge1xuICAgICAgICBpZiAodHlwZW9mIHRleHRFbnRyeUlEID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgdGV4dEVudHJ5ID0gc2VsZi5fdGV4dEVudHJ5TWFwW3RleHRFbnRyeUlEXTtcbiAgICAgICAgaWYgKHR5cGVvZiBlbnRpdGllcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGVudGl0aWVzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0ZXh0RW50cnkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXRpZXM7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0RW50cnkuZW50aXR5SURzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZW50aXR5SUQgPSB0ZXh0RW50cnkuZW50aXR5SURzW2ldO1xuICAgICAgICAgICAgdmFyIGVudGl0eSA9IHNlbGYuX2VudGl0eU1hcFtlbnRpdHlJRF07XG4gICAgICAgICAgICBlbnRpdGllcy5wdXNoKGVudGl0eSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzO1xuICAgIH0sXG5cbiAgICBfaXNvdG9wZV9jb25maWcgOiB7XG4gICAgICAgIGl0ZW1TZWxlY3RvcjogJy5jYXJkJyxcbiAgICAgICAgc29ydEJ5OiAnc29ydCcsXG4gICAgICAgIGxheW91dE1vZGU6ICdtYXNvbnJ5JyxcbiAgICAgICAgZmlsdGVyOiAnOm5vdCgucmVtb3ZlZCknLFxuICAgICAgICBnZXRTb3J0RGF0YToge1xuICAgICAgICAgICAgc29ydDogJ1tkYXRhLXNvcnRdIHBhcnNlSW50J1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9jcmVhdGVDYXJkIDogZnVuY3Rpb24oZG9jKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyICRjYXJkID0gJCgnPGE+Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdjYXJkIG5ldycsXG4gICAgICAgICAgICBpZDogJ2RvY18nICsgZG9jLmRvY3VtZW50aWQsXG4gICAgICAgICAgICBocmVmOiBkb2Mub3JpZ2ludXJsLFxuICAgICAgICAgICAgdGFyZ2V0OiBzZWxmLmNvbmZpZy5jYXJkQW5jaG9yVGFyZ2V0IHx8ICdfcGFyZW50J1xuICAgICAgICB9KTtcbiAgICAgICAgJGNhcmQuYXR0cignZGF0YS1kb2N1bWVudC1pZCcsIGRvYy5kb2N1bWVudGlkKTtcblxuICAgICAgICBpZiAoc2VsZi5jb25maWcuY2FyZExheW91dCA9PT0gJ2N1c3RvbScpIHtcbiAgICAgICAgICAgIHZhciBodG1sID0gc2VsZi5jYXJkVGVtcGxhdGUoZG9jKTtcbiAgICAgICAgICAgICRjYXJkLmh0bWwoaHRtbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgJHRpdGxlID0gJCgnPGgyPicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3RpdGxlJyxcbiAgICAgICAgICAgICAgICBodG1sOiBkb2MudGl0bGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGNhcmQuYXBwZW5kKCR0aXRsZSk7XG5cbiAgICAgICAgICAgIHZhciBpbWFnZVVSTCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkb2MuaW1hZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkb2MuaW1hZ2UudXJsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZVVSTCA9IGRvYy5pbWFnZS51cmw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jLmltYWdlLnRodW1idXJsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZVVSTCA9IGRvYy5pbWFnZS50aHVtYnVybDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW1hZ2VVUkwpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGltYWdlID0gJCgnPHA+Jywge1xuICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2ltYWdlIG5vdC1sb2FkZWQnXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkaW1hZ2UuYXBwZW5kKCQoJzxpbWc+Jywge1xuICAgICAgICAgICAgICAgICAgICBzcmM6IGltYWdlVVJMXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICRjYXJkLmFwcGVuZCgkaW1hZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRpb247XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvYy5kZXNjcmlwdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IGRvYy5kZXNjcmlwdGlvbi5zdWJzdHIoMCwgMTUwKSArIChkb2MuZGVzY3JpcHRpb24ubGVuZ3RoID4gMTUwID8gXCImaGVsbGlwO1wiIDogXCJcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gXCJObyBkZXNjcmlwdGlvblwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGNhcmQuYXBwZW5kKCQoJzxwPicsIHtcbiAgICAgICAgICAgICAgICBodG1sOiBkZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBjbGFzczogJ2Rlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAvLyBmaWVsZHNcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5jb25maWcuY2FyZEZpZWxkcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRGb3JtYXR0ZWRTdHJpbmcoZm9ybWF0LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh2YWx1ZSAqIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZGF0ZS5nZXRNb250aCgpICsgMSkgKyAnLycgKyBkYXRlLmdldERheSgpICsgJy8nICsgZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUuc3Vic3RyKDAsIDEwMCkgKyAodmFsdWUubGVuZ3RoID4gMTAwID8gXCImaGVsbGlwO1wiIDogXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgY2FyZEZpZWxkcyA9IHNlbGYuY29uZmlnLmNhcmRGaWVsZHM7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGNhcmRGaWVsZHMsIGZ1bmN0aW9uKGsyLCBmaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBkb2NbZmllbGQua2V5XSB8fCBmaWVsZC5wbGFjZWhvbGRlcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBhIGxhYmVsIGlzIHNwZWNpZmllZCwgYWRkIGEgbGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQubGFiZWwgIT09ICd1bmRlZmluZWQnICYmIGZpZWxkLmxhYmVsICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkbGFiZWwgPSAkKCc8c3Bhbj4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnbGFiZWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiBmaWVsZC5sYWJlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICR2YWx1ZSA9ICQoJzxzcGFuPicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3ZhbHVlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB3ZSBhcmVuJ3QgdXNpbmcgcGxhY2Vob2xkZXIsIGZvcm1hdCB0aGUgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IGZpZWxkLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBnZXRGb3JtYXR0ZWRTdHJpbmcoZmllbGQuZm9ybWF0LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR2YWx1ZS5hZGRDbGFzcygncGxhY2Vob2xkZXInKTsgLy8gb3RoZXIgd2lzZSBhZGQgcGxhY2Vob2xkZXIgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICR2YWx1ZS50ZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZmllbGQgPSAkKCc8cD4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdtbS1kb2MtZmllbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQuY2xhc3MgIT09ICd1bmRlZmluZWQnICYmIGZpZWxkLmNsYXNzICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmaWVsZC5hZGRDbGFzcyhmaWVsZC5jbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAkZmllbGQuYXBwZW5kKCRsYWJlbCkuYXBwZW5kKCR2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkY2FyZC5hcHBlbmQoJGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkY2FyZDtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZUNhcmRzIDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBuZXdDYXJkcyA9IFtdO1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgXCJObyByZXN1bHRzXCIgbWVzc2FnZSBpZiBwcmVzZW50XG4gICAgICAgICQoJy5uby1yZXN1bHRzJywgdGhpcy4kY2FyZHMpLnJlbW92ZSgpOyAvLyBUT0RPOiBhbmltYXRlIHRoaXMgbmljZWx5P1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgY2FyZHMgZmlsdGVyZWQgb3V0IGxhc3QgdGltZVxuICAgICAgICAvLyBMZWF2ZSBvbmUgY2FyZCB0byBwcmV2ZW50IHRoZSBzaW5nbGUgY29sdW1uIGlzb3RvcGUgYnVnXG4gICAgICAgICQoJy5jYXJkLnJlbW92ZWQ6bm90KC5zaW5nbGUtY29sdW1uLWZpeCknLCB0aGlzLiRjYXJkcykucmVtb3ZlKCk7XG5cbiAgICAgICAgLy8gTWFyayBjdXJyZW50IHRvIGJlIGRlbGV0ZWQ7IHdlJ2xsIHVuLW1hcmsgdGhlbSBpZiB0aGV5IGV4aXN0XG4gICAgICAgICQoJy5jYXJkJywgdGhpcy4kY2FyZHMpLmVhY2goZnVuY3Rpb24oaywgY2FyZCkge1xuICAgICAgICAgICAgdmFyICRjYXJkID0gJChjYXJkKTtcbiAgICAgICAgICAgICRjYXJkLmFkZENsYXNzKCd0by1kZWxldGUnKTtcbiAgICAgICAgICAgICRjYXJkLmF0dHIoJ2RhdGEtc29ydCcsIGsgKyAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJC5lYWNoKGRhdGEsIGZ1bmN0aW9uKGssIGRvYykge1xuICAgICAgICAgICAgLy8gQ2FyZCBleGlzdHMsIHNvIHVwZGF0ZSBzb3J0IG9yZGVyIGFuZCBrZWVwIGl0XG4gICAgICAgICAgICBpZiAoJCgnI2RvY18nICsgZG9jLmRvY3VtZW50aWQpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJyNkb2NfJyArIGRvYy5kb2N1bWVudGlkKS5yZW1vdmVDbGFzcygndG8tZGVsZXRlJykuYXR0cignZGF0YS1zb3J0Jywgayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENhcmQgZG9lc24ndCBleGlzdCwgc28gY3JlYXRlIGl0LiAoVE9ETzogTWF5YmUgdXNlIGEgdGVtcGxhdGluZyBzeXN0ZW0/KVxuICAgICAgICAgICAgdmFyICRjYXJkID0gc2VsZi5fY3JlYXRlQ2FyZChkb2MpO1xuICAgICAgICAgICAgJGNhcmQuYXR0cignZGF0YS1zb3J0Jywgayk7XG4gICAgICAgICAgICBuZXdDYXJkcy5wdXNoKCRjYXJkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRmlsdGVyIG91dCB1bnVzZWQgY2FyZHMgKHdlIGRvbid0IGRlbGV0ZSB5ZXQgYi9jIHdlIHdhbnQgdGhlbSB0byBmYWRlIG91dClcbiAgICAgICAgJCgnLmNhcmQudG8tZGVsZXRlJywgdGhpcy4kY2FyZHMpLnJlbW92ZUNsYXNzKCd0by1kZWxldGUnKS5hZGRDbGFzcygncmVtb3ZlZCcpO1xuXG4gICAgICAgIHZhciAkbmV3Q2FyZHMgPSAkLm1ha2VBcnJheShuZXdDYXJkcyk7XG5cbiAgICAgICAgaWYgKCEkKCcuY2FyZDpub3QoLnNpbmdsZS1jb2x1bW4tZml4KScsIHNlbGYuJGNhcmRzKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLiRjYXJkcy5oYXNDbGFzcygnaXNvdG9wZScpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kY2FyZHMuaXNvdG9wZSgnZGVzdHJveScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBObyBpc290b3BlIGluc3RhbmNlIHlldDsgY3JlYXRlIGl0LlxuXG4gICAgICAgICAgICBzZWxmLiRjYXJkcy5hcHBlbmQoJG5ld0NhcmRzKTtcbiAgICAgICAgICAgIHNlbGYuJGNhcmRzLmlzb3RvcGUoc2VsZi5faXNvdG9wZV9jb25maWcpO1xuICAgICAgICAgICAgc2VsZi4kY2FyZHMucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgIHNlbGYuJGNhcmRzLmltYWdlc0xvYWRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKCcubm90LWxvYWRlZCcpLnJlbW92ZUNsYXNzKCdub3QtbG9hZGVkJyk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kY2FyZHMuaXNvdG9wZShzZWxmLl9pc290b3BlX2NvbmZpZyk7XG4gICAgICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJc290b3BlIGFscmVhZHkgZXhpc3RzLCBhcHBlbmQgY2FyZHMgdG8gaXRcblxuICAgICAgICAgICAgdGhpcy4kY2FyZHMuYXBwZW5kKCAkbmV3Q2FyZHMgKTtcblxuICAgICAgICAgICAgLy8gU2luZ2xlIG91dCB0aGUgbmV3IGNhcmRzLCBhbmQgJ2FwcGVuZCcgdGhlbSB0byBpc290b3BlICh0aGV5J3JlIGFscmVhZHkgaW4gdGhlIERPTSlcbiAgICAgICAgICAgICRuZXdDYXJkcyA9ICQoJy5uZXcnLCBzZWxmLiRjYXJkcyk7XG4gICAgICAgICAgICBzZWxmLiRjYXJkcy5pc290b3BlKCAnYXBwZW5kZWQnICwgJG5ld0NhcmRzICk7XG4gICAgICAgICAgICBzZWxmLiRjYXJkcy5pc290b3BlKCAndXBkYXRlU29ydERhdGEnICkuaXNvdG9wZShzZWxmLl9pc290b3BlX2NvbmZpZyk7XG4gICAgICAgICAgICBzZWxmLiRjYXJkcy5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgc2VsZi4kY2FyZHMuaW1hZ2VzTG9hZGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJy5ub3QtbG9hZGVkJykucmVtb3ZlQ2xhc3MoJ25vdC1sb2FkZWQnKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRjYXJkcy5pc290b3BlKHNlbGYuX2lzb3RvcGVfY29uZmlnKTtcbiAgICAgICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE86IGFuaW1hdGUgdGhpcyBuaWNlbHk/XG4gICAgICAgIGlmICgkKCcuY2FyZDpub3QoLnJlbW92ZWQpJywgdGhpcy4kY2FyZHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy4kY2FyZHMuYXBwZW5kKCQoJzxkaXY+Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzOiAnbm8tcmVzdWx0cycsXG4gICAgICAgICAgICAgICAgaHRtbDogJ05vIHJlc3VsdHMnXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCcubmV3JywgdGhpcy4kY2FyZHMpLnJlbW92ZUNsYXNzKCduZXcnKTtcbiAgICB9LFxuXG4gICAgYXBwZW5kSGlzdG9yeSA6IGZ1bmN0aW9uKHJlY29yZGluZykge1xuICAgICAgICBpZiAocmVjb3JkaW5nLnRyYW5zY3JpcHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlY29yZGluZ3MucHVzaChyZWNvcmRpbmcpO1xuXG4gICAgICAgICAgICAvLyBBcHBlbmQgdG8gdGhlIGhpc3RvcnlcbiAgICAgICAgICAgIHZhciAkbmV3X2hpc3RvcnkgPSAkKCc8bGk+Jywge1xuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3JlY29yZGluZyc6IHJlY29yZGluZyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGh0bWw6IHRoaXMuJGlucHV0Lmh0bWwoKSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiRpbnB1dC5iZWZvcmUoJG5ld19oaXN0b3J5KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRuZXdfaGlzdG9yeSk7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgbmV3IG9uZVxuICAgICAgICAgICAgdGhpcy4kaW5wdXQuaHRtbChcIiZuYnNwO1wiKTtcblxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRpbnB1dC5yZW1vdmVDbGFzcygnaGlkZScpO1xuICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsSGlzdG9yeSgpO1xuICAgICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgICAgdGhpcy5fcmVzdHlsZUhpc3RvcnkoKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVVJKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbGV0dGVyaW5nIDogZnVuY3Rpb24oJGVsLCB0ZXh0LCBwYXJlbnRDbGFzcykge1xuICAgICAgICAkZWwuZW1wdHkoKTtcbiAgICAgICAgdGV4dCA9IHRleHQuc3BsaXQoJycpO1xuICAgICAgICB2YXIgJGVsX3BhcmVudCA9ICQoJzxkaXY+JywgeydjbGFzcyc6IHBhcmVudENsYXNzfSk7XG4gICAgICAgIGZvcih2YXIgaT0wOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgJGVsX3BhcmVudC5hcHBlbmQoJCgnPHNwYW4+JywgeyB0ZXh0OiB0ZXh0W2ldIH0pKTtcbiAgICAgICAgfVxuICAgICAgICAkZWwuYXBwZW5kKCRlbF9wYXJlbnQpO1xuICAgIH0sXG5cbiAgICBfcmVzdHlsZUhpc3Rvcnk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLCBpO1xuICAgICAgICAvL3RoaXMuJGhpc3RvcnlMaXN0LmVtcHR5KCk7XG4gICAgICAgIHRoaXMuJGhpc3RvcnlMaXN0LmZpbmQoJ2xpJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZWNvcmRpbmcgPSAkKHRoaXMpLmRhdGEoJ3JlY29yZGluZycpO1xuICAgICAgICAgICAgaWYoIXJlY29yZGluZykgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBlbnRpdGllcyBmb3IgcmVjb3JkaW5nXG4gICAgICAgICAgICB2YXIgZW50aXRpZXMgPSBzZWxmLmVudGl0aWVzRm9yVGV4dEVudHJ5KHJlY29yZGluZy50ZXh0RW50cnlJRCk7XG5cbiAgICAgICAgICAgIHZhciBzdGF0cyA9IGhpZ2hsaWdodEVudGl0aWVzKGVudGl0aWVzLCByZWNvcmRpbmcudHJhbnNjcmlwdCk7XG4gICAgICAgICAgICB2YXIgJGRpdiA9ICQoJzxkaXY+JywgeydodG1sJzogc3RhdHMubWFya3VwfSk7XG5cbiAgICAgICAgICAgIHZhciAkbGkgPSAkKHRoaXMpO1xuICAgICAgICAgICAgJGxpLmVtcHR5KCk7XG4gICAgICAgICAgICAkbGkuYXBwZW5kKCRkaXYpO1xuICAgICAgICAgICAgJGxpLmF0dHIoJ2RhdGEtdGV4dC1lbnRyeS1pZCcsIHJlY29yZGluZy50ZXh0RW50cnlJRCk7XG5cbiAgICAgICAgICAgICRsaS5maW5kKCcudGFnJykuZWFjaChmdW5jdGlvbihrLCAkdGFnKSB7XG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICB2YXIgZW50aXR5SUQgPSAkdGhpcy5kYXRhKCdlbnRpdHlJZCcpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNlbGVjdGVkRW50aXR5TWFwW2VudGl0eUlEXSkge1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGkgPT09IHNlbGYuX3JlY29yZGluZ3MubGVuZ3RoIC0gMSAmJiBzZWxmLnJlY29yZGluZ3NfbGVuZ3RoICE9PSBzZWxmLl9yZWNvcmRpbmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIChmdW5jdGlvbigkZGl2KSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGRpdi5hZGRDbGFzcygnb24nKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICB9KSgkZGl2KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGRpdi5hZGRDbGFzcygnb2xkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYuc2Nyb2xsSGlzdG9yeSgpO1xuXG4gICAgICAgIC8vIFNvIHdlIGNhbiB0ZWxsIGlmIHRoZXJlJ3MgYSBuZXcgb25lXG4gICAgICAgIHRoaXMucmVjb3JkaW5nc19sZW5ndGggPSB0aGlzLl9yZWNvcmRpbmdzLmxlbmd0aDtcbiAgICB9LFxuXG4gICAgc2Nyb2xsSGlzdG9yeSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuJGhpc3RvcnlEYXRhLnNjcm9sbFRvcChzZWxmLiRoaXN0b3J5RGF0YVswXS5zY3JvbGxIZWlnaHQpO1xuICAgIH0sXG5cbiAgICBfZG9jdW1lbnRMb2NrIDoge1xuICAgICAgICBjYW5SZXF1ZXN0RG9jdW1lbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5sYXN0RG9jdW1lbnRzUmVxdWVzdCArIDUwMCA8IERhdGUubm93KCkpO1xuICAgICAgICB9LFxuICAgICAgICBsYXN0RG9jdW1lbnRzUmVxdWVzdDogMFxuICAgIH0sXG5cbiAgICBfZG9jdW1lbnRzQ2FjaGU6IHt9LFxuXG4gICAgX251bUNvbHVtbnMgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGNhcmRXaWR0aCA9IDIxODtcbiAgICAgICAgdmFyIGNhcmRQYWRkaW5nID0gMjA7XG4gICAgICAgIHZhciB3aWR0aFJlbWFpbmluZyA9IHNlbGYuJGNhcmRzLndpZHRoKCkgLSBjYXJkUGFkZGluZztcbiAgICAgICAgdmFyIG51bUNvbHMgPSAwO1xuICAgICAgICB3aGlsZSAod2lkdGhSZW1haW5pbmcgPj0gMCkge1xuICAgICAgICAgICAgbnVtQ29scysrO1xuICAgICAgICAgICAgd2lkdGhSZW1haW5pbmcgLT0gY2FyZFdpZHRoICsgY2FyZFBhZGRpbmc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bUNvbHM7XG4gICAgfSxcblxuICAgIF9udW1Eb2N1bWVudHMgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmNvbmZpZy5udW1SZXN1bHRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm51bVJlc3VsdHM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbnVtQ29scyA9IHNlbGYuX251bUNvbHVtbnMoKTtcbiAgICAgICAgdmFyIG51bURvY3MgPSBNYXRoLm1heChudW1Db2xzICogMiwgOCk7XG4gICAgICAgIGlmIChudW1Eb2NzICUgbnVtQ29scyAhPT0gMCkge1xuICAgICAgICAgICAgbnVtRG9jcyArPSBudW1Db2xzIC0gKG51bURvY3MgJSBudW1Db2xzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVtRG9jcztcbiAgICB9LFxuXG4gICAgZ2V0RG9jdW1lbnRzIDogZnVuY3Rpb24oKSB7XG4gICAgICAgIFVUSUwubG9nKCdnZXR0aW5nIGRvY3VtZW50cycpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHF1ZXJ5UGFyYW1zID0geyBsaW1pdDogc2VsZi5jb25maWcubnVtUmVzdWx0cyB8fCAxNCB9O1xuICAgICAgICB2YXIgcmVxdWVzdEtleSA9ICdkZWZhdWx0JztcbiAgICAgICAgdmFyIHNlbGVjdGVkRW50aXR5SURzID0gT2JqZWN0LmtleXMoTU1Wb2ljZS5zZWxlY3RlZEVudGl0eU1hcCk7XG4gICAgICAgIGlmIChzZWxlY3RlZEVudGl0eUlEcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXF1ZXN0S2V5ID0gSlNPTi5zdHJpbmdpZnkoc2VsZWN0ZWRFbnRpdHlJRHMpO1xuICAgICAgICAgICAgcXVlcnlQYXJhbXMuZW50aXR5aWRzID0gcmVxdWVzdEtleTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zLnRleHRlbnRyeWlkcyA9IEpTT04uc3RyaW5naWZ5KHNlbGYuX2N1cnJlbnRUZXh0RW50cmllcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gY2FjaGVkIHJlc3BvbnNlIGlmIGl0IGV4aXN0cyBhbmQgaGFzIG5vdCBleHBpcmVkIChleHBpcmUgdGltZSBvZiAxMCBtaW51dGVzKVxuICAgICAgICBpZiAoc2VsZi5fZG9jdW1lbnRzQ2FjaGUuaGFzT3duUHJvcGVydHkocmVxdWVzdEtleSkgJiZcbiAgICAgICAgICAgIERhdGUubm93KCkgLSBzZWxmLl9kb2N1bWVudHNDYWNoZVtyZXF1ZXN0S2V5XS5yZXF1ZXN0VGltZSA8IDYwMDAwMCkge1xuICAgICAgICAgICAgb25TdWNjZXNzKHNlbGYuX2RvY3VtZW50c0NhY2hlW3JlcXVlc3RLZXldLnJlc3VsdCwgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNlbGYuX2RvY3VtZW50TG9jay5jYW5SZXF1ZXN0RG9jdW1lbnRzKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXF1ZXN0VGltZSA9IHRoaXMuX2RvY3VtZW50TG9jay5sYXN0RG9jdW1lbnRzUmVxdWVzdCA9IERhdGUubm93KCk7XG4gICAgICAgIGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXN1bHQsIGNhY2hlZCkge1xuICAgICAgICAgICAgY2FjaGVkID0gISFjYWNoZWQ7XG5cbiAgICAgICAgICAgIGlmICghY2FjaGVkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fZG9jdW1lbnRzQ2FjaGVbcmVxdWVzdEtleV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0VGltZTogcmVxdWVzdFRpbWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFVUSUwubG9nKFwiR290IGRvY3VtZW50c1wiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgVVRJTC5sb2coXCJHb3QgZG9jdW1lbnRzIGZyb20gY2FjaGVcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBudW1Eb2N1bWVudHMgPSBzZWxmLl9udW1Eb2N1bWVudHMoKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5sZW5ndGggPiBudW1Eb2N1bWVudHMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGF0YS5zcGxpY2UobnVtRG9jdW1lbnRzLCByZXN1bHQuZGF0YS5sZW5ndGggLSBudW1Eb2N1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgTU1Wb2ljZS5zaG93UmVzdWx0cyhyZXN1bHQuZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvbkVycm9yKGVycm9yKSB7XG4gICAgICAgICAgICBVVElMLmxvZyhcIkVycm9yIGdldHRpbmcgZG9jdW1lbnRzOiAgKFR5cGUgXCIgKyBlcnJvci5jb2RlICtcbiAgICAgICAgICAgICAgICBcIiAtIFwiICsgZXJyb3IudHlwZSArIFwiKTogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBNTS5hY3RpdmVTZXNzaW9uLmRvY3VtZW50cy5nZXQocXVlcnlQYXJhbXMsIG9uU3VjY2Vzcywgb25FcnJvcik7XG4gICAgfSxcblxuICAgIHJlc2l6ZSA6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYodGhpcy5pc19yZXN1bHRzKSB7XG4gICAgICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuJG1tX3BhcmVudC5oZWlnaHQoKTtcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IHNpemU7XG4gICAgICAgICAgICB0aGlzLiRyZXN1bHRzLm91dGVySGVpZ2h0KHNpemUpO1xuICAgICAgICAgICAgdGhpcy4kaGlzdG9yeS5vdXRlckhlaWdodCh0aGlzLl9oaXN0b3J5SGVpZ2h0KHNpemUpKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGVfdGV4dCA6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGZ1bGxUZXh0ID0gc2VsZi5jb25maXJtZWRSZWNvcmRpbmcudHJhbnNjcmlwdCArIHNlbGYucGVuZGluZ1JlY29yZGluZy50cmFuc2NyaXB0O1xuXG4gICAgICAgIGlmIChmdWxsVGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuJGlucHV0LmVtcHR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPOiBhbmltYXRlIHRyYW5zaXRpb24gdG8gaGlnaGxpZ2h0ZWQgZW50aXRpZXMgP1xuICAgICAgICB2YXIgY29uZmlybWVkU3RhdHMgPSBoaWdobGlnaHRFbnRpdGllcyh0aGlzLmN1cnJlbnRFbnRpdGllcywgdGhpcy5jb25maXJtZWRSZWNvcmRpbmcudHJhbnNjcmlwdCk7XG4gICAgICAgIHRoaXMuJGlucHV0LmFwcGVuZCgkKCc8c3Bhbj4nLCB7XG4gICAgICAgICAgICBodG1sOiBjb25maXJtZWRTdGF0cy5tYXJrdXBcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLiRpbnB1dC5hcHBlbmQoJCgnPHNwYW4+Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdwZW5kaW5nJyxcbiAgICAgICAgICAgIGh0bWw6IHNlbGYucGVuZGluZ1JlY29yZGluZy50cmFuc2NyaXB0XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy4kaW5wdXQuYXR0cignZGF0YS10ZXh0JywgZnVsbFRleHQpO1xuICAgIH0sXG5cbiAgICBvblRleHRFbnRyeVBvc3RlZDogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIHNlbGYgPSBNTVZvaWNlO1xuICAgICAgICBVVElMLmxvZygndGV4dCBlbnRyeSBwb3N0ZWQnKTtcbiAgICAgICAgdmFyIHRleHRFbnRyeUlEID0gTU1Wb2ljZS5jb25maXJtZWRSZWNvcmRpbmcudGV4dEVudHJ5SUQgPSByZXNwb25zZS5kYXRhLnRleHRlbnRyeWlkO1xuICAgICAgICBzZWxmLiRpbnB1dC5kYXRhKCd0ZXh0ZW50cnlpZCcsIHRleHRFbnRyeUlEKTtcbiAgICAgICAgc2VsZi5fY3VycmVudFRleHRFbnRyaWVzLnB1c2godGV4dEVudHJ5SUQpO1xuICAgICAgICBkZWxldGUgc2VsZi5fZG9jdW1lbnRzQ2FjaGVbJ2RlZmF1bHQnXTtcbiAgICAgICAgc2VsZi5zZWxlY3RlZEVudGl0eU1hcCA9IHt9O1xuICAgICAgICBNTVZvaWNlLmdldERvY3VtZW50cygpO1xuICAgIH0sXG5cbiAgICBfbGlzdGVuZXJDb25maWcgOiB7XG4gICAgICAgIG9uUmVzdWx0OiBmdW5jdGlvbihyZXN1bHQgLyosIHJlc3VsdEluZGV4LCByZXN1bHRzLCBldmVudCAgPC0tIHVudXNlZCAqLykge1xuICAgICAgICAgICAgVVRJTC5sb2coXCJMaXN0ZW5lcjogb25SZXN1bHRcIiwgcmVzdWx0KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZmluYWwpIHtcbiAgICAgICAgICAgICAgICBNTVZvaWNlLm1ha2VOZXdSZWNvcmRpbmdzKHJlc3VsdC50cmFuc2NyaXB0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgTU1Wb2ljZS5wZW5kaW5nUmVjb3JkaW5nLnRyYW5zY3JpcHQgPSByZXN1bHQudHJhbnNjcmlwdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE1NVm9pY2UuX3VwZGF0ZVVJKCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU3RhcnQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBVVElMLmxvZyhcIkxpc3RlbmVyOiBvblN0YXJ0XCIpO1xuICAgICAgICAgICAgaWYgKE1NVm9pY2UuaXNfZmlyc3Rfc3RhcnQpIHtcbiAgICAgICAgICAgICAgICBNTVZvaWNlLm1ha2VOZXdSZWNvcmRpbmdzKCk7XG4gICAgICAgICAgICAgICAgTU1Wb2ljZS5pc19maXJzdF9zdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIE1NVm9pY2Uuc3RhdHVzID0gJ2xpc3RlbmluZyc7XG4gICAgICAgICAgICAgICAgTU1Wb2ljZS5fdXBkYXRlVUkoKTtcbiAgICAgICAgICAgICAgICBzdGFydFZvbHVtZU1vbml0b3IoKTtcbiAgICAgICAgICAgICAgICBNTVZvaWNlLiRjYXJkcy5hZGRDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbkVuZDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIFVUSUwubG9nKFwiTGlzdGVuZXI6IG9uRW5kXCIpO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHBlbmRpbmdUcmFuc2NyaXB0ID0gTU1Wb2ljZS5wZW5kaW5nUmVjb3JkaW5nLnRyYW5zY3JpcHQ7XG4gICAgICAgICAgICBpZiAocGVuZGluZ1RyYW5zY3JpcHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIE1NVm9pY2UubWFrZU5ld1JlY29yZGluZ3MocGVuZGluZ1RyYW5zY3JpcHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBNTVZvaWNlLiRjYXJkcy5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE1NVm9pY2UuaXNfbG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1NVm9pY2UuX2xvY2tXaGlsZVJlY29yZGluZykge1xuICAgICAgICAgICAgICAgICAgICBNTVZvaWNlLmxvY2tXaGlsZVJlY29yZGluZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBNTS5hY3RpdmVTZXNzaW9uLmxpc3RlbmVyLnN0YXJ0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIE1NVm9pY2Uuc3RhdHVzID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgZnVsbFRleHQgPSBNTVZvaWNlLmNvbmZpcm1lZFJlY29yZGluZy50cmFuc2NyaXB0ICsgTU1Wb2ljZS5wZW5kaW5nUmVjb3JkaW5nLnRyYW5zY3JpcHQ7XG4gICAgICAgICAgICAgICAgaWYoIWZ1bGxUZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBNTVZvaWNlLmxldHRlcmluZyhNTVZvaWNlLiRpbnB1dCwgJ1dob29wcywgd2UgZGlkblxcJ3QgZ2V0IHRoYXQuLi4nLCAnbW0tcHJvbXB0IG1tLXByb21wdC1lcnJvcicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIFVUSUwubG9nKCdmdWxsIHRleHQnLCBmdWxsVGV4dCk7XG5cbiAgICAgICAgICAgICAgICAvLyBQbGF5IHRoZSBzb3VuZFxuICAgICAgICAgICAgICAgICQoJyNhdWRpby1kb25lJylbMF0ucGxheSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBNTVZvaWNlLl91cGRhdGVVSSgpO1xuICAgICAgICB9LFxuICAgICAgICBvbkVycm9yOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09PSAnYWJvcnRlZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGlnbm9yZSBhYm9ydGVkIGVycm9yc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgVVRJTC5sb2coXCJMaXN0ZW5lcjogb25FcnJvciAtIFwiLCBldmVudC5lcnJvciwgZXZlbnQubWVzc2FnZSk7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmVycm9yKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbm90LWFsbG93ZWQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3NlcnZpY2Utbm90LWFsbG93ZWQnOlxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkbyBzb21ldGhpbmcgaGVyZVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xhbmd1YWdlLW5vdC1zdXBwb3J0ZWQnOlxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGhhbmRsZSB0aGlzIHdoZW4gd2UgYWxsb3cgc2V0dGluZyBsYW5ndWFnZVxuXG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIHRoZSByZXN0IGZvciBub3dcbiAgICAgICAgICAgICAgICBjYXNlICdiYWQtZ3JhbW1hcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnbmV0d29yayc6XG4gICAgICAgICAgICAgICAgY2FzZSBcIm5vLXNwZWVjaFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2F1ZGlvLWNhcHR1cmUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3NlcnZpY2Utbm90LWFsbG93ZWQnOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuICAgICAgICBvblRleHRFbnRyeVBvc3RlZDogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIE1NVm9pY2Uub25UZXh0RW50cnlQb3N0ZWQocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9jaGFuZ2VkX2NhY2hlZCA6IHt9LFxuXG4gICAgLy8gVGhpcyB3aWxsIGJyb2FkY2FzdCB1cGRhdGVkIHZhcmlhYmxlcyB0byB0aGUgbW9kYWxcbiAgICBfaXNDaGFuZ2VkIDogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB2YXIgY3VycmVudFZhbHVlID0gdGhpc1tuYW1lXTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzW25hbWVdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY3VycmVudFZhbHVlID0gSlNPTi5zdHJpbmdpZnkodGhpc1tuYW1lXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NoYW5nZWRfY2FjaGVkW25hbWVdICE9IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlZF9jYWNoZWRbbmFtZV0gPSBjdXJyZW50VmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIC8vIERvIGEgZGlydHkgY2hlY2sgb2YgYWxsIHZhcmlhYmxlcyB0byBzZWUgd2hhdCBjaGFuZ2VkXG4gICAgX2dldFVwZGF0ZWQgOiBmdW5jdGlvbihpdGVtcykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciB1cGRhdGVkID0ge307XG4gICAgICAgICQuZWFjaChpdGVtcywgZnVuY3Rpb24oaywgdikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2ICE9PSAnZnVuY3Rpb24nICYmIGtbMF0gIT0gXCJfXCIgJiYga1swXSAhPSBcIiRcIikge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLl9pc0NoYW5nZWQoaykpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZFtrXSA9IHY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgfSxcblxuICAgIC8vIFVwZGF0ZSB0aGUgVUkgdG8gcmVmbGVjdCB0aGUgc2l0ZVxuICAgIF91cGRhdGVVSSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciB1cGRhdGVzID0gc2VsZi5fZ2V0VXBkYXRlZCh0aGlzKTtcblxuICAgICAgICBpZigncmVjb3JkaW5nc19sZW5ndGgnIGluIHVwZGF0ZXMpIHtcbiAgICAgICAgICAgIGlmKHVwZGF0ZXMucmVjb3JkaW5nc19sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlbGYuJGJvZHkuYWRkQ2xhc3MoJ2hhc2hpc3RvcnknKTtcbiAgICAgICAgICAgICAgICBzZWxmLiRoaXN0b3J5QnV0dG9uLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHVwZGF0ZXMucmVjb3JkaW5nc19sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgICAgIHNlbGYuJG1tX2J1dHRvbi5hZGRDbGFzcygnc2hhZG93Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZignaXNfdm9pY2VfcmVhZHknIGluIHVwZGF0ZXMpIHtcbiAgICAgICAgICAgIGlmKHNlbGYuZG9fb25fdm9pY2VfcmVhZHlfZm4pIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRvX29uX3ZvaWNlX3JlYWR5X2ZuKCk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHNlbGYuZG9fb25fdm9pY2VfcmVhZHlfZm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZigncmVzdWx0c19sZW5ndGgnIGluIHVwZGF0ZXMpIHtcbiAgICAgICAgICAgIGlmKHVwZGF0ZXMucmVzdWx0c19sZW5ndGggPj0gMCAmJiAhc2VsZi5pc19yZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kYm9keS5hZGRDbGFzcygncmVzdWx0cycpO1xuICAgICAgICAgICAgICAgIHNlbGYuJG1tX3BhcmVudC5hZGRDbGFzcygncmVzdWx0cycpO1xuICAgICAgICAgICAgICAgIHNlbGYuaXNfcmVzdWx0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5yZXNpemUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCdzdGF0dXMnIGluIHVwZGF0ZXMpIHtcbiAgICAgICAgICAgIHNlbGYuJG1tX2J1dHRvbi5yZW1vdmVDbGFzcygnc3RhdHVzLXBlbmRpbmcnKTtcbiAgICAgICAgICAgIHNlbGYuJG1tX2J1dHRvbi5yZW1vdmVDbGFzcygnc3RhdHVzLWxpc3RlbmluZycpO1xuICAgICAgICAgICAgc2VsZi5zdGF0dXMgPSB1cGRhdGVzLnN0YXR1cztcbiAgICAgICAgICAgIGlmICh1cGRhdGVzLnN0YXR1cyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRtbV9idXR0b24uYWRkQ2xhc3MoJ3N0YXR1cy0nICsgdXBkYXRlcy5zdGF0dXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVwZGF0ZXMuc3RhdHVzID09PSAnbGlzdGVuaW5nJykge1xuICAgICAgICAgICAgICAgIHNlbGYuJGlucHV0LmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5sZXR0ZXJpbmcoc2VsZi4kaW5wdXQsICdTdGFydCBzcGVha2luZyBub3cuLi4nLCAnbW0tcHJvbXB0Jyk7XG4gICAgICAgICAgICAgICAgLy90aGlzLiRtbS5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVwZGF0ZXMuc3RhdHVzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuJG1tX3B1bHNlci5jc3MoJ3RyYW5zZm9ybScsICdzY2FsZSgwKScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuJG1tX2FsZXJ0LnRvZ2dsZUNsYXNzKCdvbicsIHVwZGF0ZXMuc3RhdHVzID09PSAncGVuZGluZycpO1xuICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoJ2lzX2xvY2tlZCcgaW4gdXBkYXRlcykge1xuICAgICAgICAgICAgc2VsZi4kbW1fYnV0dG9uLnRvZ2dsZUNsYXNzKCdsb2NrJywgdXBkYXRlcy5pc19sb2NrZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRleHROZWVkc1VwZGF0ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoJ2N1cnJlbnRFbnRpdGllcycgaW4gdXBkYXRlcykge1xuICAgICAgICAgICAgc2VsZi5jdXJyZW50RW50aXRpZXMgPSB1cGRhdGVzLmN1cnJlbnRFbnRpdGllcztcbiAgICAgICAgICAgIHRleHROZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGFzQ29uZmlybWVkUmVjb3JkaW5nID0gJ2NvbmZpcm1lZFJlY29yZGluZycgaW4gdXBkYXRlcztcbiAgICAgICAgdmFyIGhhc1BlbmRpbmdSZWNvcmRpbmcgPSAncGVuZGluZ1JlY29yZGluZycgaW4gdXBkYXRlcztcbiAgICAgICAgaWYgKGhhc0NvbmZpcm1lZFJlY29yZGluZykge1xuICAgICAgICAgICAgc2VsZi5jb25maXJtZWRSZWNvcmRpbmcgPSB1cGRhdGVzLmNvbmZpcm1lZFJlY29yZGluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzUGVuZGluZ1JlY29yZGluZykge1xuICAgICAgICAgICAgc2VsZi5wZW5kaW5nUmVjb3JkaW5nID0gdXBkYXRlcy5wZW5kaW5nUmVjb3JkaW5nO1xuICAgICAgICB9XG4gICAgICAgIHRleHROZWVkc1VwZGF0ZSA9IHRleHROZWVkc1VwZGF0ZSB8fCBoYXNDb25maXJtZWRSZWNvcmRpbmcgfHwgaGFzUGVuZGluZ1JlY29yZGluZztcblxuICAgICAgICBpZiAodGV4dE5lZWRzVXBkYXRlICYmIHNlbGYuc3RhdHVzICE9PSAnZWRpdGluZycpIHtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlX3RleHQoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59O1xuXG5NTVZvaWNlLm9uQ29uZmlnID0gZnVuY3Rpb24oKSB7XG4gICAgTU1Wb2ljZS5fY3VycmVudFRleHRFbnRyaWVzID0gW107XG5cbiAgICB2YXIgdm9pY2VOYXZPcHRpb25zID0gTU1Wb2ljZS5jb25maWc7XG5cbiAgICB2YXIgaW5pdGlhbFRleHQ7XG4gICAgaWYgKHZvaWNlTmF2T3B0aW9ucy5zdGFydFF1ZXJ5ID09PSBudWxsKSB7XG4gICAgICAgIGluaXRpYWxUZXh0ID0gJ0VuYWJsZSB0aGUgbWljcm9waG9uZS4uLic7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpbml0aWFsVGV4dCA9IHZvaWNlTmF2T3B0aW9ucy5zdGFydFF1ZXJ5O1xuICAgIH1cbiAgICAkKCcjaW5pdGlhbFRleHQnKS50ZXh0KGluaXRpYWxUZXh0KTtcblxuICAgIGlmIChNTVZvaWNlLmlzX3ZvaWNlX3JlYWR5ICYmIHZvaWNlTmF2T3B0aW9ucy5zdGFydFF1ZXJ5ICE9PSBudWxsKSB7IC8vIHdlIGhhdmUgaW5pdCBiZWZvcmVcbiAgICAgICAgTU1Wb2ljZS5zdWJtaXRUZXh0KHZvaWNlTmF2T3B0aW9ucy5zdGFydFF1ZXJ5KTtcbiAgICAgICAgTU1Wb2ljZS5fdXBkYXRlVUkoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2YgTU1Wb2ljZS5jb25maWcuYmFzZVpJbmRleCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZhciBiYXNlWkluZGV4ID0gcGFyc2VJbnQoTU1Wb2ljZS5jb25maWcuYmFzZVpJbmRleCk7XG4gICAgICAgICAgICBNTVZvaWNlLiRtbV9idXR0b24uY3NzKCd6LWluZGV4JywgYmFzZVpJbmRleCArIDEwMCk7XG4gICAgICAgICAgICBNTVZvaWNlLiRtbV9idXR0b24uZmluZCgnI2ljb24tbWljcm9waG9uZSwgI2ljb24tbXV0ZSwgI2ljb24tbG9jaycpLmNzcygnei1pbmRleCcsIGJhc2VaSW5kZXggKyAxMCk7XG4gICAgICAgICAgICBNTVZvaWNlLiRtbV9hbGVydC5jc3MoJ3otaW5kZXgnLCBiYXNlWkluZGV4ICsgMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTU1Wb2ljZS5jb25maWcucmVzZXRDYXJkc0NTUykge1xuICAgICAgICAgICAgJCgnI2NhcmRzLWNzcycpLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBNTVZvaWNlLmNvbmZpZy5jdXN0b21DU1NVUkwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB2YXIgY3NzTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgICAgICAgIGNzc0xpbmsuaHJlZiA9IE1NVm9pY2UuY29uZmlnLmN1c3RvbUNTU1VSTDtcbiAgICAgICAgICAgIGNzc0xpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICAgICAgY3NzTGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoY3NzTGluayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIE1NVm9pY2UuY29uZmlnLmN1c3RvbUNTUyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZhciBjc3NTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICBjc3NTdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgICAgIGNzc1N0eWxlLmlubmVySFRNTCA9IE1NVm9pY2UuY29uZmlnLmN1c3RvbUNTUztcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoY3NzU3R5bGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE1NVm9pY2UuY29uZmlnLmNhcmRMYXlvdXQgPT09ICdjdXN0b20nKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIE1NVm9pY2UuY2FyZFRlbXBsYXRlID0gXy50ZW1wbGF0ZShNTVZvaWNlLmNvbmZpZy5jYXJkVGVtcGxhdGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIFVUSUwubG9nKCdWb2ljZSBOYXZpZ2F0b3Igd2FzIHVuYWJsZSB0byBwYXJzZSBjYXJkIHRlbXBsYXRlJyk7XG4gICAgICAgICAgICAgICAgTU1Wb2ljZS5jb25maWcuY2FyZExheW91dCA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBNTV9VU0VSX0lEX1BSRUZJWCA9ICd2bnUnO1xuICAgICAgICB2YXIgTU1fVVNFUl9OQU1FID0gJ1ZvaWNlIE5hdmlnYXRvciBVc2VyJztcbiAgICAgICAgdmFyIE1NX1VTRVJfSURfQ09PS0lFID0gJ3ZvaWNlX25hdmlnYXRvcl91c2VyX2lkJztcblxuICAgICAgICB2YXIgTU1fQ09ORklHID0ge1xuICAgICAgICAgICAgYXBwaWQ6IHZvaWNlTmF2T3B0aW9ucy5hcHBJRCxcbiAgICAgICAgICAgIG9uSW5pdDogb25NTUluaXRcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHR5cGVvZiB2b2ljZU5hdk9wdGlvbnMuY2xlYW5VcmwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBNTV9DT05GSUcuY2xlYW5VcmwgPSB2b2ljZU5hdk9wdGlvbnMuY2xlYW5Vcmw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2b2ljZU5hdk9wdGlvbnMuZmF5ZUNsaWVudFVybCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIE1NX0NPTkZJRy5mYXllQ2xpZW50VXJsID0gdm9pY2VOYXZPcHRpb25zLmZheWVDbGllbnRVcmw7XG4gICAgICAgIH1cbiAgICAgICAgTU0uaW5pdChNTV9DT05GSUcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTU1Jbml0ICgpIHtcbiAgICAgICAgaWYgKHZvaWNlTmF2T3B0aW9ucy5tbUNyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAvLyBObyBuZWVkIHRvIGZldGNoIHRva2VuLCB1c2VyLCBvciBjcmVhdGUgc2Vzc2lvblxuICAgICAgICAgICAgTU0uc2V0VG9rZW4odm9pY2VOYXZPcHRpb25zLm1tQ3JlZGVudGlhbHMudG9rZW4pO1xuICAgICAgICAgICAgTU0uc2V0QWN0aXZlVXNlcklEKHZvaWNlTmF2T3B0aW9ucy5tbUNyZWRlbnRpYWxzLnVzZXJJRCk7XG4gICAgICAgICAgICBNTS5zZXRBY3RpdmVTZXNzaW9uSUQodm9pY2VOYXZPcHRpb25zLm1tQ3JlZGVudGlhbHMuc2Vzc2lvbklEKTtcbiAgICAgICAgICAgIG9uU2Vzc2lvblN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnZXRUb2tlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ3VpZCgpIHtcbiAgICAgICAgcmV0dXJuICgneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICAgIHZhciByID0gTWF0aC5yYW5kb20oKSoxNnwwLCB2ID0gYyA9PSAneCcgPyByIDogKHImMHgzfDB4OCk7XG4gICAgICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRVc2VySUQoKSB7XG4gICAgICAgIC8vIGdldCB1c2VyIGlkIGNvb2tpZVxuICAgICAgICB2YXIgdXNlcklEID0gJC5jb29raWUoTU1fVVNFUl9JRF9DT09LSUUpO1xuICAgICAgICBpZiAodHlwZW9mIHVzZXJJRCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHVzZXJJRCA9IE1NX1VTRVJfSURfUFJFRklYICsgJy0nICsgZ3VpZCgpO1xuICAgICAgICAgICAgJC5jb29raWUoTU1fVVNFUl9JRF9DT09LSUUsIHVzZXJJRCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVzZXJJRDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUb2tlbigpIHtcbiAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgVVRJTC5sb2coJ1N1Y2Nlc3NmdWxseSBnb3QgdG9rZW4nKTtcbiAgICAgICAgICAgIHNldFVzZXIocmVzdWx0LnVzZXIudXNlcmlkKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvbkVycm9yIChlcnJvcikge1xuICAgICAgICAgICAgVVRJTC5sb2coJ1Rva2VuIHdhcyBub3QgdmFsaWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB1c2VySUQgPSBnZXRVc2VySUQoKTtcbiAgICAgICAgTU0uZ2V0VG9rZW4oe1xuICAgICAgICAgICAgYW5vbnltb3VzOiB7XG4gICAgICAgICAgICAgICAgdXNlcmlkOiB1c2VySUQsXG4gICAgICAgICAgICAgICAgbmFtZTogTU1fVVNFUl9OQU1FLFxuICAgICAgICAgICAgICAgIGRvbWFpbjogd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyovXG4gICAgICAgIH0sIG9uU3VjY2Vzcywgb25FcnJvcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0VXNlcih1c2VySUQpIHtcbiAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgY3JlYXRlU2Vzc2lvbigpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IgKGVycm9yKSB7XG4gICAgICAgICAgICBVVElMLmxvZyhcIkVycm9yIHNldHRpbmcgdXNlciBzZXNzaW9uOiAgKFR5cGUgXCIgKyBlcnJvci5jb2RlICtcbiAgICAgICAgICAgICAgICBcIiAtIFwiICsgZXJyb3IudHlwZSArIFwiKTogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBNTS5zZXRBY3RpdmVVc2VySUQodXNlcklELCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNlc3Npb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgIHNldFNlc3Npb24ocmVzdWx0LmRhdGEuc2Vzc2lvbmlkKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvbkVycm9yIChlcnJvcikge1xuICAgICAgICAgICAgVVRJTC5sb2coXCJFcnJvciBjcmVhdGluZyBuZXcgc2Vzc2lvbjogIChUeXBlIFwiICsgZXJyb3IuY29kZSArXG4gICAgICAgICAgICAgICAgXCIgLSBcIiArIGVycm9yLnR5cGUgKyBcIik6IFwiICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB2YXIgc2Vzc2lvbk5hbWUgPSBcIlZvaWNlIE5hdmlnYXRvciAtIFwiICsgZGF0ZS50b1RpbWVTdHJpbmcoKSArIFwiIFwiICsgZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgTU0uYWN0aXZlVXNlci5zZXNzaW9ucy5wb3N0KHtcbiAgICAgICAgICAgIG5hbWU6IHNlc3Npb25OYW1lLFxuICAgICAgICAgICAgcHJpdmFjeW1vZGU6ICdpbnZpdGVvbmx5J1xuICAgICAgICB9LCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFNlc3Npb24oc2Vzc2lvbklEKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IgKGVycm9yKSB7XG4gICAgICAgICAgICBVVElMLmxvZyhcIkVycm9yIHNldHRpbmcgc2Vzc2lvbjogIChUeXBlIFwiICsgZXJyb3IuY29kZSArXG4gICAgICAgICAgICAgICAgXCIgLSBcIiArIGVycm9yLnR5cGUgKyBcIik6IFwiICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgTU0uc2V0QWN0aXZlU2Vzc2lvbklEKHNlc3Npb25JRCwgb25TZXNzaW9uU3RhcnQsIG9uRXJyb3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uU2Vzc2lvblN0YXJ0ICgpIHtcbiAgICAgICAgc3Vic2NyaWJlVG9UZXh0RW50cmllcygpO1xuICAgICAgICBzdWJzY3JpYmVUb0VudGl0aWVzKCk7XG4gICAgICAgIHNldHVwU2Vzc2lvbkxpc3RlbmVyKCk7XG4gICAgICAgIE1NVm9pY2UuaXNfdm9pY2VfcmVhZHkgPSB0cnVlO1xuICAgICAgICBNTVZvaWNlLl91cGRhdGVVSSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1YnNjcmliZVRvVGV4dEVudHJpZXMoKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgIFVUSUwubG9nKFwiU3Vic2NyaWJlZCB0byB0ZXh0IGVudHJpZXMhXCIpO1xuICAgICAgICAgICAgLy8gT3B0aW9uYWxseSBzdWJtaXQgc3RhcnQgcXVlcnlcbiAgICAgICAgICAgIGlmICh2b2ljZU5hdk9wdGlvbnMuc3RhcnRRdWVyeSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIE1NVm9pY2Uuc3VibWl0VGV4dCh2b2ljZU5hdk9wdGlvbnMuc3RhcnRRdWVyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25FcnJvcigpIHtcbiAgICAgICAgICAgIFVUSUwubG9nKFwiRXJyb3Igc3Vic2NyaWJpbmcgdG8gdGV4dCBlbnRyaWVzOiAgKFR5cGUgXCIgKyBlcnJvci5jb2RlICtcbiAgICAgICAgICAgICAgICBcIiAtIFwiICsgZXJyb3IudHlwZSArIFwiKTogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBNTS5hY3RpdmVTZXNzaW9uLnRleHRlbnRyaWVzLm9uVXBkYXRlKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgTU1Wb2ljZS5zZXRUZXh0RW50cmllcyhyZXN1bHQuZGF0YSk7XG4gICAgICAgIH0sIG9uU3VjY2Vzcywgb25FcnJvcik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN1YnNjcmliZVRvRW50aXRpZXMoKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgIFVUSUwubG9nKFwiU3Vic2NyaWJlZCB0byBlbnRpdGllcyFcIik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25FcnJvciAoZXJyb3IpIHtcbiAgICAgICAgICAgIFVUSUwubG9nKFwiRXJyb3Igc3Vic2NyaWJpbmcgdG8gZW50aXRpZXM6ICAoVHlwZSBcIiArIGVycm9yLmNvZGUgK1xuICAgICAgICAgICAgICAgIFwiIC0gXCIgKyBlcnJvci50eXBlICsgXCIpOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIE1NLmFjdGl2ZVNlc3Npb24uZW50aXRpZXMub25VcGRhdGUoZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICBVVElMLmxvZygnUmVjZWl2ZWQgZW50aXRpZXMgdXBkYXRlJyk7XG4gICAgICAgICAgICBNTVZvaWNlLnNldEVudGl0aWVzKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgfSwgb25TdWNjZXNzLCBvbkVycm9yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cFNlc3Npb25MaXN0ZW5lcigpIHtcbiAgICAgICAgTU0uYWN0aXZlU2Vzc2lvbi5zZXRMaXN0ZW5lckNvbmZpZyhNTVZvaWNlLl9saXN0ZW5lckNvbmZpZyk7XG4gICAgfVxufTtcblxuJChmdW5jdGlvbiAoKSB7XG4gICAgTU1Wb2ljZS5pbml0KCk7XG59KTtcblxudmFyIGEgPSB7XG4gICAgc3RyZWFtIDogZmFsc2UsXG4gICAgY29udGV4dCA6IGZhbHNlLFxuICAgIGFuYWx5emVyIDogZmFsc2UsXG4gICAgZnJlcXVlbmNpZXMgOiBmYWxzZSxcbiAgICB0aW1lcyA6IGZhbHNlLFxuICAgIGF1ZGlvX3N0YXJ0ZWQgOiBmYWxzZVxufTtcbmZ1bmN0aW9uIHN0YXJ0Vm9sdW1lTW9uaXRvcigpIHtcbiAgICBpZiAoIWEuYXVkaW9fc3RhcnRlZCkge1xuICAgICAgICAvLyBHRVRVU0VSTUVESUEgSU5QVVRcbiAgICAgICAgbmF2aWdhdG9yLmdldE1lZGlhID0gKG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgfHxcbiAgICAgICAgICAgIG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgfHxcbiAgICAgICAgICAgIG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEgfHxcbiAgICAgICAgICAgIG5hdmlnYXRvci5tc0dldFVzZXJNZWRpYSk7XG4gICAgICAgIHdpbmRvdy5BdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG5cbiAgICAgICAgYS5jb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICAgICAgICBhLmFuYWx5emVyID0gYS5jb250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7XG4gICAgICAgIGEuYW5hbHl6ZXIuc21vb3RoaW5nVGltZUNvbnN0YW50ID0gMC4xODtcbiAgICAgICAgYS5hbmFseXplci5mZnRTaXplID0gMjU2O1xuXG4gICAgICAgIGEuZnJlcXVlbmNpZXMgPSBuZXcgVWludDhBcnJheSggYS5hbmFseXplci5mcmVxdWVuY3lCaW5Db3VudCApO1xuICAgICAgICBhLnRpbWVzID0gbmV3IFVpbnQ4QXJyYXkoIGEuYW5hbHl6ZXIuZnJlcXVlbmN5QmluQ291bnQgKTtcblxuICAgICAgICBuYXZpZ2F0b3IuZ2V0TWVkaWEgKCB7IGF1ZGlvOiB0cnVlIH0sIG1pY3JvcGhvbmVSZWFkeSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBVVElMLmxvZyhcIlRoZSBmb2xsb3dpbmcgZXJyb3Igb2NjdXJlZDogXCIgKyBlcnIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhLmF1ZGlvX3N0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbG9vcCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1pY3JvcGhvbmVSZWFkeShzdHJlYW0pIHtcbiAgICAgICAgYS5zdHJlYW0gPSBzdHJlYW07XG4gICAgICAgIHZhciBzdHJlYW1fc291cmNlID0gYS5jb250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKCBzdHJlYW0gKTtcbiAgICAgICAgc3RyZWFtX3NvdXJjZS5jb25uZWN0KCBhLmFuYWx5emVyICk7XG4gICAgICAgIGxvb3AoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICBpZiAoIU1NVm9pY2Uuc3RhdHVzIHx8IHN0YXR1cyA9PT0gJ2VkaXRpbmcnKSB7XG4gICAgICAgICAgICAvLyBzdG9wIHJlY29yZGluZ1xuICAgICAgICAgICAgYS5zdHJlYW0uc3RvcCgpO1xuICAgICAgICAgICAgYS5hdWRpb19zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBhLmFuYWx5emVyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKCBhLmZyZXF1ZW5jaWVzICk7XG4gICAgICAgIGEuYW5hbHl6ZXIuZ2V0Qnl0ZVRpbWVEb21haW5EYXRhKCBhLnRpbWVzICk7XG5cbiAgICAgICAgTU1Wb2ljZS5wdWxzZShnZXRWb2x1bWUoKSk7XG5cbiAgICAgICAgc2V0VGltZW91dChsb29wLCA3NSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Vm9sdW1lKCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoIGdldEZyZXFlbmN5UmFuZ2UoIDAsIGEuYW5hbHl6ZXIuZnJlcXVlbmN5QmluQ291bnQgLSAxICksIDEwICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RnJlcWVuY3lSYW5nZShmcm9tLCB0bykge1xuICAgICAgICB2YXIgdm9sdW1lID0gMDtcblxuICAgICAgICBmb3IgKCB2YXIgaSA9IGZyb207IGkgPCB0bzsgaSsrICkge1xuICAgICAgICAgICAgdm9sdW1lICs9IGEuZnJlcXVlbmNpZXNbaV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdm9sdW1lIC8gKCB0byAtIGZyb20gKTtcbiAgICB9XG59O1xuIiwicmVxdWlyZSgnLi92ZW5kb3IvY29udGVudGxvYWRlZCcpO1xuXG4vKiBBIHdyYXBwZXIgZm9yIGRvbSBlbGVtZW50cywgYmFzaWNhbGx5IGEgbGl0ZSB2ZXJzaW9uIG9mIGpRdWVyeSdzICQgKi9cbmV4cG9ydHMuZWwgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBmdW5jdGlvbihldmVudCwgZnVuYykge1xuICAgICAgICAgICAgaWYoZWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsZnVuYyxmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoZWwuYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBlbC5hdHRhY2hFdmVudChcIm9uXCIrZXZlbnQsZnVuYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMub24oJ2NsaWNrJywgZnVuYyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAga2V5cHJlc3M6IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgICAgICB0aGlzLm9uKCdrZXlwcmVzcycsIGZ1bmMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoJyhefFxcXFxzKyknICsgY2xhc3NOYW1lICsgJyhcXFxccyt8JCknLCAnZycpLFxuICAgICAgICAgICAgICAgICckMSdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lICsgXCIgXCIgKyBjbGFzc05hbWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnRzLmNvbnZlcnRUb0Fic29sdXRlUGF0aCA9IGZ1bmN0aW9uKGhyZWYpIHtcbiAgICB2YXIgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGFuY2hvci5ocmVmID0gaHJlZjtcbiAgICByZXR1cm4gKGFuY2hvci5wcm90b2NvbCArICcvLycgKyBhbmNob3IuaG9zdCArIGFuY2hvci5wYXRobmFtZSArIGFuY2hvci5zZWFyY2ggKyBhbmNob3IuaGFzaCk7XG59O1xuXG5mdW5jdGlvbiBhZGRMZWFkaW5nWmVyb3MobnVtYmVyLCBkaWdpdHMpIHtcbiAgICB2YXIgYmFzZSA9IE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICAgIG51bWJlciArPSBiYXNlO1xuICAgIG51bWJlciA9IG51bWJlci50b1N0cmluZygpO1xuICAgIHJldHVybiBudW1iZXIuc3Vic3RyaW5nKG51bWJlci5sZW5ndGggLSBkaWdpdHMpO1xufVxuXG5leHBvcnRzLnRpbWVzdGFtcCA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgZGF0ZSA9IGRhdGUgfHwgbmV3IERhdGUoKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0RnVsbFllYXIoKSwgNCkgKyAnLidcbiAgICAgICAgKyBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRNb250aCgpICsgMSwgMikgKyAnLidcbiAgICAgICAgKyBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXREYXRlKCksIDIpICsgJyAnICsgZGF0ZS50b1RpbWVTdHJpbmcoKTtcbn07XG5cbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGFyZ3Muc3BsaWNlKDAsIDAsIGV4cG9ydHMudGltZXN0YW1wKCkpO1xuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xufTtcblxuZXhwb3J0cy5jb250ZW50TG9hZGVkID0gY29udGVudExvYWRlZDsiLCIvKiFcbiAqIGNvbnRlbnRsb2FkZWQuanNcbiAqXG4gKiBBdXRob3I6IERpZWdvIFBlcmluaSAoZGllZ28ucGVyaW5pIGF0IGdtYWlsLmNvbSlcbiAqIFN1bW1hcnk6IGNyb3NzLWJyb3dzZXIgd3JhcHBlciBmb3IgRE9NQ29udGVudExvYWRlZFxuICogVXBkYXRlZDogMjAxMDEwMjBcbiAqIExpY2Vuc2U6IE1JVFxuICogVmVyc2lvbjogMS4yXG4gKlxuICogVVJMOlxuICogaHR0cDovL2phdmFzY3JpcHQubndib3guY29tL0NvbnRlbnRMb2FkZWQvXG4gKiBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vQ29udGVudExvYWRlZC9NSVQtTElDRU5TRVxuICpcbiAqL1xuXG4vLyBAd2luIHdpbmRvdyByZWZlcmVuY2Vcbi8vIEBmbiBmdW5jdGlvbiByZWZlcmVuY2VcbndpbmRvdy5jb250ZW50TG9hZGVkID0gZnVuY3Rpb24gY29udGVudExvYWRlZCh3aW4sIGZuKSB7XG5cblx0dmFyIGRvbmUgPSBmYWxzZSwgdG9wID0gdHJ1ZSxcblxuXHRkb2MgPSB3aW4uZG9jdW1lbnQsIHJvb3QgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuXG5cdGFkZCA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ2F0dGFjaEV2ZW50Jyxcblx0cmVtID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnZGV0YWNoRXZlbnQnLFxuXHRwcmUgPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICcnIDogJ29uJyxcblxuXHRpbml0ID0gZnVuY3Rpb24oZSkge1xuXHRcdGlmIChlLnR5cGUgPT0gJ3JlYWR5c3RhdGVjaGFuZ2UnICYmIGRvYy5yZWFkeVN0YXRlICE9ICdjb21wbGV0ZScpIHJldHVybjtcblx0XHQoZS50eXBlID09ICdsb2FkJyA/IHdpbiA6IGRvYylbcmVtXShwcmUgKyBlLnR5cGUsIGluaXQsIGZhbHNlKTtcblx0XHRpZiAoIWRvbmUgJiYgKGRvbmUgPSB0cnVlKSkgZm4uY2FsbCh3aW4sIGUudHlwZSB8fCBlKTtcblx0fSxcblxuXHRwb2xsID0gZnVuY3Rpb24oKSB7XG5cdFx0dHJ5IHsgcm9vdC5kb1Njcm9sbCgnbGVmdCcpOyB9IGNhdGNoKGUpIHsgc2V0VGltZW91dChwb2xsLCA1MCk7IHJldHVybjsgfVxuXHRcdGluaXQoJ3BvbGwnKTtcblx0fTtcblxuXHRpZiAoZG9jLnJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJykgZm4uY2FsbCh3aW4sICdsYXp5Jyk7XG5cdGVsc2Uge1xuXHRcdGlmIChkb2MuY3JlYXRlRXZlbnRPYmplY3QgJiYgcm9vdC5kb1Njcm9sbCkge1xuXHRcdFx0dHJ5IHsgdG9wID0gIXdpbi5mcmFtZUVsZW1lbnQ7IH0gY2F0Y2goZSkgeyB9XG5cdFx0XHRpZiAodG9wKSBwb2xsKCk7XG5cdFx0fVxuXHRcdGRvY1thZGRdKHByZSArICdET01Db250ZW50TG9hZGVkJywgaW5pdCwgZmFsc2UpO1xuXHRcdGRvY1thZGRdKHByZSArICdyZWFkeXN0YXRlY2hhbmdlJywgaW5pdCwgZmFsc2UpO1xuXHRcdHdpblthZGRdKHByZSArICdsb2FkJywgaW5pdCwgZmFsc2UpO1xuXHR9XG5cbn1cbiJdfQ==
