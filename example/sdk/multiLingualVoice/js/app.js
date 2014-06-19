(function () {
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

    var MM_SIMPLE_USER_ID_PREFIX = 'vnu';
    var MM_SIMPLE_USER_NAME = 'Voice Navigator User';
    var MM_SIMPLE_USER_ID_COOKIE = 'voice_navigator_user_id';

    var self;
    var VoiceNavigator = {

        // element references
        $textBox: $(),
        $textStream: $(),
        $confirmed: $(),
        $pending: $(),
        $microphone: $(),
        $documents: $(),
        $languages: $(),
        $select_language: $(),
        $select_dialect: $(),

        init: function() {
            // get jquery references to elements
            self.$textBox = $('#textBox');
            self.$textStream = $('#textStream');
            self.$confirmed = $('#confirmed');
            self.$pending = $('#pending');
            self.$microphone = $('#microphone');
            self.$documents = $('#documents');
            self.$languages = $('#languages');
            self.$select_language = $('#select_language');
            self.$select_dialect = $('#select_dialect');

            // populate speech recognition languages
            var select_language = self.$select_language[0];
            var select_dialect = self.$select_dialect[0];

            for (var i = 0; i < langs.length; i++) {
                select_language.options[i] = new Option(langs[i][0], i);
            }

            // default to American English
            select_language.selectedIndex = 7; // english
            updateDialects();
            select_dialect.selectedIndex = 6; // usa

            function updateDialects() {
                for (var i = select_dialect.options.length - 1; i >= 0; i--) {
                    select_dialect.remove(i);
                }
                var list = langs[select_language.selectedIndex];
                for (var i = 1; i < list.length; i++) {
                    select_dialect.options.add(new Option(list[i][1], list[i][0]));
                }
                if (list[1].length === 1) {
                    self.$select_dialect.hide();
                } else {
                    self.$select_dialect.show();
                }
            }

            // update the dialects when the language is changed
            self.$select_language.change(function () {
                updateDialects();
            });

            // get user id cookie
            self.simpleUserID = $.cookie(MM_SIMPLE_USER_ID_COOKIE);
            if (self.simpleUserID === undefined) {
                self.simpleUserID = MM_SIMPLE_USER_ID_PREFIX + '-' + guid();
                $.cookie(MM_SIMPLE_USER_ID_COOKIE, self.simpleUserID);
            }

            if (!MM.support.speechRecognition) {
                self.$documents.html('<span>Sorry, this page will only work with Google Chrome. Try opening it there.</span>');
                return;
            }
            // initialize the mindmeld sdk
            // We go through the following steps to initialize the sdk
            // 1) Specify the app id
            // 2) Request a user token
            // 3)


            MM.init({
                appid: MM_APP_ID,
                onInit: function() {
                    self.getToken();
                }
            });

            // Animations to indicate recording is in progress
            var animationIterations = 0;
            $('#microphone div').bind('webkitAnimationIteration', function() {
                animationIterations++;
                if (animationIterations % 2 === 0 && !MM.activeSession.listener.listening) {
                    self.$microphone.removeClass('pulsing');
                }
            });

            // Simple refresh button for now
            self.$microphone.click(function() {
                var $this = $(this);
                if (!MM.activeSession.listener.listening && !$this.hasClass('pulsing')) {
                    $this.addClass('pulsing');
                }
                self.toggleListening();
            });
        },

        oldTextWidth: 0,
        textWidth: 0,
        doScrollPosition: function () {
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

                console.log(Date.now(), this.textWidth - self.$textBox.width());
            }
        },

        documentLock: {
            canRequestDocuments: function() {
                return (this.lastDocumentsRequest + 500 < Date.now());
            },
            lastDocumentsRequest: 0
        },

        getDocuments: function() {
            if (!self.documentLock.canRequestDocuments()) {
                return;
            }
            self.documentLock.lastDocumentsRequest = Date.now();
            MM.activeSession.documents.get(null, function(result) {
                console.log(Date.now(), "Successfully got documents");
                self.updateDocuments(result);
            }, function (error) {
                console.log(Date.now(), "Error getting documents:  (Type " + error.code +
                    " - " + error.type + "): " + error.message);
            });
        },

        updateDocuments: function(result) {
            self.$documents.empty();
            $.each(result.data, function(index, doc) {
                var $doc = self.createDocumentElement(doc);
                self.$documents.append($doc);
            });
        },

        createDocumentElement: function(doc) {
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

            var image = doc.image
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

            var sourceLabel = doc.source.name || doc.source.url || ''
            $source.append($('<cite>', {
                class: 'url',
                text: sourceLabel
            }));

            $details.append($source);

            $doc.append($details);

            return $doc;
        },

        appendConfirmedTranscript: function(transcript) {
            self.$confirmed.append($('<span>', {
                class: 'tran',
                text: transcript
            }));
            self.$pending.text('');
        },

        listenerConfig: {
            continuous: true,
            interimResults: true,
            onResult: function(result) {
                if (result.final) {
                    self.appendConfirmedTranscript(result.transcript);
                } else {
                    self.$pending.text(result.transcript);
                }

                self.doScrollPosition();
            },
            onStart: function(event) {
                // disable select elements
                self.$select_language.attr('disabled', 'disabled');
                self.$select_dialect.attr('disabled', 'disabled');

                self.$confirmed.text(''); // clear previous text
            },
            onEnd: function(event) {
                // reenable select elements
                self.$select_language.removeAttr('disabled');
                self.$select_dialect.removeAttr('disabled');

                var pendingText = self.$pending.text();
                if (pendingText != '') {
                    self.appendConfirmedTranscript(pendingText);
                }
            },
            onError: function(error) {
                console.log(Date.now(), 'error or reconnecting: ' + Date.now());
                console.log(Date.now(), event.error);
            },
            onTextEntryPosted: function(result) {
                console.log(Date.now(), 'text entry posted');
                self.getDocuments();
            }
        },

        toggleListening: function() {
            var listener = MM.activeSession.listener;
            if (listener.listening) {
                listener.stop();
            } else {
                listener.setConfig({ lang: self.$select_dialect.val() });
                listener.start();
            }
        },

        // Mindmeld setup functions
        getToken: function () {
            function onSuccess(result) {
                console.log(Date.now(), 'Successfully got token');
                self.setUser(result.user.userid);
            }
            function onError (error) {
                console.log(Date.now(), 'Token was not valid');
            }

            MM.getToken({
                appsecret: MM_APP_SECRET,
                simple: {
                    userid: self.simpleUserID,
                    name: MM_SIMPLE_USER_NAME
                }
            }, onSuccess, onError);
        },

        setUser: function(userID) {
            function onSuccess(result) {
                self.createSession();
            }
            function onError (error) {
                console.log(Date.now(), "Error setting user session:  (Type " + error.code +
                    " - " + error.type + "): " + error.message);
            }
            MM.setActiveUserID(userID, onSuccess, onError);
        },

        createSession: function () {
            function onSuccess(result) {
                self.setSession(result.data.sessionid);
            }
            function onError (error) {
                console.log(Date.now(), "Error creating new session:  (Type " + error.code +
                    " - " + error.type + "): " + error.message);
            }
            var date = new Date();
            var sessionName = "Voice Navigator - " + date.toTimeString() + " " + date.toDateString();
            MM.activeUser.sessions.post({
                name: sessionName,
                privacymode: 'inviteonly'
            }, onSuccess, onError);
        },

        setSession: function (sessionID) {
            function onSuccess(result) {
                self.subscribeToEntities();
                self.setupSessionListener();
            }
            function onError (error) {
                console.log(Date.now(), "Error setting session:  (Type " + error.code +
                    " - " + error.type + "): " + error.message);
            }
            MM.setActiveSessionID(sessionID, onSuccess, onError);
        },

        subscribeToEntities: function () {
            function onSuccess(result) {
                console.log(Date.now(), "Subscribed to entities!");
            }
            function onError (error) {
                console.log(Date.now(), "Error subscribing to entities:  (Type " + error.code +
                    " - " + error.type + "): " + error.message);
            }
            MM.activeSession.entities.onUpdate(function(result) {
                console.log(Date.now(), 'entities');
            }, onSuccess, onError);
        },

        setupSessionListener: function () {
            MM.activeSession.setListenerConfig(self.listenerConfig);

        }
    };
    self = VoiceNavigator;
    $(document).ready(function() {
        self.init(); // initialize app when document is ready
    });
}());
