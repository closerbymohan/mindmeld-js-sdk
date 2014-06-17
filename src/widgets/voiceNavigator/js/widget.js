var UTIL =  require('./util');
var MM = window.MM || {};


/**
 * An object representing the configuration of MM.voiceNavigator
 *
 * @typedef {Object} VoiceNavigatorConfig
 * @property {String} [cardLinkBehavior="_parent"] sets the behavior for anchors wrapping cards. Use 'false' to
 *                                                 prevent opening links, '_parent' to open links in the same tab or window,
 *                                                 or '_blank' to open links in a new tab or window. See the target attribute
 *                                                 of [anchor](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)
 *                                                 elements for more information.
 * @property {String} [listeningMode="normal"] defines the listening mode of the voice navigator when it _init opened. Acceptable
 *                                             values include 'normal', 'continuous', and false. False prevents listening
 *                                             and the default is 'normal'.
 * @property {Number} [numResults] if specified, this number of cards will appear as results
 * @property {String} [cardLayout="default"] specifies the predefined card layout used. Valid values are 'default', and 'custom'.
 * @property {CardField[]} [cardFields] an array of card fields {@link CardField}.
 * @property {String} [cardTemplate] an underscore (lodash) html template which is used to create card representation of documents.
 *                                   If a value is given, cardLayout will be 'custom'
 * @property {boolean} [resetCardsCSS] if true, removes CSS specific to the cards container.
 * @property {String} [customCSS] specifies custom css to be applied
 * @property {String} [customCSSURL] specifies the url of a file containing custom CSS to be applied
 * @property {Number} [baseZIndex=100000] the voice navigator elements will have a Z index between the value given and
 *                                        1000 greater than the value
 *
 */

/**
 * An Object representing a field to display in a document card for the Voice Navigator widget.
 *
 * @typedef {Object} CardField
 * @property {String} key           the key containing the value of this field in document objects. This field must be specified.
 * @property {String} [placeholder] if specified, when the key is not present in a document or is empty, this value will be displayed.
 *                                  if omitted the value will be hidden from the card
 * @property {String} [label]       if specified, a label with the provided text will precede the value
 * @property {String} [format]      for formatter to be used to present the value in a user friendly form. Valid formatters
 *                                  are default, and date.
 *
 * @example
 // Will result in the following:
 // Released 10/13/1996
 //
 var dateField = {
   key: 'pubdate',
   placeholder: 'Unknown',
   label: 'Released',
   format: 'date'
 };
 *
 */

MM.voiceNavigator = MM.voiceNavigator || {};
MM.loader = MM.loader || {};
MM.loader.rootURL = MM.loader.rootURL || 'https://developer.expectlabs.com/public/sdks/';

var MMVoice = {
    $mm : false,
    $mm_iframe : false,

    // is_init is set to true once the widget has been initialized. Once
    // the widget is initialized on_init() is called. This is used by
    // MM.voiceNavigator.showModal() to allow users to call showModal
    // without having to know if the widget is loaded or not
    is_init: false,
    on_init: function () {},

    init : function() {
        var self = this;

        // Add the #mindmeld-modal div to the page
        var mm = document.createElement('div');
        mm.setAttribute('id', 'mindmeld-modal');
        document.body.insertBefore(mm, document.body.childNodes[0]);
        self.$mm = UTIL.el(mm);

        // Initialize any element with .mm-voice-nav-init on it
        var $inits = document.getElementsByClassName('mm-voice-nav-init');
        var clickHandler = function(e) {
            e.preventDefault();
            MM.voiceNavigator.showModal();
        };
        for(var i = 0; i < $inits.length; i++) {
            UTIL.el($inits[i]).click(clickHandler);
        }

        var $textInits = document.getElementsByClassName('mm-voice-nav-text-init');
        var keyPressHandler = function (event) {
            if (event.which === 13) {
                var query = event.target.value;
                MM.voiceNavigator.showModal({ query: query });
            }
        };
        for(var j = 0; j < $textInits.length; j++) {
            UTIL.el($textInits[j]).keypress(keyPressHandler);
        }

        self.set_initialized();

        // Wait for messages
        UTIL.el(window).on('message', function(event) {
            if (event.data.source != 'mindmeld') {
                return;
            }
            if(event.data.action == 'close') {
                MMVoice.$mm.removeClass('on');
            }
        });
    },

    set_initialized: function () {
        this.is_init = true;
        this.on_init();
    },

    postMessage : function(action, data) {
        var win = document.getElementById("mindmeld-iframe").contentWindow;
        win.postMessage({
            action: action,
            source: 'mindmeld',
            data: data
        }, "*");
    }
};

