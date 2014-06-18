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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvamFnL3Byb2plY3RzL21pbmRtZWxkLWpzLXNkay9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2phZy9wcm9qZWN0cy9taW5kbWVsZC1qcy1zZGsvc3JjL3dpZGdldHMvdm9pY2VOYXZpZ2F0b3IvanMvdXRpbC5qcyIsIi9Vc2Vycy9qYWcvcHJvamVjdHMvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL3ZlbmRvci9jb250ZW50bG9hZGVkLmpzIiwiL1VzZXJzL2phZy9wcm9qZWN0cy9taW5kbWVsZC1qcy1zZGsvc3JjL3dpZGdldHMvdm9pY2VOYXZpZ2F0b3IvanMvd2lkZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBqc2hpbnQgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSAqL1xuLyogZ2xvYmFsIGRvY3VtZW50LCByZXF1aXJlLCBleHBvcnRzLCB3aW5kb3cgKi9cblxucmVxdWlyZSgnLi92ZW5kb3IvY29udGVudGxvYWRlZCcpO1xuXG4vKiBBIHdyYXBwZXIgZm9yIGRvbSBlbGVtZW50cywgYmFzaWNhbGx5IGEgbGl0ZSB2ZXJzaW9uIG9mIGpRdWVyeSdzICQgKi9cbmV4cG9ydHMuZWwgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBmdW5jdGlvbihldmVudCwgZnVuYykge1xuICAgICAgICAgICAgaWYoZWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsZnVuYyxmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoZWwuYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBlbC5hdHRhY2hFdmVudChcIm9uXCIrZXZlbnQsZnVuYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMub24oJ2NsaWNrJywgZnVuYyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAga2V5cHJlc3M6IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgICAgICB0aGlzLm9uKCdrZXlwcmVzcycsIGZ1bmMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoJyhefFxcXFxzKyknICsgY2xhc3NOYW1lICsgJyhcXFxccyt8JCknLCAnZycpLFxuICAgICAgICAgICAgICAgICckMSdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lICsgXCIgXCIgKyBjbGFzc05hbWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnRzLmNvbnZlcnRUb0Fic29sdXRlUGF0aCA9IGZ1bmN0aW9uKGhyZWYpIHtcbiAgICB2YXIgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGFuY2hvci5ocmVmID0gaHJlZjtcbiAgICByZXR1cm4gKGFuY2hvci5wcm90b2NvbCArICcvLycgKyBhbmNob3IuaG9zdCArIGFuY2hvci5wYXRobmFtZSArIGFuY2hvci5zZWFyY2ggKyBhbmNob3IuaGFzaCk7XG59O1xuXG5mdW5jdGlvbiBhZGRMZWFkaW5nWmVyb3MobnVtYmVyLCBkaWdpdHMpIHtcbiAgICB2YXIgYmFzZSA9IE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICAgIG51bWJlciArPSBiYXNlO1xuICAgIG51bWJlciA9IG51bWJlci50b1N0cmluZygpO1xuICAgIHJldHVybiBudW1iZXIuc3Vic3RyaW5nKG51bWJlci5sZW5ndGggLSBkaWdpdHMpO1xufVxuXG5leHBvcnRzLnRpbWVzdGFtcCA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgZGF0ZSA9IGRhdGUgfHwgbmV3IERhdGUoKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0RnVsbFllYXIoKSwgNCkgKyAnLicgK1xuICAgICAgICBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRNb250aCgpICsgMSwgMikgKyAnLicgK1xuICAgICAgICBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXREYXRlKCksIDIpICsgJyAnICsgZGF0ZS50b1RpbWVTdHJpbmcoKTtcbn07XG5cbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGFyZ3Muc3BsaWNlKDAsIDAsIGV4cG9ydHMudGltZXN0YW1wKCkpO1xuICAgIHdpbmRvdy5jb25zb2xlLmxvZy5hcHBseSh3aW5kb3cuY29uc29sZSwgYXJncyk7XG59O1xuXG5leHBvcnRzLmNvbnRlbnRMb2FkZWQgPSBjb250ZW50TG9hZGVkOyIsIi8qIVxuICogY29udGVudGxvYWRlZC5qc1xuICpcbiAqIEF1dGhvcjogRGllZ28gUGVyaW5pIChkaWVnby5wZXJpbmkgYXQgZ21haWwuY29tKVxuICogU3VtbWFyeTogY3Jvc3MtYnJvd3NlciB3cmFwcGVyIGZvciBET01Db250ZW50TG9hZGVkXG4gKiBVcGRhdGVkOiAyMDEwMTAyMFxuICogTGljZW5zZTogTUlUXG4gKiBWZXJzaW9uOiAxLjJcbiAqXG4gKiBVUkw6XG4gKiBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vQ29udGVudExvYWRlZC9cbiAqIGh0dHA6Ly9qYXZhc2NyaXB0Lm53Ym94LmNvbS9Db250ZW50TG9hZGVkL01JVC1MSUNFTlNFXG4gKlxuICovXG5cbi8vIEB3aW4gd2luZG93IHJlZmVyZW5jZVxuLy8gQGZuIGZ1bmN0aW9uIHJlZmVyZW5jZVxud2luZG93LmNvbnRlbnRMb2FkZWQgPSBmdW5jdGlvbiBjb250ZW50TG9hZGVkKHdpbiwgZm4pIHtcblxuXHR2YXIgZG9uZSA9IGZhbHNlLCB0b3AgPSB0cnVlLFxuXG5cdGRvYyA9IHdpbi5kb2N1bWVudCwgcm9vdCA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG5cblx0YWRkID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAnYXR0YWNoRXZlbnQnLFxuXHRyZW0gPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdkZXRhY2hFdmVudCcsXG5cdHByZSA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJycgOiAnb24nLFxuXG5cdGluaXQgPSBmdW5jdGlvbihlKSB7XG5cdFx0aWYgKGUudHlwZSA9PSAncmVhZHlzdGF0ZWNoYW5nZScgJiYgZG9jLnJlYWR5U3RhdGUgIT0gJ2NvbXBsZXRlJykgcmV0dXJuO1xuXHRcdChlLnR5cGUgPT0gJ2xvYWQnID8gd2luIDogZG9jKVtyZW1dKHByZSArIGUudHlwZSwgaW5pdCwgZmFsc2UpO1xuXHRcdGlmICghZG9uZSAmJiAoZG9uZSA9IHRydWUpKSBmbi5jYWxsKHdpbiwgZS50eXBlIHx8IGUpO1xuXHR9LFxuXG5cdHBvbGwgPSBmdW5jdGlvbigpIHtcblx0XHR0cnkgeyByb290LmRvU2Nyb2xsKCdsZWZ0Jyk7IH0gY2F0Y2goZSkgeyBzZXRUaW1lb3V0KHBvbGwsIDUwKTsgcmV0dXJuOyB9XG5cdFx0aW5pdCgncG9sbCcpO1xuXHR9O1xuXG5cdGlmIChkb2MucmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnKSBmbi5jYWxsKHdpbiwgJ2xhenknKTtcblx0ZWxzZSB7XG5cdFx0aWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCAmJiByb290LmRvU2Nyb2xsKSB7XG5cdFx0XHR0cnkgeyB0b3AgPSAhd2luLmZyYW1lRWxlbWVudDsgfSBjYXRjaChlKSB7IH1cblx0XHRcdGlmICh0b3ApIHBvbGwoKTtcblx0XHR9XG5cdFx0ZG9jW2FkZF0ocHJlICsgJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0LCBmYWxzZSk7XG5cdFx0ZG9jW2FkZF0ocHJlICsgJ3JlYWR5c3RhdGVjaGFuZ2UnLCBpbml0LCBmYWxzZSk7XG5cdFx0d2luW2FkZF0ocHJlICsgJ2xvYWQnLCBpbml0LCBmYWxzZSk7XG5cdH1cblxufVxuIiwiLyoganNoaW50IHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUgKi9cbi8qIGdsb2JhbCBkb2N1bWVudCwgd2luZG93LCByZXF1aXJlICovXG5cbnZhciBVVElMID0gIHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIE1NID0gd2luZG93Lk1NIHx8IHt9O1xuXG4vKipcbiAqIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGNvbmZpZ3VyYXRpb24gb2YgTU0udm9pY2VOYXZpZ2F0b3JcbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBWb2ljZU5hdmlnYXRvckNvbmZpZ1xuICogQHByb3BlcnR5IHtTdHJpbmd9IFtjYXJkTGlua0JlaGF2aW9yPVwiX3BhcmVudFwiXSBzZXRzIHRoZSBiZWhhdmlvciBmb3IgYW5jaG9ycyB3cmFwcGluZyBjYXJkcy4gVXNlICdmYWxzZScgdG9cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZlbnQgb3BlbmluZyBsaW5rcywgJ19wYXJlbnQnIHRvIG9wZW4gbGlua3MgaW4gdGhlIHNhbWUgdGFiIG9yIHdpbmRvdyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yICdfYmxhbmsnIHRvIG9wZW4gbGlua3MgaW4gYSBuZXcgdGFiIG9yIHdpbmRvdy4gU2VlIHRoZSB0YXJnZXQgYXR0cmlidXRlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZiBbYW5jaG9yXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvYSlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtsaXN0ZW5pbmdNb2RlPVwibm9ybWFsXCJdIGRlZmluZXMgdGhlIGxpc3RlbmluZyBtb2RlIG9mIHRoZSB2b2ljZSBuYXZpZ2F0b3Igd2hlbiBpdCBfaW5pdCBvcGVuZWQuIEFjY2VwdGFibGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzIGluY2x1ZGUgJ25vcm1hbCcsICdjb250aW51b3VzJywgYW5kIGZhbHNlLiBGYWxzZSBwcmV2ZW50cyBsaXN0ZW5pbmdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBkZWZhdWx0IGlzICdub3JtYWwnLlxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFtudW1SZXN1bHRzXSBpZiBzcGVjaWZpZWQsIHRoaXMgbnVtYmVyIG9mIGNhcmRzIHdpbGwgYXBwZWFyIGFzIHJlc3VsdHNcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbY2FyZExheW91dD1cImRlZmF1bHRcIl0gc3BlY2lmaWVzIHRoZSBwcmVkZWZpbmVkIGNhcmQgbGF5b3V0IHVzZWQuIFZhbGlkIHZhbHVlcyBhcmUgJ2RlZmF1bHQnLCBhbmQgJ2N1c3RvbScuXG4gKiBAcHJvcGVydHkge0NhcmRGaWVsZFtdfSBbY2FyZEZpZWxkc10gYW4gYXJyYXkgb2YgY2FyZCBmaWVsZHMge0BsaW5rIENhcmRGaWVsZH0uXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2NhcmRUZW1wbGF0ZV0gYW4gdW5kZXJzY29yZSAobG9kYXNoKSBodG1sIHRlbXBsYXRlIHdoaWNoIGlzIHVzZWQgdG8gY3JlYXRlIGNhcmQgcmVwcmVzZW50YXRpb24gb2YgZG9jdW1lbnRzLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIGEgdmFsdWUgaXMgZ2l2ZW4sIGNhcmRMYXlvdXQgd2lsbCBiZSAnY3VzdG9tJ1xuICogQHByb3BlcnR5IHtib29sZWFufSBbcmVzZXRDYXJkc0NTU10gaWYgdHJ1ZSwgcmVtb3ZlcyBDU1Mgc3BlY2lmaWMgdG8gdGhlIGNhcmRzIGNvbnRhaW5lci5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbY3VzdG9tQ1NTXSBzcGVjaWZpZXMgY3VzdG9tIGNzcyB0byBiZSBhcHBsaWVkXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2N1c3RvbUNTU1VSTF0gc3BlY2lmaWVzIHRoZSB1cmwgb2YgYSBmaWxlIGNvbnRhaW5pbmcgY3VzdG9tIENTUyB0byBiZSBhcHBsaWVkXG4gKiBAcHJvcGVydHkge051bWJlcn0gW2Jhc2VaSW5kZXg9MTAwMDAwXSB0aGUgdm9pY2UgbmF2aWdhdG9yIGVsZW1lbnRzIHdpbGwgaGF2ZSBhIFogaW5kZXggYmV0d2VlbiB0aGUgdmFsdWUgZ2l2ZW4gYW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMDAwIGdyZWF0ZXIgdGhhbiB0aGUgdmFsdWVcbiAqXG4gKi9cblxuLyoqXG4gKiBBbiBPYmplY3QgcmVwcmVzZW50aW5nIGEgZmllbGQgdG8gZGlzcGxheSBpbiBhIGRvY3VtZW50IGNhcmQgZm9yIHRoZSBWb2ljZSBOYXZpZ2F0b3Igd2lkZ2V0LlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENhcmRGaWVsZFxuICogQHByb3BlcnR5IHtTdHJpbmd9IGtleSAgICAgICAgICAgdGhlIGtleSBjb250YWluaW5nIHRoZSB2YWx1ZSBvZiB0aGlzIGZpZWxkIGluIGRvY3VtZW50IG9iamVjdHMuIFRoaXMgZmllbGQgbXVzdCBiZSBzcGVjaWZpZWQuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW3BsYWNlaG9sZGVyXSBpZiBzcGVjaWZpZWQsIHdoZW4gdGhlIGtleSBpcyBub3QgcHJlc2VudCBpbiBhIGRvY3VtZW50IG9yIGlzIGVtcHR5LCB0aGlzIHZhbHVlIHdpbGwgYmUgZGlzcGxheWVkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgb21pdHRlZCB0aGUgdmFsdWUgd2lsbCBiZSBoaWRkZW4gZnJvbSB0aGUgY2FyZFxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtsYWJlbF0gICAgICAgaWYgc3BlY2lmaWVkLCBhIGxhYmVsIHdpdGggdGhlIHByb3ZpZGVkIHRleHQgd2lsbCBwcmVjZWRlIHRoZSB2YWx1ZVxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtmb3JtYXRdICAgICAgZm9yIGZvcm1hdHRlciB0byBiZSB1c2VkIHRvIHByZXNlbnQgdGhlIHZhbHVlIGluIGEgdXNlciBmcmllbmRseSBmb3JtLiBWYWxpZCBmb3JtYXR0ZXJzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmUgZGVmYXVsdCwgYW5kIGRhdGUuXG4gKlxuICogQGV4YW1wbGVcbiAvLyBXaWxsIHJlc3VsdCBpbiB0aGUgZm9sbG93aW5nOlxuIC8vIFJlbGVhc2VkIDEwLzEzLzE5OTZcbiAvL1xuIHZhciBkYXRlRmllbGQgPSB7XG4gICBrZXk6ICdwdWJkYXRlJyxcbiAgIHBsYWNlaG9sZGVyOiAnVW5rbm93bicsXG4gICBsYWJlbDogJ1JlbGVhc2VkJyxcbiAgIGZvcm1hdDogJ2RhdGUnXG4gfTtcbiAqXG4gKi9cblxuLy8gVE9ETzogYWRkIG1vcmUgaGVyZVxuLyoqXG4gKiBUaGUgdm9pY2UgbmF2aWdhdG9yIHdpZGdldC4uLi5cbiAqIEBtZW1iZXJPZiBNTVxuICogQG5hbWVzcGFjZVxuICovXG5NTS52b2ljZU5hdmlnYXRvciA9IE1NLnZvaWNlTmF2aWdhdG9yIHx8IHt9O1xuTU0ubG9hZGVyID0gTU0ubG9hZGVyIHx8IHt9O1xuTU0ubG9hZGVyLnJvb3RVUkwgPSBNTS5sb2FkZXIucm9vdFVSTCB8fCAnaHR0cHM6Ly9kZXZlbG9wZXIuZXhwZWN0bGFicy5jb20vcHVibGljL3Nka3MvJztcblxuLyoqXG4gKiBUaGUgJ2RpdiNtaW5kbWVsZC1tb2RhbCcgZWxlbWVudCB3aGljaCBjb250YWlucyBhbGwgb2YgdGhlIHZvaWNlIG5hdmlnYXRvciBodG1sXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgJG1tID0gZmFsc2U7XG5cbi8qKlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciAkbW1faWZyYW1lID0gZmFsc2U7XG5cbi8qKlxuICogaXNJbml0aWFsaXplZCBpcyBzZXQgdG8gdHJ1ZSBvbmNlIHRoZSB3aWRnZXQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuIE9uY2VcbiAqIHRoZSB3aWRnZXQgaXMgaW5pdGlhbGl6ZWQgb25Jbml0KCkgaXMgY2FsbGVkLiBUaGlzIGlzIHVzZWQgYnlcbiAqIE1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbCgpIHRvIGFsbG93IHVzZXJzIHRvIGNhbGwgc2hvd01vZGFsXG4gKiB3aXRob3V0IGhhdmluZyB0byBrbm93IGlmIHRoZSB3aWRnZXQgaXMgbG9hZGVkIG9yIG5vdFxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBpc0luaXRpYWxpemVkID0gZmFsc2U7XG52YXIgb25Jbml0ID0gZnVuY3Rpb24gKCkge307XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgLy8gQWRkIHRoZSAjbWluZG1lbGQtbW9kYWwgZGl2IHRvIHRoZSBwYWdlXG4gICAgdmFyIG1tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbW0uc2V0QXR0cmlidXRlKCdpZCcsICdtaW5kbWVsZC1tb2RhbCcpO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKG1tLCBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0pO1xuICAgICRtbSA9IFVUSUwuZWwobW0pO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBhbnkgZWxlbWVudCB3aXRoIC5tbS12b2ljZS1uYXYtaW5pdCBvbiBpdFxuICAgIHZhciAkaW5pdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtbS12b2ljZS1uYXYtaW5pdCcpO1xuICAgIHZhciBjbGlja0hhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKCk7XG4gICAgfTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgJGluaXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIFVUSUwuZWwoJGluaXRzW2ldKS5jbGljayhjbGlja0hhbmRsZXIpO1xuICAgIH1cblxuICAgIHZhciAkdGV4dEluaXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW0tdm9pY2UtbmF2LXRleHQtaW5pdCcpO1xuICAgIHZhciBrZXlQcmVzc0hhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKHsgcXVlcnk6IHF1ZXJ5IH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBmb3IodmFyIGogPSAwOyBqIDwgJHRleHRJbml0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBVVElMLmVsKCR0ZXh0SW5pdHNbal0pLmtleXByZXNzKGtleVByZXNzSGFuZGxlcik7XG4gICAgfVxuXG4gICAgc2V0SW5pdGlhbGl6ZWQoKTtcblxuICAgIC8vIFdhaXQgZm9yIG1lc3NhZ2VzXG4gICAgVVRJTC5lbCh3aW5kb3cpLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmRhdGEuc291cmNlICE9ICdtaW5kbWVsZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZihldmVudC5kYXRhLmFjdGlvbiA9PSAnY2xvc2UnKSB7XG4gICAgICAgICAgICAkbW0ucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0SW5pdGlhbGl6ZWQoKSB7XG4gICAgaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgb25Jbml0KCk7XG59XG5cbmZ1bmN0aW9uIHBvc3RNZXNzYWdlKGFjdGlvbiwgZGF0YSkge1xuICAgIHZhciB3aW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pbmRtZWxkLWlmcmFtZVwiKS5jb250ZW50V2luZG93O1xuICAgIHdpbi5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBzb3VyY2U6ICdtaW5kbWVsZCcsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICB9LCBcIipcIik7XG59XG5cblxuXG4vKipcbiAqIE9wZW5zIHRoZSB2b2ljZSBuYXZpZ2F0b3IgbW9kYWwgd2luZG93XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucXVlcnldIGlmIHByb3ZpZGVkLCB0aGlzIHF1ZXJ5IHdpbGwgYmUgaW4gdGhlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmZvcmNlTmV3SUZyYW1lPWZhbHNlXSBpZiB0cnVlLFxuICovXG5cbi8vIEBwYXJhbSB7U3RyaW5nfGJvb2xlYW59IFtvcHRpb25zLmxpc3RlbmluZ01vZGVdIHRoZSBsaXN0ZW5pbmcgbW9kZSB0byBiZSB1c2VkIHdoZW4gdGhlIHZvaWNlIG5hdmlnYXRvciBvcGVuc1xuXG5NTS52b2ljZU5hdmlnYXRvci5zaG93TW9kYWwgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKGlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdmFyIGlmcmFtZTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB2b2ljZSBuYXZpZ2F0b3IgY29uZmlnXG4gICAgICAgIGlmICh0eXBlb2YgTU0gIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICB0eXBlb2YgTU0ud2lkZ2V0cyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHR5cGVvZiBNTS53aWRnZXRzLmNvbmZpZyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIC8vIE1vdmUgY29uZmlnIHRvIHZvaWNlIG5hdiBjb25maWdcbiAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZyA9IE1NLndpZGdldHMuY29uZmlnLnZvaWNlIHx8IHt9O1xuICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmFwcElEID0gTU0ud2lkZ2V0cy5jb25maWcuYXBwSUQ7XG4gICAgICAgICAgICBpZiAodHlwZW9mIE1NLndpZGdldHMuY29uZmlnLmNsZWFuVXJsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jbGVhblVybCA9IE1NLndpZGdldHMuY29uZmlnLmNsZWFuVXJsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS53aWRnZXRzLmNvbmZpZy5mYXllQ2xpZW50VXJsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5mYXllQ2xpZW50VXJsID0gTU0ud2lkZ2V0cy5jb25maWcuZmF5ZUNsaWVudFVybDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcGFyc2UgY2FyZCBsYXlvdXRcbiAgICAgICAgICAgIGlmICh0eXBlb2YgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmNhcmRUZW1wbGF0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY2FyZExheW91dCA9ICdjdXN0b20nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY2FyZExheW91dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY2FyZExheW91dCA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcGFyc2UgY3VzdG9tIGNzc1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY3VzdG9tQ1NTVVJMICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jdXN0b21DU1NVUkwgPSBVVElMLmNvbnZlcnRUb0Fic29sdXRlUGF0aChNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY3VzdG9tQ1NTVVJMKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGVmYXVsdCBsaXN0ZW5pbmcgbW9kZVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxpc3RlbmluZ01vZGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmxpc3RlbmluZ01vZGUgPSBvcHRpb25zLmxpc3RlbmluZ01vZGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBNTS52b2ljZU5hdmlnYXRvci5jb25maWcubGlzdGVuaW5nTW9kZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcubGlzdGVuaW5nTW9kZSA9ICdub3JtYWwnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBQYXNzIHRva2VuLCB1c2VyIElELCBhbmQgc2Vzc2lvbiBJRCBpZiB0aGV5IGFyZSBzZXQgYWxyZWFkeVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS50b2tlbiAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgTU0uYWN0aXZlVXNlcklkICE9PSAndW5kZWZpbmVkJyAmJiBNTS5hY3RpdmVVc2VySWQgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgTU0uYWN0aXZlU2Vzc2lvbklkICE9PSAndW5kZWZpbmVkJyAmJiBNTS5hY3RpdmVTZXNzaW9uSWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcubW1DcmVkZW50aWFscyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IE1NLnRva2VuLFxuICAgICAgICAgICAgICAgICAgICB1c2VySUQ6IE1NLmFjdGl2ZVVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbklEOiBNTS5hY3RpdmVTZXNzaW9uSWRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgZGVmaW5lZCwgcGFzcyBhIHN0YXJ0aW5nIHF1ZXJ5XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5xdWVyeSAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucXVlcnkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLnN0YXJ0UXVlcnkgPSBvcHRpb25zLnF1ZXJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLnN0YXJ0UXVlcnkgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZm9yY2VOZXdJRnJhbWUgJiYgJG1tX2lmcmFtZSkge1xuICAgICAgICAgICAgaWZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbmRtZWxkLWlmcmFtZScpO1xuICAgICAgICAgICAgaWZyYW1lLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBpZnJhbWUgaWYgZmlyc3QgbG9hZFxuICAgICAgICBpZiAoISRtbV9pZnJhbWUgfHwgb3B0aW9ucy5mb3JjZU5ld0lGcmFtZSkge1xuICAgICAgICAgICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdmcmFtZUJvcmRlcicsICcwJyk7XG4gICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdpZCcsICdtaW5kbWVsZC1pZnJhbWUnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93dHJhbnNwYXJlbmN5JywgJ3RydWUnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIE1NLmxvYWRlci5yb290VVJMICsgJ3dpZGdldHMvdm9pY2VOYXZpZ2F0b3IvbW9kYWwvbW9kYWwuaHRtbCcpO1xuXG4gICAgICAgICAgICAkbW1faWZyYW1lID0gVVRJTC5lbChpZnJhbWUpO1xuXG4gICAgICAgICAgICBVVElMLmVsKGlmcmFtZSkub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSgnY29uZmlnJywgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnKTtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSgnb3BlbicpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRtbS5lbCgpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwb3N0TWVzc2FnZSgnb3BlbicpO1xuICAgICAgICB9XG4gICAgICAgICRtbS5hZGRDbGFzcygnb24nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIFNldCBvbkluaXQoKSBjYWxsYmFjayB0byBvcGVuIG1vZGFsXG4gICAgICAgIG9uSW5pdCA9IGZ1bmN0aW9uICgpIHsgTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKG9wdGlvbnMpOyB9O1xuICAgIH1cbn07XG5cbi8qKlxuICogQ2xvc2VzIHRoZSB2b2ljZSBuYXZpZ2F0b3IgbW9kYWwgd2luZG93XG4gKi9cbk1NLnZvaWNlTmF2aWdhdG9yLmhpZGVNb2RhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBwb3N0TWVzc2FnZSgnY2xvc2UnKTtcbn07XG5cbi8vIHNjaGVkdWxlIGluaXRpYWxpemF0aW9uIG9mIHZvaWNlIG5hdmlnYXRvclxuVVRJTC5jb250ZW50TG9hZGVkKHdpbmRvdywgZnVuY3Rpb24oKSB7XG4gICAgaW5pdCgpO1xufSk7XG4iXX0=
