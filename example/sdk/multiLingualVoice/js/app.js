(function () {
    'use strict';

    /**
     * Generates unique identifier
     * @returns {string}
     */
    function guid() {
        return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        }));
    }

    // available languages
    var langs = [

        ['Afrikaans',             ['af-ZA']],
        ['العربية' + ' (Arabic)', ['ar-EG', 'مصر‎' + ' (Egypt)'],
            ['ar-JO', 'الأردن' + ' (Jordan)'],
            ['ar-KW', 'الكويت' + ' (Kuwait)'],
            ['ar-LB', 'لبنان' + ' (Lebanon)'],
            ['ar-QA', 'قطر' + ' (Qatar)'],
            ['ar-AE', 'الإمارات العربية المتحدة' + ' (UAE)'],
            ['ar-MA', 'المغربية' + ' (Morocco)'],
            ['ar-IQ', 'العراق' + ' (Iraq)'],
            ['ar-DZ', 'الجزائر' + ' (Algeria)'],
            ['ar-BH', 'البحرين' + ' (Bahrain)'],
            ['ar-LY', 'ليبيا' + ' (Lybia)'],
            ['ar-OM', 'عمان' + ' (Oman)'],
            ['ar-SA', 'العربية السعودية' + ' (Saudi Arabia)'],
            ['ar-TN', 'تونس' + ' (Tunisia)'],
            ['ar-YE', 'يمني' + ' (Yemen)']],
        ['Bahasa Indonesia',      ['id-ID']],
        ['Bahasa Melayu',         ['ms-MY']],
        ['Català',                ['ca-ES']],
        ['Čeština',               ['cs-CZ']],
        ['Deutsch',               ['de-DE']],
        ['English',               ['en-AU', 'Australia'],
            ['en-CA', 'Canada'],
            ['en-IN', 'India'],
            ['en-NZ', 'New Zealand'],
            ['en-ZA', 'South Africa'],
            ['en-GB', 'United Kingdom'],
            ['en-US', 'United States']],
        ['Español',               ['es-AR', 'Argentina'],
            ['es-BO', 'Bolivia'],
            ['es-CL', 'Chile'],
            ['es-CO', 'Colombia'],
            ['es-CR', 'Costa Rica'],
            ['es-EC', 'Ecuador'],
            ['es-SV', 'El Salvador'],
            ['es-ES', 'España'],
            ['es-US', 'Estados Unidos'],
            ['es-GT', 'Guatemala'],
            ['es-HN', 'Honduras'],
            ['es-MX', 'México'],
            ['es-NI', 'Nicaragua'],
            ['es-PA', 'Panamá'],
            ['es-PY', 'Paraguay'],
            ['es-PE', 'Perú'],
            ['es-PR', 'Puerto Rico'],
            ['es-DO', 'República Dominicana'],
            ['es-UY', 'Uruguay'],
            ['es-VE', 'Venezuela']],
        ['Euskara',               ['eu-ES']],
        ['Français',              ['fr-FR']],
        ['Galego',                ['gl-ES']],
        ['Hrvatski',              ['hr_HR']],
        ['IsiZulu',               ['zu-ZA']],
        ['Íslenska',              ['is-IS']],
        ['Italiano',              ['it-IT', 'Italia'],
            ['it-CH', 'Svizzera']],
        ['עברית' + ' (Hebrew)',   ['he']],
        ['Magyar',                ['hu-HU']],
        ['Nederlands',            ['nl-NL']],
        ['Norsk',                 ['no-NO']],
        ['Norsk bokmål',          ['nb-NO']],
        ['Polski',                ['pl-PL']],
        ['Português',             ['pt-BR', 'Brasil'],
            ['pt-PT', 'Portugal']],
        ['Română',                ['ro-RO']],
        ['Slovenčina',            ['sk-SK']],
        ['Suomi',                 ['fi-FI']],
        ['Svenska',               ['sv-SE']],
        ['Türkçe',                ['tr-TR']],
        ['български',             ['bg-BG']],
        ['Pусский',               ['ru-RU']],
        ['Српски',                ['sr-RS'], ''],
        ['한국어',                   ['ko-KR']],
        ['中文',                    ['cmn-Hans-CN', '普通话 (中国大陆)'],
            ['cmn-Hans-HK', '普通话 (香港)'],
            ['cmn-Hant-TW', '中文 (台灣)'],
            ['yue-Hant-HK', '粵語 (香港)']],
        ['日本語',                   ['ja-JP']],
        ['Lingua latīna',         ['la']]
    ];

    var MM_APP_ID = 'ENTER_YOUR_APP_ID';
    var MM_APP_SECRET = 'ENTER_YOUR_APP_SECRET';

    var MM_SIMPLE_USER_ID_PREFIX = 'mlvu';
    var MM_SIMPLE_USER_NAME = 'Multilingual Voice User';
    var MM_SIMPLE_USER_ID_COOKIE = 'multilingual_voice_user_id';

    var self;
    var VoiceNavigator = {

        // element references
        $textBox: $(),
        $textStream: $(),
        $confirmed: $(),
        $pending: $(),
        $microphone: $(),
        $documentContainer: $(),
        $documents: $(),
        $languages: $(),
        $selectLanguage: $(),
        $selectDialect: $(),

        // initialization
        init: function () {
            // get jquery references to elements
            self.$textBox = $('#textBox');
            self.$textStream = $('#textStream');
            self.$confirmed = $('#confirmed');
            self.$pending = $('#pending');
            self.$microphone = $('#microphone');
            self.$documentContainer = $('#document-container');
            self.$documents = $('#documents');
            self.$languages = $('#languages');
            self.$selectLanguage = $('#select-language');
            self.$selectDialect = $('#select-dialect');

            // populate speech recognition languages
            var selectLanguage = self.$selectLanguage[0];
            var selectDialect = self.$selectDialect[0];

            for (var i = 0; i < langs.length; i++) {
                selectLanguage.options[i] = new Option(langs[i][0], i);
            }

            // update dialects based on the currently selected language
            function updateDialects () {
                var i;
                for (i = selectDialect.options.length - 1; i >= 0; i--) {
                    selectDialect.remove(i);
                }
                var list = langs[selectLanguage.selectedIndex];
                for (i = 1; i < list.length; i++) {
                    selectDialect.options.add(new Option(list[i][1], list[i][0]));
                }
                if (list[1].length === 1) {
                    self.$selectDialect.hide();
                } else {
                    self.$selectDialect.show();
                }
            }

            // default to American English
            selectLanguage.selectedIndex = 7; // english
            updateDialects();
            selectDialect.selectedIndex = 6; // usa

            // update the dialects when the language is changed
            self.$selectLanguage.change(function () {
                updateDialects();
            });

            // Store the simple user id as a cookie, so when a user returns in the same browser,
            // they are recognized as the same user
            self.simpleUserID = $.cookie(MM_SIMPLE_USER_ID_COOKIE);
            if (self.simpleUserID === undefined) {
                self.simpleUserID = MM_SIMPLE_USER_ID_PREFIX + '-' + guid();
                $.cookie(MM_SIMPLE_USER_ID_COOKIE, self.simpleUserID);
            }

            // Make sure the app ID and app secret have been entered
            if (MM_APP_ID === 'ENTER_YOUR_APP_ID' || MM_APP_SECRET === 'ENTER_YOUR_APP_SECRET') {
                self.$documents.html('<span>Modify \'app.js\' and enter your MindMeld Application ID ' +
                    'and Application Secret</span>');
                return;
            }

            // Make sure speech recognition is supported
            if (!MM.support.speechRecognition) {
                self.$documents.html('<span>Sorry, this page will only work with Google Chrome. ' +
                    'Try opening it there.</span>');
                return;
            }

            // To initialize the MindMeld SDK, we go through the following steps. Each step calls the next when it
            // completes successfully
            //
            // 1) Load a MindMeld application with the specified app id
            // 2) Request a user token using simple authentication
            // 3) Set the active user
            // 4) Create an invite only session for the active user
            // 5) Activate the newly created session
            // 6) Subscribe to documents update push events, so that we get new documents as text entries are posted.
            // 7) Setup the session listener to display the transcript as it is spoken. The session listener will
            //    automatically post text entries as transcripts are generated.

            // begin MindMeld SDK initialization
            MM.init({
                // Step 1
                appid: MM_APP_ID,
                onInit: function () {
                    self.getToken();
                }
            });

            // Don't abruptly stop recording animation, only when a cycle has been completed
            var animationIterations = 0;
            $('#microphone div').bind('webkitAnimationIteration', function () {
                animationIterations++;
                if (animationIterations % 2 === 0 && !MM.activeSession.listener.listening) {
                    self.$microphone.removeClass('pulsing');
                }
            });

            // Clicking on microphone will start and stop listening
            self.$microphone.click(function () {
                var $this = $(this);
                if (!MM.activeSession.listener.listening && !$this.hasClass('pulsing')) {
                    $this.addClass('pulsing');
                }
                self.toggleListening();
            });
        },

        oldTextWidth: 0,
        textWidth: 0,

        /**
         * Horizontally scrolls the text box element as the transcript grows too big for the screen
         */
        scrollTextBox: function () {
            self.textWidth = self.$confirmed.width() + self.$pending.width() + 120; // padding
            if (self.textWidth > self.oldTextWidth) {
                self.oldTextWidth = self.textWidth; // store for later check

                self.$textStream.css({ width: self.textWidth });
                self.$textBox.animate({
                    scrollLeft: self.textWidth - self.$textBox.width()
                }, {
                    duration:600,
                    queue:false
                });

                window.console.log(this.textWidth - self.$textBox.width());
            }
        },

        /**
         * Updates the user interface with the documents in result. Any previous documents are removed.
         *
         * @param result {Object} the response from a get documents request
         */
        updateDocuments: function (result) {
            self.$documents.empty();
            $.each(result.data, function (index, doc) {
                var $doc = self.createDocumentElement(doc);
                self.$documents.append($doc);
            });
            self.$documentContainer.removeClass('loading');
        },

        /**
         * Creates an HTML element to display information about a document, including the title, an image, a description
         * and the site from which it originated.
         *
         * @param doc
         * @returns {*|jQuery|HTMLElement}
         */
        createDocumentElement: function (doc) {
            var $doc =  $('<a>', {
                href: doc.originurl,
                class: 'result flexBox clearfix'
            });

            // shorten description
            var shortDesc = doc.description;
            if (typeof shortDesc !== "undefined") {
                if (shortDesc.length > 170) {
                    shortDesc = doc.text.substring(0,170) + "...";
                }
            } else {
                shortDesc = "No description...";
            }

            var image = doc.image;
            var imageURL = null;

            if (typeof image !== 'undefined') {
                imageURL = image.url || image.thumburl;
            }

            if (typeof imageURL !== 'undefined' && imageURL && imageURL !== '') {
                var $img = $('<img>', {
                    class: 'thumb',
                    src: imageURL,
                    alt: doc.title
                });
                var $div = $('<div>', {
                    class: 'imageItem'
                });

                $div.append($img);
                $doc.append($div);
            }

            var $details = $('<div>');

            $details.append($('<h3>', {
                class: 'title',
                text: doc.title
            }));
            $details.append($('<span>', {
                class: 'desc',
                text: shortDesc
            }));


            var $source = $('<div>', {
                class: 'source'
            });

            if (typeof doc.source !== 'undefined' && typeof doc.source.icon !== 'undefined' && doc.source.icon && doc.source.icon !== '') {
                $source.append($('<img>', {
                    class: 'favicon',
                    src: doc.source.icon,
                    alt: doc.source.name || ''
                }));
            }

            var sourceLabel = doc.source.name || doc.source.url || '';
            $source.append($('<cite>', {
                class: 'url',
                text: sourceLabel
            }));

            $details.append($source);

            $doc.append($details);

            return $doc;
        },

        /**
         * Adds another string to the confirmed portion of the transcript
         * @param transcript
         */
        appendConfirmedTranscript: function (transcript) {
            self.$confirmed.append($('<span>', {
                class: 'tran',
                text: transcript
            }));
            self.$pending.text('');
        },

        // MindMeld setup functions

        /**
         * Step 2
         * Gets a token using the app secret constant and the simple user id retrieved from cookies
         */
        getToken: function () {
            function onSuccess (result) {
                window.console.log('Successfully got token');
                self.setUser(result.user.userid);
            }
            function onError () {
                window.console.log('Unable to get token');
            }

            MM.getToken({
                appsecret: MM_APP_SECRET,
                simple: {
                    userid: self.simpleUserID,
                    name: MM_SIMPLE_USER_NAME
                }
            }, onSuccess, onError);
        },

        /**
         * Step 3
         * Set the active user based on the given id and continues MindMeld SDK setup
         * @param userID
         */
        setUser: function (userID) {
            function onSuccess () {
                self.createSession();
            }
            function onError (error) {
                window.console.log("Error setting user session:  (Type " + error.code +
                    " - " + error.type + "): " + error.message);
            }
            MM.setActiveUserID(userID, onSuccess, onError);
        },

        /**
         * Step 4
         * Creates a session for the active user and continues the Mindmeld SDK setup
         */
        createSession: function () {
            function onSuccess (result) {
                self.setSession(result.data.sessionid);
            }
            function onError (error) {
                window.console.log("Error creating new session:  (Type " + error.code +
                    " - " + error.type + "): " + error.message);
            }
            var date = new Date();
            var sessionName = "Voice Navigator - " + date.toTimeString() + " " + date.toDateString();
            MM.activeUser.sessions.post({
                name: sessionName,
                privacymode: 'inviteonly'
            }, onSuccess, onError);
        },

        /**
         * Step 5
         * Sets the active session to the specified id and continues MindMeld SDK setup
         * @param sessionID
         */
        setSession: function (sessionID) {
            function onSuccess () {
                self.subscribeToDocuments();
                self.setupSessionListener();
            }
            function onError (error) {
                window.console.log("Error setting session:  (Type " + error.code +
                    " - " + error.type + "): " + error.message);
            }
            MM.setActiveSessionID(sessionID, onSuccess, onError);
        },

        /**
         * Step 6
         * Subscribes to document update push events. When the documents collection is updated,
         * refreshes the user interface
         */
        subscribeToDocuments: function () {
            function onSuccess () {
                window.console.log("Subscribed to documents!");
            }
            function onError (error) {
                window.console.log("Error subscribing to documents:  (Type " + error.code +
                    " - " + error.type + "): " + error.message);
            }
            MM.activeSession.documents.onUpdate(function (result) {
                window.console.log('documents updated');
                self.updateDocuments(result);
            }, onSuccess, onError);
        },

        /**
         * Step 7
         * Sets up the session listener to display transcripts as they are received
         */
        setupSessionListener: function () {
            MM.activeSession.setListenerConfig(self.listenerConfig);
        },

        /**
         * A ListenerConfig object specifying the session
         */
        listenerConfig: {
            continuous: true,
            interimResults: true,
            onResult: function (result) {
                if (result.final) {
                    self.appendConfirmedTranscript(result.transcript);
                } else {
                    self.$pending.text(result.transcript);
                }

                self.scrollTextBox();
            },
            onStart: function () {
                // disable select elements
                self.$selectLanguage.attr('disabled', 'disabled');
                self.$selectDialect.attr('disabled', 'disabled');

                self.$confirmed.text(''); // clear previous text
            },
            onEnd: function () {
                // reenable select elements
                self.$selectLanguage.removeAttr('disabled');
                self.$selectDialect.removeAttr('disabled');

                // We will recieve no further updates, so convert any pending text to confirmed text
                var pendingText = self.$pending.text();
                if (pendingText !== '') {
                    self.appendConfirmedTranscript(pendingText);
                }
            },
            onError: function (event) {
                window.console.log('MM.Listener: error or reconnecting');
                window.console.log(event.error);
            },
            onTextEntryPosted: function () {
                window.console.log('text entry posted');
                self.$documentContainer.addClass('loading');
            }
        },

        /**
         * Starts the session listener if it is not already listening, using the selected language.
         * Stops the session listener if it is already listening.
         */
        toggleListening: function () {
            var listener = MM.activeSession.listener;
            if (listener.listening) {
                listener.stop();
            } else {
                listener.setConfig({ lang: self.$selectDialect.val() }); // use currently selected language
                listener.start();
            }
        }
    };
    self = VoiceNavigator;
    $(document).ready(function () {
        self.init(); // initialize app when document is ready
    });


    function addLeadingZeros(number, digits) {
        var base = Math.pow(10, digits);
        number += base;
        number = number.toString();
        return number.substring(number.length - digits);
    }

    function timestamp(date) {
        date = date || new Date();
        return addLeadingZeros(date.getFullYear(), 4) + '.'
            + addLeadingZeros(date.getMonth() + 1, 2) + '.'
            + addLeadingZeros(date.getDate(), 2) + ' ' + date.toTimeString();
    }

    // Add nice timestamps to logs
    console.originalLog = console.log.bind(console);
    console.log = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.splice(0, 0, timestamp());
        console.originalLog.apply(console, args);
    };
}());