MM.voiceNavigator.showModal = function (options) {
    options = options || {};
    if (MMVoice.is_init) {
        var iframe;
        // Initialize voice navigator config
        if (typeof MM !== 'undefined' &&
            typeof MM.widgets !== 'undefined' &&
            typeof MM.widgets.config !== 'undefined') {
            // Move config to voice nav config
            MM.voiceNavigator.config = MM.widgets.config.voice || {};
            MM.voiceNavigator.config.appID = MM.widgets.config.appID;
            if (typeof MM.widgets.config.cleanUrl !== 'undefined') {
                MM.voiceNavigator.config.cleanUrl = MM.widgets.config.cleanUrl;
            }
            if (typeof MM.widgets.config.fayeClientUrl !== 'undefined') {
                MM.voiceNavigator.config.fayeClientUrl = MM.widgets.config.fayeClientUrl;
            }

            // parse card layout
            if (typeof MM.voiceNavigator.config.cardTemplate !== 'undefined') {
                MM.voiceNavigator.config.cardLayout = 'custom';
            }
            if (typeof MM.voiceNavigator.config.cardLayout === 'undefined') {
                MM.voiceNavigator.config.cardLayout = 'default';
            }

            // parse custom css
            if (typeof MM.voiceNavigator.config.customCSSURL !== 'undefined') {
                MM.voiceNavigator.config.customCSSURL = UTIL.convertToAbsolutePath(MM.voiceNavigator.config.customCSSURL);
            }

            // default listening mode
            if (typeof options.listeningMode !== 'undefined') {
                MM.voiceNavigator.config.listeningMode = options.listeningMode;
            } else if (typeof MM.voiceNavigator.config.listeningMode === 'undefined') {
                MM.voiceNavigator.config.listeningMode = 'normal';
            }

            // Pass token, user ID, and session ID if they are set already
            if (typeof MM.token !== 'undefined' &&
                typeof MM.activeUserId !== 'undefined' && MM.activeUserId !== null &&
                typeof MM.activeSessionId !== 'undefined' && MM.activeSessionId !== null) {
                MM.voiceNavigator.config.mmCredentials = {
                    token: MM.token,
                    userID: MM.activeUserId,
                    sessionID: MM.activeSessionId
                };
            }
            // If defined, pass a starting query
            if (options.query !== undefined && options.query !== '') {
                MM.voiceNavigator.config.startQuery = options.query;
            }
            else {
                MM.voiceNavigator.config.startQuery = null;
            }
        }

        if (options.forceNewIFrame && MMVoice.$mm_iframe) {
            iframe = document.getElementById('mindmeld-iframe');
            iframe.parentNode.removeChild(iframe);
        }

        // Create iframe if first load
        if (!MMVoice.$mm_iframe || options.forceNewIFrame) {
            iframe = document.createElement('iframe');
            iframe.setAttribute('frameBorder', '0');
            iframe.setAttribute('id', 'mindmeld-iframe');
            iframe.setAttribute('allowtransparency', 'true');
            iframe.setAttribute('src', MM.loader.rootURL + 'widgets/voiceNavigator/modal/modal.html');

            MMVoice.$mm_iframe = UTIL.el(iframe);

            UTIL.el(iframe).on('load', function() {
                MMVoice.postMessage('config', MM.voiceNavigator.config);
                MMVoice.postMessage('open');
            });

            MMVoice.$mm.el().appendChild(iframe);
        }
        else {
            MMVoice.postMessage('open');
        }
        MMVoice.$mm.addClass('on');
    }
    else {
        // Set on_init() callback to open modal
        MMVoice.on_init = function () { MM.voiceNavigator.showModal(options); };
    }
};

MM.voiceNavigator.hideModal = function () {
    MMVoice.postMessage('close');
};

UTIL.contentLoaded(window, function() {
    MMVoice.init();
});
