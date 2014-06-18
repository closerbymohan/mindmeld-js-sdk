(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint undef: true, unused: true */
/* global document, require, exports, window */

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
    return addLeadingZeros(date.getFullYear(), 4) + '.' +
        addLeadingZeros(date.getMonth() + 1, 2) + '.' +
        addLeadingZeros(date.getDate(), 2) + ' ' + date.toTimeString();
};

exports.log = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    args.splice(0, 0, exports.timestamp());
    window.console.log.apply(window.console, args);
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
/* jshint undef: true, unused: true */
/* global document, window, require */

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
 */

// @param {String|boolean} [options.listeningMode] the listening mode to be used when the voice navigator opens

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL3V0aWwuanMiLCIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL3ZlbmRvci9jb250ZW50bG9hZGVkLmpzIiwiL1VzZXJzL2pqL0RvY3VtZW50cy9Db2RlL2V4cGVjdC1sYWJzL21pbmRtZWxkLWpzLXNkay9zcmMvd2lkZ2V0cy92b2ljZU5hdmlnYXRvci9qcy93aWRnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGpzaGludCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlICovXG4vKiBnbG9iYWwgZG9jdW1lbnQsIHJlcXVpcmUsIGV4cG9ydHMsIHdpbmRvdyAqL1xuXG5yZXF1aXJlKCcuL3ZlbmRvci9jb250ZW50bG9hZGVkJyk7XG5cbi8qIEEgd3JhcHBlciBmb3IgZG9tIGVsZW1lbnRzLCBiYXNpY2FsbHkgYSBsaXRlIHZlcnNpb24gb2YgalF1ZXJ5J3MgJCAqL1xuZXhwb3J0cy5lbCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb246IGZ1bmN0aW9uKGV2ZW50LCBmdW5jKSB7XG4gICAgICAgICAgICBpZihlbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCxmdW5jLGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihlbC5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgICAgIGVsLmF0dGFjaEV2ZW50KFwib25cIitldmVudCxmdW5jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjbGljazogZnVuY3Rpb24oZnVuYykge1xuICAgICAgICAgICAgdGhpcy5vbignY2xpY2snLCBmdW5jKTtcbiAgICAgICAgfSxcblxuICAgICAgICBrZXlwcmVzczogZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMub24oJ2tleXByZXNzJywgZnVuYyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgbmV3IFJlZ0V4cCgnKF58XFxcXHMrKScgKyBjbGFzc05hbWUgKyAnKFxcXFxzK3wkKScsICdnJyksXG4gICAgICAgICAgICAgICAgJyQxJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICBhZGRDbGFzczogZnVuY3Rpb24oY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUgKyBcIiBcIiArIGNsYXNzTmFtZTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydHMuY29udmVydFRvQWJzb2x1dGVQYXRoID0gZnVuY3Rpb24oaHJlZikge1xuICAgIHZhciBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYW5jaG9yLmhyZWYgPSBocmVmO1xuICAgIHJldHVybiAoYW5jaG9yLnByb3RvY29sICsgJy8vJyArIGFuY2hvci5ob3N0ICsgYW5jaG9yLnBhdGhuYW1lICsgYW5jaG9yLnNlYXJjaCArIGFuY2hvci5oYXNoKTtcbn07XG5cbmZ1bmN0aW9uIGFkZExlYWRpbmdaZXJvcyhudW1iZXIsIGRpZ2l0cykge1xuICAgIHZhciBiYXNlID0gTWF0aC5wb3coMTAsIGRpZ2l0cyk7XG4gICAgbnVtYmVyICs9IGJhc2U7XG4gICAgbnVtYmVyID0gbnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgcmV0dXJuIG51bWJlci5zdWJzdHJpbmcobnVtYmVyLmxlbmd0aCAtIGRpZ2l0cyk7XG59XG5cbmV4cG9ydHMudGltZXN0YW1wID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICBkYXRlID0gZGF0ZSB8fCBuZXcgRGF0ZSgpO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRGdWxsWWVhcigpLCA0KSArICcuJyArXG4gICAgICAgIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldE1vbnRoKCkgKyAxLCAyKSArICcuJyArXG4gICAgICAgIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldERhdGUoKSwgMikgKyAnICcgKyBkYXRlLnRvVGltZVN0cmluZygpO1xufTtcblxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgYXJncy5zcGxpY2UoMCwgMCwgZXhwb3J0cy50aW1lc3RhbXAoKSk7XG4gICAgd2luZG93LmNvbnNvbGUubG9nLmFwcGx5KHdpbmRvdy5jb25zb2xlLCBhcmdzKTtcbn07XG5cbmV4cG9ydHMuY29udGVudExvYWRlZCA9IGNvbnRlbnRMb2FkZWQ7IiwiLyohXG4gKiBjb250ZW50bG9hZGVkLmpzXG4gKlxuICogQXV0aG9yOiBEaWVnbyBQZXJpbmkgKGRpZWdvLnBlcmluaSBhdCBnbWFpbC5jb20pXG4gKiBTdW1tYXJ5OiBjcm9zcy1icm93c2VyIHdyYXBwZXIgZm9yIERPTUNvbnRlbnRMb2FkZWRcbiAqIFVwZGF0ZWQ6IDIwMTAxMDIwXG4gKiBMaWNlbnNlOiBNSVRcbiAqIFZlcnNpb246IDEuMlxuICpcbiAqIFVSTDpcbiAqIGh0dHA6Ly9qYXZhc2NyaXB0Lm53Ym94LmNvbS9Db250ZW50TG9hZGVkL1xuICogaHR0cDovL2phdmFzY3JpcHQubndib3guY29tL0NvbnRlbnRMb2FkZWQvTUlULUxJQ0VOU0VcbiAqXG4gKi9cblxuLy8gQHdpbiB3aW5kb3cgcmVmZXJlbmNlXG4vLyBAZm4gZnVuY3Rpb24gcmVmZXJlbmNlXG53aW5kb3cuY29udGVudExvYWRlZCA9IGZ1bmN0aW9uIGNvbnRlbnRMb2FkZWQod2luLCBmbikge1xuXG5cdHZhciBkb25lID0gZmFsc2UsIHRvcCA9IHRydWUsXG5cblx0ZG9jID0gd2luLmRvY3VtZW50LCByb290ID0gZG9jLmRvY3VtZW50RWxlbWVudCxcblxuXHRhZGQgPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdhdHRhY2hFdmVudCcsXG5cdHJlbSA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2RldGFjaEV2ZW50Jyxcblx0cHJlID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAnJyA6ICdvbicsXG5cblx0aW5pdCA9IGZ1bmN0aW9uKGUpIHtcblx0XHRpZiAoZS50eXBlID09ICdyZWFkeXN0YXRlY2hhbmdlJyAmJiBkb2MucmVhZHlTdGF0ZSAhPSAnY29tcGxldGUnKSByZXR1cm47XG5cdFx0KGUudHlwZSA9PSAnbG9hZCcgPyB3aW4gOiBkb2MpW3JlbV0ocHJlICsgZS50eXBlLCBpbml0LCBmYWxzZSk7XG5cdFx0aWYgKCFkb25lICYmIChkb25lID0gdHJ1ZSkpIGZuLmNhbGwod2luLCBlLnR5cGUgfHwgZSk7XG5cdH0sXG5cblx0cG9sbCA9IGZ1bmN0aW9uKCkge1xuXHRcdHRyeSB7IHJvb3QuZG9TY3JvbGwoJ2xlZnQnKTsgfSBjYXRjaChlKSB7IHNldFRpbWVvdXQocG9sbCwgNTApOyByZXR1cm47IH1cblx0XHRpbml0KCdwb2xsJyk7XG5cdH07XG5cblx0aWYgKGRvYy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIGZuLmNhbGwod2luLCAnbGF6eScpO1xuXHRlbHNlIHtcblx0XHRpZiAoZG9jLmNyZWF0ZUV2ZW50T2JqZWN0ICYmIHJvb3QuZG9TY3JvbGwpIHtcblx0XHRcdHRyeSB7IHRvcCA9ICF3aW4uZnJhbWVFbGVtZW50OyB9IGNhdGNoKGUpIHsgfVxuXHRcdFx0aWYgKHRvcCkgcG9sbCgpO1xuXHRcdH1cblx0XHRkb2NbYWRkXShwcmUgKyAnRE9NQ29udGVudExvYWRlZCcsIGluaXQsIGZhbHNlKTtcblx0XHRkb2NbYWRkXShwcmUgKyAncmVhZHlzdGF0ZWNoYW5nZScsIGluaXQsIGZhbHNlKTtcblx0XHR3aW5bYWRkXShwcmUgKyAnbG9hZCcsIGluaXQsIGZhbHNlKTtcblx0fVxuXG59XG4iLCIvKiBqc2hpbnQgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSAqL1xuLyogZ2xvYmFsIGRvY3VtZW50LCB3aW5kb3csIHJlcXVpcmUgKi9cblxudmFyIFVUSUwgPSAgcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgTU0gPSB3aW5kb3cuTU0gfHwge307XG5cbi8qKlxuICogQW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgY29uZmlndXJhdGlvbiBvZiBNTS52b2ljZU5hdmlnYXRvclxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFZvaWNlTmF2aWdhdG9yQ29uZmlnXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2NhcmRMaW5rQmVoYXZpb3I9XCJfcGFyZW50XCJdIHNldHMgdGhlIGJlaGF2aW9yIGZvciBhbmNob3JzIHdyYXBwaW5nIGNhcmRzLiBVc2UgJ2ZhbHNlJyB0b1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmVudCBvcGVuaW5nIGxpbmtzLCAnX3BhcmVudCcgdG8gb3BlbiBsaW5rcyBpbiB0aGUgc2FtZSB0YWIgb3Igd2luZG93LFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgJ19ibGFuaycgdG8gb3BlbiBsaW5rcyBpbiBhIG5ldyB0YWIgb3Igd2luZG93LiBTZWUgdGhlIHRhcmdldCBhdHRyaWJ1dGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mIFthbmNob3JdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9hKVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2xpc3RlbmluZ01vZGU9XCJub3JtYWxcIl0gZGVmaW5lcyB0aGUgbGlzdGVuaW5nIG1vZGUgb2YgdGhlIHZvaWNlIG5hdmlnYXRvciB3aGVuIGl0IF9pbml0IG9wZW5lZC4gQWNjZXB0YWJsZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgaW5jbHVkZSAnbm9ybWFsJywgJ2NvbnRpbnVvdXMnLCBhbmQgZmFsc2UuIEZhbHNlIHByZXZlbnRzIGxpc3RlbmluZ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIGRlZmF1bHQgaXMgJ25vcm1hbCcuXG4gKiBAcHJvcGVydHkge051bWJlcn0gW251bVJlc3VsdHNdIGlmIHNwZWNpZmllZCwgdGhpcyBudW1iZXIgb2YgY2FyZHMgd2lsbCBhcHBlYXIgYXMgcmVzdWx0c1xuICogQHByb3BlcnR5IHtTdHJpbmd9IFtjYXJkTGF5b3V0PVwiZGVmYXVsdFwiXSBzcGVjaWZpZXMgdGhlIHByZWRlZmluZWQgY2FyZCBsYXlvdXQgdXNlZC4gVmFsaWQgdmFsdWVzIGFyZSAnZGVmYXVsdCcsIGFuZCAnY3VzdG9tJy5cbiAqIEBwcm9wZXJ0eSB7Q2FyZEZpZWxkW119IFtjYXJkRmllbGRzXSBhbiBhcnJheSBvZiBjYXJkIGZpZWxkcyB7QGxpbmsgQ2FyZEZpZWxkfS5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbY2FyZFRlbXBsYXRlXSBhbiB1bmRlcnNjb3JlIChsb2Rhc2gpIGh0bWwgdGVtcGxhdGUgd2hpY2ggaXMgdXNlZCB0byBjcmVhdGUgY2FyZCByZXByZXNlbnRhdGlvbiBvZiBkb2N1bWVudHMuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWYgYSB2YWx1ZSBpcyBnaXZlbiwgY2FyZExheW91dCB3aWxsIGJlICdjdXN0b20nXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtyZXNldENhcmRzQ1NTXSBpZiB0cnVlLCByZW1vdmVzIENTUyBzcGVjaWZpYyB0byB0aGUgY2FyZHMgY29udGFpbmVyLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtjdXN0b21DU1NdIHNwZWNpZmllcyBjdXN0b20gY3NzIHRvIGJlIGFwcGxpZWRcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbY3VzdG9tQ1NTVVJMXSBzcGVjaWZpZXMgdGhlIHVybCBvZiBhIGZpbGUgY29udGFpbmluZyBjdXN0b20gQ1NTIHRvIGJlIGFwcGxpZWRcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBbYmFzZVpJbmRleD0xMDAwMDBdIHRoZSB2b2ljZSBuYXZpZ2F0b3IgZWxlbWVudHMgd2lsbCBoYXZlIGEgWiBpbmRleCBiZXR3ZWVuIHRoZSB2YWx1ZSBnaXZlbiBhbmRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEwMDAgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZVxuICpcbiAqL1xuXG4vKipcbiAqIEFuIE9iamVjdCByZXByZXNlbnRpbmcgYSBmaWVsZCB0byBkaXNwbGF5IGluIGEgZG9jdW1lbnQgY2FyZCBmb3IgdGhlIFZvaWNlIE5hdmlnYXRvciB3aWRnZXQuXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gQ2FyZEZpZWxkXG4gKiBAcHJvcGVydHkge1N0cmluZ30ga2V5ICAgICAgICAgICB0aGUga2V5IGNvbnRhaW5pbmcgdGhlIHZhbHVlIG9mIHRoaXMgZmllbGQgaW4gZG9jdW1lbnQgb2JqZWN0cy4gVGhpcyBmaWVsZCBtdXN0IGJlIHNwZWNpZmllZC5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbcGxhY2Vob2xkZXJdIGlmIHNwZWNpZmllZCwgd2hlbiB0aGUga2V5IGlzIG5vdCBwcmVzZW50IGluIGEgZG9jdW1lbnQgb3IgaXMgZW1wdHksIHRoaXMgdmFsdWUgd2lsbCBiZSBkaXNwbGF5ZWQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBvbWl0dGVkIHRoZSB2YWx1ZSB3aWxsIGJlIGhpZGRlbiBmcm9tIHRoZSBjYXJkXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2xhYmVsXSAgICAgICBpZiBzcGVjaWZpZWQsIGEgbGFiZWwgd2l0aCB0aGUgcHJvdmlkZWQgdGV4dCB3aWxsIHByZWNlZGUgdGhlIHZhbHVlXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2Zvcm1hdF0gICAgICBmb3IgZm9ybWF0dGVyIHRvIGJlIHVzZWQgdG8gcHJlc2VudCB0aGUgdmFsdWUgaW4gYSB1c2VyIGZyaWVuZGx5IGZvcm0uIFZhbGlkIGZvcm1hdHRlcnNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZSBkZWZhdWx0LCBhbmQgZGF0ZS5cbiAqXG4gKiBAZXhhbXBsZVxuIC8vIFdpbGwgcmVzdWx0IGluIHRoZSBmb2xsb3dpbmc6XG4gLy8gUmVsZWFzZWQgMTAvMTMvMTk5NlxuIC8vXG4gdmFyIGRhdGVGaWVsZCA9IHtcbiAgIGtleTogJ3B1YmRhdGUnLFxuICAgcGxhY2Vob2xkZXI6ICdVbmtub3duJyxcbiAgIGxhYmVsOiAnUmVsZWFzZWQnLFxuICAgZm9ybWF0OiAnZGF0ZSdcbiB9O1xuICpcbiAqL1xuXG4vLyBUT0RPOiBhZGQgbW9yZSBoZXJlXG4vKipcbiAqIFRoZSB2b2ljZSBuYXZpZ2F0b3Igd2lkZ2V0Li4uLlxuICogQG1lbWJlck9mIE1NXG4gKiBAbmFtZXNwYWNlXG4gKi9cbk1NLnZvaWNlTmF2aWdhdG9yID0gTU0udm9pY2VOYXZpZ2F0b3IgfHwge307XG5NTS5sb2FkZXIgPSBNTS5sb2FkZXIgfHwge307XG5NTS5sb2FkZXIucm9vdFVSTCA9IE1NLmxvYWRlci5yb290VVJMIHx8ICdodHRwczovL2RldmVsb3Blci5leHBlY3RsYWJzLmNvbS9wdWJsaWMvc2Rrcy8nO1xuXG4vKipcbiAqIFRoZSAnZGl2I21pbmRtZWxkLW1vZGFsJyBlbGVtZW50IHdoaWNoIGNvbnRhaW5zIGFsbCBvZiB0aGUgdm9pY2UgbmF2aWdhdG9yIGh0bWxcbiAqIEBwcml2YXRlXG4gKi9cbnZhciAkbW0gPSBmYWxzZTtcblxuLyoqXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyICRtbV9pZnJhbWUgPSBmYWxzZTtcblxuLyoqXG4gKiBpc0luaXRpYWxpemVkIGlzIHNldCB0byB0cnVlIG9uY2UgdGhlIHdpZGdldCBoYXMgYmVlbiBpbml0aWFsaXplZC4gT25jZVxuICogdGhlIHdpZGdldCBpcyBpbml0aWFsaXplZCBvbkluaXQoKSBpcyBjYWxsZWQuIFRoaXMgaXMgdXNlZCBieVxuICogTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKCkgdG8gYWxsb3cgdXNlcnMgdG8gY2FsbCBzaG93TW9kYWxcbiAqIHdpdGhvdXQgaGF2aW5nIHRvIGtub3cgaWYgdGhlIHdpZGdldCBpcyBsb2FkZWQgb3Igbm90XG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIGlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbnZhciBvbkluaXQgPSBmdW5jdGlvbiAoKSB7fTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAvLyBBZGQgdGhlICNtaW5kbWVsZC1tb2RhbCBkaXYgdG8gdGhlIHBhZ2VcbiAgICB2YXIgbW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtbS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21pbmRtZWxkLW1vZGFsJyk7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUobW0sIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1swXSk7XG4gICAgJG1tID0gVVRJTC5lbChtbSk7XG5cbiAgICAvLyBJbml0aWFsaXplIGFueSBlbGVtZW50IHdpdGggLm1tLXZvaWNlLW5hdi1pbml0IG9uIGl0XG4gICAgdmFyICRpbml0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21tLXZvaWNlLW5hdi1pbml0Jyk7XG4gICAgdmFyIGNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5zaG93TW9kYWwoKTtcbiAgICB9O1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCAkaW5pdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgVVRJTC5lbCgkaW5pdHNbaV0pLmNsaWNrKGNsaWNrSGFuZGxlcik7XG4gICAgfVxuXG4gICAgdmFyICR0ZXh0SW5pdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtbS12b2ljZS1uYXYtdGV4dC1pbml0Jyk7XG4gICAgdmFyIGtleVByZXNzSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnkgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5zaG93TW9kYWwoeyBxdWVyeTogcXVlcnkgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGZvcih2YXIgaiA9IDA7IGogPCAkdGV4dEluaXRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIFVUSUwuZWwoJHRleHRJbml0c1tqXSkua2V5cHJlc3Moa2V5UHJlc3NIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBzZXRJbml0aWFsaXplZCgpO1xuXG4gICAgLy8gV2FpdCBmb3IgbWVzc2FnZXNcbiAgICBVVElMLmVsKHdpbmRvdykub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuZGF0YS5zb3VyY2UgIT0gJ21pbmRtZWxkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKGV2ZW50LmRhdGEuYWN0aW9uID09ICdjbG9zZScpIHtcbiAgICAgICAgICAgICRtbS5yZW1vdmVDbGFzcygnb24nKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRJbml0aWFsaXplZCgpIHtcbiAgICBpc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICBvbkluaXQoKTtcbn1cblxuZnVuY3Rpb24gcG9zdE1lc3NhZ2UoYWN0aW9uLCBkYXRhKSB7XG4gICAgdmFyIHdpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluZG1lbGQtaWZyYW1lXCIpLmNvbnRlbnRXaW5kb3c7XG4gICAgd2luLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIHNvdXJjZTogJ21pbmRtZWxkJyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgIH0sIFwiKlwiKTtcbn1cblxuXG5cbi8qKlxuICogT3BlbnMgdGhlIHZvaWNlIG5hdmlnYXRvciBtb2RhbCB3aW5kb3dcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5xdWVyeV0gaWYgcHJvdmlkZWQsIHRoaXMgcXVlcnkgd2lsbCBiZSBpbiB0aGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZm9yY2VOZXdJRnJhbWU9ZmFsc2VdIGlmIHRydWUsXG4gKi9cblxuLy8gQHBhcmFtIHtTdHJpbmd8Ym9vbGVhbn0gW29wdGlvbnMubGlzdGVuaW5nTW9kZV0gdGhlIGxpc3RlbmluZyBtb2RlIHRvIGJlIHVzZWQgd2hlbiB0aGUgdm9pY2UgbmF2aWdhdG9yIG9wZW5zXG5cbk1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoaXNJbml0aWFsaXplZCkge1xuICAgICAgICB2YXIgaWZyYW1lO1xuICAgICAgICAvLyBJbml0aWFsaXplIHZvaWNlIG5hdmlnYXRvciBjb25maWdcbiAgICAgICAgaWYgKHR5cGVvZiBNTSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHR5cGVvZiBNTS53aWRnZXRzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgdHlwZW9mIE1NLndpZGdldHMuY29uZmlnICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gTW92ZSBjb25maWcgdG8gdm9pY2UgbmF2IGNvbmZpZ1xuICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnID0gTU0ud2lkZ2V0cy5jb25maWcudm9pY2UgfHwge307XG4gICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuYXBwSUQgPSBNTS53aWRnZXRzLmNvbmZpZy5hcHBJRDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgTU0ud2lkZ2V0cy5jb25maWcuY2xlYW5VcmwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmNsZWFuVXJsID0gTU0ud2lkZ2V0cy5jb25maWcuY2xlYW5Vcmw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIE1NLndpZGdldHMuY29uZmlnLmZheWVDbGllbnRVcmwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmZheWVDbGllbnRVcmwgPSBNTS53aWRnZXRzLmNvbmZpZy5mYXllQ2xpZW50VXJsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBwYXJzZSBjYXJkIGxheW91dFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY2FyZFRlbXBsYXRlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jYXJkTGF5b3V0ID0gJ2N1c3RvbSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jYXJkTGF5b3V0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jYXJkTGF5b3V0ID0gJ2RlZmF1bHQnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBwYXJzZSBjdXN0b20gY3NzXG4gICAgICAgICAgICBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jdXN0b21DU1NVUkwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmN1c3RvbUNTU1VSTCA9IFVUSUwuY29udmVydFRvQWJzb2x1dGVQYXRoKE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jdXN0b21DU1NVUkwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZWZhdWx0IGxpc3RlbmluZyBtb2RlXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubGlzdGVuaW5nTW9kZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcubGlzdGVuaW5nTW9kZSA9IG9wdGlvbnMubGlzdGVuaW5nTW9kZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5saXN0ZW5pbmdNb2RlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5saXN0ZW5pbmdNb2RlID0gJ25vcm1hbCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFBhc3MgdG9rZW4sIHVzZXIgSUQsIGFuZCBzZXNzaW9uIElEIGlmIHRoZXkgYXJlIHNldCBhbHJlYWR5XG4gICAgICAgICAgICBpZiAodHlwZW9mIE1NLnRva2VuICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBNTS5hY3RpdmVVc2VySWQgIT09ICd1bmRlZmluZWQnICYmIE1NLmFjdGl2ZVVzZXJJZCAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBNTS5hY3RpdmVTZXNzaW9uSWQgIT09ICd1bmRlZmluZWQnICYmIE1NLmFjdGl2ZVNlc3Npb25JZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5tbUNyZWRlbnRpYWxzID0ge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogTU0udG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJRDogTU0uYWN0aXZlVXNlcklkLFxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uSUQ6IE1NLmFjdGl2ZVNlc3Npb25JZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiBkZWZpbmVkLCBwYXNzIGEgc3RhcnRpbmcgcXVlcnlcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnF1ZXJ5ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5xdWVyeSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuc3RhcnRRdWVyeSA9IG9wdGlvbnMucXVlcnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuc3RhcnRRdWVyeSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5mb3JjZU5ld0lGcmFtZSAmJiAkbW1faWZyYW1lKSB7XG4gICAgICAgICAgICBpZnJhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWluZG1lbGQtaWZyYW1lJyk7XG4gICAgICAgICAgICBpZnJhbWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGlmcmFtZSBpZiBmaXJzdCBsb2FkXG4gICAgICAgIGlmICghJG1tX2lmcmFtZSB8fCBvcHRpb25zLmZvcmNlTmV3SUZyYW1lKSB7XG4gICAgICAgICAgICBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2ZyYW1lQm9yZGVyJywgJzAnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21pbmRtZWxkLWlmcmFtZScpO1xuICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3d0cmFuc3BhcmVuY3knLCAndHJ1ZScpO1xuICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgTU0ubG9hZGVyLnJvb3RVUkwgKyAnd2lkZ2V0cy92b2ljZU5hdmlnYXRvci9tb2RhbC9tb2RhbC5odG1sJyk7XG5cbiAgICAgICAgICAgICRtbV9pZnJhbWUgPSBVVElMLmVsKGlmcmFtZSk7XG5cbiAgICAgICAgICAgIFVUSUwuZWwoaWZyYW1lKS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKCdjb25maWcnLCBNTS52b2ljZU5hdmlnYXRvci5jb25maWcpO1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKCdvcGVuJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJG1tLmVsKCkuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBvc3RNZXNzYWdlKCdvcGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgJG1tLmFkZENsYXNzKCdvbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gU2V0IG9uSW5pdCgpIGNhbGxiYWNrIHRvIG9wZW4gbW9kYWxcbiAgICAgICAgb25Jbml0ID0gZnVuY3Rpb24gKCkgeyBNTS52b2ljZU5hdmlnYXRvci5zaG93TW9kYWwob3B0aW9ucyk7IH07XG4gICAgfVxufTtcblxuLyoqXG4gKiBDbG9zZXMgdGhlIHZvaWNlIG5hdmlnYXRvciBtb2RhbCB3aW5kb3dcbiAqL1xuTU0udm9pY2VOYXZpZ2F0b3IuaGlkZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuICAgIHBvc3RNZXNzYWdlKCdjbG9zZScpO1xufTtcblxuLy8gc2NoZWR1bGUgaW5pdGlhbGl6YXRpb24gb2Ygdm9pY2UgbmF2aWdhdG9yXG5VVElMLmNvbnRlbnRMb2FkZWQod2luZG93LCBmdW5jdGlvbigpIHtcbiAgICBpbml0KCk7XG59KTtcbiJdfQ==
