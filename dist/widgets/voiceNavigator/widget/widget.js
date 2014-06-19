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
 * An object representing the configuration of {@link MM.voiceNavigator}
 *
 * @typedef {Object} VoiceNavigatorConfig
 * @property {String} [cardLinkBehavior="_parent"] sets the behavior for anchors wrapping cards. Use 'false' to
 *                                                 prevent opening links, '_parent' to open links in the same tab or window,
 *                                                 or '_blank' to open links in a new tab or window. See the target attribute
 *                                                 of [anchor](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)
 *                                                 elements for more information.
 * @property {String} [listeningMode="normal"]     defines the listening mode of the voice navigator when it _init opened. Acceptable
 *                                                 values include 'normal', 'continuous', and false. False prevents listening
 *                                                 and the default is 'normal'.
 * @property {Number} [numResults]                 if specified, this number of cards will appear as results
 * @property {String} [cardLayout="default"]       specifies the predefined card layout used. Valid values are 'default', and 'custom'.
 * @property {CardField[]} [cardFields]            an array of card fields {@link CardField}.
 * @property {String} [cardTemplate]               an underscore (lodash) html template which is used to create card representation
 *                                                 of documents. If a value is given, cardLayout will be 'custom'
 * @property {boolean} [resetCardsCSS]             if true, removes CSS specific to the cards container.
 * @property {String} [customCSS]                  specifies custom CSS to be applied to the voice navigator. The CSS will
 *                                                 be included as an embedded style, which takes precedence over external styles.
 * @property {String} [customCSSURL]               specifies the url of a file containing custom CSS to be applied to the
 *                                                 voice navigator. It will be applied as an external style.
 *
 * @property {Number} [baseZIndex=100000]          the voice navigator elements will have a Z index between the value
 *                                                 given and 1000 greater than the value
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
 * The voice navigator is a widget that allows developers to add voice-driven search to their web applications.
 * By adding a small snippet of JavaScript to your page, you can add our voice navigator to your page allowing your
 * users to search and discover your content in natural, spoken language. The voice navigator widget takes care of
 * capturing speech input from your users, displaying a real-time transcript of what is being recorded, and displaying
 * a collection of results in the browser.
 *
 * The voice navigator will display when elements with the 'mm-voice-nav-init' class are clicked and when elements with
 * the 'mm-voice-nav-text-init' receive an enter keypress.
 *
 * @see {@link VoiceNavigatorConfig} for full documentation of configuration options.
 * @see {@link https://developer.expectlabs.com/docs/voiceWidget|MindMeld Voice Navigator} to get started with Voice Navigator.
 * @see {@link https://developer.expectlabs.com/demos|MindMeld Demos} to see the Voice Navigator in action.
 *
 *
 * @example <caption> Loading the voice navigator </caption>
 *
 <script type="text/js">
 // This should be below all other
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
 </script>
 *
 * @example <caption> Card Template </caption>
 *
 <script id="vn-card-template" type="text/template">
     <h2 class="title"><%= title %></h2>
     <% if (typeof image !== 'undefined' && image.url && image.url !== '') { %>
         <p class="image not-loaded">
             <img src="<%= image.url %>">
         </p>
         <% } %>

     <% var desc = "No description";
     if (typeof description === 'string') {
         desc = description.substr(0, 150) + (description.length > 150 ? "&hellip;" : "");
     } %>
     <p class="description"><%= desc %></p>

     <% if (typeof pubdate !== 'undefined' && pubdate && pubdate !== '') { %>
         <p class="pub-date">
             <% var date = new Date(pubdate * 1000);
             var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
             var monthName = months[date.getMonth()];
             var dateString = monthName + ' ' + date.getDate() + ', ' + date.getFullYear(); %>
             <%= dateString %>
         </p>
     <% } %>
 </script>
 <script type="text/js">
     var voiceNavigatorConfig = {
         cardTemplate: window['vn-card-template'].innerHTML
     };
     // Now load the voice navigator
 </script>
 *
 * @example <caption> Custom CSS: Changing button colors from the default orange to green </caption>
 *
 <script id="vn-custom-css" type="text/css">
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

     &#64;-moz-keyframes mm-button-background-active-anim {
         50% { background-color: #006d00; }
     }
     &#64;-webkit-keyframes mm-button-background-active-anim {
         50% { background-color: #006d00; }
     }
     &#64;-o-keyframes mm-button-background-active-anim {
         50% { background-color: #006d00; }
     }
     &#64;keyframes mm-button-background-active-anim {
         50% { background-color: #006d00; }
     }
 </script>
 <script type="text/js">
     var voiceNavigatorConfig = {
         customCSS: window['vn-custom-css'].innerHTML
     };
     // Now load the voice navigator
 </script>
 *
 * @example <caption> Custom CSS: Change cards area appearance </caption>
 <script id="vn-custom-css" type="text/css">
     #cards {
         background-color: darkgoldenrod;
     }
     #cards .card {
         border: solid #333 1px;
         border-radius: 0;
         background: red;
     }
     #cards .card:hover {
         border-color: black;
     }
     #cards .card p {
         color: white;
     }
     #cards .card h2.title {
         color: #ddd;
     }
 </script>
 <script type="text/js">
     var voiceNavigatorConfig = {
         customCSS: window['vn-custom-css'].innerHTML
     };
     // Now load the voice navigator
 </script>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvc3dhcmFqL3JlcG9zL21pbmRtZWxkLWpzLXNkay9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3N3YXJhai9yZXBvcy9taW5kbWVsZC1qcy1zZGsvc3JjL3dpZGdldHMvdm9pY2VOYXZpZ2F0b3IvanMvdXRpbC5qcyIsIi9Vc2Vycy9zd2FyYWovcmVwb3MvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL3ZlbmRvci9jb250ZW50bG9hZGVkLmpzIiwiL1VzZXJzL3N3YXJhai9yZXBvcy9taW5kbWVsZC1qcy1zZGsvc3JjL3dpZGdldHMvdm9pY2VOYXZpZ2F0b3IvanMvd2lkZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicmVxdWlyZSgnLi92ZW5kb3IvY29udGVudGxvYWRlZCcpO1xuXG4vKiBBIHdyYXBwZXIgZm9yIGRvbSBlbGVtZW50cywgYmFzaWNhbGx5IGEgbGl0ZSB2ZXJzaW9uIG9mIGpRdWVyeSdzICQgKi9cbmV4cG9ydHMuZWwgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBmdW5jdGlvbihldmVudCwgZnVuYykge1xuICAgICAgICAgICAgaWYoZWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsZnVuYyxmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoZWwuYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBlbC5hdHRhY2hFdmVudChcIm9uXCIrZXZlbnQsZnVuYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMub24oJ2NsaWNrJywgZnVuYyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAga2V5cHJlc3M6IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgICAgICB0aGlzLm9uKCdrZXlwcmVzcycsIGZ1bmMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoJyhefFxcXFxzKyknICsgY2xhc3NOYW1lICsgJyhcXFxccyt8JCknLCAnZycpLFxuICAgICAgICAgICAgICAgICckMSdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lICsgXCIgXCIgKyBjbGFzc05hbWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnRzLmNvbnZlcnRUb0Fic29sdXRlUGF0aCA9IGZ1bmN0aW9uKGhyZWYpIHtcbiAgICB2YXIgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGFuY2hvci5ocmVmID0gaHJlZjtcbiAgICByZXR1cm4gKGFuY2hvci5wcm90b2NvbCArICcvLycgKyBhbmNob3IuaG9zdCArIGFuY2hvci5wYXRobmFtZSArIGFuY2hvci5zZWFyY2ggKyBhbmNob3IuaGFzaCk7XG59O1xuXG5mdW5jdGlvbiBhZGRMZWFkaW5nWmVyb3MobnVtYmVyLCBkaWdpdHMpIHtcbiAgICB2YXIgYmFzZSA9IE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICAgIG51bWJlciArPSBiYXNlO1xuICAgIG51bWJlciA9IG51bWJlci50b1N0cmluZygpO1xuICAgIHJldHVybiBudW1iZXIuc3Vic3RyaW5nKG51bWJlci5sZW5ndGggLSBkaWdpdHMpO1xufVxuXG5leHBvcnRzLnRpbWVzdGFtcCA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgZGF0ZSA9IGRhdGUgfHwgbmV3IERhdGUoKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0RnVsbFllYXIoKSwgNCkgKyAnLidcbiAgICAgICAgKyBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRNb250aCgpICsgMSwgMikgKyAnLidcbiAgICAgICAgKyBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXREYXRlKCksIDIpICsgJyAnICsgZGF0ZS50b1RpbWVTdHJpbmcoKTtcbn07XG5cbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGFyZ3Muc3BsaWNlKDAsIDAsIGV4cG9ydHMudGltZXN0YW1wKCkpO1xuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xufTtcblxuZXhwb3J0cy5jb250ZW50TG9hZGVkID0gY29udGVudExvYWRlZDsiLCIvKiFcbiAqIGNvbnRlbnRsb2FkZWQuanNcbiAqXG4gKiBBdXRob3I6IERpZWdvIFBlcmluaSAoZGllZ28ucGVyaW5pIGF0IGdtYWlsLmNvbSlcbiAqIFN1bW1hcnk6IGNyb3NzLWJyb3dzZXIgd3JhcHBlciBmb3IgRE9NQ29udGVudExvYWRlZFxuICogVXBkYXRlZDogMjAxMDEwMjBcbiAqIExpY2Vuc2U6IE1JVFxuICogVmVyc2lvbjogMS4yXG4gKlxuICogVVJMOlxuICogaHR0cDovL2phdmFzY3JpcHQubndib3guY29tL0NvbnRlbnRMb2FkZWQvXG4gKiBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vQ29udGVudExvYWRlZC9NSVQtTElDRU5TRVxuICpcbiAqL1xuXG4vLyBAd2luIHdpbmRvdyByZWZlcmVuY2Vcbi8vIEBmbiBmdW5jdGlvbiByZWZlcmVuY2VcbndpbmRvdy5jb250ZW50TG9hZGVkID0gZnVuY3Rpb24gY29udGVudExvYWRlZCh3aW4sIGZuKSB7XG5cblx0dmFyIGRvbmUgPSBmYWxzZSwgdG9wID0gdHJ1ZSxcblxuXHRkb2MgPSB3aW4uZG9jdW1lbnQsIHJvb3QgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuXG5cdGFkZCA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ2F0dGFjaEV2ZW50Jyxcblx0cmVtID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnZGV0YWNoRXZlbnQnLFxuXHRwcmUgPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICcnIDogJ29uJyxcblxuXHRpbml0ID0gZnVuY3Rpb24oZSkge1xuXHRcdGlmIChlLnR5cGUgPT0gJ3JlYWR5c3RhdGVjaGFuZ2UnICYmIGRvYy5yZWFkeVN0YXRlICE9ICdjb21wbGV0ZScpIHJldHVybjtcblx0XHQoZS50eXBlID09ICdsb2FkJyA/IHdpbiA6IGRvYylbcmVtXShwcmUgKyBlLnR5cGUsIGluaXQsIGZhbHNlKTtcblx0XHRpZiAoIWRvbmUgJiYgKGRvbmUgPSB0cnVlKSkgZm4uY2FsbCh3aW4sIGUudHlwZSB8fCBlKTtcblx0fSxcblxuXHRwb2xsID0gZnVuY3Rpb24oKSB7XG5cdFx0dHJ5IHsgcm9vdC5kb1Njcm9sbCgnbGVmdCcpOyB9IGNhdGNoKGUpIHsgc2V0VGltZW91dChwb2xsLCA1MCk7IHJldHVybjsgfVxuXHRcdGluaXQoJ3BvbGwnKTtcblx0fTtcblxuXHRpZiAoZG9jLnJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJykgZm4uY2FsbCh3aW4sICdsYXp5Jyk7XG5cdGVsc2Uge1xuXHRcdGlmIChkb2MuY3JlYXRlRXZlbnRPYmplY3QgJiYgcm9vdC5kb1Njcm9sbCkge1xuXHRcdFx0dHJ5IHsgdG9wID0gIXdpbi5mcmFtZUVsZW1lbnQ7IH0gY2F0Y2goZSkgeyB9XG5cdFx0XHRpZiAodG9wKSBwb2xsKCk7XG5cdFx0fVxuXHRcdGRvY1thZGRdKHByZSArICdET01Db250ZW50TG9hZGVkJywgaW5pdCwgZmFsc2UpO1xuXHRcdGRvY1thZGRdKHByZSArICdyZWFkeXN0YXRlY2hhbmdlJywgaW5pdCwgZmFsc2UpO1xuXHRcdHdpblthZGRdKHByZSArICdsb2FkJywgaW5pdCwgZmFsc2UpO1xuXHR9XG5cbn1cbiIsInZhciBVVElMID0gIHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIE1NID0gd2luZG93Lk1NID0gd2luZG93Lk1NIHx8IHt9O1xuXG5cbi8qKlxuICogQW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgY29uZmlndXJhdGlvbiBvZiB7QGxpbmsgTU0udm9pY2VOYXZpZ2F0b3J9XG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gVm9pY2VOYXZpZ2F0b3JDb25maWdcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbY2FyZExpbmtCZWhhdmlvcj1cIl9wYXJlbnRcIl0gc2V0cyB0aGUgYmVoYXZpb3IgZm9yIGFuY2hvcnMgd3JhcHBpbmcgY2FyZHMuIFVzZSAnZmFsc2UnIHRvXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2ZW50IG9wZW5pbmcgbGlua3MsICdfcGFyZW50JyB0byBvcGVuIGxpbmtzIGluIHRoZSBzYW1lIHRhYiBvciB3aW5kb3csXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvciAnX2JsYW5rJyB0byBvcGVuIGxpbmtzIGluIGEgbmV3IHRhYiBvciB3aW5kb3cuIFNlZSB0aGUgdGFyZ2V0IGF0dHJpYnV0ZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2YgW2FuY2hvcl0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9FbGVtZW50L2EpXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbbGlzdGVuaW5nTW9kZT1cIm5vcm1hbFwiXSAgICAgZGVmaW5lcyB0aGUgbGlzdGVuaW5nIG1vZGUgb2YgdGhlIHZvaWNlIG5hdmlnYXRvciB3aGVuIGl0IF9pbml0IG9wZW5lZC4gQWNjZXB0YWJsZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzIGluY2x1ZGUgJ25vcm1hbCcsICdjb250aW51b3VzJywgYW5kIGZhbHNlLiBGYWxzZSBwcmV2ZW50cyBsaXN0ZW5pbmdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgZGVmYXVsdCBpcyAnbm9ybWFsJy5cbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBbbnVtUmVzdWx0c10gICAgICAgICAgICAgICAgIGlmIHNwZWNpZmllZCwgdGhpcyBudW1iZXIgb2YgY2FyZHMgd2lsbCBhcHBlYXIgYXMgcmVzdWx0c1xuICogQHByb3BlcnR5IHtTdHJpbmd9IFtjYXJkTGF5b3V0PVwiZGVmYXVsdFwiXSAgICAgICBzcGVjaWZpZXMgdGhlIHByZWRlZmluZWQgY2FyZCBsYXlvdXQgdXNlZC4gVmFsaWQgdmFsdWVzIGFyZSAnZGVmYXVsdCcsIGFuZCAnY3VzdG9tJy5cbiAqIEBwcm9wZXJ0eSB7Q2FyZEZpZWxkW119IFtjYXJkRmllbGRzXSAgICAgICAgICAgIGFuIGFycmF5IG9mIGNhcmQgZmllbGRzIHtAbGluayBDYXJkRmllbGR9LlxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtjYXJkVGVtcGxhdGVdICAgICAgICAgICAgICAgYW4gdW5kZXJzY29yZSAobG9kYXNoKSBodG1sIHRlbXBsYXRlIHdoaWNoIGlzIHVzZWQgdG8gY3JlYXRlIGNhcmQgcmVwcmVzZW50YXRpb25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mIGRvY3VtZW50cy4gSWYgYSB2YWx1ZSBpcyBnaXZlbiwgY2FyZExheW91dCB3aWxsIGJlICdjdXN0b20nXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtyZXNldENhcmRzQ1NTXSAgICAgICAgICAgICBpZiB0cnVlLCByZW1vdmVzIENTUyBzcGVjaWZpYyB0byB0aGUgY2FyZHMgY29udGFpbmVyLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtjdXN0b21DU1NdICAgICAgICAgICAgICAgICAgc3BlY2lmaWVzIGN1c3RvbSBDU1MgdG8gYmUgYXBwbGllZCB0byB0aGUgdm9pY2UgbmF2aWdhdG9yLiBUaGUgQ1NTIHdpbGxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGluY2x1ZGVkIGFzIGFuIGVtYmVkZGVkIHN0eWxlLCB3aGljaCB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgZXh0ZXJuYWwgc3R5bGVzLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtjdXN0b21DU1NVUkxdICAgICAgICAgICAgICAgc3BlY2lmaWVzIHRoZSB1cmwgb2YgYSBmaWxlIGNvbnRhaW5pbmcgY3VzdG9tIENTUyB0byBiZSBhcHBsaWVkIHRvIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pY2UgbmF2aWdhdG9yLiBJdCB3aWxsIGJlIGFwcGxpZWQgYXMgYW4gZXh0ZXJuYWwgc3R5bGUuXG4gKlxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFtiYXNlWkluZGV4PTEwMDAwMF0gICAgICAgICAgdGhlIHZvaWNlIG5hdmlnYXRvciBlbGVtZW50cyB3aWxsIGhhdmUgYSBaIGluZGV4IGJldHdlZW4gdGhlIHZhbHVlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnaXZlbiBhbmQgMTAwMCBncmVhdGVyIHRoYW4gdGhlIHZhbHVlXG4gKlxuICovXG5cbi8qKlxuICogQW4gT2JqZWN0IHJlcHJlc2VudGluZyBhIGZpZWxkIHRvIGRpc3BsYXkgaW4gYSBkb2N1bWVudCBjYXJkIGZvciB0aGUgVm9pY2UgTmF2aWdhdG9yIHdpZGdldC5cbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDYXJkRmllbGRcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBrZXkgICAgICAgICAgIHRoZSBrZXkgY29udGFpbmluZyB0aGUgdmFsdWUgb2YgdGhpcyBmaWVsZCBpbiBkb2N1bWVudCBvYmplY3RzLiBUaGlzIGZpZWxkIG11c3QgYmUgc3BlY2lmaWVkLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtwbGFjZWhvbGRlcl0gaWYgc3BlY2lmaWVkLCB3aGVuIHRoZSBrZXkgaXMgbm90IHByZXNlbnQgaW4gYSBkb2N1bWVudCBvciBpcyBlbXB0eSwgdGhpcyB2YWx1ZSB3aWxsIGJlIGRpc3BsYXllZC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIG9taXR0ZWQgdGhlIHZhbHVlIHdpbGwgYmUgaGlkZGVuIGZyb20gdGhlIGNhcmRcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbbGFiZWxdICAgICAgIGlmIHNwZWNpZmllZCwgYSBsYWJlbCB3aXRoIHRoZSBwcm92aWRlZCB0ZXh0IHdpbGwgcHJlY2VkZSB0aGUgdmFsdWVcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbZm9ybWF0XSAgICAgIGZvciBmb3JtYXR0ZXIgdG8gYmUgdXNlZCB0byBwcmVzZW50IHRoZSB2YWx1ZSBpbiBhIHVzZXIgZnJpZW5kbHkgZm9ybS4gVmFsaWQgZm9ybWF0dGVyc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlIGRlZmF1bHQsIGFuZCBkYXRlLlxuICpcbiAqIEBleGFtcGxlXG4gLy8gV2lsbCByZXN1bHQgaW4gdGhlIGZvbGxvd2luZzpcbiAvLyBSZWxlYXNlZCAxMC8xMy8xOTk2XG4gLy9cbiB2YXIgZGF0ZUZpZWxkID0ge1xuICAga2V5OiAncHViZGF0ZScsXG4gICBwbGFjZWhvbGRlcjogJ1Vua25vd24nLFxuICAgbGFiZWw6ICdSZWxlYXNlZCcsXG4gICBmb3JtYXQ6ICdkYXRlJ1xuIH07XG4gKlxuICovXG5cbi8qKlxuICogVGhlIHZvaWNlIG5hdmlnYXRvciBpcyBhIHdpZGdldCB0aGF0IGFsbG93cyBkZXZlbG9wZXJzIHRvIGFkZCB2b2ljZS1kcml2ZW4gc2VhcmNoIHRvIHRoZWlyIHdlYiBhcHBsaWNhdGlvbnMuXG4gKiBCeSBhZGRpbmcgYSBzbWFsbCBzbmlwcGV0IG9mIEphdmFTY3JpcHQgdG8geW91ciBwYWdlLCB5b3UgY2FuIGFkZCBvdXIgdm9pY2UgbmF2aWdhdG9yIHRvIHlvdXIgcGFnZSBhbGxvd2luZyB5b3VyXG4gKiB1c2VycyB0byBzZWFyY2ggYW5kIGRpc2NvdmVyIHlvdXIgY29udGVudCBpbiBuYXR1cmFsLCBzcG9rZW4gbGFuZ3VhZ2UuIFRoZSB2b2ljZSBuYXZpZ2F0b3Igd2lkZ2V0IHRha2VzIGNhcmUgb2ZcbiAqIGNhcHR1cmluZyBzcGVlY2ggaW5wdXQgZnJvbSB5b3VyIHVzZXJzLCBkaXNwbGF5aW5nIGEgcmVhbC10aW1lIHRyYW5zY3JpcHQgb2Ygd2hhdCBpcyBiZWluZyByZWNvcmRlZCwgYW5kIGRpc3BsYXlpbmdcbiAqIGEgY29sbGVjdGlvbiBvZiByZXN1bHRzIGluIHRoZSBicm93c2VyLlxuICpcbiAqIFRoZSB2b2ljZSBuYXZpZ2F0b3Igd2lsbCBkaXNwbGF5IHdoZW4gZWxlbWVudHMgd2l0aCB0aGUgJ21tLXZvaWNlLW5hdi1pbml0JyBjbGFzcyBhcmUgY2xpY2tlZCBhbmQgd2hlbiBlbGVtZW50cyB3aXRoXG4gKiB0aGUgJ21tLXZvaWNlLW5hdi10ZXh0LWluaXQnIHJlY2VpdmUgYW4gZW50ZXIga2V5cHJlc3MuXG4gKlxuICogQHNlZSB7QGxpbmsgVm9pY2VOYXZpZ2F0b3JDb25maWd9IGZvciBmdWxsIGRvY3VtZW50YXRpb24gb2YgY29uZmlndXJhdGlvbiBvcHRpb25zLlxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuZXhwZWN0bGFicy5jb20vZG9jcy92b2ljZVdpZGdldHxNaW5kTWVsZCBWb2ljZSBOYXZpZ2F0b3J9IHRvIGdldCBzdGFydGVkIHdpdGggVm9pY2UgTmF2aWdhdG9yLlxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuZXhwZWN0bGFicy5jb20vZGVtb3N8TWluZE1lbGQgRGVtb3N9IHRvIHNlZSB0aGUgVm9pY2UgTmF2aWdhdG9yIGluIGFjdGlvbi5cbiAqXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+IExvYWRpbmcgdGhlIHZvaWNlIG5hdmlnYXRvciA8L2NhcHRpb24+XG4gKlxuIDxzY3JpcHQgdHlwZT1cInRleHQvanNcIj5cbiAvLyBUaGlzIHNob3VsZCBiZSBiZWxvdyBhbGwgb3RoZXJcbiB2YXIgTU0gPSB3aW5kb3cuTU0gfHwge307XG4gKCBmdW5jdGlvbiAoKSB7XG4gICAgIE1NLmxvYWRlciA9IHtcbiAgICAgICAgIHJvb3RVUkw6ICdodHRwczovL2RldmVsb3Blci5leHBlY3RsYWJzLmNvbS9wdWJsaWMvc2Rrcy8nLFxuICAgICAgICAgd2lkZ2V0czogWyd2b2ljZSddXG4gICAgIH07XG4gICAgIE1NLndpZGdldHMgPSB7XG4gICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICBhcHBJRDogJ1lPVVIgQVBQSUQnLFxuICAgICAgICAgICAgIHZvaWNlOiB2b2ljZU5hdmlnYXRvckNvbmZpZ1xuICAgICAgICAgfVxuICAgICB9O1xuICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7IHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgIHNjcmlwdC5zcmMgPSBNTS5sb2FkZXIucm9vdFVSTCArICdlbWJlZC5qcyc7XG4gICAgIHZhciB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgICB0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgdCk7XG4gfSgpKTtcbiA8L3NjcmlwdD5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQ2FyZCBUZW1wbGF0ZSA8L2NhcHRpb24+XG4gKlxuIDxzY3JpcHQgaWQ9XCJ2bi1jYXJkLXRlbXBsYXRlXCIgdHlwZT1cInRleHQvdGVtcGxhdGVcIj5cbiAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj48JT0gdGl0bGUgJT48L2gyPlxuICAgICA8JSBpZiAodHlwZW9mIGltYWdlICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZS51cmwgJiYgaW1hZ2UudXJsICE9PSAnJykgeyAlPlxuICAgICAgICAgPHAgY2xhc3M9XCJpbWFnZSBub3QtbG9hZGVkXCI+XG4gICAgICAgICAgICAgPGltZyBzcmM9XCI8JT0gaW1hZ2UudXJsICU+XCI+XG4gICAgICAgICA8L3A+XG4gICAgICAgICA8JSB9ICU+XG5cbiAgICAgPCUgdmFyIGRlc2MgPSBcIk5vIGRlc2NyaXB0aW9uXCI7XG4gICAgIGlmICh0eXBlb2YgZGVzY3JpcHRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICBkZXNjID0gZGVzY3JpcHRpb24uc3Vic3RyKDAsIDE1MCkgKyAoZGVzY3JpcHRpb24ubGVuZ3RoID4gMTUwID8gXCImaGVsbGlwO1wiIDogXCJcIik7XG4gICAgIH0gJT5cbiAgICAgPHAgY2xhc3M9XCJkZXNjcmlwdGlvblwiPjwlPSBkZXNjICU+PC9wPlxuXG4gICAgIDwlIGlmICh0eXBlb2YgcHViZGF0ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcHViZGF0ZSAmJiBwdWJkYXRlICE9PSAnJykgeyAlPlxuICAgICAgICAgPHAgY2xhc3M9XCJwdWItZGF0ZVwiPlxuICAgICAgICAgICAgIDwlIHZhciBkYXRlID0gbmV3IERhdGUocHViZGF0ZSAqIDEwMDApO1xuICAgICAgICAgICAgIHZhciBtb250aHMgPSBbICdKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYycgXTtcbiAgICAgICAgICAgICB2YXIgbW9udGhOYW1lID0gbW9udGhzW2RhdGUuZ2V0TW9udGgoKV07XG4gICAgICAgICAgICAgdmFyIGRhdGVTdHJpbmcgPSBtb250aE5hbWUgKyAnICcgKyBkYXRlLmdldERhdGUoKSArICcsICcgKyBkYXRlLmdldEZ1bGxZZWFyKCk7ICU+XG4gICAgICAgICAgICAgPCU9IGRhdGVTdHJpbmcgJT5cbiAgICAgICAgIDwvcD5cbiAgICAgPCUgfSAlPlxuIDwvc2NyaXB0PlxuIDxzY3JpcHQgdHlwZT1cInRleHQvanNcIj5cbiAgICAgdmFyIHZvaWNlTmF2aWdhdG9yQ29uZmlnID0ge1xuICAgICAgICAgY2FyZFRlbXBsYXRlOiB3aW5kb3dbJ3ZuLWNhcmQtdGVtcGxhdGUnXS5pbm5lckhUTUxcbiAgICAgfTtcbiAgICAgLy8gTm93IGxvYWQgdGhlIHZvaWNlIG5hdmlnYXRvclxuIDwvc2NyaXB0PlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPiBDdXN0b20gQ1NTOiBDaGFuZ2luZyBidXR0b24gY29sb3JzIGZyb20gdGhlIGRlZmF1bHQgb3JhbmdlIHRvIGdyZWVuIDwvY2FwdGlvbj5cbiAqXG4gPHNjcmlwdCBpZD1cInZuLWN1c3RvbS1jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgLm1tLWJ1dHRvbi1iYWNrZ3JvdW5kIHtcbiAgICAgICAgIGJhY2tncm91bmQ6ICMwMDgwMDA7XG4gICAgIH1cbiAgICAgLm1tLWJ1dHRvbi1iYWNrZ3JvdW5kOmhvdmVyIHtcbiAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDczMDA7XG4gICAgIH1cbiAgICAgLm1tLWJ1dHRvbi1iYWNrZ3JvdW5kOmFjdGl2ZSB7XG4gICAgICAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCgjMDA1YTAwLCAjMDA4MDAwKTtcbiAgICAgICAgIGJhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KCMwMDVhMDAsICMwMDgwMDApO1xuICAgICAgICAgYmFja2dyb3VuZDogLW8tbGluZWFyLWdyYWRpZW50KCMwMDVhMDAsICMwMDgwMDApO1xuICAgICAgICAgYmFja2dyb3VuZDogLW1zLWxpbmVhci1ncmFkaWVudCgjMDA1YTAwLCAjMDA4MDAwKTtcbiAgICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgjMDA1YTAwLCAjMDA4MDAwKTtcbiAgICAgfVxuICAgICAubW0tYnV0dG9uLWJvcmRlciB7XG4gICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjMDA2NjAwO1xuICAgICB9XG5cbiAgICAgJiM2NDstbW96LWtleWZyYW1lcyBtbS1idXR0b24tYmFja2dyb3VuZC1hY3RpdmUtYW5pbSB7XG4gICAgICAgICA1MCUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2ZDAwOyB9XG4gICAgIH1cbiAgICAgJiM2NDstd2Via2l0LWtleWZyYW1lcyBtbS1idXR0b24tYmFja2dyb3VuZC1hY3RpdmUtYW5pbSB7XG4gICAgICAgICA1MCUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2ZDAwOyB9XG4gICAgIH1cbiAgICAgJiM2NDstby1rZXlmcmFtZXMgbW0tYnV0dG9uLWJhY2tncm91bmQtYWN0aXZlLWFuaW0ge1xuICAgICAgICAgNTAlIHsgYmFja2dyb3VuZC1jb2xvcjogIzAwNmQwMDsgfVxuICAgICB9XG4gICAgICYjNjQ7a2V5ZnJhbWVzIG1tLWJ1dHRvbi1iYWNrZ3JvdW5kLWFjdGl2ZS1hbmltIHtcbiAgICAgICAgIDUwJSB7IGJhY2tncm91bmQtY29sb3I6ICMwMDZkMDA7IH1cbiAgICAgfVxuIDwvc2NyaXB0PlxuIDxzY3JpcHQgdHlwZT1cInRleHQvanNcIj5cbiAgICAgdmFyIHZvaWNlTmF2aWdhdG9yQ29uZmlnID0ge1xuICAgICAgICAgY3VzdG9tQ1NTOiB3aW5kb3dbJ3ZuLWN1c3RvbS1jc3MnXS5pbm5lckhUTUxcbiAgICAgfTtcbiAgICAgLy8gTm93IGxvYWQgdGhlIHZvaWNlIG5hdmlnYXRvclxuIDwvc2NyaXB0PlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPiBDdXN0b20gQ1NTOiBDaGFuZ2UgY2FyZHMgYXJlYSBhcHBlYXJhbmNlIDwvY2FwdGlvbj5cbiA8c2NyaXB0IGlkPVwidm4tY3VzdG9tLWNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAjY2FyZHMge1xuICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZGFya2dvbGRlbnJvZDtcbiAgICAgfVxuICAgICAjY2FyZHMgLmNhcmQge1xuICAgICAgICAgYm9yZGVyOiBzb2xpZCAjMzMzIDFweDtcbiAgICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICAgICBiYWNrZ3JvdW5kOiByZWQ7XG4gICAgIH1cbiAgICAgI2NhcmRzIC5jYXJkOmhvdmVyIHtcbiAgICAgICAgIGJvcmRlci1jb2xvcjogYmxhY2s7XG4gICAgIH1cbiAgICAgI2NhcmRzIC5jYXJkIHAge1xuICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICB9XG4gICAgICNjYXJkcyAuY2FyZCBoMi50aXRsZSB7XG4gICAgICAgICBjb2xvcjogI2RkZDtcbiAgICAgfVxuIDwvc2NyaXB0PlxuIDxzY3JpcHQgdHlwZT1cInRleHQvanNcIj5cbiAgICAgdmFyIHZvaWNlTmF2aWdhdG9yQ29uZmlnID0ge1xuICAgICAgICAgY3VzdG9tQ1NTOiB3aW5kb3dbJ3ZuLWN1c3RvbS1jc3MnXS5pbm5lckhUTUxcbiAgICAgfTtcbiAgICAgLy8gTm93IGxvYWQgdGhlIHZvaWNlIG5hdmlnYXRvclxuIDwvc2NyaXB0PlxuICpcbiAqIEBtZW1iZXJPZiBNTVxuICogQG5hbWVzcGFjZVxuICovXG5NTS52b2ljZU5hdmlnYXRvciA9IE1NLnZvaWNlTmF2aWdhdG9yIHx8IHt9O1xuTU0ubG9hZGVyID0gTU0ubG9hZGVyIHx8IHt9O1xuTU0ubG9hZGVyLnJvb3RVUkwgPSBNTS5sb2FkZXIucm9vdFVSTCB8fCAnaHR0cHM6Ly9kZXZlbG9wZXIuZXhwZWN0bGFicy5jb20vcHVibGljL3Nka3MvJztcblxuLyoqXG4gKiBUaGUgJ2RpdiNtaW5kbWVsZC1tb2RhbCcgZWxlbWVudCB3aGljaCBjb250YWlucyBhbGwgb2YgdGhlIHZvaWNlIG5hdmlnYXRvciBodG1sXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgJG1tID0gZmFsc2U7XG5cbi8qKlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciAkbW1faWZyYW1lID0gZmFsc2U7XG5cbi8qKlxuICogaXNJbml0aWFsaXplZCBpcyBzZXQgdG8gdHJ1ZSBvbmNlIHRoZSB3aWRnZXQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuIE9uY2VcbiAqIHRoZSB3aWRnZXQgaXMgaW5pdGlhbGl6ZWQgb25Jbml0KCkgaXMgY2FsbGVkLiBUaGlzIGlzIHVzZWQgYnlcbiAqIE1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbCgpIHRvIGFsbG93IHVzZXJzIHRvIGNhbGwgc2hvd01vZGFsXG4gKiB3aXRob3V0IGhhdmluZyB0byBrbm93IGlmIHRoZSB3aWRnZXQgaXMgbG9hZGVkIG9yIG5vdFxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBpc0luaXRpYWxpemVkID0gZmFsc2U7XG52YXIgb25Jbml0ID0gZnVuY3Rpb24gKCkge307XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgLy8gQWRkIHRoZSAjbWluZG1lbGQtbW9kYWwgZGl2IHRvIHRoZSBwYWdlXG4gICAgdmFyIG1tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbW0uc2V0QXR0cmlidXRlKCdpZCcsICdtaW5kbWVsZC1tb2RhbCcpO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKG1tLCBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0pO1xuICAgICRtbSA9IFVUSUwuZWwobW0pO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBhbnkgZWxlbWVudCB3aXRoIC5tbS12b2ljZS1uYXYtaW5pdCBvbiBpdFxuICAgIHZhciAkaW5pdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtbS12b2ljZS1uYXYtaW5pdCcpO1xuICAgIHZhciAkdGV4dEluaXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW0tdm9pY2UtbmF2LXRleHQtaW5pdCcpO1xuICAgIHZhciBjbGlja0hhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBsb29rIGZvciB0ZXh0IHZhbHVlIGluIG1tLXZvaWNlLW5hdi10ZXh0LWluaXQgZWxlbWVudFxuICAgICAgICBpZiAoJHRleHRJbml0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnkgPSAkdGV4dEluaXRzWzBdLnZhbHVlO1xuICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKHsgcXVlcnk6IHF1ZXJ5IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCAkaW5pdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgVVRJTC5lbCgkaW5pdHNbaV0pLmNsaWNrKGNsaWNrSGFuZGxlcik7XG4gICAgfVxuXG4gICAgdmFyIGtleVByZXNzSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnkgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5zaG93TW9kYWwoeyBxdWVyeTogcXVlcnkgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGZvcih2YXIgaiA9IDA7IGogPCAkdGV4dEluaXRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIFVUSUwuZWwoJHRleHRJbml0c1tqXSkua2V5cHJlc3Moa2V5UHJlc3NIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBzZXRJbml0aWFsaXplZCgpO1xuXG4gICAgLy8gV2FpdCBmb3IgbWVzc2FnZXNcbiAgICBVVElMLmVsKHdpbmRvdykub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuZGF0YS5zb3VyY2UgIT0gJ21pbmRtZWxkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKGV2ZW50LmRhdGEuYWN0aW9uID09ICdjbG9zZScpIHtcbiAgICAgICAgICAgICRtbS5yZW1vdmVDbGFzcygnb24nKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRJbml0aWFsaXplZCgpIHtcbiAgICBpc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICBvbkluaXQoKTtcbn1cblxuZnVuY3Rpb24gcG9zdE1lc3NhZ2UoYWN0aW9uLCBkYXRhKSB7XG4gICAgdmFyIHdpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluZG1lbGQtaWZyYW1lXCIpLmNvbnRlbnRXaW5kb3c7XG4gICAgd2luLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIHNvdXJjZTogJ21pbmRtZWxkJyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgIH0sIFwiKlwiKTtcbn1cblxuLyoqXG4gKiBPcGVucyB0aGUgdm9pY2UgbmF2aWdhdG9yIG1vZGFsIHdpbmRvd1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnF1ZXJ5XSAgICAgICAgICAgICAgICAgaWYgcHJvdmlkZWQsIHRoaXMgZmllbGQgd2lsbCBiZSB0aGUgaW5pdGlhbCBxdWVyeSwgYW5kIHdpbGwgaW1tZWRpYXRlbHkgc2hvdyByZXN1bHRzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmZvcmNlTmV3SUZyYW1lPWZhbHNlXSBpZiB0cnVlLCBhbnkgdm9pY2UgbmF2aWdhdG9ycyB0aGF0IHByZXZpb3VzbHkgY3JlYXRlZCB3aWxsIGJlIGRlc3Ryb3llZCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBhIG5ldyBpbnN0YW5jZSB3aWxsIGJlIGNyZWF0ZWQuXG4gKi9cbk1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoaXNJbml0aWFsaXplZCkge1xuICAgICAgICB2YXIgaWZyYW1lO1xuICAgICAgICAvLyBJbml0aWFsaXplIHZvaWNlIG5hdmlnYXRvciBjb25maWdcbiAgICAgICAgaWYgKHR5cGVvZiBNTSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgTU0ud2lkZ2V0cyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgTU0ud2lkZ2V0cy5jb25maWcgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gTW92ZSBjb25maWcgdG8gdm9pY2UgbmF2IGNvbmZpZ1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZyA9IE1NLndpZGdldHMuY29uZmlnLnZvaWNlIHx8IHt9O1xuICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5hcHBJRCA9IE1NLndpZGdldHMuY29uZmlnLmFwcElEO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgTU0ud2lkZ2V0cy5jb25maWcuY2xlYW5VcmwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jbGVhblVybCA9IE1NLndpZGdldHMuY29uZmlnLmNsZWFuVXJsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIE1NLndpZGdldHMuY29uZmlnLmZheWVDbGllbnRVcmwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5mYXllQ2xpZW50VXJsID0gTU0ud2lkZ2V0cy5jb25maWcuZmF5ZUNsaWVudFVybDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBwYXJzZSBjYXJkIGxheW91dFxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmNhcmRUZW1wbGF0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmNhcmRMYXlvdXQgPSAnY3VzdG9tJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY2FyZExheW91dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmNhcmRMYXlvdXQgPSAnZGVmYXVsdCc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gbWFrZSBhYnNvbHV0ZSBVUkxzXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY3VzdG9tQ1NTVVJMICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY3VzdG9tQ1NTVVJMID0gVVRJTC5jb252ZXJ0VG9BYnNvbHV0ZVBhdGgoTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmN1c3RvbUNTU1VSTCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBsaXN0ZW5pbmcgbW9kZVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5saXN0ZW5pbmdNb2RlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcubGlzdGVuaW5nTW9kZSA9IG9wdGlvbnMubGlzdGVuaW5nTW9kZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBNTS52b2ljZU5hdmlnYXRvci5jb25maWcubGlzdGVuaW5nTW9kZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmxpc3RlbmluZ01vZGUgPSAnbm9ybWFsJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBQYXNzIHRva2VuLCB1c2VyIElELCBhbmQgc2Vzc2lvbiBJRCBpZiB0aGV5IGFyZSBzZXQgYWxyZWFkeVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgTU0udG9rZW4gIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBNTS5hY3RpdmVVc2VySWQgIT09ICd1bmRlZmluZWQnICYmIE1NLmFjdGl2ZVVzZXJJZCAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgTU0uYWN0aXZlU2Vzc2lvbklkICE9PSAndW5kZWZpbmVkJyAmJiBNTS5hY3RpdmVTZXNzaW9uSWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLm1tQ3JlZGVudGlhbHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogTU0udG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySUQ6IE1NLmFjdGl2ZVVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25JRDogTU0uYWN0aXZlU2Vzc2lvbklkXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElmIGRlZmluZWQsIHBhc3MgYSBzdGFydGluZyBxdWVyeVxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnF1ZXJ5ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5xdWVyeSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLnN0YXJ0UXVlcnkgPSBvcHRpb25zLnF1ZXJ5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLnN0YXJ0UXVlcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmZvcmNlTmV3SUZyYW1lICYmICRtbV9pZnJhbWUpIHtcbiAgICAgICAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW5kbWVsZC1pZnJhbWUnKTtcbiAgICAgICAgICAgIGlmcmFtZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgaWZyYW1lIGlmIGZpcnN0IGxvYWRcbiAgICAgICAgaWYgKCEkbW1faWZyYW1lIHx8IG9wdGlvbnMuZm9yY2VOZXdJRnJhbWUpIHtcbiAgICAgICAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnZnJhbWVCb3JkZXInLCAnMCcpO1xuICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnaWQnLCAnbWluZG1lbGQtaWZyYW1lJyk7XG4gICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd3RyYW5zcGFyZW5jeScsICd0cnVlJyk7XG4gICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzcmMnLCBNTS5sb2FkZXIucm9vdFVSTCArICd3aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL21vZGFsL21vZGFsLmh0bWwnKTtcblxuICAgICAgICAgICAgJG1tX2lmcmFtZSA9IFVUSUwuZWwoaWZyYW1lKTtcblxuICAgICAgICAgICAgVVRJTC5lbChpZnJhbWUpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoJ2NvbmZpZycsIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZyk7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoJ29wZW4nKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkbW0uZWwoKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcG9zdE1lc3NhZ2UoJ29wZW4nLCBNTS52b2ljZU5hdmlnYXRvci5jb25maWcpO1xuICAgICAgICB9XG4gICAgICAgICRtbS5hZGRDbGFzcygnb24nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIFNldCBvbkluaXQoKSBjYWxsYmFjayB0byBvcGVuIG1vZGFsXG4gICAgICAgIG9uSW5pdCA9IGZ1bmN0aW9uICgpIHsgTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKG9wdGlvbnMpOyB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBDbG9zZXMgdGhlIHZvaWNlIG5hdmlnYXRvciBtb2RhbCB3aW5kb3dcbiAqL1xuTU0udm9pY2VOYXZpZ2F0b3IuaGlkZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuICAgIHBvc3RNZXNzYWdlKCdjbG9zZScpO1xufTtcblxuLy8gc2NoZWR1bGUgaW5pdGlhbGl6YXRpb24gb2Ygdm9pY2UgbmF2aWdhdG9yXG5VVElMLmNvbnRlbnRMb2FkZWQod2luZG93LCBmdW5jdGlvbigpIHtcbiAgICBpbml0KCk7XG59KTtcbiJdfQ==
