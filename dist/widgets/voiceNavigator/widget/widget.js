(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./vendor/contentloaded":2}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
var UTIL =  require('./util');
var MM = window.MM = window.MM || {};


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

/**
 * The voice navigator is a widget that allows developers to add voice-driven search to their web-based applications.
 * By adding a small snippet of JavaScript to your page, you can add our voice navigator to your page allowing your
 * users to search and discover your content in natural, spoken language. The voice navigator widget takes care of
 * capturing speech input from your users, displaying a realtime transcript of what is being recorded, and displaying
 * a collection of results in the browser.
 *
 * The voice navigator will display when elements with the 'mm-voice-nav-init' class are clicked and when elements with
 * the 'mm-voice-nav-text-init' recieve an enter keypress.
 *
 * The voice navigator can be styled by providing custom css.
 *
 * See {@link VoiceNavigatorConfig} for a full list of the configuration options.
 *
 * @example
<caption>Loading the voice navigator</caption>
var MM = window.MM || {};
( function () {
    MM.loader = {
        rootURL: 'https://developer.expectlabs.com/public/sdks/',
        widgets: ['voice']
    };
    MM.widgets = {
        config: {
            appID: 'YOUR APPID',
            voice: voiceNavigatorConfig
        }
    };
    var script = document.createElement('script');
    script.type = 'text/javascript'; script.async = true;
    script.src = MM.loader.rootURL + 'embed.js';
    var t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(script, t);
}());
 *
 * @example
<caption>Changing button colors from the default orange to green</caption>
// specify the following as the contents of voiceNavigatorOptions.customCSS
.mm-button-background {
    background: #008000;
}
.mm-button-background:hover {
    background-color: #007300;
}
.mm-button-background:active {
    background: -webkit-linear-gradient(#005a00, #008000);
    background: -moz-linear-gradient(#005a00, #008000);
    background: -o-linear-gradient(#005a00, #008000);
    background: -ms-linear-gradient(#005a00, #008000);
    background: linear-gradient(#005a00, #008000);
}
.mm-button-border {
    border: 1px solid #006600;
}

@-moz-keyframes mm-button-background-active-anim {
    50% { background-color: #006d00; }
}
@-webkit-keyframes mm-button-background-active-anim {
    50% { background-color: #006d00; }
}
@-o-keyframes mm-button-background-active-anim {
    50% { background-color: #006d00; }
}
@keyframes mm-button-background-active-anim {
    50% { background-color: #006d00; }
}
 *
 * @example
<caption>Customize cards area appearance</caption>
\#cards {
    background-color: darkgoldenrod;
}
\#cards .card {
    border: solid #333 1px;
    border-radius: 0;
    background: red;
}
\#cards .card:hover {
    border-color: black;
}
\#cards .card p {
    color: white;
}
\#cards .card h2.title {
    color: #ddd;
}
 *
 * See our [widgets page](https://developer-swaraj.expectlabs.com/demos) to get started with Voice Navigator. NOTE: CHANGE THE LINK!
 * See our [demos page](https://developer.expectlabs.com/demos) to see more detailed code examples.
 *
 * @memberOf MM
 * @namespace
 */
MM.voiceNavigator = MM.voiceNavigator || {};
MM.loader = MM.loader || {};
MM.loader.rootURL = MM.loader.rootURL || 'https://developer.expectlabs.com/public/sdks/';

/**
 * The 'div#mindmeld-modal' element which contains all of the voice navigator html
 * @private
 */
var $mm = false;

/**
 *
 * @private
 */
var $mm_iframe = false;

/**
 * isInitialized is set to true once the widget has been initialized. Once
 * the widget is initialized onInit() is called. This is used by
 * MM.voiceNavigator.showModal() to allow users to call showModal
 * without having to know if the widget is loaded or not
 *
 * @private
 */
var isInitialized = false;
var onInit = function () {};

function init() {
    // Add the #mindmeld-modal div to the page
    var mm = document.createElement('div');
    mm.setAttribute('id', 'mindmeld-modal');
    document.body.insertBefore(mm, document.body.childNodes[0]);
    $mm = UTIL.el(mm);

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

    setInitialized();

    // Wait for messages
    UTIL.el(window).on('message', function(event) {
        if (event.data.source != 'mindmeld') {
            return;
        }
        if(event.data.action == 'close') {
            $mm.removeClass('on');
        }
    });
}

function setInitialized() {
    isInitialized = true;
    onInit();
}

function postMessage(action, data) {
    var win = document.getElementById("mindmeld-iframe").contentWindow;
    win.postMessage({
        action: action,
        source: 'mindmeld',
        data: data
    }, "*");
}

/**
 * Opens the voice navigator modal window
 * @param {Object} [options]
 * @param {String} [options.query]                 if provided, this field will be the initial query, and will immediately show results
 * @param {boolean} [options.forceNewIFrame=false] if true, any voice navigators that previously created will be destroyed,
 *                                                 and a new instance will be created.
 */
MM.voiceNavigator.showModal = function(options) {
    options = options || {};
    if (isInitialized) {
        var iframe;
        // Initialize voice navigator config
        if (typeof MM !== 'undefined') {
            if (typeof MM.widgets !== 'undefined' &&
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
            }
            if (typeof MM.voiceNavigator.config !== 'undefined') {
                // parse card layout
                if (typeof MM.voiceNavigator.config.cardTemplate !== 'undefined') {
                    MM.voiceNavigator.config.cardLayout = 'custom';
                }
                if (typeof MM.voiceNavigator.config.cardLayout === 'undefined') {
                    MM.voiceNavigator.config.cardLayout = 'default';
                }

                // make absolute URLs
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
        }

        if (options.forceNewIFrame && $mm_iframe) {
            iframe = document.getElementById('mindmeld-iframe');
            iframe.parentNode.removeChild(iframe);
        }

        // Create iframe if first load
        if (!$mm_iframe || options.forceNewIFrame) {
            iframe = document.createElement('iframe');
            iframe.setAttribute('frameBorder', '0');
            iframe.setAttribute('id', 'mindmeld-iframe');
            iframe.setAttribute('allowtransparency', 'true');
            iframe.setAttribute('src', MM.loader.rootURL + 'widgets/voiceNavigator/modal/modal.html');

            $mm_iframe = UTIL.el(iframe);

            UTIL.el(iframe).on('load', function() {
                postMessage('config', MM.voiceNavigator.config);
                postMessage('open');
            });

            $mm.el().appendChild(iframe);
        }
        else {
            postMessage('open');
        }
        $mm.addClass('on');
    }
    else {
        // Set onInit() callback to open modal
        onInit = function () { MM.voiceNavigator.showModal(options); };
    }
}

/**
 * Closes the voice navigator modal window
 */
MM.voiceNavigator.hideModal = function () {
    postMessage('close');
};

// schedule initialization of voice navigator
UTIL.contentLoaded(window, function() {
    init();
});

},{"./util":1}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvc3dhcmFqL3JlcG9zL21pbmRtZWxkLWpzLXNkay9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3N3YXJhai9yZXBvcy9taW5kbWVsZC1qcy1zZGsvc3JjL3dpZGdldHMvdm9pY2VOYXZpZ2F0b3IvanMvdXRpbC5qcyIsIi9Vc2Vycy9zd2FyYWovcmVwb3MvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL3ZlbmRvci9jb250ZW50bG9hZGVkLmpzIiwiL1VzZXJzL3N3YXJhai9yZXBvcy9taW5kbWVsZC1qcy1zZGsvc3JjL3dpZGdldHMvdm9pY2VOYXZpZ2F0b3IvanMvd2lkZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuL3ZlbmRvci9jb250ZW50bG9hZGVkJyk7XG5cbi8qIEEgd3JhcHBlciBmb3IgZG9tIGVsZW1lbnRzLCBiYXNpY2FsbHkgYSBsaXRlIHZlcnNpb24gb2YgalF1ZXJ5J3MgJCAqL1xuZXhwb3J0cy5lbCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb246IGZ1bmN0aW9uKGV2ZW50LCBmdW5jKSB7XG4gICAgICAgICAgICBpZihlbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCxmdW5jLGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihlbC5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgICAgIGVsLmF0dGFjaEV2ZW50KFwib25cIitldmVudCxmdW5jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjbGljazogZnVuY3Rpb24oZnVuYykge1xuICAgICAgICAgICAgdGhpcy5vbignY2xpY2snLCBmdW5jKTtcbiAgICAgICAgfSxcblxuICAgICAgICBrZXlwcmVzczogZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMub24oJ2tleXByZXNzJywgZnVuYyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgbmV3IFJlZ0V4cCgnKF58XFxcXHMrKScgKyBjbGFzc05hbWUgKyAnKFxcXFxzK3wkKScsICdnJyksXG4gICAgICAgICAgICAgICAgJyQxJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICBhZGRDbGFzczogZnVuY3Rpb24oY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUgKyBcIiBcIiArIGNsYXNzTmFtZTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydHMuY29udmVydFRvQWJzb2x1dGVQYXRoID0gZnVuY3Rpb24oaHJlZikge1xuICAgIHZhciBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYW5jaG9yLmhyZWYgPSBocmVmO1xuICAgIHJldHVybiAoYW5jaG9yLnByb3RvY29sICsgJy8vJyArIGFuY2hvci5ob3N0ICsgYW5jaG9yLnBhdGhuYW1lICsgYW5jaG9yLnNlYXJjaCArIGFuY2hvci5oYXNoKTtcbn07XG5cbmZ1bmN0aW9uIGFkZExlYWRpbmdaZXJvcyhudW1iZXIsIGRpZ2l0cykge1xuICAgIHZhciBiYXNlID0gTWF0aC5wb3coMTAsIGRpZ2l0cyk7XG4gICAgbnVtYmVyICs9IGJhc2U7XG4gICAgbnVtYmVyID0gbnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgcmV0dXJuIG51bWJlci5zdWJzdHJpbmcobnVtYmVyLmxlbmd0aCAtIGRpZ2l0cyk7XG59XG5cbmV4cG9ydHMudGltZXN0YW1wID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICBkYXRlID0gZGF0ZSB8fCBuZXcgRGF0ZSgpO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRGdWxsWWVhcigpLCA0KSArICcuJ1xuICAgICAgICArIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldE1vbnRoKCkgKyAxLCAyKSArICcuJ1xuICAgICAgICArIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldERhdGUoKSwgMikgKyAnICcgKyBkYXRlLnRvVGltZVN0cmluZygpO1xufTtcblxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgYXJncy5zcGxpY2UoMCwgMCwgZXhwb3J0cy50aW1lc3RhbXAoKSk7XG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XG59O1xuXG5leHBvcnRzLmNvbnRlbnRMb2FkZWQgPSBjb250ZW50TG9hZGVkOyIsIi8qIVxuICogY29udGVudGxvYWRlZC5qc1xuICpcbiAqIEF1dGhvcjogRGllZ28gUGVyaW5pIChkaWVnby5wZXJpbmkgYXQgZ21haWwuY29tKVxuICogU3VtbWFyeTogY3Jvc3MtYnJvd3NlciB3cmFwcGVyIGZvciBET01Db250ZW50TG9hZGVkXG4gKiBVcGRhdGVkOiAyMDEwMTAyMFxuICogTGljZW5zZTogTUlUXG4gKiBWZXJzaW9uOiAxLjJcbiAqXG4gKiBVUkw6XG4gKiBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vQ29udGVudExvYWRlZC9cbiAqIGh0dHA6Ly9qYXZhc2NyaXB0Lm53Ym94LmNvbS9Db250ZW50TG9hZGVkL01JVC1MSUNFTlNFXG4gKlxuICovXG5cbi8vIEB3aW4gd2luZG93IHJlZmVyZW5jZVxuLy8gQGZuIGZ1bmN0aW9uIHJlZmVyZW5jZVxud2luZG93LmNvbnRlbnRMb2FkZWQgPSBmdW5jdGlvbiBjb250ZW50TG9hZGVkKHdpbiwgZm4pIHtcblxuXHR2YXIgZG9uZSA9IGZhbHNlLCB0b3AgPSB0cnVlLFxuXG5cdGRvYyA9IHdpbi5kb2N1bWVudCwgcm9vdCA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG5cblx0YWRkID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAnYXR0YWNoRXZlbnQnLFxuXHRyZW0gPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdkZXRhY2hFdmVudCcsXG5cdHByZSA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJycgOiAnb24nLFxuXG5cdGluaXQgPSBmdW5jdGlvbihlKSB7XG5cdFx0aWYgKGUudHlwZSA9PSAncmVhZHlzdGF0ZWNoYW5nZScgJiYgZG9jLnJlYWR5U3RhdGUgIT0gJ2NvbXBsZXRlJykgcmV0dXJuO1xuXHRcdChlLnR5cGUgPT0gJ2xvYWQnID8gd2luIDogZG9jKVtyZW1dKHByZSArIGUudHlwZSwgaW5pdCwgZmFsc2UpO1xuXHRcdGlmICghZG9uZSAmJiAoZG9uZSA9IHRydWUpKSBmbi5jYWxsKHdpbiwgZS50eXBlIHx8IGUpO1xuXHR9LFxuXG5cdHBvbGwgPSBmdW5jdGlvbigpIHtcblx0XHR0cnkgeyByb290LmRvU2Nyb2xsKCdsZWZ0Jyk7IH0gY2F0Y2goZSkgeyBzZXRUaW1lb3V0KHBvbGwsIDUwKTsgcmV0dXJuOyB9XG5cdFx0aW5pdCgncG9sbCcpO1xuXHR9O1xuXG5cdGlmIChkb2MucmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnKSBmbi5jYWxsKHdpbiwgJ2xhenknKTtcblx0ZWxzZSB7XG5cdFx0aWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCAmJiByb290LmRvU2Nyb2xsKSB7XG5cdFx0XHR0cnkgeyB0b3AgPSAhd2luLmZyYW1lRWxlbWVudDsgfSBjYXRjaChlKSB7IH1cblx0XHRcdGlmICh0b3ApIHBvbGwoKTtcblx0XHR9XG5cdFx0ZG9jW2FkZF0ocHJlICsgJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0LCBmYWxzZSk7XG5cdFx0ZG9jW2FkZF0ocHJlICsgJ3JlYWR5c3RhdGVjaGFuZ2UnLCBpbml0LCBmYWxzZSk7XG5cdFx0d2luW2FkZF0ocHJlICsgJ2xvYWQnLCBpbml0LCBmYWxzZSk7XG5cdH1cblxufVxuIiwidmFyIFVUSUwgPSAgcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgTU0gPSB3aW5kb3cuTU0gPSB3aW5kb3cuTU0gfHwge307XG5cblxuLyoqXG4gKiBBbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBjb25maWd1cmF0aW9uIG9mIE1NLnZvaWNlTmF2aWdhdG9yXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gVm9pY2VOYXZpZ2F0b3JDb25maWdcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbY2FyZExpbmtCZWhhdmlvcj1cIl9wYXJlbnRcIl0gc2V0cyB0aGUgYmVoYXZpb3IgZm9yIGFuY2hvcnMgd3JhcHBpbmcgY2FyZHMuIFVzZSAnZmFsc2UnIHRvXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2ZW50IG9wZW5pbmcgbGlua3MsICdfcGFyZW50JyB0byBvcGVuIGxpbmtzIGluIHRoZSBzYW1lIHRhYiBvciB3aW5kb3csXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvciAnX2JsYW5rJyB0byBvcGVuIGxpbmtzIGluIGEgbmV3IHRhYiBvciB3aW5kb3cuIFNlZSB0aGUgdGFyZ2V0IGF0dHJpYnV0ZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2YgW2FuY2hvcl0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9FbGVtZW50L2EpXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbbGlzdGVuaW5nTW9kZT1cIm5vcm1hbFwiXSBkZWZpbmVzIHRoZSBsaXN0ZW5pbmcgbW9kZSBvZiB0aGUgdm9pY2UgbmF2aWdhdG9yIHdoZW4gaXQgX2luaXQgb3BlbmVkLiBBY2NlcHRhYmxlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcyBpbmNsdWRlICdub3JtYWwnLCAnY29udGludW91cycsIGFuZCBmYWxzZS4gRmFsc2UgcHJldmVudHMgbGlzdGVuaW5nXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgZGVmYXVsdCBpcyAnbm9ybWFsJy5cbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBbbnVtUmVzdWx0c10gaWYgc3BlY2lmaWVkLCB0aGlzIG51bWJlciBvZiBjYXJkcyB3aWxsIGFwcGVhciBhcyByZXN1bHRzXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2NhcmRMYXlvdXQ9XCJkZWZhdWx0XCJdIHNwZWNpZmllcyB0aGUgcHJlZGVmaW5lZCBjYXJkIGxheW91dCB1c2VkLiBWYWxpZCB2YWx1ZXMgYXJlICdkZWZhdWx0JywgYW5kICdjdXN0b20nLlxuICogQHByb3BlcnR5IHtDYXJkRmllbGRbXX0gW2NhcmRGaWVsZHNdIGFuIGFycmF5IG9mIGNhcmQgZmllbGRzIHtAbGluayBDYXJkRmllbGR9LlxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtjYXJkVGVtcGxhdGVdIGFuIHVuZGVyc2NvcmUgKGxvZGFzaCkgaHRtbCB0ZW1wbGF0ZSB3aGljaCBpcyB1c2VkIHRvIGNyZWF0ZSBjYXJkIHJlcHJlc2VudGF0aW9uIG9mIGRvY3VtZW50cy5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiBhIHZhbHVlIGlzIGdpdmVuLCBjYXJkTGF5b3V0IHdpbGwgYmUgJ2N1c3RvbSdcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3Jlc2V0Q2FyZHNDU1NdIGlmIHRydWUsIHJlbW92ZXMgQ1NTIHNwZWNpZmljIHRvIHRoZSBjYXJkcyBjb250YWluZXIuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2N1c3RvbUNTU10gc3BlY2lmaWVzIGN1c3RvbSBjc3MgdG8gYmUgYXBwbGllZFxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtjdXN0b21DU1NVUkxdIHNwZWNpZmllcyB0aGUgdXJsIG9mIGEgZmlsZSBjb250YWluaW5nIGN1c3RvbSBDU1MgdG8gYmUgYXBwbGllZFxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFtiYXNlWkluZGV4PTEwMDAwMF0gdGhlIHZvaWNlIG5hdmlnYXRvciBlbGVtZW50cyB3aWxsIGhhdmUgYSBaIGluZGV4IGJldHdlZW4gdGhlIHZhbHVlIGdpdmVuIGFuZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwMCBncmVhdGVyIHRoYW4gdGhlIHZhbHVlXG4gKlxuICovXG5cbi8qKlxuICogQW4gT2JqZWN0IHJlcHJlc2VudGluZyBhIGZpZWxkIHRvIGRpc3BsYXkgaW4gYSBkb2N1bWVudCBjYXJkIGZvciB0aGUgVm9pY2UgTmF2aWdhdG9yIHdpZGdldC5cbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDYXJkRmllbGRcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBrZXkgICAgICAgICAgIHRoZSBrZXkgY29udGFpbmluZyB0aGUgdmFsdWUgb2YgdGhpcyBmaWVsZCBpbiBkb2N1bWVudCBvYmplY3RzLiBUaGlzIGZpZWxkIG11c3QgYmUgc3BlY2lmaWVkLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtwbGFjZWhvbGRlcl0gaWYgc3BlY2lmaWVkLCB3aGVuIHRoZSBrZXkgaXMgbm90IHByZXNlbnQgaW4gYSBkb2N1bWVudCBvciBpcyBlbXB0eSwgdGhpcyB2YWx1ZSB3aWxsIGJlIGRpc3BsYXllZC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIG9taXR0ZWQgdGhlIHZhbHVlIHdpbGwgYmUgaGlkZGVuIGZyb20gdGhlIGNhcmRcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbbGFiZWxdICAgICAgIGlmIHNwZWNpZmllZCwgYSBsYWJlbCB3aXRoIHRoZSBwcm92aWRlZCB0ZXh0IHdpbGwgcHJlY2VkZSB0aGUgdmFsdWVcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbZm9ybWF0XSAgICAgIGZvciBmb3JtYXR0ZXIgdG8gYmUgdXNlZCB0byBwcmVzZW50IHRoZSB2YWx1ZSBpbiBhIHVzZXIgZnJpZW5kbHkgZm9ybS4gVmFsaWQgZm9ybWF0dGVyc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlIGRlZmF1bHQsIGFuZCBkYXRlLlxuICpcbiAqIEBleGFtcGxlXG4gLy8gV2lsbCByZXN1bHQgaW4gdGhlIGZvbGxvd2luZzpcbiAvLyBSZWxlYXNlZCAxMC8xMy8xOTk2XG4gLy9cbiB2YXIgZGF0ZUZpZWxkID0ge1xuICAga2V5OiAncHViZGF0ZScsXG4gICBwbGFjZWhvbGRlcjogJ1Vua25vd24nLFxuICAgbGFiZWw6ICdSZWxlYXNlZCcsXG4gICBmb3JtYXQ6ICdkYXRlJ1xuIH07XG4gKlxuICovXG5cbi8qKlxuICogVGhlIHZvaWNlIG5hdmlnYXRvciBpcyBhIHdpZGdldCB0aGF0IGFsbG93cyBkZXZlbG9wZXJzIHRvIGFkZCB2b2ljZS1kcml2ZW4gc2VhcmNoIHRvIHRoZWlyIHdlYi1iYXNlZCBhcHBsaWNhdGlvbnMuXG4gKiBCeSBhZGRpbmcgYSBzbWFsbCBzbmlwcGV0IG9mIEphdmFTY3JpcHQgdG8geW91ciBwYWdlLCB5b3UgY2FuIGFkZCBvdXIgdm9pY2UgbmF2aWdhdG9yIHRvIHlvdXIgcGFnZSBhbGxvd2luZyB5b3VyXG4gKiB1c2VycyB0byBzZWFyY2ggYW5kIGRpc2NvdmVyIHlvdXIgY29udGVudCBpbiBuYXR1cmFsLCBzcG9rZW4gbGFuZ3VhZ2UuIFRoZSB2b2ljZSBuYXZpZ2F0b3Igd2lkZ2V0IHRha2VzIGNhcmUgb2ZcbiAqIGNhcHR1cmluZyBzcGVlY2ggaW5wdXQgZnJvbSB5b3VyIHVzZXJzLCBkaXNwbGF5aW5nIGEgcmVhbHRpbWUgdHJhbnNjcmlwdCBvZiB3aGF0IGlzIGJlaW5nIHJlY29yZGVkLCBhbmQgZGlzcGxheWluZ1xuICogYSBjb2xsZWN0aW9uIG9mIHJlc3VsdHMgaW4gdGhlIGJyb3dzZXIuXG4gKlxuICogVGhlIHZvaWNlIG5hdmlnYXRvciB3aWxsIGRpc3BsYXkgd2hlbiBlbGVtZW50cyB3aXRoIHRoZSAnbW0tdm9pY2UtbmF2LWluaXQnIGNsYXNzIGFyZSBjbGlja2VkIGFuZCB3aGVuIGVsZW1lbnRzIHdpdGhcbiAqIHRoZSAnbW0tdm9pY2UtbmF2LXRleHQtaW5pdCcgcmVjaWV2ZSBhbiBlbnRlciBrZXlwcmVzcy5cbiAqXG4gKiBUaGUgdm9pY2UgbmF2aWdhdG9yIGNhbiBiZSBzdHlsZWQgYnkgcHJvdmlkaW5nIGN1c3RvbSBjc3MuXG4gKlxuICogU2VlIHtAbGluayBWb2ljZU5hdmlnYXRvckNvbmZpZ30gZm9yIGEgZnVsbCBsaXN0IG9mIHRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMuXG4gKlxuICogQGV4YW1wbGVcbjxjYXB0aW9uPkxvYWRpbmcgdGhlIHZvaWNlIG5hdmlnYXRvcjwvY2FwdGlvbj5cbnZhciBNTSA9IHdpbmRvdy5NTSB8fCB7fTtcbiggZnVuY3Rpb24gKCkge1xuICAgIE1NLmxvYWRlciA9IHtcbiAgICAgICAgcm9vdFVSTDogJ2h0dHBzOi8vZGV2ZWxvcGVyLmV4cGVjdGxhYnMuY29tL3B1YmxpYy9zZGtzLycsXG4gICAgICAgIHdpZGdldHM6IFsndm9pY2UnXVxuICAgIH07XG4gICAgTU0ud2lkZ2V0cyA9IHtcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBhcHBJRDogJ1lPVVIgQVBQSUQnLFxuICAgICAgICAgICAgdm9pY2U6IHZvaWNlTmF2aWdhdG9yQ29uZmlnXG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnOyBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgIHNjcmlwdC5zcmMgPSBNTS5sb2FkZXIucm9vdFVSTCArICdlbWJlZC5qcyc7XG4gICAgdmFyIHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzY3JpcHQsIHQpO1xufSgpKTtcbiAqXG4gKiBAZXhhbXBsZVxuPGNhcHRpb24+Q2hhbmdpbmcgYnV0dG9uIGNvbG9ycyBmcm9tIHRoZSBkZWZhdWx0IG9yYW5nZSB0byBncmVlbjwvY2FwdGlvbj5cbi8vIHNwZWNpZnkgdGhlIGZvbGxvd2luZyBhcyB0aGUgY29udGVudHMgb2Ygdm9pY2VOYXZpZ2F0b3JPcHRpb25zLmN1c3RvbUNTU1xuLm1tLWJ1dHRvbi1iYWNrZ3JvdW5kIHtcbiAgICBiYWNrZ3JvdW5kOiAjMDA4MDAwO1xufVxuLm1tLWJ1dHRvbi1iYWNrZ3JvdW5kOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3MzAwO1xufVxuLm1tLWJ1dHRvbi1iYWNrZ3JvdW5kOmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoIzAwNWEwMCwgIzAwODAwMCk7XG4gICAgYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQoIzAwNWEwMCwgIzAwODAwMCk7XG4gICAgYmFja2dyb3VuZDogLW8tbGluZWFyLWdyYWRpZW50KCMwMDVhMDAsICMwMDgwMDApO1xuICAgIGJhY2tncm91bmQ6IC1tcy1saW5lYXItZ3JhZGllbnQoIzAwNWEwMCwgIzAwODAwMCk7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCMwMDVhMDAsICMwMDgwMDApO1xufVxuLm1tLWJ1dHRvbi1ib3JkZXIge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDY2MDA7XG59XG5cbkAtbW96LWtleWZyYW1lcyBtbS1idXR0b24tYmFja2dyb3VuZC1hY3RpdmUtYW5pbSB7XG4gICAgNTAlIHsgYmFja2dyb3VuZC1jb2xvcjogIzAwNmQwMDsgfVxufVxuQC13ZWJraXQta2V5ZnJhbWVzIG1tLWJ1dHRvbi1iYWNrZ3JvdW5kLWFjdGl2ZS1hbmltIHtcbiAgICA1MCUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2ZDAwOyB9XG59XG5ALW8ta2V5ZnJhbWVzIG1tLWJ1dHRvbi1iYWNrZ3JvdW5kLWFjdGl2ZS1hbmltIHtcbiAgICA1MCUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2ZDAwOyB9XG59XG5Aa2V5ZnJhbWVzIG1tLWJ1dHRvbi1iYWNrZ3JvdW5kLWFjdGl2ZS1hbmltIHtcbiAgICA1MCUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2ZDAwOyB9XG59XG4gKlxuICogQGV4YW1wbGVcbjxjYXB0aW9uPkN1c3RvbWl6ZSBjYXJkcyBhcmVhIGFwcGVhcmFuY2U8L2NhcHRpb24+XG5cXCNjYXJkcyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogZGFya2dvbGRlbnJvZDtcbn1cblxcI2NhcmRzIC5jYXJkIHtcbiAgICBib3JkZXI6IHNvbGlkICMzMzMgMXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgYmFja2dyb3VuZDogcmVkO1xufVxuXFwjY2FyZHMgLmNhcmQ6aG92ZXIge1xuICAgIGJvcmRlci1jb2xvcjogYmxhY2s7XG59XG5cXCNjYXJkcyAuY2FyZCBwIHtcbiAgICBjb2xvcjogd2hpdGU7XG59XG5cXCNjYXJkcyAuY2FyZCBoMi50aXRsZSB7XG4gICAgY29sb3I6ICNkZGQ7XG59XG4gKlxuICogU2VlIG91ciBbd2lkZ2V0cyBwYWdlXShodHRwczovL2RldmVsb3Blci1zd2FyYWouZXhwZWN0bGFicy5jb20vZGVtb3MpIHRvIGdldCBzdGFydGVkIHdpdGggVm9pY2UgTmF2aWdhdG9yLiBOT1RFOiBDSEFOR0UgVEhFIExJTkshXG4gKiBTZWUgb3VyIFtkZW1vcyBwYWdlXShodHRwczovL2RldmVsb3Blci5leHBlY3RsYWJzLmNvbS9kZW1vcykgdG8gc2VlIG1vcmUgZGV0YWlsZWQgY29kZSBleGFtcGxlcy5cbiAqXG4gKiBAbWVtYmVyT2YgTU1cbiAqIEBuYW1lc3BhY2VcbiAqL1xuTU0udm9pY2VOYXZpZ2F0b3IgPSBNTS52b2ljZU5hdmlnYXRvciB8fCB7fTtcbk1NLmxvYWRlciA9IE1NLmxvYWRlciB8fCB7fTtcbk1NLmxvYWRlci5yb290VVJMID0gTU0ubG9hZGVyLnJvb3RVUkwgfHwgJ2h0dHBzOi8vZGV2ZWxvcGVyLmV4cGVjdGxhYnMuY29tL3B1YmxpYy9zZGtzLyc7XG5cbi8qKlxuICogVGhlICdkaXYjbWluZG1lbGQtbW9kYWwnIGVsZW1lbnQgd2hpY2ggY29udGFpbnMgYWxsIG9mIHRoZSB2b2ljZSBuYXZpZ2F0b3IgaHRtbFxuICogQHByaXZhdGVcbiAqL1xudmFyICRtbSA9IGZhbHNlO1xuXG4vKipcbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgJG1tX2lmcmFtZSA9IGZhbHNlO1xuXG4vKipcbiAqIGlzSW5pdGlhbGl6ZWQgaXMgc2V0IHRvIHRydWUgb25jZSB0aGUgd2lkZ2V0IGhhcyBiZWVuIGluaXRpYWxpemVkLiBPbmNlXG4gKiB0aGUgd2lkZ2V0IGlzIGluaXRpYWxpemVkIG9uSW5pdCgpIGlzIGNhbGxlZC4gVGhpcyBpcyB1c2VkIGJ5XG4gKiBNTS52b2ljZU5hdmlnYXRvci5zaG93TW9kYWwoKSB0byBhbGxvdyB1c2VycyB0byBjYWxsIHNob3dNb2RhbFxuICogd2l0aG91dCBoYXZpbmcgdG8ga25vdyBpZiB0aGUgd2lkZ2V0IGlzIGxvYWRlZCBvciBub3RcbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgaXNJbml0aWFsaXplZCA9IGZhbHNlO1xudmFyIG9uSW5pdCA9IGZ1bmN0aW9uICgpIHt9O1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIC8vIEFkZCB0aGUgI21pbmRtZWxkLW1vZGFsIGRpdiB0byB0aGUgcGFnZVxuICAgIHZhciBtbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1tLnNldEF0dHJpYnV0ZSgnaWQnLCAnbWluZG1lbGQtbW9kYWwnKTtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShtbSwgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzBdKTtcbiAgICAkbW0gPSBVVElMLmVsKG1tKTtcblxuICAgIC8vIEluaXRpYWxpemUgYW55IGVsZW1lbnQgd2l0aCAubW0tdm9pY2UtbmF2LWluaXQgb24gaXRcbiAgICB2YXIgJGluaXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW0tdm9pY2UtbmF2LWluaXQnKTtcbiAgICB2YXIgY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbCgpO1xuICAgIH07XG4gICAgZm9yKHZhciBpID0gMDsgaSA8ICRpbml0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBVVElMLmVsKCRpbml0c1tpXSkuY2xpY2soY2xpY2tIYW5kbGVyKTtcbiAgICB9XG5cbiAgICB2YXIgJHRleHRJbml0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21tLXZvaWNlLW5hdi10ZXh0LWluaXQnKTtcbiAgICB2YXIga2V5UHJlc3NIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbCh7IHF1ZXJ5OiBxdWVyeSB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZm9yKHZhciBqID0gMDsgaiA8ICR0ZXh0SW5pdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgVVRJTC5lbCgkdGV4dEluaXRzW2pdKS5rZXlwcmVzcyhrZXlQcmVzc0hhbmRsZXIpO1xuICAgIH1cblxuICAgIHNldEluaXRpYWxpemVkKCk7XG5cbiAgICAvLyBXYWl0IGZvciBtZXNzYWdlc1xuICAgIFVUSUwuZWwod2luZG93KS5vbignbWVzc2FnZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5kYXRhLnNvdXJjZSAhPSAnbWluZG1lbGQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoZXZlbnQuZGF0YS5hY3Rpb24gPT0gJ2Nsb3NlJykge1xuICAgICAgICAgICAgJG1tLnJlbW92ZUNsYXNzKCdvbicpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldEluaXRpYWxpemVkKCkge1xuICAgIGlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIG9uSW5pdCgpO1xufVxuXG5mdW5jdGlvbiBwb3N0TWVzc2FnZShhY3Rpb24sIGRhdGEpIHtcbiAgICB2YXIgd2luID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5kbWVsZC1pZnJhbWVcIikuY29udGVudFdpbmRvdztcbiAgICB3aW4ucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgc291cmNlOiAnbWluZG1lbGQnLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgfSwgXCIqXCIpO1xufVxuXG4vKipcbiAqIE9wZW5zIHRoZSB2b2ljZSBuYXZpZ2F0b3IgbW9kYWwgd2luZG93XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucXVlcnldICAgICAgICAgICAgICAgICBpZiBwcm92aWRlZCwgdGhpcyBmaWVsZCB3aWxsIGJlIHRoZSBpbml0aWFsIHF1ZXJ5LCBhbmQgd2lsbCBpbW1lZGlhdGVseSBzaG93IHJlc3VsdHNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZm9yY2VOZXdJRnJhbWU9ZmFsc2VdIGlmIHRydWUsIGFueSB2b2ljZSBuYXZpZ2F0b3JzIHRoYXQgcHJldmlvdXNseSBjcmVhdGVkIHdpbGwgYmUgZGVzdHJveWVkLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIGEgbmV3IGluc3RhbmNlIHdpbGwgYmUgY3JlYXRlZC5cbiAqL1xuTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmIChpc0luaXRpYWxpemVkKSB7XG4gICAgICAgIHZhciBpZnJhbWU7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdm9pY2UgbmF2aWdhdG9yIGNvbmZpZ1xuICAgICAgICBpZiAodHlwZW9mIE1NICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS53aWRnZXRzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBNTS53aWRnZXRzLmNvbmZpZyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBNb3ZlIGNvbmZpZyB0byB2b2ljZSBuYXYgY29uZmlnXG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnID0gTU0ud2lkZ2V0cy5jb25maWcudm9pY2UgfHwge307XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmFwcElEID0gTU0ud2lkZ2V0cy5jb25maWcuYXBwSUQ7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS53aWRnZXRzLmNvbmZpZy5jbGVhblVybCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmNsZWFuVXJsID0gTU0ud2lkZ2V0cy5jb25maWcuY2xlYW5Vcmw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgTU0ud2lkZ2V0cy5jb25maWcuZmF5ZUNsaWVudFVybCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmZheWVDbGllbnRVcmwgPSBNTS53aWRnZXRzLmNvbmZpZy5mYXllQ2xpZW50VXJsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIHBhcnNlIGNhcmQgbGF5b3V0XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY2FyZFRlbXBsYXRlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY2FyZExheW91dCA9ICdjdXN0b20nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jYXJkTGF5b3V0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY2FyZExheW91dCA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBtYWtlIGFic29sdXRlIFVSTHNcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jdXN0b21DU1NVUkwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jdXN0b21DU1NVUkwgPSBVVElMLmNvbnZlcnRUb0Fic29sdXRlUGF0aChNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY3VzdG9tQ1NTVVJMKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IGxpc3RlbmluZyBtb2RlXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxpc3RlbmluZ01vZGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5saXN0ZW5pbmdNb2RlID0gb3B0aW9ucy5saXN0ZW5pbmdNb2RlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5saXN0ZW5pbmdNb2RlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcubGlzdGVuaW5nTW9kZSA9ICdub3JtYWwnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFBhc3MgdG9rZW4sIHVzZXIgSUQsIGFuZCBzZXNzaW9uIElEIGlmIHRoZXkgYXJlIHNldCBhbHJlYWR5XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS50b2tlbiAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIE1NLmFjdGl2ZVVzZXJJZCAhPT0gJ3VuZGVmaW5lZCcgJiYgTU0uYWN0aXZlVXNlcklkICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBNTS5hY3RpdmVTZXNzaW9uSWQgIT09ICd1bmRlZmluZWQnICYmIE1NLmFjdGl2ZVNlc3Npb25JZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcubW1DcmVkZW50aWFscyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBNTS50b2tlbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJRDogTU0uYWN0aXZlVXNlcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbklEOiBNTS5hY3RpdmVTZXNzaW9uSWRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWYgZGVmaW5lZCwgcGFzcyBhIHN0YXJ0aW5nIHF1ZXJ5XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucXVlcnkgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnF1ZXJ5ICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuc3RhcnRRdWVyeSA9IG9wdGlvbnMucXVlcnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuc3RhcnRRdWVyeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZm9yY2VOZXdJRnJhbWUgJiYgJG1tX2lmcmFtZSkge1xuICAgICAgICAgICAgaWZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbmRtZWxkLWlmcmFtZScpO1xuICAgICAgICAgICAgaWZyYW1lLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBpZnJhbWUgaWYgZmlyc3QgbG9hZFxuICAgICAgICBpZiAoISRtbV9pZnJhbWUgfHwgb3B0aW9ucy5mb3JjZU5ld0lGcmFtZSkge1xuICAgICAgICAgICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdmcmFtZUJvcmRlcicsICcwJyk7XG4gICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdpZCcsICdtaW5kbWVsZC1pZnJhbWUnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93dHJhbnNwYXJlbmN5JywgJ3RydWUnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIE1NLmxvYWRlci5yb290VVJMICsgJ3dpZGdldHMvdm9pY2VOYXZpZ2F0b3IvbW9kYWwvbW9kYWwuaHRtbCcpO1xuXG4gICAgICAgICAgICAkbW1faWZyYW1lID0gVVRJTC5lbChpZnJhbWUpO1xuXG4gICAgICAgICAgICBVVElMLmVsKGlmcmFtZSkub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSgnY29uZmlnJywgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnKTtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSgnb3BlbicpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRtbS5lbCgpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwb3N0TWVzc2FnZSgnb3BlbicpO1xuICAgICAgICB9XG4gICAgICAgICRtbS5hZGRDbGFzcygnb24nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIFNldCBvbkluaXQoKSBjYWxsYmFjayB0byBvcGVuIG1vZGFsXG4gICAgICAgIG9uSW5pdCA9IGZ1bmN0aW9uICgpIHsgTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKG9wdGlvbnMpOyB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBDbG9zZXMgdGhlIHZvaWNlIG5hdmlnYXRvciBtb2RhbCB3aW5kb3dcbiAqL1xuTU0udm9pY2VOYXZpZ2F0b3IuaGlkZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuICAgIHBvc3RNZXNzYWdlKCdjbG9zZScpO1xufTtcblxuLy8gc2NoZWR1bGUgaW5pdGlhbGl6YXRpb24gb2Ygdm9pY2UgbmF2aWdhdG9yXG5VVElMLmNvbnRlbnRMb2FkZWQod2luZG93LCBmdW5jdGlvbigpIHtcbiAgICBpbml0KCk7XG59KTtcbiJdfQ==
