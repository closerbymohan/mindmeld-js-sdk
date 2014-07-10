var UTIL =  require('./util');
var highlightEntities = require('./entity-highlighting');
var $ = window.$ = window.jQuery = require('./vendor/jquery-1.11.1');
require('./vendor/jquery.slimscroll');
require('./vendor/jquery.cookie-1.4.0');
var _ = require('lodash/dist/lodash.compat');
var MM = window.MM = window.MM || {};
require('../../../../dist/sdk/mindmeld');
var imagesLoaded = require('./vendor/imagesloaded.pkgd');
var Isotope = require('./vendor/isotope.pkgd');

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
            if (event.data.source !== 'mindmeld') {
                return;
            }

            if (action === 'config') {
                self.config = event.data.data;
                self.onConfig();
            }
            if (action === 'open') {
                var config = event.data.data;
                self.$mm_parent.addClass('open');
                if (MMVoice.is_voice_ready && config.startQuery !== null) { // we have init before
                    MMVoice.submitText(config.startQuery);
                    MMVoice._updateUI();
                }
                else if (self.config.startQuery === null && self.config.listeningMode) {
                    self._do_on_voice_ready(function() {
                        MMVoice.listen(self.config.listeningMode === 'continuous');
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

            if (self.config.cardLinkBehavior === false) {
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
            target: self.config.cardLinkBehavior || '_parent'
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
                    'recording': recording
                },
                html: this.$input.html()
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
