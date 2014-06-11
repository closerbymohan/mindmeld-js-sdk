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
//    },
//
//    contentLoaded : function(fn) {
//        // From https://github.com/dperini/ContentLoaded
//        // Same as $().ready(), but without the jQuery dependency
//
//        var win = window;
//
//        var done = false, top = true,
//
//            doc = win.document, root = docconte.documentElement,
//
//            add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
//            rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
//            pre = doc.addEventListener ? '' : 'on',
//
//            init = function(e) {
//                if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
//                (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
//                if (!done && (done = true)) fn.call(win, e.type || e);
//            },
//
//            poll = function() {
//                try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
//                init('poll');
//            };
//
//        if (doc.readyState == 'complete') fn.call(win, 'lazy');
//        else {
//            if (doc.createEventObject && root.doScroll) {
//                try { top = !win.frameElement; } catch(e) { }
//                if (top) poll();
//            }
//            doc[add](pre + 'DOMContentLoaded', init, false);
//            doc[add](pre + 'readystatechange', init, false);
//            win[add](pre + 'load', init, false);
//        }

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

},{"./util":1}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL3V0aWwuanMiLCIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL3ZlbmRvci9jb250ZW50bG9hZGVkLmpzIiwiL1VzZXJzL2pqL0RvY3VtZW50cy9Db2RlL2V4cGVjdC1sYWJzL21pbmRtZWxkLWpzLXNkay9zcmMvd2lkZ2V0cy92b2ljZU5hdmlnYXRvci9qcy93aWRnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicmVxdWlyZSgnLi92ZW5kb3IvY29udGVudGxvYWRlZCcpO1xuXG4vKiBBIHdyYXBwZXIgZm9yIGRvbSBlbGVtZW50cywgYmFzaWNhbGx5IGEgbGl0ZSB2ZXJzaW9uIG9mIGpRdWVyeSdzICQgKi9cbmV4cG9ydHMuZWwgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBmdW5jdGlvbihldmVudCwgZnVuYykge1xuICAgICAgICAgICAgaWYoZWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsZnVuYyxmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoZWwuYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBlbC5hdHRhY2hFdmVudChcIm9uXCIrZXZlbnQsZnVuYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMub24oJ2NsaWNrJywgZnVuYyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAga2V5cHJlc3M6IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgICAgICB0aGlzLm9uKCdrZXlwcmVzcycsIGZ1bmMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoJyhefFxcXFxzKyknICsgY2xhc3NOYW1lICsgJyhcXFxccyt8JCknLCAnZycpLFxuICAgICAgICAgICAgICAgICckMSdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lICsgXCIgXCIgKyBjbGFzc05hbWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnRzLmNvbnZlcnRUb0Fic29sdXRlUGF0aCA9IGZ1bmN0aW9uKGhyZWYpIHtcbiAgICB2YXIgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGFuY2hvci5ocmVmID0gaHJlZjtcbiAgICByZXR1cm4gKGFuY2hvci5wcm90b2NvbCArICcvLycgKyBhbmNob3IuaG9zdCArIGFuY2hvci5wYXRobmFtZSArIGFuY2hvci5zZWFyY2ggKyBhbmNob3IuaGFzaCk7XG59O1xuXG5mdW5jdGlvbiBhZGRMZWFkaW5nWmVyb3MobnVtYmVyLCBkaWdpdHMpIHtcbiAgICB2YXIgYmFzZSA9IE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICAgIG51bWJlciArPSBiYXNlO1xuICAgIG51bWJlciA9IG51bWJlci50b1N0cmluZygpO1xuICAgIHJldHVybiBudW1iZXIuc3Vic3RyaW5nKG51bWJlci5sZW5ndGggLSBkaWdpdHMpO1xufVxuXG5leHBvcnRzLnRpbWVzdGFtcCA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgZGF0ZSA9IGRhdGUgfHwgbmV3IERhdGUoKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0RnVsbFllYXIoKSwgNCkgKyAnLidcbiAgICAgICAgKyBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRNb250aCgpICsgMSwgMikgKyAnLidcbiAgICAgICAgKyBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXREYXRlKCksIDIpICsgJyAnICsgZGF0ZS50b1RpbWVTdHJpbmcoKTtcbn07XG5cbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGFyZ3Muc3BsaWNlKDAsIDAsIGV4cG9ydHMudGltZXN0YW1wKCkpO1xuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xufTtcblxuZXhwb3J0cy5jb250ZW50TG9hZGVkID0gY29udGVudExvYWRlZDsiLCIvKiFcbiAqIGNvbnRlbnRsb2FkZWQuanNcbiAqXG4gKiBBdXRob3I6IERpZWdvIFBlcmluaSAoZGllZ28ucGVyaW5pIGF0IGdtYWlsLmNvbSlcbiAqIFN1bW1hcnk6IGNyb3NzLWJyb3dzZXIgd3JhcHBlciBmb3IgRE9NQ29udGVudExvYWRlZFxuICogVXBkYXRlZDogMjAxMDEwMjBcbiAqIExpY2Vuc2U6IE1JVFxuICogVmVyc2lvbjogMS4yXG4gKlxuICogVVJMOlxuICogaHR0cDovL2phdmFzY3JpcHQubndib3guY29tL0NvbnRlbnRMb2FkZWQvXG4gKiBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vQ29udGVudExvYWRlZC9NSVQtTElDRU5TRVxuICpcbiAqL1xuXG4vLyBAd2luIHdpbmRvdyByZWZlcmVuY2Vcbi8vIEBmbiBmdW5jdGlvbiByZWZlcmVuY2VcbndpbmRvdy5jb250ZW50TG9hZGVkID0gZnVuY3Rpb24gY29udGVudExvYWRlZCh3aW4sIGZuKSB7XG5cblx0dmFyIGRvbmUgPSBmYWxzZSwgdG9wID0gdHJ1ZSxcblxuXHRkb2MgPSB3aW4uZG9jdW1lbnQsIHJvb3QgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuXG5cdGFkZCA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ2F0dGFjaEV2ZW50Jyxcblx0cmVtID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnZGV0YWNoRXZlbnQnLFxuXHRwcmUgPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICcnIDogJ29uJyxcblxuXHRpbml0ID0gZnVuY3Rpb24oZSkge1xuXHRcdGlmIChlLnR5cGUgPT0gJ3JlYWR5c3RhdGVjaGFuZ2UnICYmIGRvYy5yZWFkeVN0YXRlICE9ICdjb21wbGV0ZScpIHJldHVybjtcblx0XHQoZS50eXBlID09ICdsb2FkJyA/IHdpbiA6IGRvYylbcmVtXShwcmUgKyBlLnR5cGUsIGluaXQsIGZhbHNlKTtcblx0XHRpZiAoIWRvbmUgJiYgKGRvbmUgPSB0cnVlKSkgZm4uY2FsbCh3aW4sIGUudHlwZSB8fCBlKTtcblx0fSxcblxuXHRwb2xsID0gZnVuY3Rpb24oKSB7XG5cdFx0dHJ5IHsgcm9vdC5kb1Njcm9sbCgnbGVmdCcpOyB9IGNhdGNoKGUpIHsgc2V0VGltZW91dChwb2xsLCA1MCk7IHJldHVybjsgfVxuXHRcdGluaXQoJ3BvbGwnKTtcblx0fTtcblxuXHRpZiAoZG9jLnJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJykgZm4uY2FsbCh3aW4sICdsYXp5Jyk7XG5cdGVsc2Uge1xuXHRcdGlmIChkb2MuY3JlYXRlRXZlbnRPYmplY3QgJiYgcm9vdC5kb1Njcm9sbCkge1xuXHRcdFx0dHJ5IHsgdG9wID0gIXdpbi5mcmFtZUVsZW1lbnQ7IH0gY2F0Y2goZSkgeyB9XG5cdFx0XHRpZiAodG9wKSBwb2xsKCk7XG5cdFx0fVxuXHRcdGRvY1thZGRdKHByZSArICdET01Db250ZW50TG9hZGVkJywgaW5pdCwgZmFsc2UpO1xuXHRcdGRvY1thZGRdKHByZSArICdyZWFkeXN0YXRlY2hhbmdlJywgaW5pdCwgZmFsc2UpO1xuXHRcdHdpblthZGRdKHByZSArICdsb2FkJywgaW5pdCwgZmFsc2UpO1xuXHR9XG5cbn1cbiIsInZhciBVVElMID0gIHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIE1NID0gd2luZG93Lk1NIHx8IHt9O1xuXG5NTS52b2ljZU5hdmlnYXRvciA9IE1NLnZvaWNlTmF2aWdhdG9yIHx8IHt9O1xuTU0ubG9hZGVyID0gTU0ubG9hZGVyIHx8IHt9O1xuTU0ubG9hZGVyLnJvb3RVUkwgPSBNTS5sb2FkZXIucm9vdFVSTCB8fCAnaHR0cHM6Ly9kZXZlbG9wZXIuZXhwZWN0bGFicy5jb20vcHVibGljL3Nka3MvJztcblxudmFyIE1NVm9pY2UgPSB7XG4gICAgJG1tIDogZmFsc2UsXG4gICAgJG1tX2lmcmFtZSA6IGZhbHNlLFxuXG4gICAgLy8gaXNfaW5pdCBpcyBzZXQgdG8gdHJ1ZSBvbmNlIHRoZSB3aWRnZXQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuIE9uY2VcbiAgICAvLyB0aGUgd2lkZ2V0IGlzIGluaXRpYWxpemVkIG9uX2luaXQoKSBpcyBjYWxsZWQuIFRoaXMgaXMgdXNlZCBieVxuICAgIC8vIE1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbCgpIHRvIGFsbG93IHVzZXJzIHRvIGNhbGwgc2hvd01vZGFsXG4gICAgLy8gd2l0aG91dCBoYXZpbmcgdG8ga25vdyBpZiB0aGUgd2lkZ2V0IGlzIGxvYWRlZCBvciBub3RcbiAgICBpc19pbml0OiBmYWxzZSxcbiAgICBvbl9pbml0OiBmdW5jdGlvbiAoKSB7fSxcblxuICAgIGluaXQgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIC8vIEFkZCB0aGUgI21pbmRtZWxkLW1vZGFsIGRpdiB0byB0aGUgcGFnZVxuICAgICAgICB2YXIgbW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbW0uc2V0QXR0cmlidXRlKCdpZCcsICdtaW5kbWVsZC1tb2RhbCcpO1xuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShtbSwgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzBdKTtcbiAgICAgICAgc2VsZi4kbW0gPSBVVElMLmVsKG1tKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGFueSBlbGVtZW50IHdpdGggLm1tLXZvaWNlLW5hdi1pbml0IG9uIGl0XG4gICAgICAgIHZhciAkaW5pdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtbS12b2ljZS1uYXYtaW5pdCcpO1xuICAgICAgICB2YXIgY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKCk7XG4gICAgICAgIH07XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCAkaW5pdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIFVUSUwuZWwoJGluaXRzW2ldKS5jbGljayhjbGlja0hhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyICR0ZXh0SW5pdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtbS12b2ljZS1uYXYtdGV4dC1pbml0Jyk7XG4gICAgICAgIHZhciBrZXlQcmVzc0hhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnkgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKHsgcXVlcnk6IHF1ZXJ5IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgJHRleHRJbml0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgVVRJTC5lbCgkdGV4dEluaXRzW2pdKS5rZXlwcmVzcyhrZXlQcmVzc0hhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5zZXRfaW5pdGlhbGl6ZWQoKTtcblxuICAgICAgICAvLyBXYWl0IGZvciBtZXNzYWdlc1xuICAgICAgICBVVElMLmVsKHdpbmRvdykub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEuc291cmNlICE9ICdtaW5kbWVsZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihldmVudC5kYXRhLmFjdGlvbiA9PSAnY2xvc2UnKSB7XG4gICAgICAgICAgICAgICAgTU1Wb2ljZS4kbW0ucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBzZXRfaW5pdGlhbGl6ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc19pbml0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbl9pbml0KCk7XG4gICAgfSxcblxuICAgIHBvc3RNZXNzYWdlIDogZnVuY3Rpb24oYWN0aW9uLCBkYXRhKSB7XG4gICAgICAgIHZhciB3aW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pbmRtZWxkLWlmcmFtZVwiKS5jb250ZW50V2luZG93O1xuICAgICAgICB3aW4ucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBzb3VyY2U6ICdtaW5kbWVsZCcsXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0sIFwiKlwiKTtcbi8vICAgIH0sXG4vL1xuLy8gICAgY29udGVudExvYWRlZCA6IGZ1bmN0aW9uKGZuKSB7XG4vLyAgICAgICAgLy8gRnJvbSBodHRwczovL2dpdGh1Yi5jb20vZHBlcmluaS9Db250ZW50TG9hZGVkXG4vLyAgICAgICAgLy8gU2FtZSBhcyAkKCkucmVhZHkoKSwgYnV0IHdpdGhvdXQgdGhlIGpRdWVyeSBkZXBlbmRlbmN5XG4vL1xuLy8gICAgICAgIHZhciB3aW4gPSB3aW5kb3c7XG4vL1xuLy8gICAgICAgIHZhciBkb25lID0gZmFsc2UsIHRvcCA9IHRydWUsXG4vL1xuLy8gICAgICAgICAgICBkb2MgPSB3aW4uZG9jdW1lbnQsIHJvb3QgPSBkb2Njb250ZS5kb2N1bWVudEVsZW1lbnQsXG4vL1xuLy8gICAgICAgICAgICBhZGQgPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdhdHRhY2hFdmVudCcsXG4vLyAgICAgICAgICAgIHJlbSA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2RldGFjaEV2ZW50Jyxcbi8vICAgICAgICAgICAgcHJlID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAnJyA6ICdvbicsXG4vL1xuLy8gICAgICAgICAgICBpbml0ID0gZnVuY3Rpb24oZSkge1xuLy8gICAgICAgICAgICAgICAgaWYgKGUudHlwZSA9PSAncmVhZHlzdGF0ZWNoYW5nZScgJiYgZG9jLnJlYWR5U3RhdGUgIT0gJ2NvbXBsZXRlJykgcmV0dXJuO1xuLy8gICAgICAgICAgICAgICAgKGUudHlwZSA9PSAnbG9hZCcgPyB3aW4gOiBkb2MpW3JlbV0ocHJlICsgZS50eXBlLCBpbml0LCBmYWxzZSk7XG4vLyAgICAgICAgICAgICAgICBpZiAoIWRvbmUgJiYgKGRvbmUgPSB0cnVlKSkgZm4uY2FsbCh3aW4sIGUudHlwZSB8fCBlKTtcbi8vICAgICAgICAgICAgfSxcbi8vXG4vLyAgICAgICAgICAgIHBvbGwgPSBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgICAgIHRyeSB7IHJvb3QuZG9TY3JvbGwoJ2xlZnQnKTsgfSBjYXRjaChlKSB7IHNldFRpbWVvdXQocG9sbCwgNTApOyByZXR1cm47IH1cbi8vICAgICAgICAgICAgICAgIGluaXQoJ3BvbGwnKTtcbi8vICAgICAgICAgICAgfTtcbi8vXG4vLyAgICAgICAgaWYgKGRvYy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIGZuLmNhbGwod2luLCAnbGF6eScpO1xuLy8gICAgICAgIGVsc2Uge1xuLy8gICAgICAgICAgICBpZiAoZG9jLmNyZWF0ZUV2ZW50T2JqZWN0ICYmIHJvb3QuZG9TY3JvbGwpIHtcbi8vICAgICAgICAgICAgICAgIHRyeSB7IHRvcCA9ICF3aW4uZnJhbWVFbGVtZW50OyB9IGNhdGNoKGUpIHsgfVxuLy8gICAgICAgICAgICAgICAgaWYgKHRvcCkgcG9sbCgpO1xuLy8gICAgICAgICAgICB9XG4vLyAgICAgICAgICAgIGRvY1thZGRdKHByZSArICdET01Db250ZW50TG9hZGVkJywgaW5pdCwgZmFsc2UpO1xuLy8gICAgICAgICAgICBkb2NbYWRkXShwcmUgKyAncmVhZHlzdGF0ZWNoYW5nZScsIGluaXQsIGZhbHNlKTtcbi8vICAgICAgICAgICAgd2luW2FkZF0ocHJlICsgJ2xvYWQnLCBpbml0LCBmYWxzZSk7XG4vLyAgICAgICAgfVxuXG4gICAgfVxufTtcblxuTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoTU1Wb2ljZS5pc19pbml0KSB7XG4gICAgICAgIHZhciBpZnJhbWU7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdm9pY2UgbmF2aWdhdG9yIGNvbmZpZ1xuICAgICAgICBpZiAodHlwZW9mIE1NICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgdHlwZW9mIE1NLndpZGdldHMgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICB0eXBlb2YgTU0ud2lkZ2V0cy5jb25maWcgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBNb3ZlIGNvbmZpZyB0byB2b2ljZSBuYXYgY29uZmlnXG4gICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcgPSBNTS53aWRnZXRzLmNvbmZpZy52b2ljZSB8fCB7fTtcbiAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5hcHBJRCA9IE1NLndpZGdldHMuY29uZmlnLmFwcElEO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS53aWRnZXRzLmNvbmZpZy5jbGVhblVybCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY2xlYW5VcmwgPSBNTS53aWRnZXRzLmNvbmZpZy5jbGVhblVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgTU0ud2lkZ2V0cy5jb25maWcuZmF5ZUNsaWVudFVybCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuZmF5ZUNsaWVudFVybCA9IE1NLndpZGdldHMuY29uZmlnLmZheWVDbGllbnRVcmw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHBhcnNlIGNhcmQgbGF5b3V0XG4gICAgICAgICAgICBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jYXJkVGVtcGxhdGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmNhcmRMYXlvdXQgPSAnY3VzdG9tJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmNhcmRMYXlvdXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmNhcmRMYXlvdXQgPSAnZGVmYXVsdCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHBhcnNlIGN1c3RvbSBjc3NcbiAgICAgICAgICAgIGlmICh0eXBlb2YgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmN1c3RvbUNTU1VSTCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY3VzdG9tQ1NTVVJMID0gVVRJTC5jb252ZXJ0VG9BYnNvbHV0ZVBhdGgoTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmN1c3RvbUNTU1VSTCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRlZmF1bHQgbGlzdGVuaW5nIG1vZGVcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5saXN0ZW5pbmdNb2RlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5saXN0ZW5pbmdNb2RlID0gb3B0aW9ucy5saXN0ZW5pbmdNb2RlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmxpc3RlbmluZ01vZGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmxpc3RlbmluZ01vZGUgPSAnbm9ybWFsJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUGFzcyB0b2tlbiwgdXNlciBJRCwgYW5kIHNlc3Npb24gSUQgaWYgdGhleSBhcmUgc2V0IGFscmVhZHlcbiAgICAgICAgICAgIGlmICh0eXBlb2YgTU0udG9rZW4gIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIE1NLmFjdGl2ZVVzZXJJZCAhPT0gJ3VuZGVmaW5lZCcgJiYgTU0uYWN0aXZlVXNlcklkICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIE1NLmFjdGl2ZVNlc3Npb25JZCAhPT0gJ3VuZGVmaW5lZCcgJiYgTU0uYWN0aXZlU2Vzc2lvbklkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLm1tQ3JlZGVudGlhbHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBNTS50b2tlbixcbiAgICAgICAgICAgICAgICAgICAgdXNlcklEOiBNTS5hY3RpdmVVc2VySWQsXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25JRDogTU0uYWN0aXZlU2Vzc2lvbklkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIGRlZmluZWQsIHBhc3MgYSBzdGFydGluZyBxdWVyeVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucXVlcnkgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnF1ZXJ5ICE9PSAnJykge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5zdGFydFF1ZXJ5ID0gb3B0aW9ucy5xdWVyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5zdGFydFF1ZXJ5ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmZvcmNlTmV3SUZyYW1lICYmIE1NVm9pY2UuJG1tX2lmcmFtZSkge1xuICAgICAgICAgICAgaWZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbmRtZWxkLWlmcmFtZScpO1xuICAgICAgICAgICAgaWZyYW1lLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBpZnJhbWUgaWYgZmlyc3QgbG9hZFxuICAgICAgICBpZiAoIU1NVm9pY2UuJG1tX2lmcmFtZSB8fCBvcHRpb25zLmZvcmNlTmV3SUZyYW1lKSB7XG4gICAgICAgICAgICBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2ZyYW1lQm9yZGVyJywgJzAnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21pbmRtZWxkLWlmcmFtZScpO1xuICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3d0cmFuc3BhcmVuY3knLCAndHJ1ZScpO1xuICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgTU0ubG9hZGVyLnJvb3RVUkwgKyAnd2lkZ2V0cy92b2ljZU5hdmlnYXRvci9tb2RhbC9tb2RhbC5odG1sJyk7XG5cbiAgICAgICAgICAgIE1NVm9pY2UuJG1tX2lmcmFtZSA9IFVUSUwuZWwoaWZyYW1lKTtcblxuICAgICAgICAgICAgVVRJTC5lbChpZnJhbWUpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgTU1Wb2ljZS5wb3N0TWVzc2FnZSgnY29uZmlnJywgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnKTtcbiAgICAgICAgICAgICAgICBNTVZvaWNlLnBvc3RNZXNzYWdlKCdvcGVuJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgTU1Wb2ljZS4kbW0uZWwoKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTU1Wb2ljZS5wb3N0TWVzc2FnZSgnb3BlbicpO1xuICAgICAgICB9XG4gICAgICAgIE1NVm9pY2UuJG1tLmFkZENsYXNzKCdvbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gU2V0IG9uX2luaXQoKSBjYWxsYmFjayB0byBvcGVuIG1vZGFsXG4gICAgICAgIE1NVm9pY2Uub25faW5pdCA9IGZ1bmN0aW9uICgpIHsgTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKG9wdGlvbnMpOyB9O1xuICAgIH1cbn07XG5cbk1NLnZvaWNlTmF2aWdhdG9yLmhpZGVNb2RhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBNTVZvaWNlLnBvc3RNZXNzYWdlKCdjbG9zZScpO1xufTtcblxuVVRJTC5jb250ZW50TG9hZGVkKHdpbmRvdywgZnVuY3Rpb24oKSB7XG4gICAgTU1Wb2ljZS5pbml0KCk7XG59KTtcbiJdfQ==
