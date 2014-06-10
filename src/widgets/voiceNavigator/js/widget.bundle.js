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
                MMVoice.postMessage('open', MM.voiceNavigator.config);
            });

            MMVoice.$mm.el().appendChild(iframe);
        }
        else {
            MMVoice.postMessage('open', MM.voiceNavigator.config);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL3V0aWwuanMiLCIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL3ZlbmRvci9jb250ZW50bG9hZGVkLmpzIiwiL1VzZXJzL2pqL0RvY3VtZW50cy9Db2RlL2V4cGVjdC1sYWJzL21pbmRtZWxkLWpzLXNkay9zcmMvd2lkZ2V0cy92b2ljZU5hdmlnYXRvci9qcy93aWRnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoJy4vdmVuZG9yL2NvbnRlbnRsb2FkZWQnKTtcblxuLyogQSB3cmFwcGVyIGZvciBkb20gZWxlbWVudHMsIGJhc2ljYWxseSBhIGxpdGUgdmVyc2lvbiBvZiBqUXVlcnkncyAkICovXG5leHBvcnRzLmVsID0gZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvbjogZnVuY3Rpb24oZXZlbnQsIGZ1bmMpIHtcbiAgICAgICAgICAgIGlmKGVsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LGZ1bmMsZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGVsLmF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgZWwuYXR0YWNoRXZlbnQoXCJvblwiK2V2ZW50LGZ1bmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNsaWNrOiBmdW5jdGlvbihmdW5jKSB7XG4gICAgICAgICAgICB0aGlzLm9uKCdjbGljaycsIGZ1bmMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGtleXByZXNzOiBmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICAgICAgdGhpcy5vbigna2V5cHJlc3MnLCBmdW5jKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVDbGFzczogZnVuY3Rpb24oY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKCcoXnxcXFxccyspJyArIGNsYXNzTmFtZSArICcoXFxcXHMrfCQpJywgJ2cnKSxcbiAgICAgICAgICAgICAgICAnJDEnXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFkZENsYXNzOiBmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZSArIFwiIFwiICsgY2xhc3NOYW1lO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgfSxcblxuICAgICAgICBlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0cy5jb252ZXJ0VG9BYnNvbHV0ZVBhdGggPSBmdW5jdGlvbihocmVmKSB7XG4gICAgdmFyIGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhbmNob3IuaHJlZiA9IGhyZWY7XG4gICAgcmV0dXJuIChhbmNob3IucHJvdG9jb2wgKyAnLy8nICsgYW5jaG9yLmhvc3QgKyBhbmNob3IucGF0aG5hbWUgKyBhbmNob3Iuc2VhcmNoICsgYW5jaG9yLmhhc2gpO1xufTtcblxuZnVuY3Rpb24gYWRkTGVhZGluZ1plcm9zKG51bWJlciwgZGlnaXRzKSB7XG4gICAgdmFyIGJhc2UgPSBNYXRoLnBvdygxMCwgZGlnaXRzKTtcbiAgICBudW1iZXIgKz0gYmFzZTtcbiAgICBudW1iZXIgPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gbnVtYmVyLnN1YnN0cmluZyhudW1iZXIubGVuZ3RoIC0gZGlnaXRzKTtcbn1cblxuZXhwb3J0cy50aW1lc3RhbXAgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIGRhdGUgPSBkYXRlIHx8IG5ldyBEYXRlKCk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldEZ1bGxZZWFyKCksIDQpICsgJy4nXG4gICAgICAgICsgYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpICsgJy4nXG4gICAgICAgICsgYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0RGF0ZSgpLCAyKSArICcgJyArIGRhdGUudG9UaW1lU3RyaW5nKCk7XG59O1xuXG5leHBvcnRzLmxvZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICBhcmdzLnNwbGljZSgwLCAwLCBleHBvcnRzLnRpbWVzdGFtcCgpKTtcbiAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcbn07XG5cbmV4cG9ydHMuY29udGVudExvYWRlZCA9IGNvbnRlbnRMb2FkZWQ7IiwiLyohXG4gKiBjb250ZW50bG9hZGVkLmpzXG4gKlxuICogQXV0aG9yOiBEaWVnbyBQZXJpbmkgKGRpZWdvLnBlcmluaSBhdCBnbWFpbC5jb20pXG4gKiBTdW1tYXJ5OiBjcm9zcy1icm93c2VyIHdyYXBwZXIgZm9yIERPTUNvbnRlbnRMb2FkZWRcbiAqIFVwZGF0ZWQ6IDIwMTAxMDIwXG4gKiBMaWNlbnNlOiBNSVRcbiAqIFZlcnNpb246IDEuMlxuICpcbiAqIFVSTDpcbiAqIGh0dHA6Ly9qYXZhc2NyaXB0Lm53Ym94LmNvbS9Db250ZW50TG9hZGVkL1xuICogaHR0cDovL2phdmFzY3JpcHQubndib3guY29tL0NvbnRlbnRMb2FkZWQvTUlULUxJQ0VOU0VcbiAqXG4gKi9cblxuLy8gQHdpbiB3aW5kb3cgcmVmZXJlbmNlXG4vLyBAZm4gZnVuY3Rpb24gcmVmZXJlbmNlXG53aW5kb3cuY29udGVudExvYWRlZCA9IGZ1bmN0aW9uIGNvbnRlbnRMb2FkZWQod2luLCBmbikge1xuXG5cdHZhciBkb25lID0gZmFsc2UsIHRvcCA9IHRydWUsXG5cblx0ZG9jID0gd2luLmRvY3VtZW50LCByb290ID0gZG9jLmRvY3VtZW50RWxlbWVudCxcblxuXHRhZGQgPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdhdHRhY2hFdmVudCcsXG5cdHJlbSA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2RldGFjaEV2ZW50Jyxcblx0cHJlID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAnJyA6ICdvbicsXG5cblx0aW5pdCA9IGZ1bmN0aW9uKGUpIHtcblx0XHRpZiAoZS50eXBlID09ICdyZWFkeXN0YXRlY2hhbmdlJyAmJiBkb2MucmVhZHlTdGF0ZSAhPSAnY29tcGxldGUnKSByZXR1cm47XG5cdFx0KGUudHlwZSA9PSAnbG9hZCcgPyB3aW4gOiBkb2MpW3JlbV0ocHJlICsgZS50eXBlLCBpbml0LCBmYWxzZSk7XG5cdFx0aWYgKCFkb25lICYmIChkb25lID0gdHJ1ZSkpIGZuLmNhbGwod2luLCBlLnR5cGUgfHwgZSk7XG5cdH0sXG5cblx0cG9sbCA9IGZ1bmN0aW9uKCkge1xuXHRcdHRyeSB7IHJvb3QuZG9TY3JvbGwoJ2xlZnQnKTsgfSBjYXRjaChlKSB7IHNldFRpbWVvdXQocG9sbCwgNTApOyByZXR1cm47IH1cblx0XHRpbml0KCdwb2xsJyk7XG5cdH07XG5cblx0aWYgKGRvYy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIGZuLmNhbGwod2luLCAnbGF6eScpO1xuXHRlbHNlIHtcblx0XHRpZiAoZG9jLmNyZWF0ZUV2ZW50T2JqZWN0ICYmIHJvb3QuZG9TY3JvbGwpIHtcblx0XHRcdHRyeSB7IHRvcCA9ICF3aW4uZnJhbWVFbGVtZW50OyB9IGNhdGNoKGUpIHsgfVxuXHRcdFx0aWYgKHRvcCkgcG9sbCgpO1xuXHRcdH1cblx0XHRkb2NbYWRkXShwcmUgKyAnRE9NQ29udGVudExvYWRlZCcsIGluaXQsIGZhbHNlKTtcblx0XHRkb2NbYWRkXShwcmUgKyAncmVhZHlzdGF0ZWNoYW5nZScsIGluaXQsIGZhbHNlKTtcblx0XHR3aW5bYWRkXShwcmUgKyAnbG9hZCcsIGluaXQsIGZhbHNlKTtcblx0fVxuXG59XG4iLCJ2YXIgVVRJTCA9ICByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBNTSA9IHdpbmRvdy5NTSB8fCB7fTtcblxuTU0udm9pY2VOYXZpZ2F0b3IgPSBNTS52b2ljZU5hdmlnYXRvciB8fCB7fTtcbk1NLmxvYWRlciA9IE1NLmxvYWRlciB8fCB7fTtcbk1NLmxvYWRlci5yb290VVJMID0gTU0ubG9hZGVyLnJvb3RVUkwgfHwgJ2h0dHBzOi8vZGV2ZWxvcGVyLmV4cGVjdGxhYnMuY29tL3B1YmxpYy9zZGtzLyc7XG5cbnZhciBNTVZvaWNlID0ge1xuICAgICRtbSA6IGZhbHNlLFxuICAgICRtbV9pZnJhbWUgOiBmYWxzZSxcblxuICAgIC8vIGlzX2luaXQgaXMgc2V0IHRvIHRydWUgb25jZSB0aGUgd2lkZ2V0IGhhcyBiZWVuIGluaXRpYWxpemVkLiBPbmNlXG4gICAgLy8gdGhlIHdpZGdldCBpcyBpbml0aWFsaXplZCBvbl9pbml0KCkgaXMgY2FsbGVkLiBUaGlzIGlzIHVzZWQgYnlcbiAgICAvLyBNTS52b2ljZU5hdmlnYXRvci5zaG93TW9kYWwoKSB0byBhbGxvdyB1c2VycyB0byBjYWxsIHNob3dNb2RhbFxuICAgIC8vIHdpdGhvdXQgaGF2aW5nIHRvIGtub3cgaWYgdGhlIHdpZGdldCBpcyBsb2FkZWQgb3Igbm90XG4gICAgaXNfaW5pdDogZmFsc2UsXG4gICAgb25faW5pdDogZnVuY3Rpb24gKCkge30sXG5cbiAgICBpbml0IDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAvLyBBZGQgdGhlICNtaW5kbWVsZC1tb2RhbCBkaXYgdG8gdGhlIHBhZ2VcbiAgICAgICAgdmFyIG1tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG1tLnNldEF0dHJpYnV0ZSgnaWQnLCAnbWluZG1lbGQtbW9kYWwnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUobW0sIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1swXSk7XG4gICAgICAgIHNlbGYuJG1tID0gVVRJTC5lbChtbSk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBhbnkgZWxlbWVudCB3aXRoIC5tbS12b2ljZS1uYXYtaW5pdCBvbiBpdFxuICAgICAgICB2YXIgJGluaXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW0tdm9pY2UtbmF2LWluaXQnKTtcbiAgICAgICAgdmFyIGNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbCgpO1xuICAgICAgICB9O1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgJGluaXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBVVElMLmVsKCRpbml0c1tpXSkuY2xpY2soY2xpY2tIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciAkdGV4dEluaXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW0tdm9pY2UtbmF2LXRleHQtaW5pdCcpO1xuICAgICAgICB2YXIga2V5UHJlc3NIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbCh7IHF1ZXJ5OiBxdWVyeSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8ICR0ZXh0SW5pdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIFVUSUwuZWwoJHRleHRJbml0c1tqXSkua2V5cHJlc3Moa2V5UHJlc3NIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuc2V0X2luaXRpYWxpemVkKCk7XG5cbiAgICAgICAgLy8gV2FpdCBmb3IgbWVzc2FnZXNcbiAgICAgICAgVVRJTC5lbCh3aW5kb3cpLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhLnNvdXJjZSAhPSAnbWluZG1lbGQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZXZlbnQuZGF0YS5hY3Rpb24gPT0gJ2Nsb3NlJykge1xuICAgICAgICAgICAgICAgIE1NVm9pY2UuJG1tLnJlbW92ZUNsYXNzKCdvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgc2V0X2luaXRpYWxpemVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaXNfaW5pdCA9IHRydWU7XG4gICAgICAgIHRoaXMub25faW5pdCgpO1xuICAgIH0sXG5cbiAgICBwb3N0TWVzc2FnZSA6IGZ1bmN0aW9uKGFjdGlvbiwgZGF0YSkge1xuICAgICAgICB2YXIgd2luID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5kbWVsZC1pZnJhbWVcIikuY29udGVudFdpbmRvdztcbiAgICAgICAgd2luLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgc291cmNlOiAnbWluZG1lbGQnLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9LCBcIipcIik7XG4vLyAgICB9LFxuLy9cbi8vICAgIGNvbnRlbnRMb2FkZWQgOiBmdW5jdGlvbihmbikge1xuLy8gICAgICAgIC8vIEZyb20gaHR0cHM6Ly9naXRodWIuY29tL2RwZXJpbmkvQ29udGVudExvYWRlZFxuLy8gICAgICAgIC8vIFNhbWUgYXMgJCgpLnJlYWR5KCksIGJ1dCB3aXRob3V0IHRoZSBqUXVlcnkgZGVwZW5kZW5jeVxuLy9cbi8vICAgICAgICB2YXIgd2luID0gd2luZG93O1xuLy9cbi8vICAgICAgICB2YXIgZG9uZSA9IGZhbHNlLCB0b3AgPSB0cnVlLFxuLy9cbi8vICAgICAgICAgICAgZG9jID0gd2luLmRvY3VtZW50LCByb290ID0gZG9jY29udGUuZG9jdW1lbnRFbGVtZW50LFxuLy9cbi8vICAgICAgICAgICAgYWRkID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAnYXR0YWNoRXZlbnQnLFxuLy8gICAgICAgICAgICByZW0gPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdkZXRhY2hFdmVudCcsXG4vLyAgICAgICAgICAgIHByZSA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJycgOiAnb24nLFxuLy9cbi8vICAgICAgICAgICAgaW5pdCA9IGZ1bmN0aW9uKGUpIHtcbi8vICAgICAgICAgICAgICAgIGlmIChlLnR5cGUgPT0gJ3JlYWR5c3RhdGVjaGFuZ2UnICYmIGRvYy5yZWFkeVN0YXRlICE9ICdjb21wbGV0ZScpIHJldHVybjtcbi8vICAgICAgICAgICAgICAgIChlLnR5cGUgPT0gJ2xvYWQnID8gd2luIDogZG9jKVtyZW1dKHByZSArIGUudHlwZSwgaW5pdCwgZmFsc2UpO1xuLy8gICAgICAgICAgICAgICAgaWYgKCFkb25lICYmIChkb25lID0gdHJ1ZSkpIGZuLmNhbGwod2luLCBlLnR5cGUgfHwgZSk7XG4vLyAgICAgICAgICAgIH0sXG4vL1xuLy8gICAgICAgICAgICBwb2xsID0gZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICAgICB0cnkgeyByb290LmRvU2Nyb2xsKCdsZWZ0Jyk7IH0gY2F0Y2goZSkgeyBzZXRUaW1lb3V0KHBvbGwsIDUwKTsgcmV0dXJuOyB9XG4vLyAgICAgICAgICAgICAgICBpbml0KCdwb2xsJyk7XG4vLyAgICAgICAgICAgIH07XG4vL1xuLy8gICAgICAgIGlmIChkb2MucmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnKSBmbi5jYWxsKHdpbiwgJ2xhenknKTtcbi8vICAgICAgICBlbHNlIHtcbi8vICAgICAgICAgICAgaWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCAmJiByb290LmRvU2Nyb2xsKSB7XG4vLyAgICAgICAgICAgICAgICB0cnkgeyB0b3AgPSAhd2luLmZyYW1lRWxlbWVudDsgfSBjYXRjaChlKSB7IH1cbi8vICAgICAgICAgICAgICAgIGlmICh0b3ApIHBvbGwoKTtcbi8vICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICBkb2NbYWRkXShwcmUgKyAnRE9NQ29udGVudExvYWRlZCcsIGluaXQsIGZhbHNlKTtcbi8vICAgICAgICAgICAgZG9jW2FkZF0ocHJlICsgJ3JlYWR5c3RhdGVjaGFuZ2UnLCBpbml0LCBmYWxzZSk7XG4vLyAgICAgICAgICAgIHdpblthZGRdKHByZSArICdsb2FkJywgaW5pdCwgZmFsc2UpO1xuLy8gICAgICAgIH1cblxuICAgIH1cbn07XG5cbk1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKE1NVm9pY2UuaXNfaW5pdCkge1xuICAgICAgICB2YXIgaWZyYW1lO1xuICAgICAgICAvLyBJbml0aWFsaXplIHZvaWNlIG5hdmlnYXRvciBjb25maWdcbiAgICAgICAgaWYgKHR5cGVvZiBNTSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHR5cGVvZiBNTS53aWRnZXRzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgdHlwZW9mIE1NLndpZGdldHMuY29uZmlnICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gTW92ZSBjb25maWcgdG8gdm9pY2UgbmF2IGNvbmZpZ1xuICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnID0gTU0ud2lkZ2V0cy5jb25maWcudm9pY2UgfHwge307XG4gICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuYXBwSUQgPSBNTS53aWRnZXRzLmNvbmZpZy5hcHBJRDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgTU0ud2lkZ2V0cy5jb25maWcuY2xlYW5VcmwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmNsZWFuVXJsID0gTU0ud2lkZ2V0cy5jb25maWcuY2xlYW5Vcmw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIE1NLndpZGdldHMuY29uZmlnLmZheWVDbGllbnRVcmwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmZheWVDbGllbnRVcmwgPSBNTS53aWRnZXRzLmNvbmZpZy5mYXllQ2xpZW50VXJsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBwYXJzZSBjYXJkIGxheW91dFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY2FyZFRlbXBsYXRlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jYXJkTGF5b3V0ID0gJ2N1c3RvbSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jYXJkTGF5b3V0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jYXJkTGF5b3V0ID0gJ2RlZmF1bHQnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBwYXJzZSBjdXN0b20gY3NzXG4gICAgICAgICAgICBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jdXN0b21DU1NVUkwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmN1c3RvbUNTU1VSTCA9IFVUSUwuY29udmVydFRvQWJzb2x1dGVQYXRoKE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jdXN0b21DU1NVUkwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZWZhdWx0IGxpc3RlbmluZyBtb2RlXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubGlzdGVuaW5nTW9kZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcubGlzdGVuaW5nTW9kZSA9IG9wdGlvbnMubGlzdGVuaW5nTW9kZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5saXN0ZW5pbmdNb2RlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5saXN0ZW5pbmdNb2RlID0gJ25vcm1hbCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFBhc3MgdG9rZW4sIHVzZXIgSUQsIGFuZCBzZXNzaW9uIElEIGlmIHRoZXkgYXJlIHNldCBhbHJlYWR5XG4gICAgICAgICAgICBpZiAodHlwZW9mIE1NLnRva2VuICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBNTS5hY3RpdmVVc2VySWQgIT09ICd1bmRlZmluZWQnICYmIE1NLmFjdGl2ZVVzZXJJZCAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBNTS5hY3RpdmVTZXNzaW9uSWQgIT09ICd1bmRlZmluZWQnICYmIE1NLmFjdGl2ZVNlc3Npb25JZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5tbUNyZWRlbnRpYWxzID0ge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogTU0udG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJRDogTU0uYWN0aXZlVXNlcklkLFxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uSUQ6IE1NLmFjdGl2ZVNlc3Npb25JZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiBkZWZpbmVkLCBwYXNzIGEgc3RhcnRpbmcgcXVlcnlcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnF1ZXJ5ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5xdWVyeSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuc3RhcnRRdWVyeSA9IG9wdGlvbnMucXVlcnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuc3RhcnRRdWVyeSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5mb3JjZU5ld0lGcmFtZSAmJiBNTVZvaWNlLiRtbV9pZnJhbWUpIHtcbiAgICAgICAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW5kbWVsZC1pZnJhbWUnKTtcbiAgICAgICAgICAgIGlmcmFtZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgaWZyYW1lIGlmIGZpcnN0IGxvYWRcbiAgICAgICAgaWYgKCFNTVZvaWNlLiRtbV9pZnJhbWUgfHwgb3B0aW9ucy5mb3JjZU5ld0lGcmFtZSkge1xuICAgICAgICAgICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdmcmFtZUJvcmRlcicsICcwJyk7XG4gICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdpZCcsICdtaW5kbWVsZC1pZnJhbWUnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93dHJhbnNwYXJlbmN5JywgJ3RydWUnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIE1NLmxvYWRlci5yb290VVJMICsgJ3dpZGdldHMvdm9pY2VOYXZpZ2F0b3IvbW9kYWwvbW9kYWwuaHRtbCcpO1xuXG4gICAgICAgICAgICBNTVZvaWNlLiRtbV9pZnJhbWUgPSBVVElMLmVsKGlmcmFtZSk7XG5cbiAgICAgICAgICAgIFVUSUwuZWwoaWZyYW1lKS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIE1NVm9pY2UucG9zdE1lc3NhZ2UoJ29wZW4nLCBNTS52b2ljZU5hdmlnYXRvci5jb25maWcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIE1NVm9pY2UuJG1tLmVsKCkuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIE1NVm9pY2UucG9zdE1lc3NhZ2UoJ29wZW4nLCBNTS52b2ljZU5hdmlnYXRvci5jb25maWcpO1xuICAgICAgICB9XG4gICAgICAgIE1NVm9pY2UuJG1tLmFkZENsYXNzKCdvbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gU2V0IG9uX2luaXQoKSBjYWxsYmFjayB0byBvcGVuIG1vZGFsXG4gICAgICAgIE1NVm9pY2Uub25faW5pdCA9IGZ1bmN0aW9uICgpIHsgTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKG9wdGlvbnMpOyB9O1xuICAgIH1cbn07XG5cbk1NLnZvaWNlTmF2aWdhdG9yLmhpZGVNb2RhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBNTVZvaWNlLnBvc3RNZXNzYWdlKCdjbG9zZScpO1xufTtcblxuVVRJTC5jb250ZW50TG9hZGVkKHdpbmRvdywgZnVuY3Rpb24oKSB7XG4gICAgTU1Wb2ljZS5pbml0KCk7XG59KTtcbiJdfQ==
