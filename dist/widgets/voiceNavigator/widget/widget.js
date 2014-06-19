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
    var $textInits = document.getElementsByClassName('mm-voice-nav-text-init');
    var clickHandler = function(e) {
        e.preventDefault();

        // look for text value in mm-voice-nav-text-init element
        if ($textInits.length > 0) {
            var query = $textInits[0].value;
            MM.voiceNavigator.showModal({ query: query });
        }
        else {
            MM.voiceNavigator.showModal();
        }
    };
    for(var i = 0; i < $inits.length; i++) {
        UTIL.el($inits[i]).click(clickHandler);
    }

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
            postMessage('open', MM.voiceNavigator.config);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvc3dhcmFqL3JlcG9zL21pbmRtZWxkLWpzLXNkay9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3N3YXJhai9yZXBvcy9taW5kbWVsZC1qcy1zZGsvc3JjL3dpZGdldHMvdm9pY2VOYXZpZ2F0b3IvanMvdXRpbC5qcyIsIi9Vc2Vycy9zd2FyYWovcmVwb3MvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL3ZlbmRvci9jb250ZW50bG9hZGVkLmpzIiwiL1VzZXJzL3N3YXJhai9yZXBvcy9taW5kbWVsZC1qcy1zZGsvc3JjL3dpZGdldHMvdm9pY2VOYXZpZ2F0b3IvanMvd2lkZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicmVxdWlyZSgnLi92ZW5kb3IvY29udGVudGxvYWRlZCcpO1xuXG4vKiBBIHdyYXBwZXIgZm9yIGRvbSBlbGVtZW50cywgYmFzaWNhbGx5IGEgbGl0ZSB2ZXJzaW9uIG9mIGpRdWVyeSdzICQgKi9cbmV4cG9ydHMuZWwgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBmdW5jdGlvbihldmVudCwgZnVuYykge1xuICAgICAgICAgICAgaWYoZWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsZnVuYyxmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoZWwuYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBlbC5hdHRhY2hFdmVudChcIm9uXCIrZXZlbnQsZnVuYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMub24oJ2NsaWNrJywgZnVuYyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAga2V5cHJlc3M6IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgICAgICB0aGlzLm9uKCdrZXlwcmVzcycsIGZ1bmMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoJyhefFxcXFxzKyknICsgY2xhc3NOYW1lICsgJyhcXFxccyt8JCknLCAnZycpLFxuICAgICAgICAgICAgICAgICckMSdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lICsgXCIgXCIgKyBjbGFzc05hbWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnRzLmNvbnZlcnRUb0Fic29sdXRlUGF0aCA9IGZ1bmN0aW9uKGhyZWYpIHtcbiAgICB2YXIgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGFuY2hvci5ocmVmID0gaHJlZjtcbiAgICByZXR1cm4gKGFuY2hvci5wcm90b2NvbCArICcvLycgKyBhbmNob3IuaG9zdCArIGFuY2hvci5wYXRobmFtZSArIGFuY2hvci5zZWFyY2ggKyBhbmNob3IuaGFzaCk7XG59O1xuXG5mdW5jdGlvbiBhZGRMZWFkaW5nWmVyb3MobnVtYmVyLCBkaWdpdHMpIHtcbiAgICB2YXIgYmFzZSA9IE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICAgIG51bWJlciArPSBiYXNlO1xuICAgIG51bWJlciA9IG51bWJlci50b1N0cmluZygpO1xuICAgIHJldHVybiBudW1iZXIuc3Vic3RyaW5nKG51bWJlci5sZW5ndGggLSBkaWdpdHMpO1xufVxuXG5leHBvcnRzLnRpbWVzdGFtcCA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgZGF0ZSA9IGRhdGUgfHwgbmV3IERhdGUoKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0RnVsbFllYXIoKSwgNCkgKyAnLidcbiAgICAgICAgKyBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRNb250aCgpICsgMSwgMikgKyAnLidcbiAgICAgICAgKyBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXREYXRlKCksIDIpICsgJyAnICsgZGF0ZS50b1RpbWVTdHJpbmcoKTtcbn07XG5cbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGFyZ3Muc3BsaWNlKDAsIDAsIGV4cG9ydHMudGltZXN0YW1wKCkpO1xuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xufTtcblxuZXhwb3J0cy5jb250ZW50TG9hZGVkID0gY29udGVudExvYWRlZDsiLCIvKiFcbiAqIGNvbnRlbnRsb2FkZWQuanNcbiAqXG4gKiBBdXRob3I6IERpZWdvIFBlcmluaSAoZGllZ28ucGVyaW5pIGF0IGdtYWlsLmNvbSlcbiAqIFN1bW1hcnk6IGNyb3NzLWJyb3dzZXIgd3JhcHBlciBmb3IgRE9NQ29udGVudExvYWRlZFxuICogVXBkYXRlZDogMjAxMDEwMjBcbiAqIExpY2Vuc2U6IE1JVFxuICogVmVyc2lvbjogMS4yXG4gKlxuICogVVJMOlxuICogaHR0cDovL2phdmFzY3JpcHQubndib3guY29tL0NvbnRlbnRMb2FkZWQvXG4gKiBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vQ29udGVudExvYWRlZC9NSVQtTElDRU5TRVxuICpcbiAqL1xuXG4vLyBAd2luIHdpbmRvdyByZWZlcmVuY2Vcbi8vIEBmbiBmdW5jdGlvbiByZWZlcmVuY2VcbndpbmRvdy5jb250ZW50TG9hZGVkID0gZnVuY3Rpb24gY29udGVudExvYWRlZCh3aW4sIGZuKSB7XG5cblx0dmFyIGRvbmUgPSBmYWxzZSwgdG9wID0gdHJ1ZSxcblxuXHRkb2MgPSB3aW4uZG9jdW1lbnQsIHJvb3QgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuXG5cdGFkZCA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ2F0dGFjaEV2ZW50Jyxcblx0cmVtID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnZGV0YWNoRXZlbnQnLFxuXHRwcmUgPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICcnIDogJ29uJyxcblxuXHRpbml0ID0gZnVuY3Rpb24oZSkge1xuXHRcdGlmIChlLnR5cGUgPT0gJ3JlYWR5c3RhdGVjaGFuZ2UnICYmIGRvYy5yZWFkeVN0YXRlICE9ICdjb21wbGV0ZScpIHJldHVybjtcblx0XHQoZS50eXBlID09ICdsb2FkJyA/IHdpbiA6IGRvYylbcmVtXShwcmUgKyBlLnR5cGUsIGluaXQsIGZhbHNlKTtcblx0XHRpZiAoIWRvbmUgJiYgKGRvbmUgPSB0cnVlKSkgZm4uY2FsbCh3aW4sIGUudHlwZSB8fCBlKTtcblx0fSxcblxuXHRwb2xsID0gZnVuY3Rpb24oKSB7XG5cdFx0dHJ5IHsgcm9vdC5kb1Njcm9sbCgnbGVmdCcpOyB9IGNhdGNoKGUpIHsgc2V0VGltZW91dChwb2xsLCA1MCk7IHJldHVybjsgfVxuXHRcdGluaXQoJ3BvbGwnKTtcblx0fTtcblxuXHRpZiAoZG9jLnJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJykgZm4uY2FsbCh3aW4sICdsYXp5Jyk7XG5cdGVsc2Uge1xuXHRcdGlmIChkb2MuY3JlYXRlRXZlbnRPYmplY3QgJiYgcm9vdC5kb1Njcm9sbCkge1xuXHRcdFx0dHJ5IHsgdG9wID0gIXdpbi5mcmFtZUVsZW1lbnQ7IH0gY2F0Y2goZSkgeyB9XG5cdFx0XHRpZiAodG9wKSBwb2xsKCk7XG5cdFx0fVxuXHRcdGRvY1thZGRdKHByZSArICdET01Db250ZW50TG9hZGVkJywgaW5pdCwgZmFsc2UpO1xuXHRcdGRvY1thZGRdKHByZSArICdyZWFkeXN0YXRlY2hhbmdlJywgaW5pdCwgZmFsc2UpO1xuXHRcdHdpblthZGRdKHByZSArICdsb2FkJywgaW5pdCwgZmFsc2UpO1xuXHR9XG5cbn1cbiIsInZhciBVVElMID0gIHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIE1NID0gd2luZG93Lk1NID0gd2luZG93Lk1NIHx8IHt9O1xuXG5cbi8qKlxuICogQW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgY29uZmlndXJhdGlvbiBvZiBNTS52b2ljZU5hdmlnYXRvclxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFZvaWNlTmF2aWdhdG9yQ29uZmlnXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2NhcmRMaW5rQmVoYXZpb3I9XCJfcGFyZW50XCJdIHNldHMgdGhlIGJlaGF2aW9yIGZvciBhbmNob3JzIHdyYXBwaW5nIGNhcmRzLiBVc2UgJ2ZhbHNlJyB0b1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmVudCBvcGVuaW5nIGxpbmtzLCAnX3BhcmVudCcgdG8gb3BlbiBsaW5rcyBpbiB0aGUgc2FtZSB0YWIgb3Igd2luZG93LFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgJ19ibGFuaycgdG8gb3BlbiBsaW5rcyBpbiBhIG5ldyB0YWIgb3Igd2luZG93LiBTZWUgdGhlIHRhcmdldCBhdHRyaWJ1dGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mIFthbmNob3JdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9hKVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2xpc3RlbmluZ01vZGU9XCJub3JtYWxcIl0gZGVmaW5lcyB0aGUgbGlzdGVuaW5nIG1vZGUgb2YgdGhlIHZvaWNlIG5hdmlnYXRvciB3aGVuIGl0IF9pbml0IG9wZW5lZC4gQWNjZXB0YWJsZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgaW5jbHVkZSAnbm9ybWFsJywgJ2NvbnRpbnVvdXMnLCBhbmQgZmFsc2UuIEZhbHNlIHByZXZlbnRzIGxpc3RlbmluZ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIGRlZmF1bHQgaXMgJ25vcm1hbCcuXG4gKiBAcHJvcGVydHkge051bWJlcn0gW251bVJlc3VsdHNdIGlmIHNwZWNpZmllZCwgdGhpcyBudW1iZXIgb2YgY2FyZHMgd2lsbCBhcHBlYXIgYXMgcmVzdWx0c1xuICogQHByb3BlcnR5IHtTdHJpbmd9IFtjYXJkTGF5b3V0PVwiZGVmYXVsdFwiXSBzcGVjaWZpZXMgdGhlIHByZWRlZmluZWQgY2FyZCBsYXlvdXQgdXNlZC4gVmFsaWQgdmFsdWVzIGFyZSAnZGVmYXVsdCcsIGFuZCAnY3VzdG9tJy5cbiAqIEBwcm9wZXJ0eSB7Q2FyZEZpZWxkW119IFtjYXJkRmllbGRzXSBhbiBhcnJheSBvZiBjYXJkIGZpZWxkcyB7QGxpbmsgQ2FyZEZpZWxkfS5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbY2FyZFRlbXBsYXRlXSBhbiB1bmRlcnNjb3JlIChsb2Rhc2gpIGh0bWwgdGVtcGxhdGUgd2hpY2ggaXMgdXNlZCB0byBjcmVhdGUgY2FyZCByZXByZXNlbnRhdGlvbiBvZiBkb2N1bWVudHMuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWYgYSB2YWx1ZSBpcyBnaXZlbiwgY2FyZExheW91dCB3aWxsIGJlICdjdXN0b20nXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtyZXNldENhcmRzQ1NTXSBpZiB0cnVlLCByZW1vdmVzIENTUyBzcGVjaWZpYyB0byB0aGUgY2FyZHMgY29udGFpbmVyLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtjdXN0b21DU1NdIHNwZWNpZmllcyBjdXN0b20gY3NzIHRvIGJlIGFwcGxpZWRcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbY3VzdG9tQ1NTVVJMXSBzcGVjaWZpZXMgdGhlIHVybCBvZiBhIGZpbGUgY29udGFpbmluZyBjdXN0b20gQ1NTIHRvIGJlIGFwcGxpZWRcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBbYmFzZVpJbmRleD0xMDAwMDBdIHRoZSB2b2ljZSBuYXZpZ2F0b3IgZWxlbWVudHMgd2lsbCBoYXZlIGEgWiBpbmRleCBiZXR3ZWVuIHRoZSB2YWx1ZSBnaXZlbiBhbmRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEwMDAgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZVxuICpcbiAqL1xuXG4vKipcbiAqIEFuIE9iamVjdCByZXByZXNlbnRpbmcgYSBmaWVsZCB0byBkaXNwbGF5IGluIGEgZG9jdW1lbnQgY2FyZCBmb3IgdGhlIFZvaWNlIE5hdmlnYXRvciB3aWRnZXQuXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gQ2FyZEZpZWxkXG4gKiBAcHJvcGVydHkge1N0cmluZ30ga2V5ICAgICAgICAgICB0aGUga2V5IGNvbnRhaW5pbmcgdGhlIHZhbHVlIG9mIHRoaXMgZmllbGQgaW4gZG9jdW1lbnQgb2JqZWN0cy4gVGhpcyBmaWVsZCBtdXN0IGJlIHNwZWNpZmllZC5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbcGxhY2Vob2xkZXJdIGlmIHNwZWNpZmllZCwgd2hlbiB0aGUga2V5IGlzIG5vdCBwcmVzZW50IGluIGEgZG9jdW1lbnQgb3IgaXMgZW1wdHksIHRoaXMgdmFsdWUgd2lsbCBiZSBkaXNwbGF5ZWQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBvbWl0dGVkIHRoZSB2YWx1ZSB3aWxsIGJlIGhpZGRlbiBmcm9tIHRoZSBjYXJkXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2xhYmVsXSAgICAgICBpZiBzcGVjaWZpZWQsIGEgbGFiZWwgd2l0aCB0aGUgcHJvdmlkZWQgdGV4dCB3aWxsIHByZWNlZGUgdGhlIHZhbHVlXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2Zvcm1hdF0gICAgICBmb3IgZm9ybWF0dGVyIHRvIGJlIHVzZWQgdG8gcHJlc2VudCB0aGUgdmFsdWUgaW4gYSB1c2VyIGZyaWVuZGx5IGZvcm0uIFZhbGlkIGZvcm1hdHRlcnNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZSBkZWZhdWx0LCBhbmQgZGF0ZS5cbiAqXG4gKiBAZXhhbXBsZVxuIC8vIFdpbGwgcmVzdWx0IGluIHRoZSBmb2xsb3dpbmc6XG4gLy8gUmVsZWFzZWQgMTAvMTMvMTk5NlxuIC8vXG4gdmFyIGRhdGVGaWVsZCA9IHtcbiAgIGtleTogJ3B1YmRhdGUnLFxuICAgcGxhY2Vob2xkZXI6ICdVbmtub3duJyxcbiAgIGxhYmVsOiAnUmVsZWFzZWQnLFxuICAgZm9ybWF0OiAnZGF0ZSdcbiB9O1xuICpcbiAqL1xuXG4vKipcbiAqIFRoZSB2b2ljZSBuYXZpZ2F0b3IgaXMgYSB3aWRnZXQgdGhhdCBhbGxvd3MgZGV2ZWxvcGVycyB0byBhZGQgdm9pY2UtZHJpdmVuIHNlYXJjaCB0byB0aGVpciB3ZWItYmFzZWQgYXBwbGljYXRpb25zLlxuICogQnkgYWRkaW5nIGEgc21hbGwgc25pcHBldCBvZiBKYXZhU2NyaXB0IHRvIHlvdXIgcGFnZSwgeW91IGNhbiBhZGQgb3VyIHZvaWNlIG5hdmlnYXRvciB0byB5b3VyIHBhZ2UgYWxsb3dpbmcgeW91clxuICogdXNlcnMgdG8gc2VhcmNoIGFuZCBkaXNjb3ZlciB5b3VyIGNvbnRlbnQgaW4gbmF0dXJhbCwgc3Bva2VuIGxhbmd1YWdlLiBUaGUgdm9pY2UgbmF2aWdhdG9yIHdpZGdldCB0YWtlcyBjYXJlIG9mXG4gKiBjYXB0dXJpbmcgc3BlZWNoIGlucHV0IGZyb20geW91ciB1c2VycywgZGlzcGxheWluZyBhIHJlYWx0aW1lIHRyYW5zY3JpcHQgb2Ygd2hhdCBpcyBiZWluZyByZWNvcmRlZCwgYW5kIGRpc3BsYXlpbmdcbiAqIGEgY29sbGVjdGlvbiBvZiByZXN1bHRzIGluIHRoZSBicm93c2VyLlxuICpcbiAqIFRoZSB2b2ljZSBuYXZpZ2F0b3Igd2lsbCBkaXNwbGF5IHdoZW4gZWxlbWVudHMgd2l0aCB0aGUgJ21tLXZvaWNlLW5hdi1pbml0JyBjbGFzcyBhcmUgY2xpY2tlZCBhbmQgd2hlbiBlbGVtZW50cyB3aXRoXG4gKiB0aGUgJ21tLXZvaWNlLW5hdi10ZXh0LWluaXQnIHJlY2lldmUgYW4gZW50ZXIga2V5cHJlc3MuXG4gKlxuICogVGhlIHZvaWNlIG5hdmlnYXRvciBjYW4gYmUgc3R5bGVkIGJ5IHByb3ZpZGluZyBjdXN0b20gY3NzLlxuICpcbiAqIFNlZSB7QGxpbmsgVm9pY2VOYXZpZ2F0b3JDb25maWd9IGZvciBhIGZ1bGwgbGlzdCBvZiB0aGUgY29uZmlndXJhdGlvbiBvcHRpb25zLlxuICpcbiAqIEBleGFtcGxlXG48Y2FwdGlvbj5Mb2FkaW5nIHRoZSB2b2ljZSBuYXZpZ2F0b3I8L2NhcHRpb24+XG52YXIgTU0gPSB3aW5kb3cuTU0gfHwge307XG4oIGZ1bmN0aW9uICgpIHtcbiAgICBNTS5sb2FkZXIgPSB7XG4gICAgICAgIHJvb3RVUkw6ICdodHRwczovL2RldmVsb3Blci5leHBlY3RsYWJzLmNvbS9wdWJsaWMvc2Rrcy8nLFxuICAgICAgICB3aWRnZXRzOiBbJ3ZvaWNlJ11cbiAgICB9O1xuICAgIE1NLndpZGdldHMgPSB7XG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgYXBwSUQ6ICdZT1VSIEFQUElEJyxcbiAgICAgICAgICAgIHZvaWNlOiB2b2ljZU5hdmlnYXRvckNvbmZpZ1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0Jzsgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICBzY3JpcHQuc3JjID0gTU0ubG9hZGVyLnJvb3RVUkwgKyAnZW1iZWQuanMnO1xuICAgIHZhciB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgIHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2NyaXB0LCB0KTtcbn0oKSk7XG4gKlxuICogQGV4YW1wbGVcbjxjYXB0aW9uPkNoYW5naW5nIGJ1dHRvbiBjb2xvcnMgZnJvbSB0aGUgZGVmYXVsdCBvcmFuZ2UgdG8gZ3JlZW48L2NhcHRpb24+XG4vLyBzcGVjaWZ5IHRoZSBmb2xsb3dpbmcgYXMgdGhlIGNvbnRlbnRzIG9mIHZvaWNlTmF2aWdhdG9yT3B0aW9ucy5jdXN0b21DU1Ncbi5tbS1idXR0b24tYmFja2dyb3VuZCB7XG4gICAgYmFja2dyb3VuZDogIzAwODAwMDtcbn1cbi5tbS1idXR0b24tYmFja2dyb3VuZDpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwNzMwMDtcbn1cbi5tbS1idXR0b24tYmFja2dyb3VuZDphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KCMwMDVhMDAsICMwMDgwMDApO1xuICAgIGJhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KCMwMDVhMDAsICMwMDgwMDApO1xuICAgIGJhY2tncm91bmQ6IC1vLWxpbmVhci1ncmFkaWVudCgjMDA1YTAwLCAjMDA4MDAwKTtcbiAgICBiYWNrZ3JvdW5kOiAtbXMtbGluZWFyLWdyYWRpZW50KCMwMDVhMDAsICMwMDgwMDApO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgjMDA1YTAwLCAjMDA4MDAwKTtcbn1cbi5tbS1idXR0b24tYm9yZGVyIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMDA2NjAwO1xufVxuXG5ALW1vei1rZXlmcmFtZXMgbW0tYnV0dG9uLWJhY2tncm91bmQtYWN0aXZlLWFuaW0ge1xuICAgIDUwJSB7IGJhY2tncm91bmQtY29sb3I6ICMwMDZkMDA7IH1cbn1cbkAtd2Via2l0LWtleWZyYW1lcyBtbS1idXR0b24tYmFja2dyb3VuZC1hY3RpdmUtYW5pbSB7XG4gICAgNTAlIHsgYmFja2dyb3VuZC1jb2xvcjogIzAwNmQwMDsgfVxufVxuQC1vLWtleWZyYW1lcyBtbS1idXR0b24tYmFja2dyb3VuZC1hY3RpdmUtYW5pbSB7XG4gICAgNTAlIHsgYmFja2dyb3VuZC1jb2xvcjogIzAwNmQwMDsgfVxufVxuQGtleWZyYW1lcyBtbS1idXR0b24tYmFja2dyb3VuZC1hY3RpdmUtYW5pbSB7XG4gICAgNTAlIHsgYmFja2dyb3VuZC1jb2xvcjogIzAwNmQwMDsgfVxufVxuICpcbiAqIEBleGFtcGxlXG48Y2FwdGlvbj5DdXN0b21pemUgY2FyZHMgYXJlYSBhcHBlYXJhbmNlPC9jYXB0aW9uPlxuXFwjY2FyZHMge1xuICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtnb2xkZW5yb2Q7XG59XG5cXCNjYXJkcyAuY2FyZCB7XG4gICAgYm9yZGVyOiBzb2xpZCAjMzMzIDFweDtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIGJhY2tncm91bmQ6IHJlZDtcbn1cblxcI2NhcmRzIC5jYXJkOmhvdmVyIHtcbiAgICBib3JkZXItY29sb3I6IGJsYWNrO1xufVxuXFwjY2FyZHMgLmNhcmQgcCB7XG4gICAgY29sb3I6IHdoaXRlO1xufVxuXFwjY2FyZHMgLmNhcmQgaDIudGl0bGUge1xuICAgIGNvbG9yOiAjZGRkO1xufVxuICpcbiAqIFNlZSBvdXIgW3dpZGdldHMgcGFnZV0oaHR0cHM6Ly9kZXZlbG9wZXItc3dhcmFqLmV4cGVjdGxhYnMuY29tL2RlbW9zKSB0byBnZXQgc3RhcnRlZCB3aXRoIFZvaWNlIE5hdmlnYXRvci4gTk9URTogQ0hBTkdFIFRIRSBMSU5LIVxuICogU2VlIG91ciBbZGVtb3MgcGFnZV0oaHR0cHM6Ly9kZXZlbG9wZXIuZXhwZWN0bGFicy5jb20vZGVtb3MpIHRvIHNlZSBtb3JlIGRldGFpbGVkIGNvZGUgZXhhbXBsZXMuXG4gKlxuICogQG1lbWJlck9mIE1NXG4gKiBAbmFtZXNwYWNlXG4gKi9cbk1NLnZvaWNlTmF2aWdhdG9yID0gTU0udm9pY2VOYXZpZ2F0b3IgfHwge307XG5NTS5sb2FkZXIgPSBNTS5sb2FkZXIgfHwge307XG5NTS5sb2FkZXIucm9vdFVSTCA9IE1NLmxvYWRlci5yb290VVJMIHx8ICdodHRwczovL2RldmVsb3Blci5leHBlY3RsYWJzLmNvbS9wdWJsaWMvc2Rrcy8nO1xuXG4vKipcbiAqIFRoZSAnZGl2I21pbmRtZWxkLW1vZGFsJyBlbGVtZW50IHdoaWNoIGNvbnRhaW5zIGFsbCBvZiB0aGUgdm9pY2UgbmF2aWdhdG9yIGh0bWxcbiAqIEBwcml2YXRlXG4gKi9cbnZhciAkbW0gPSBmYWxzZTtcblxuLyoqXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyICRtbV9pZnJhbWUgPSBmYWxzZTtcblxuLyoqXG4gKiBpc0luaXRpYWxpemVkIGlzIHNldCB0byB0cnVlIG9uY2UgdGhlIHdpZGdldCBoYXMgYmVlbiBpbml0aWFsaXplZC4gT25jZVxuICogdGhlIHdpZGdldCBpcyBpbml0aWFsaXplZCBvbkluaXQoKSBpcyBjYWxsZWQuIFRoaXMgaXMgdXNlZCBieVxuICogTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKCkgdG8gYWxsb3cgdXNlcnMgdG8gY2FsbCBzaG93TW9kYWxcbiAqIHdpdGhvdXQgaGF2aW5nIHRvIGtub3cgaWYgdGhlIHdpZGdldCBpcyBsb2FkZWQgb3Igbm90XG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIGlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbnZhciBvbkluaXQgPSBmdW5jdGlvbiAoKSB7fTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAvLyBBZGQgdGhlICNtaW5kbWVsZC1tb2RhbCBkaXYgdG8gdGhlIHBhZ2VcbiAgICB2YXIgbW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtbS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21pbmRtZWxkLW1vZGFsJyk7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUobW0sIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1swXSk7XG4gICAgJG1tID0gVVRJTC5lbChtbSk7XG5cbiAgICAvLyBJbml0aWFsaXplIGFueSBlbGVtZW50IHdpdGggLm1tLXZvaWNlLW5hdi1pbml0IG9uIGl0XG4gICAgdmFyICRpbml0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21tLXZvaWNlLW5hdi1pbml0Jyk7XG4gICAgdmFyICR0ZXh0SW5pdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtbS12b2ljZS1uYXYtdGV4dC1pbml0Jyk7XG4gICAgdmFyIGNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIGxvb2sgZm9yIHRleHQgdmFsdWUgaW4gbW0tdm9pY2UtbmF2LXRleHQtaW5pdCBlbGVtZW50XG4gICAgICAgIGlmICgkdGV4dEluaXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBxdWVyeSA9ICR0ZXh0SW5pdHNbMF0udmFsdWU7XG4gICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5zaG93TW9kYWwoeyBxdWVyeTogcXVlcnkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5zaG93TW9kYWwoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZm9yKHZhciBpID0gMDsgaSA8ICRpbml0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBVVElMLmVsKCRpbml0c1tpXSkuY2xpY2soY2xpY2tIYW5kbGVyKTtcbiAgICB9XG5cbiAgICB2YXIga2V5UHJlc3NIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbCh7IHF1ZXJ5OiBxdWVyeSB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZm9yKHZhciBqID0gMDsgaiA8ICR0ZXh0SW5pdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgVVRJTC5lbCgkdGV4dEluaXRzW2pdKS5rZXlwcmVzcyhrZXlQcmVzc0hhbmRsZXIpO1xuICAgIH1cblxuICAgIHNldEluaXRpYWxpemVkKCk7XG5cbiAgICAvLyBXYWl0IGZvciBtZXNzYWdlc1xuICAgIFVUSUwuZWwod2luZG93KS5vbignbWVzc2FnZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5kYXRhLnNvdXJjZSAhPSAnbWluZG1lbGQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoZXZlbnQuZGF0YS5hY3Rpb24gPT0gJ2Nsb3NlJykge1xuICAgICAgICAgICAgJG1tLnJlbW92ZUNsYXNzKCdvbicpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldEluaXRpYWxpemVkKCkge1xuICAgIGlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIG9uSW5pdCgpO1xufVxuXG5mdW5jdGlvbiBwb3N0TWVzc2FnZShhY3Rpb24sIGRhdGEpIHtcbiAgICB2YXIgd2luID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5kbWVsZC1pZnJhbWVcIikuY29udGVudFdpbmRvdztcbiAgICB3aW4ucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgc291cmNlOiAnbWluZG1lbGQnLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgfSwgXCIqXCIpO1xufVxuXG4vKipcbiAqIE9wZW5zIHRoZSB2b2ljZSBuYXZpZ2F0b3IgbW9kYWwgd2luZG93XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucXVlcnldICAgICAgICAgICAgICAgICBpZiBwcm92aWRlZCwgdGhpcyBmaWVsZCB3aWxsIGJlIHRoZSBpbml0aWFsIHF1ZXJ5LCBhbmQgd2lsbCBpbW1lZGlhdGVseSBzaG93IHJlc3VsdHNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZm9yY2VOZXdJRnJhbWU9ZmFsc2VdIGlmIHRydWUsIGFueSB2b2ljZSBuYXZpZ2F0b3JzIHRoYXQgcHJldmlvdXNseSBjcmVhdGVkIHdpbGwgYmUgZGVzdHJveWVkLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIGEgbmV3IGluc3RhbmNlIHdpbGwgYmUgY3JlYXRlZC5cbiAqL1xuTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmIChpc0luaXRpYWxpemVkKSB7XG4gICAgICAgIHZhciBpZnJhbWU7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdm9pY2UgbmF2aWdhdG9yIGNvbmZpZ1xuICAgICAgICBpZiAodHlwZW9mIE1NICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS53aWRnZXRzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBNTS53aWRnZXRzLmNvbmZpZyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBNb3ZlIGNvbmZpZyB0byB2b2ljZSBuYXYgY29uZmlnXG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnID0gTU0ud2lkZ2V0cy5jb25maWcudm9pY2UgfHwge307XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmFwcElEID0gTU0ud2lkZ2V0cy5jb25maWcuYXBwSUQ7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS53aWRnZXRzLmNvbmZpZy5jbGVhblVybCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmNsZWFuVXJsID0gTU0ud2lkZ2V0cy5jb25maWcuY2xlYW5Vcmw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgTU0ud2lkZ2V0cy5jb25maWcuZmF5ZUNsaWVudFVybCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmZheWVDbGllbnRVcmwgPSBNTS53aWRnZXRzLmNvbmZpZy5mYXllQ2xpZW50VXJsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIHBhcnNlIGNhcmQgbGF5b3V0XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY2FyZFRlbXBsYXRlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY2FyZExheW91dCA9ICdjdXN0b20nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jYXJkTGF5b3V0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY2FyZExheW91dCA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBtYWtlIGFic29sdXRlIFVSTHNcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jdXN0b21DU1NVUkwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jdXN0b21DU1NVUkwgPSBVVElMLmNvbnZlcnRUb0Fic29sdXRlUGF0aChNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY3VzdG9tQ1NTVVJMKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IGxpc3RlbmluZyBtb2RlXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxpc3RlbmluZ01vZGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5saXN0ZW5pbmdNb2RlID0gb3B0aW9ucy5saXN0ZW5pbmdNb2RlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5saXN0ZW5pbmdNb2RlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcubGlzdGVuaW5nTW9kZSA9ICdub3JtYWwnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFBhc3MgdG9rZW4sIHVzZXIgSUQsIGFuZCBzZXNzaW9uIElEIGlmIHRoZXkgYXJlIHNldCBhbHJlYWR5XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS50b2tlbiAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIE1NLmFjdGl2ZVVzZXJJZCAhPT0gJ3VuZGVmaW5lZCcgJiYgTU0uYWN0aXZlVXNlcklkICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBNTS5hY3RpdmVTZXNzaW9uSWQgIT09ICd1bmRlZmluZWQnICYmIE1NLmFjdGl2ZVNlc3Npb25JZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcubW1DcmVkZW50aWFscyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBNTS50b2tlbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJRDogTU0uYWN0aXZlVXNlcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbklEOiBNTS5hY3RpdmVTZXNzaW9uSWRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWYgZGVmaW5lZCwgcGFzcyBhIHN0YXJ0aW5nIHF1ZXJ5XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucXVlcnkgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnF1ZXJ5ICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuc3RhcnRRdWVyeSA9IG9wdGlvbnMucXVlcnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuc3RhcnRRdWVyeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZm9yY2VOZXdJRnJhbWUgJiYgJG1tX2lmcmFtZSkge1xuICAgICAgICAgICAgaWZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbmRtZWxkLWlmcmFtZScpO1xuICAgICAgICAgICAgaWZyYW1lLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBpZnJhbWUgaWYgZmlyc3QgbG9hZFxuICAgICAgICBpZiAoISRtbV9pZnJhbWUgfHwgb3B0aW9ucy5mb3JjZU5ld0lGcmFtZSkge1xuICAgICAgICAgICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdmcmFtZUJvcmRlcicsICcwJyk7XG4gICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdpZCcsICdtaW5kbWVsZC1pZnJhbWUnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93dHJhbnNwYXJlbmN5JywgJ3RydWUnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIE1NLmxvYWRlci5yb290VVJMICsgJ3dpZGdldHMvdm9pY2VOYXZpZ2F0b3IvbW9kYWwvbW9kYWwuaHRtbCcpO1xuXG4gICAgICAgICAgICAkbW1faWZyYW1lID0gVVRJTC5lbChpZnJhbWUpO1xuXG4gICAgICAgICAgICBVVElMLmVsKGlmcmFtZSkub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSgnY29uZmlnJywgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnKTtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSgnb3BlbicpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRtbS5lbCgpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwb3N0TWVzc2FnZSgnb3BlbicsIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgICAgJG1tLmFkZENsYXNzKCdvbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gU2V0IG9uSW5pdCgpIGNhbGxiYWNrIHRvIG9wZW4gbW9kYWxcbiAgICAgICAgb25Jbml0ID0gZnVuY3Rpb24gKCkgeyBNTS52b2ljZU5hdmlnYXRvci5zaG93TW9kYWwob3B0aW9ucyk7IH07XG4gICAgfVxufVxuXG4vKipcbiAqIENsb3NlcyB0aGUgdm9pY2UgbmF2aWdhdG9yIG1vZGFsIHdpbmRvd1xuICovXG5NTS52b2ljZU5hdmlnYXRvci5oaWRlTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgcG9zdE1lc3NhZ2UoJ2Nsb3NlJyk7XG59O1xuXG4vLyBzY2hlZHVsZSBpbml0aWFsaXphdGlvbiBvZiB2b2ljZSBuYXZpZ2F0b3JcblVUSUwuY29udGVudExvYWRlZCh3aW5kb3csIGZ1bmN0aW9uKCkge1xuICAgIGluaXQoKTtcbn0pO1xuIl19
