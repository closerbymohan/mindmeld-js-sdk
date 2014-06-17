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

// TODO: add more here
/**
 * The voice navigator widget....
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
 * @param {String} [options.query] if provided, this query will be in the
 * @param {boolean} [options.forceNewIFrame=false] if true,
 * @param {String|boolean} [options.listeningMode] the listening mode to be used when the voice navigator opens
 */
MM.voiceNavigator.showModal = function(options) {
    options = options || {};
    if (isInitialized) {
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
};

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL3V0aWwuanMiLCIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL3ZlbmRvci9jb250ZW50bG9hZGVkLmpzIiwiL1VzZXJzL2pqL0RvY3VtZW50cy9Db2RlL2V4cGVjdC1sYWJzL21pbmRtZWxkLWpzLXNkay9zcmMvd2lkZ2V0cy92b2ljZU5hdmlnYXRvci9qcy93aWRnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoJy4vdmVuZG9yL2NvbnRlbnRsb2FkZWQnKTtcblxuLyogQSB3cmFwcGVyIGZvciBkb20gZWxlbWVudHMsIGJhc2ljYWxseSBhIGxpdGUgdmVyc2lvbiBvZiBqUXVlcnkncyAkICovXG5leHBvcnRzLmVsID0gZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvbjogZnVuY3Rpb24oZXZlbnQsIGZ1bmMpIHtcbiAgICAgICAgICAgIGlmKGVsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LGZ1bmMsZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGVsLmF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgZWwuYXR0YWNoRXZlbnQoXCJvblwiK2V2ZW50LGZ1bmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNsaWNrOiBmdW5jdGlvbihmdW5jKSB7XG4gICAgICAgICAgICB0aGlzLm9uKCdjbGljaycsIGZ1bmMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGtleXByZXNzOiBmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICAgICAgdGhpcy5vbigna2V5cHJlc3MnLCBmdW5jKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVDbGFzczogZnVuY3Rpb24oY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKCcoXnxcXFxccyspJyArIGNsYXNzTmFtZSArICcoXFxcXHMrfCQpJywgJ2cnKSxcbiAgICAgICAgICAgICAgICAnJDEnXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFkZENsYXNzOiBmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZSArIFwiIFwiICsgY2xhc3NOYW1lO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgfSxcblxuICAgICAgICBlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0cy5jb252ZXJ0VG9BYnNvbHV0ZVBhdGggPSBmdW5jdGlvbihocmVmKSB7XG4gICAgdmFyIGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhbmNob3IuaHJlZiA9IGhyZWY7XG4gICAgcmV0dXJuIChhbmNob3IucHJvdG9jb2wgKyAnLy8nICsgYW5jaG9yLmhvc3QgKyBhbmNob3IucGF0aG5hbWUgKyBhbmNob3Iuc2VhcmNoICsgYW5jaG9yLmhhc2gpO1xufTtcblxuZnVuY3Rpb24gYWRkTGVhZGluZ1plcm9zKG51bWJlciwgZGlnaXRzKSB7XG4gICAgdmFyIGJhc2UgPSBNYXRoLnBvdygxMCwgZGlnaXRzKTtcbiAgICBudW1iZXIgKz0gYmFzZTtcbiAgICBudW1iZXIgPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gbnVtYmVyLnN1YnN0cmluZyhudW1iZXIubGVuZ3RoIC0gZGlnaXRzKTtcbn1cblxuZXhwb3J0cy50aW1lc3RhbXAgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIGRhdGUgPSBkYXRlIHx8IG5ldyBEYXRlKCk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldEZ1bGxZZWFyKCksIDQpICsgJy4nXG4gICAgICAgICsgYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpICsgJy4nXG4gICAgICAgICsgYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0RGF0ZSgpLCAyKSArICcgJyArIGRhdGUudG9UaW1lU3RyaW5nKCk7XG59O1xuXG5leHBvcnRzLmxvZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICBhcmdzLnNwbGljZSgwLCAwLCBleHBvcnRzLnRpbWVzdGFtcCgpKTtcbiAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcbn07XG5cbmV4cG9ydHMuY29udGVudExvYWRlZCA9IGNvbnRlbnRMb2FkZWQ7IiwiLyohXG4gKiBjb250ZW50bG9hZGVkLmpzXG4gKlxuICogQXV0aG9yOiBEaWVnbyBQZXJpbmkgKGRpZWdvLnBlcmluaSBhdCBnbWFpbC5jb20pXG4gKiBTdW1tYXJ5OiBjcm9zcy1icm93c2VyIHdyYXBwZXIgZm9yIERPTUNvbnRlbnRMb2FkZWRcbiAqIFVwZGF0ZWQ6IDIwMTAxMDIwXG4gKiBMaWNlbnNlOiBNSVRcbiAqIFZlcnNpb246IDEuMlxuICpcbiAqIFVSTDpcbiAqIGh0dHA6Ly9qYXZhc2NyaXB0Lm53Ym94LmNvbS9Db250ZW50TG9hZGVkL1xuICogaHR0cDovL2phdmFzY3JpcHQubndib3guY29tL0NvbnRlbnRMb2FkZWQvTUlULUxJQ0VOU0VcbiAqXG4gKi9cblxuLy8gQHdpbiB3aW5kb3cgcmVmZXJlbmNlXG4vLyBAZm4gZnVuY3Rpb24gcmVmZXJlbmNlXG53aW5kb3cuY29udGVudExvYWRlZCA9IGZ1bmN0aW9uIGNvbnRlbnRMb2FkZWQod2luLCBmbikge1xuXG5cdHZhciBkb25lID0gZmFsc2UsIHRvcCA9IHRydWUsXG5cblx0ZG9jID0gd2luLmRvY3VtZW50LCByb290ID0gZG9jLmRvY3VtZW50RWxlbWVudCxcblxuXHRhZGQgPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdhdHRhY2hFdmVudCcsXG5cdHJlbSA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2RldGFjaEV2ZW50Jyxcblx0cHJlID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAnJyA6ICdvbicsXG5cblx0aW5pdCA9IGZ1bmN0aW9uKGUpIHtcblx0XHRpZiAoZS50eXBlID09ICdyZWFkeXN0YXRlY2hhbmdlJyAmJiBkb2MucmVhZHlTdGF0ZSAhPSAnY29tcGxldGUnKSByZXR1cm47XG5cdFx0KGUudHlwZSA9PSAnbG9hZCcgPyB3aW4gOiBkb2MpW3JlbV0ocHJlICsgZS50eXBlLCBpbml0LCBmYWxzZSk7XG5cdFx0aWYgKCFkb25lICYmIChkb25lID0gdHJ1ZSkpIGZuLmNhbGwod2luLCBlLnR5cGUgfHwgZSk7XG5cdH0sXG5cblx0cG9sbCA9IGZ1bmN0aW9uKCkge1xuXHRcdHRyeSB7IHJvb3QuZG9TY3JvbGwoJ2xlZnQnKTsgfSBjYXRjaChlKSB7IHNldFRpbWVvdXQocG9sbCwgNTApOyByZXR1cm47IH1cblx0XHRpbml0KCdwb2xsJyk7XG5cdH07XG5cblx0aWYgKGRvYy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIGZuLmNhbGwod2luLCAnbGF6eScpO1xuXHRlbHNlIHtcblx0XHRpZiAoZG9jLmNyZWF0ZUV2ZW50T2JqZWN0ICYmIHJvb3QuZG9TY3JvbGwpIHtcblx0XHRcdHRyeSB7IHRvcCA9ICF3aW4uZnJhbWVFbGVtZW50OyB9IGNhdGNoKGUpIHsgfVxuXHRcdFx0aWYgKHRvcCkgcG9sbCgpO1xuXHRcdH1cblx0XHRkb2NbYWRkXShwcmUgKyAnRE9NQ29udGVudExvYWRlZCcsIGluaXQsIGZhbHNlKTtcblx0XHRkb2NbYWRkXShwcmUgKyAncmVhZHlzdGF0ZWNoYW5nZScsIGluaXQsIGZhbHNlKTtcblx0XHR3aW5bYWRkXShwcmUgKyAnbG9hZCcsIGluaXQsIGZhbHNlKTtcblx0fVxuXG59XG4iLCJ2YXIgVVRJTCA9ICByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBNTSA9IHdpbmRvdy5NTSB8fCB7fTtcblxuXG4vKipcbiAqIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGNvbmZpZ3VyYXRpb24gb2YgTU0udm9pY2VOYXZpZ2F0b3JcbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBWb2ljZU5hdmlnYXRvckNvbmZpZ1xuICogQHByb3BlcnR5IHtTdHJpbmd9IFtjYXJkTGlua0JlaGF2aW9yPVwiX3BhcmVudFwiXSBzZXRzIHRoZSBiZWhhdmlvciBmb3IgYW5jaG9ycyB3cmFwcGluZyBjYXJkcy4gVXNlICdmYWxzZScgdG9cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZlbnQgb3BlbmluZyBsaW5rcywgJ19wYXJlbnQnIHRvIG9wZW4gbGlua3MgaW4gdGhlIHNhbWUgdGFiIG9yIHdpbmRvdyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yICdfYmxhbmsnIHRvIG9wZW4gbGlua3MgaW4gYSBuZXcgdGFiIG9yIHdpbmRvdy4gU2VlIHRoZSB0YXJnZXQgYXR0cmlidXRlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZiBbYW5jaG9yXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvYSlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtsaXN0ZW5pbmdNb2RlPVwibm9ybWFsXCJdIGRlZmluZXMgdGhlIGxpc3RlbmluZyBtb2RlIG9mIHRoZSB2b2ljZSBuYXZpZ2F0b3Igd2hlbiBpdCBfaW5pdCBvcGVuZWQuIEFjY2VwdGFibGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzIGluY2x1ZGUgJ25vcm1hbCcsICdjb250aW51b3VzJywgYW5kIGZhbHNlLiBGYWxzZSBwcmV2ZW50cyBsaXN0ZW5pbmdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBkZWZhdWx0IGlzICdub3JtYWwnLlxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFtudW1SZXN1bHRzXSBpZiBzcGVjaWZpZWQsIHRoaXMgbnVtYmVyIG9mIGNhcmRzIHdpbGwgYXBwZWFyIGFzIHJlc3VsdHNcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbY2FyZExheW91dD1cImRlZmF1bHRcIl0gc3BlY2lmaWVzIHRoZSBwcmVkZWZpbmVkIGNhcmQgbGF5b3V0IHVzZWQuIFZhbGlkIHZhbHVlcyBhcmUgJ2RlZmF1bHQnLCBhbmQgJ2N1c3RvbScuXG4gKiBAcHJvcGVydHkge0NhcmRGaWVsZFtdfSBbY2FyZEZpZWxkc10gYW4gYXJyYXkgb2YgY2FyZCBmaWVsZHMge0BsaW5rIENhcmRGaWVsZH0uXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2NhcmRUZW1wbGF0ZV0gYW4gdW5kZXJzY29yZSAobG9kYXNoKSBodG1sIHRlbXBsYXRlIHdoaWNoIGlzIHVzZWQgdG8gY3JlYXRlIGNhcmQgcmVwcmVzZW50YXRpb24gb2YgZG9jdW1lbnRzLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIGEgdmFsdWUgaXMgZ2l2ZW4sIGNhcmRMYXlvdXQgd2lsbCBiZSAnY3VzdG9tJ1xuICogQHByb3BlcnR5IHtib29sZWFufSBbcmVzZXRDYXJkc0NTU10gaWYgdHJ1ZSwgcmVtb3ZlcyBDU1Mgc3BlY2lmaWMgdG8gdGhlIGNhcmRzIGNvbnRhaW5lci5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbY3VzdG9tQ1NTXSBzcGVjaWZpZXMgY3VzdG9tIGNzcyB0byBiZSBhcHBsaWVkXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2N1c3RvbUNTU1VSTF0gc3BlY2lmaWVzIHRoZSB1cmwgb2YgYSBmaWxlIGNvbnRhaW5pbmcgY3VzdG9tIENTUyB0byBiZSBhcHBsaWVkXG4gKiBAcHJvcGVydHkge051bWJlcn0gW2Jhc2VaSW5kZXg9MTAwMDAwXSB0aGUgdm9pY2UgbmF2aWdhdG9yIGVsZW1lbnRzIHdpbGwgaGF2ZSBhIFogaW5kZXggYmV0d2VlbiB0aGUgdmFsdWUgZ2l2ZW4gYW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMDAwIGdyZWF0ZXIgdGhhbiB0aGUgdmFsdWVcbiAqXG4gKi9cblxuLyoqXG4gKiBBbiBPYmplY3QgcmVwcmVzZW50aW5nIGEgZmllbGQgdG8gZGlzcGxheSBpbiBhIGRvY3VtZW50IGNhcmQgZm9yIHRoZSBWb2ljZSBOYXZpZ2F0b3Igd2lkZ2V0LlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENhcmRGaWVsZFxuICogQHByb3BlcnR5IHtTdHJpbmd9IGtleSAgICAgICAgICAgdGhlIGtleSBjb250YWluaW5nIHRoZSB2YWx1ZSBvZiB0aGlzIGZpZWxkIGluIGRvY3VtZW50IG9iamVjdHMuIFRoaXMgZmllbGQgbXVzdCBiZSBzcGVjaWZpZWQuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW3BsYWNlaG9sZGVyXSBpZiBzcGVjaWZpZWQsIHdoZW4gdGhlIGtleSBpcyBub3QgcHJlc2VudCBpbiBhIGRvY3VtZW50IG9yIGlzIGVtcHR5LCB0aGlzIHZhbHVlIHdpbGwgYmUgZGlzcGxheWVkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgb21pdHRlZCB0aGUgdmFsdWUgd2lsbCBiZSBoaWRkZW4gZnJvbSB0aGUgY2FyZFxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtsYWJlbF0gICAgICAgaWYgc3BlY2lmaWVkLCBhIGxhYmVsIHdpdGggdGhlIHByb3ZpZGVkIHRleHQgd2lsbCBwcmVjZWRlIHRoZSB2YWx1ZVxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtmb3JtYXRdICAgICAgZm9yIGZvcm1hdHRlciB0byBiZSB1c2VkIHRvIHByZXNlbnQgdGhlIHZhbHVlIGluIGEgdXNlciBmcmllbmRseSBmb3JtLiBWYWxpZCBmb3JtYXR0ZXJzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmUgZGVmYXVsdCwgYW5kIGRhdGUuXG4gKlxuICogQGV4YW1wbGVcbiAvLyBXaWxsIHJlc3VsdCBpbiB0aGUgZm9sbG93aW5nOlxuIC8vIFJlbGVhc2VkIDEwLzEzLzE5OTZcbiAvL1xuIHZhciBkYXRlRmllbGQgPSB7XG4gICBrZXk6ICdwdWJkYXRlJyxcbiAgIHBsYWNlaG9sZGVyOiAnVW5rbm93bicsXG4gICBsYWJlbDogJ1JlbGVhc2VkJyxcbiAgIGZvcm1hdDogJ2RhdGUnXG4gfTtcbiAqXG4gKi9cblxuLy8gVE9ETzogYWRkIG1vcmUgaGVyZVxuLyoqXG4gKiBUaGUgdm9pY2UgbmF2aWdhdG9yIHdpZGdldC4uLi5cbiAqIEBtZW1iZXJPZiBNTVxuICogQG5hbWVzcGFjZVxuICovXG5NTS52b2ljZU5hdmlnYXRvciA9IE1NLnZvaWNlTmF2aWdhdG9yIHx8IHt9O1xuTU0ubG9hZGVyID0gTU0ubG9hZGVyIHx8IHt9O1xuTU0ubG9hZGVyLnJvb3RVUkwgPSBNTS5sb2FkZXIucm9vdFVSTCB8fCAnaHR0cHM6Ly9kZXZlbG9wZXIuZXhwZWN0bGFicy5jb20vcHVibGljL3Nka3MvJztcblxuLyoqXG4gKiBUaGUgJ2RpdiNtaW5kbWVsZC1tb2RhbCcgZWxlbWVudCB3aGljaCBjb250YWlucyBhbGwgb2YgdGhlIHZvaWNlIG5hdmlnYXRvciBodG1sXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgJG1tID0gZmFsc2U7XG5cbi8qKlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciAkbW1faWZyYW1lID0gZmFsc2U7XG5cbi8qKlxuICogaXNJbml0aWFsaXplZCBpcyBzZXQgdG8gdHJ1ZSBvbmNlIHRoZSB3aWRnZXQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuIE9uY2VcbiAqIHRoZSB3aWRnZXQgaXMgaW5pdGlhbGl6ZWQgb25Jbml0KCkgaXMgY2FsbGVkLiBUaGlzIGlzIHVzZWQgYnlcbiAqIE1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbCgpIHRvIGFsbG93IHVzZXJzIHRvIGNhbGwgc2hvd01vZGFsXG4gKiB3aXRob3V0IGhhdmluZyB0byBrbm93IGlmIHRoZSB3aWRnZXQgaXMgbG9hZGVkIG9yIG5vdFxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBpc0luaXRpYWxpemVkID0gZmFsc2U7XG52YXIgb25Jbml0ID0gZnVuY3Rpb24gKCkge307XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgLy8gQWRkIHRoZSAjbWluZG1lbGQtbW9kYWwgZGl2IHRvIHRoZSBwYWdlXG4gICAgdmFyIG1tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbW0uc2V0QXR0cmlidXRlKCdpZCcsICdtaW5kbWVsZC1tb2RhbCcpO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKG1tLCBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0pO1xuICAgICRtbSA9IFVUSUwuZWwobW0pO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBhbnkgZWxlbWVudCB3aXRoIC5tbS12b2ljZS1uYXYtaW5pdCBvbiBpdFxuICAgIHZhciAkaW5pdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtbS12b2ljZS1uYXYtaW5pdCcpO1xuICAgIHZhciBjbGlja0hhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKCk7XG4gICAgfTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgJGluaXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIFVUSUwuZWwoJGluaXRzW2ldKS5jbGljayhjbGlja0hhbmRsZXIpO1xuICAgIH1cblxuICAgIHZhciAkdGV4dEluaXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW0tdm9pY2UtbmF2LXRleHQtaW5pdCcpO1xuICAgIHZhciBrZXlQcmVzc0hhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKHsgcXVlcnk6IHF1ZXJ5IH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBmb3IodmFyIGogPSAwOyBqIDwgJHRleHRJbml0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBVVElMLmVsKCR0ZXh0SW5pdHNbal0pLmtleXByZXNzKGtleVByZXNzSGFuZGxlcik7XG4gICAgfVxuXG4gICAgc2V0SW5pdGlhbGl6ZWQoKTtcblxuICAgIC8vIFdhaXQgZm9yIG1lc3NhZ2VzXG4gICAgVVRJTC5lbCh3aW5kb3cpLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmRhdGEuc291cmNlICE9ICdtaW5kbWVsZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZihldmVudC5kYXRhLmFjdGlvbiA9PSAnY2xvc2UnKSB7XG4gICAgICAgICAgICAkbW0ucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0SW5pdGlhbGl6ZWQoKSB7XG4gICAgaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgb25Jbml0KCk7XG59XG5cbmZ1bmN0aW9uIHBvc3RNZXNzYWdlKGFjdGlvbiwgZGF0YSkge1xuICAgIHZhciB3aW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pbmRtZWxkLWlmcmFtZVwiKS5jb250ZW50V2luZG93O1xuICAgIHdpbi5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBzb3VyY2U6ICdtaW5kbWVsZCcsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICB9LCBcIipcIik7XG59XG5cbi8qKlxuICogT3BlbnMgdGhlIHZvaWNlIG5hdmlnYXRvciBtb2RhbCB3aW5kb3dcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5xdWVyeV0gaWYgcHJvdmlkZWQsIHRoaXMgcXVlcnkgd2lsbCBiZSBpbiB0aGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZm9yY2VOZXdJRnJhbWU9ZmFsc2VdIGlmIHRydWUsXG4gKiBAcGFyYW0ge1N0cmluZ3xib29sZWFufSBbb3B0aW9ucy5saXN0ZW5pbmdNb2RlXSB0aGUgbGlzdGVuaW5nIG1vZGUgdG8gYmUgdXNlZCB3aGVuIHRoZSB2b2ljZSBuYXZpZ2F0b3Igb3BlbnNcbiAqL1xuTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmIChpc0luaXRpYWxpemVkKSB7XG4gICAgICAgIHZhciBpZnJhbWU7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdm9pY2UgbmF2aWdhdG9yIGNvbmZpZ1xuICAgICAgICBpZiAodHlwZW9mIE1NICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgdHlwZW9mIE1NLndpZGdldHMgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICB0eXBlb2YgTU0ud2lkZ2V0cy5jb25maWcgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBNb3ZlIGNvbmZpZyB0byB2b2ljZSBuYXYgY29uZmlnXG4gICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcgPSBNTS53aWRnZXRzLmNvbmZpZy52b2ljZSB8fCB7fTtcbiAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5hcHBJRCA9IE1NLndpZGdldHMuY29uZmlnLmFwcElEO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS53aWRnZXRzLmNvbmZpZy5jbGVhblVybCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY2xlYW5VcmwgPSBNTS53aWRnZXRzLmNvbmZpZy5jbGVhblVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgTU0ud2lkZ2V0cy5jb25maWcuZmF5ZUNsaWVudFVybCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuZmF5ZUNsaWVudFVybCA9IE1NLndpZGdldHMuY29uZmlnLmZheWVDbGllbnRVcmw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHBhcnNlIGNhcmQgbGF5b3V0XG4gICAgICAgICAgICBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jYXJkVGVtcGxhdGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmNhcmRMYXlvdXQgPSAnY3VzdG9tJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmNhcmRMYXlvdXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmNhcmRMYXlvdXQgPSAnZGVmYXVsdCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHBhcnNlIGN1c3RvbSBjc3NcbiAgICAgICAgICAgIGlmICh0eXBlb2YgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmN1c3RvbUNTU1VSTCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY3VzdG9tQ1NTVVJMID0gVVRJTC5jb252ZXJ0VG9BYnNvbHV0ZVBhdGgoTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmN1c3RvbUNTU1VSTCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRlZmF1bHQgbGlzdGVuaW5nIG1vZGVcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5saXN0ZW5pbmdNb2RlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5saXN0ZW5pbmdNb2RlID0gb3B0aW9ucy5saXN0ZW5pbmdNb2RlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmxpc3RlbmluZ01vZGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmxpc3RlbmluZ01vZGUgPSAnbm9ybWFsJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUGFzcyB0b2tlbiwgdXNlciBJRCwgYW5kIHNlc3Npb24gSUQgaWYgdGhleSBhcmUgc2V0IGFscmVhZHlcbiAgICAgICAgICAgIGlmICh0eXBlb2YgTU0udG9rZW4gIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIE1NLmFjdGl2ZVVzZXJJZCAhPT0gJ3VuZGVmaW5lZCcgJiYgTU0uYWN0aXZlVXNlcklkICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIE1NLmFjdGl2ZVNlc3Npb25JZCAhPT0gJ3VuZGVmaW5lZCcgJiYgTU0uYWN0aXZlU2Vzc2lvbklkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLm1tQ3JlZGVudGlhbHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBNTS50b2tlbixcbiAgICAgICAgICAgICAgICAgICAgdXNlcklEOiBNTS5hY3RpdmVVc2VySWQsXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25JRDogTU0uYWN0aXZlU2Vzc2lvbklkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIGRlZmluZWQsIHBhc3MgYSBzdGFydGluZyBxdWVyeVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucXVlcnkgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnF1ZXJ5ICE9PSAnJykge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5zdGFydFF1ZXJ5ID0gb3B0aW9ucy5xdWVyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5zdGFydFF1ZXJ5ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmZvcmNlTmV3SUZyYW1lICYmICRtbV9pZnJhbWUpIHtcbiAgICAgICAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW5kbWVsZC1pZnJhbWUnKTtcbiAgICAgICAgICAgIGlmcmFtZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgaWZyYW1lIGlmIGZpcnN0IGxvYWRcbiAgICAgICAgaWYgKCEkbW1faWZyYW1lIHx8IG9wdGlvbnMuZm9yY2VOZXdJRnJhbWUpIHtcbiAgICAgICAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnZnJhbWVCb3JkZXInLCAnMCcpO1xuICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnaWQnLCAnbWluZG1lbGQtaWZyYW1lJyk7XG4gICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd3RyYW5zcGFyZW5jeScsICd0cnVlJyk7XG4gICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzcmMnLCBNTS5sb2FkZXIucm9vdFVSTCArICd3aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL21vZGFsL21vZGFsLmh0bWwnKTtcblxuICAgICAgICAgICAgJG1tX2lmcmFtZSA9IFVUSUwuZWwoaWZyYW1lKTtcblxuICAgICAgICAgICAgVVRJTC5lbChpZnJhbWUpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoJ2NvbmZpZycsIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZyk7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoJ29wZW4nKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkbW0uZWwoKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcG9zdE1lc3NhZ2UoJ29wZW4nKTtcbiAgICAgICAgfVxuICAgICAgICAkbW0uYWRkQ2xhc3MoJ29uJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBTZXQgb25Jbml0KCkgY2FsbGJhY2sgdG8gb3BlbiBtb2RhbFxuICAgICAgICBvbkluaXQgPSBmdW5jdGlvbiAoKSB7IE1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbChvcHRpb25zKTsgfTtcbiAgICB9XG59O1xuXG4vKipcbiAqIENsb3NlcyB0aGUgdm9pY2UgbmF2aWdhdG9yIG1vZGFsIHdpbmRvd1xuICovXG5NTS52b2ljZU5hdmlnYXRvci5oaWRlTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgcG9zdE1lc3NhZ2UoJ2Nsb3NlJyk7XG59O1xuXG4vLyBzY2hlZHVsZSBpbml0aWFsaXphdGlvbiBvZiB2b2ljZSBuYXZpZ2F0b3JcblVUSUwuY29udGVudExvYWRlZCh3aW5kb3csIGZ1bmN0aW9uKCkge1xuICAgIGluaXQoKTtcbn0pO1xuIl19
