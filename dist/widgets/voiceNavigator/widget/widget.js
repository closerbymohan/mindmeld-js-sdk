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
 * The voice navigator is a widget that allows developers to add voice-driven search to their web-based applications.
 * By adding a small snippet of JavaScript to your page, you can add our voice navigator to your page allowing your
 * users to search and discover your content in natural, spoken language. The voice navigator widget takes care of
 * capturing speech input from your users, displaying a realtime transcript of what is being recorded, and displaying
 * a collection of results in the browser.
 *
 * The voice navigator will display when elements with the 'mm-voice-nav-init' class are clicked and when elements with
 * the 'mm-voice-nav-text-init' receive an enter keypress.
 *
 * @see {@link VoiceNavigatorConfig} for full documentation of configuration options.
 * @see {@link https://developer-swaraj.expectlabs.com/docs/voiceWidget|MindMeld Voice Navigator} to get started with Voice Navigator. NOTE: CHANGE THE LINK!
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL3V0aWwuanMiLCIvVXNlcnMvamovRG9jdW1lbnRzL0NvZGUvZXhwZWN0LWxhYnMvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL3ZlbmRvci9jb250ZW50bG9hZGVkLmpzIiwiL1VzZXJzL2pqL0RvY3VtZW50cy9Db2RlL2V4cGVjdC1sYWJzL21pbmRtZWxkLWpzLXNkay9zcmMvd2lkZ2V0cy92b2ljZU5hdmlnYXRvci9qcy93aWRnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuL3ZlbmRvci9jb250ZW50bG9hZGVkJyk7XG5cbi8qIEEgd3JhcHBlciBmb3IgZG9tIGVsZW1lbnRzLCBiYXNpY2FsbHkgYSBsaXRlIHZlcnNpb24gb2YgalF1ZXJ5J3MgJCAqL1xuZXhwb3J0cy5lbCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb246IGZ1bmN0aW9uKGV2ZW50LCBmdW5jKSB7XG4gICAgICAgICAgICBpZihlbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCxmdW5jLGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihlbC5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgICAgIGVsLmF0dGFjaEV2ZW50KFwib25cIitldmVudCxmdW5jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjbGljazogZnVuY3Rpb24oZnVuYykge1xuICAgICAgICAgICAgdGhpcy5vbignY2xpY2snLCBmdW5jKTtcbiAgICAgICAgfSxcblxuICAgICAgICBrZXlwcmVzczogZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMub24oJ2tleXByZXNzJywgZnVuYyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgbmV3IFJlZ0V4cCgnKF58XFxcXHMrKScgKyBjbGFzc05hbWUgKyAnKFxcXFxzK3wkKScsICdnJyksXG4gICAgICAgICAgICAgICAgJyQxJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICBhZGRDbGFzczogZnVuY3Rpb24oY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUgKyBcIiBcIiArIGNsYXNzTmFtZTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydHMuY29udmVydFRvQWJzb2x1dGVQYXRoID0gZnVuY3Rpb24oaHJlZikge1xuICAgIHZhciBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYW5jaG9yLmhyZWYgPSBocmVmO1xuICAgIHJldHVybiAoYW5jaG9yLnByb3RvY29sICsgJy8vJyArIGFuY2hvci5ob3N0ICsgYW5jaG9yLnBhdGhuYW1lICsgYW5jaG9yLnNlYXJjaCArIGFuY2hvci5oYXNoKTtcbn07XG5cbmZ1bmN0aW9uIGFkZExlYWRpbmdaZXJvcyhudW1iZXIsIGRpZ2l0cykge1xuICAgIHZhciBiYXNlID0gTWF0aC5wb3coMTAsIGRpZ2l0cyk7XG4gICAgbnVtYmVyICs9IGJhc2U7XG4gICAgbnVtYmVyID0gbnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgcmV0dXJuIG51bWJlci5zdWJzdHJpbmcobnVtYmVyLmxlbmd0aCAtIGRpZ2l0cyk7XG59XG5cbmV4cG9ydHMudGltZXN0YW1wID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICBkYXRlID0gZGF0ZSB8fCBuZXcgRGF0ZSgpO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRGdWxsWWVhcigpLCA0KSArICcuJ1xuICAgICAgICArIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldE1vbnRoKCkgKyAxLCAyKSArICcuJ1xuICAgICAgICArIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldERhdGUoKSwgMikgKyAnICcgKyBkYXRlLnRvVGltZVN0cmluZygpO1xufTtcblxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgYXJncy5zcGxpY2UoMCwgMCwgZXhwb3J0cy50aW1lc3RhbXAoKSk7XG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XG59O1xuXG5leHBvcnRzLmNvbnRlbnRMb2FkZWQgPSBjb250ZW50TG9hZGVkOyIsIi8qIVxuICogY29udGVudGxvYWRlZC5qc1xuICpcbiAqIEF1dGhvcjogRGllZ28gUGVyaW5pIChkaWVnby5wZXJpbmkgYXQgZ21haWwuY29tKVxuICogU3VtbWFyeTogY3Jvc3MtYnJvd3NlciB3cmFwcGVyIGZvciBET01Db250ZW50TG9hZGVkXG4gKiBVcGRhdGVkOiAyMDEwMTAyMFxuICogTGljZW5zZTogTUlUXG4gKiBWZXJzaW9uOiAxLjJcbiAqXG4gKiBVUkw6XG4gKiBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vQ29udGVudExvYWRlZC9cbiAqIGh0dHA6Ly9qYXZhc2NyaXB0Lm53Ym94LmNvbS9Db250ZW50TG9hZGVkL01JVC1MSUNFTlNFXG4gKlxuICovXG5cbi8vIEB3aW4gd2luZG93IHJlZmVyZW5jZVxuLy8gQGZuIGZ1bmN0aW9uIHJlZmVyZW5jZVxud2luZG93LmNvbnRlbnRMb2FkZWQgPSBmdW5jdGlvbiBjb250ZW50TG9hZGVkKHdpbiwgZm4pIHtcblxuXHR2YXIgZG9uZSA9IGZhbHNlLCB0b3AgPSB0cnVlLFxuXG5cdGRvYyA9IHdpbi5kb2N1bWVudCwgcm9vdCA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG5cblx0YWRkID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAnYXR0YWNoRXZlbnQnLFxuXHRyZW0gPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdkZXRhY2hFdmVudCcsXG5cdHByZSA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJycgOiAnb24nLFxuXG5cdGluaXQgPSBmdW5jdGlvbihlKSB7XG5cdFx0aWYgKGUudHlwZSA9PSAncmVhZHlzdGF0ZWNoYW5nZScgJiYgZG9jLnJlYWR5U3RhdGUgIT0gJ2NvbXBsZXRlJykgcmV0dXJuO1xuXHRcdChlLnR5cGUgPT0gJ2xvYWQnID8gd2luIDogZG9jKVtyZW1dKHByZSArIGUudHlwZSwgaW5pdCwgZmFsc2UpO1xuXHRcdGlmICghZG9uZSAmJiAoZG9uZSA9IHRydWUpKSBmbi5jYWxsKHdpbiwgZS50eXBlIHx8IGUpO1xuXHR9LFxuXG5cdHBvbGwgPSBmdW5jdGlvbigpIHtcblx0XHR0cnkgeyByb290LmRvU2Nyb2xsKCdsZWZ0Jyk7IH0gY2F0Y2goZSkgeyBzZXRUaW1lb3V0KHBvbGwsIDUwKTsgcmV0dXJuOyB9XG5cdFx0aW5pdCgncG9sbCcpO1xuXHR9O1xuXG5cdGlmIChkb2MucmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnKSBmbi5jYWxsKHdpbiwgJ2xhenknKTtcblx0ZWxzZSB7XG5cdFx0aWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCAmJiByb290LmRvU2Nyb2xsKSB7XG5cdFx0XHR0cnkgeyB0b3AgPSAhd2luLmZyYW1lRWxlbWVudDsgfSBjYXRjaChlKSB7IH1cblx0XHRcdGlmICh0b3ApIHBvbGwoKTtcblx0XHR9XG5cdFx0ZG9jW2FkZF0ocHJlICsgJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0LCBmYWxzZSk7XG5cdFx0ZG9jW2FkZF0ocHJlICsgJ3JlYWR5c3RhdGVjaGFuZ2UnLCBpbml0LCBmYWxzZSk7XG5cdFx0d2luW2FkZF0ocHJlICsgJ2xvYWQnLCBpbml0LCBmYWxzZSk7XG5cdH1cblxufVxuIiwidmFyIFVUSUwgPSAgcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgTU0gPSB3aW5kb3cuTU0gPSB3aW5kb3cuTU0gfHwge307XG5cblxuLyoqXG4gKiBBbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBjb25maWd1cmF0aW9uIG9mIHtAbGluayBNTS52b2ljZU5hdmlnYXRvcn1cbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBWb2ljZU5hdmlnYXRvckNvbmZpZ1xuICogQHByb3BlcnR5IHtTdHJpbmd9IFtjYXJkTGlua0JlaGF2aW9yPVwiX3BhcmVudFwiXSBzZXRzIHRoZSBiZWhhdmlvciBmb3IgYW5jaG9ycyB3cmFwcGluZyBjYXJkcy4gVXNlICdmYWxzZScgdG9cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZlbnQgb3BlbmluZyBsaW5rcywgJ19wYXJlbnQnIHRvIG9wZW4gbGlua3MgaW4gdGhlIHNhbWUgdGFiIG9yIHdpbmRvdyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yICdfYmxhbmsnIHRvIG9wZW4gbGlua3MgaW4gYSBuZXcgdGFiIG9yIHdpbmRvdy4gU2VlIHRoZSB0YXJnZXQgYXR0cmlidXRlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZiBbYW5jaG9yXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvYSlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtsaXN0ZW5pbmdNb2RlPVwibm9ybWFsXCJdICAgICBkZWZpbmVzIHRoZSBsaXN0ZW5pbmcgbW9kZSBvZiB0aGUgdm9pY2UgbmF2aWdhdG9yIHdoZW4gaXQgX2luaXQgb3BlbmVkLiBBY2NlcHRhYmxlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgaW5jbHVkZSAnbm9ybWFsJywgJ2NvbnRpbnVvdXMnLCBhbmQgZmFsc2UuIEZhbHNlIHByZXZlbnRzIGxpc3RlbmluZ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBkZWZhdWx0IGlzICdub3JtYWwnLlxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFtudW1SZXN1bHRzXSAgICAgICAgICAgICAgICAgaWYgc3BlY2lmaWVkLCB0aGlzIG51bWJlciBvZiBjYXJkcyB3aWxsIGFwcGVhciBhcyByZXN1bHRzXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2NhcmRMYXlvdXQ9XCJkZWZhdWx0XCJdICAgICAgIHNwZWNpZmllcyB0aGUgcHJlZGVmaW5lZCBjYXJkIGxheW91dCB1c2VkLiBWYWxpZCB2YWx1ZXMgYXJlICdkZWZhdWx0JywgYW5kICdjdXN0b20nLlxuICogQHByb3BlcnR5IHtDYXJkRmllbGRbXX0gW2NhcmRGaWVsZHNdICAgICAgICAgICAgYW4gYXJyYXkgb2YgY2FyZCBmaWVsZHMge0BsaW5rIENhcmRGaWVsZH0uXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2NhcmRUZW1wbGF0ZV0gICAgICAgICAgICAgICBhbiB1bmRlcnNjb3JlIChsb2Rhc2gpIGh0bWwgdGVtcGxhdGUgd2hpY2ggaXMgdXNlZCB0byBjcmVhdGUgY2FyZCByZXByZXNlbnRhdGlvblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2YgZG9jdW1lbnRzLiBJZiBhIHZhbHVlIGlzIGdpdmVuLCBjYXJkTGF5b3V0IHdpbGwgYmUgJ2N1c3RvbSdcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3Jlc2V0Q2FyZHNDU1NdICAgICAgICAgICAgIGlmIHRydWUsIHJlbW92ZXMgQ1NTIHNwZWNpZmljIHRvIHRoZSBjYXJkcyBjb250YWluZXIuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2N1c3RvbUNTU10gICAgICAgICAgICAgICAgICBzcGVjaWZpZXMgY3VzdG9tIENTUyB0byBiZSBhcHBsaWVkIHRvIHRoZSB2b2ljZSBuYXZpZ2F0b3IuIFRoZSBDU1Mgd2lsbFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmUgaW5jbHVkZWQgYXMgYW4gZW1iZWRkZWQgc3R5bGUsIHdoaWNoIHRha2VzIHByZWNlZGVuY2Ugb3ZlciBleHRlcm5hbCBzdHlsZXMuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2N1c3RvbUNTU1VSTF0gICAgICAgICAgICAgICBzcGVjaWZpZXMgdGhlIHVybCBvZiBhIGZpbGUgY29udGFpbmluZyBjdXN0b20gQ1NTIHRvIGJlIGFwcGxpZWQgdG8gdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2ljZSBuYXZpZ2F0b3IuIEl0IHdpbGwgYmUgYXBwbGllZCBhcyBhbiBleHRlcm5hbCBzdHlsZS5cbiAqXG4gKiBAcHJvcGVydHkge051bWJlcn0gW2Jhc2VaSW5kZXg9MTAwMDAwXSAgICAgICAgICB0aGUgdm9pY2UgbmF2aWdhdG9yIGVsZW1lbnRzIHdpbGwgaGF2ZSBhIFogaW5kZXggYmV0d2VlbiB0aGUgdmFsdWVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdpdmVuIGFuZCAxMDAwIGdyZWF0ZXIgdGhhbiB0aGUgdmFsdWVcbiAqXG4gKi9cblxuLyoqXG4gKiBBbiBPYmplY3QgcmVwcmVzZW50aW5nIGEgZmllbGQgdG8gZGlzcGxheSBpbiBhIGRvY3VtZW50IGNhcmQgZm9yIHRoZSBWb2ljZSBOYXZpZ2F0b3Igd2lkZ2V0LlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENhcmRGaWVsZFxuICogQHByb3BlcnR5IHtTdHJpbmd9IGtleSAgICAgICAgICAgdGhlIGtleSBjb250YWluaW5nIHRoZSB2YWx1ZSBvZiB0aGlzIGZpZWxkIGluIGRvY3VtZW50IG9iamVjdHMuIFRoaXMgZmllbGQgbXVzdCBiZSBzcGVjaWZpZWQuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW3BsYWNlaG9sZGVyXSBpZiBzcGVjaWZpZWQsIHdoZW4gdGhlIGtleSBpcyBub3QgcHJlc2VudCBpbiBhIGRvY3VtZW50IG9yIGlzIGVtcHR5LCB0aGlzIHZhbHVlIHdpbGwgYmUgZGlzcGxheWVkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgb21pdHRlZCB0aGUgdmFsdWUgd2lsbCBiZSBoaWRkZW4gZnJvbSB0aGUgY2FyZFxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtsYWJlbF0gICAgICAgaWYgc3BlY2lmaWVkLCBhIGxhYmVsIHdpdGggdGhlIHByb3ZpZGVkIHRleHQgd2lsbCBwcmVjZWRlIHRoZSB2YWx1ZVxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtmb3JtYXRdICAgICAgZm9yIGZvcm1hdHRlciB0byBiZSB1c2VkIHRvIHByZXNlbnQgdGhlIHZhbHVlIGluIGEgdXNlciBmcmllbmRseSBmb3JtLiBWYWxpZCBmb3JtYXR0ZXJzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmUgZGVmYXVsdCwgYW5kIGRhdGUuXG4gKlxuICogQGV4YW1wbGVcbiAvLyBXaWxsIHJlc3VsdCBpbiB0aGUgZm9sbG93aW5nOlxuIC8vIFJlbGVhc2VkIDEwLzEzLzE5OTZcbiAvL1xuIHZhciBkYXRlRmllbGQgPSB7XG4gICBrZXk6ICdwdWJkYXRlJyxcbiAgIHBsYWNlaG9sZGVyOiAnVW5rbm93bicsXG4gICBsYWJlbDogJ1JlbGVhc2VkJyxcbiAgIGZvcm1hdDogJ2RhdGUnXG4gfTtcbiAqXG4gKi9cblxuLyoqXG4gKiBUaGUgdm9pY2UgbmF2aWdhdG9yIGlzIGEgd2lkZ2V0IHRoYXQgYWxsb3dzIGRldmVsb3BlcnMgdG8gYWRkIHZvaWNlLWRyaXZlbiBzZWFyY2ggdG8gdGhlaXIgd2ViLWJhc2VkIGFwcGxpY2F0aW9ucy5cbiAqIEJ5IGFkZGluZyBhIHNtYWxsIHNuaXBwZXQgb2YgSmF2YVNjcmlwdCB0byB5b3VyIHBhZ2UsIHlvdSBjYW4gYWRkIG91ciB2b2ljZSBuYXZpZ2F0b3IgdG8geW91ciBwYWdlIGFsbG93aW5nIHlvdXJcbiAqIHVzZXJzIHRvIHNlYXJjaCBhbmQgZGlzY292ZXIgeW91ciBjb250ZW50IGluIG5hdHVyYWwsIHNwb2tlbiBsYW5ndWFnZS4gVGhlIHZvaWNlIG5hdmlnYXRvciB3aWRnZXQgdGFrZXMgY2FyZSBvZlxuICogY2FwdHVyaW5nIHNwZWVjaCBpbnB1dCBmcm9tIHlvdXIgdXNlcnMsIGRpc3BsYXlpbmcgYSByZWFsdGltZSB0cmFuc2NyaXB0IG9mIHdoYXQgaXMgYmVpbmcgcmVjb3JkZWQsIGFuZCBkaXNwbGF5aW5nXG4gKiBhIGNvbGxlY3Rpb24gb2YgcmVzdWx0cyBpbiB0aGUgYnJvd3Nlci5cbiAqXG4gKiBUaGUgdm9pY2UgbmF2aWdhdG9yIHdpbGwgZGlzcGxheSB3aGVuIGVsZW1lbnRzIHdpdGggdGhlICdtbS12b2ljZS1uYXYtaW5pdCcgY2xhc3MgYXJlIGNsaWNrZWQgYW5kIHdoZW4gZWxlbWVudHMgd2l0aFxuICogdGhlICdtbS12b2ljZS1uYXYtdGV4dC1pbml0JyByZWNlaXZlIGFuIGVudGVyIGtleXByZXNzLlxuICpcbiAqIEBzZWUge0BsaW5rIFZvaWNlTmF2aWdhdG9yQ29uZmlnfSBmb3IgZnVsbCBkb2N1bWVudGF0aW9uIG9mIGNvbmZpZ3VyYXRpb24gb3B0aW9ucy5cbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLXN3YXJhai5leHBlY3RsYWJzLmNvbS9kb2NzL3ZvaWNlV2lkZ2V0fE1pbmRNZWxkIFZvaWNlIE5hdmlnYXRvcn0gdG8gZ2V0IHN0YXJ0ZWQgd2l0aCBWb2ljZSBOYXZpZ2F0b3IuIE5PVEU6IENIQU5HRSBUSEUgTElOSyFcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmV4cGVjdGxhYnMuY29tL2RlbW9zfE1pbmRNZWxkIERlbW9zfSB0byBzZWUgdGhlIFZvaWNlIE5hdmlnYXRvciBpbiBhY3Rpb24uXG4gKlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPiBMb2FkaW5nIHRoZSB2b2ljZSBuYXZpZ2F0b3IgPC9jYXB0aW9uPlxuICpcbiA8c2NyaXB0IHR5cGU9XCJ0ZXh0L2pzXCI+XG4gLy8gVGhpcyBzaG91bGQgYmUgYmVsb3cgYWxsIG90aGVyXG4gdmFyIE1NID0gd2luZG93Lk1NIHx8IHt9O1xuICggZnVuY3Rpb24gKCkge1xuICAgICBNTS5sb2FkZXIgPSB7XG4gICAgICAgICByb290VVJMOiAnaHR0cHM6Ly9kZXZlbG9wZXIuZXhwZWN0bGFicy5jb20vcHVibGljL3Nka3MvJyxcbiAgICAgICAgIHdpZGdldHM6IFsndm9pY2UnXVxuICAgICB9O1xuICAgICBNTS53aWRnZXRzID0ge1xuICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgYXBwSUQ6ICdZT1VSIEFQUElEJyxcbiAgICAgICAgICAgICB2b2ljZTogdm9pY2VOYXZpZ2F0b3JDb25maWdcbiAgICAgICAgIH1cbiAgICAgfTtcbiAgICAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnOyBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICBzY3JpcHQuc3JjID0gTU0ubG9hZGVyLnJvb3RVUkwgKyAnZW1iZWQuanMnO1xuICAgICB2YXIgdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgICAgdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzY3JpcHQsIHQpO1xuIH0oKSk7XG4gPC9zY3JpcHQ+XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+IENhcmQgVGVtcGxhdGUgPC9jYXB0aW9uPlxuICpcbiA8c2NyaXB0IGlkPVwidm4tY2FyZC10ZW1wbGF0ZVwiIHR5cGU9XCJ0ZXh0L3RlbXBsYXRlXCI+XG4gICAgIDxoMiBjbGFzcz1cInRpdGxlXCI+PCU9IHRpdGxlICU+PC9oMj5cbiAgICAgPCUgaWYgKHR5cGVvZiBpbWFnZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaW1hZ2UudXJsICYmIGltYWdlLnVybCAhPT0gJycpIHsgJT5cbiAgICAgICAgIDxwIGNsYXNzPVwiaW1hZ2Ugbm90LWxvYWRlZFwiPlxuICAgICAgICAgICAgIDxpbWcgc3JjPVwiPCU9IGltYWdlLnVybCAlPlwiPlxuICAgICAgICAgPC9wPlxuICAgICAgICAgPCUgfSAlPlxuXG4gICAgIDwlIHZhciBkZXNjID0gXCJObyBkZXNjcmlwdGlvblwiO1xuICAgICBpZiAodHlwZW9mIGRlc2NyaXB0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgZGVzYyA9IGRlc2NyaXB0aW9uLnN1YnN0cigwLCAxNTApICsgKGRlc2NyaXB0aW9uLmxlbmd0aCA+IDE1MCA/IFwiJmhlbGxpcDtcIiA6IFwiXCIpO1xuICAgICB9ICU+XG4gICAgIDxwIGNsYXNzPVwiZGVzY3JpcHRpb25cIj48JT0gZGVzYyAlPjwvcD5cblxuICAgICA8JSBpZiAodHlwZW9mIHB1YmRhdGUgIT09ICd1bmRlZmluZWQnICYmIHB1YmRhdGUgJiYgcHViZGF0ZSAhPT0gJycpIHsgJT5cbiAgICAgICAgIDxwIGNsYXNzPVwicHViLWRhdGVcIj5cbiAgICAgICAgICAgICA8JSB2YXIgZGF0ZSA9IG5ldyBEYXRlKHB1YmRhdGUgKiAxMDAwKTtcbiAgICAgICAgICAgICB2YXIgbW9udGhzID0gWyAnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnIF07XG4gICAgICAgICAgICAgdmFyIG1vbnRoTmFtZSA9IG1vbnRoc1tkYXRlLmdldE1vbnRoKCldO1xuICAgICAgICAgICAgIHZhciBkYXRlU3RyaW5nID0gbW9udGhOYW1lICsgJyAnICsgZGF0ZS5nZXREYXRlKCkgKyAnLCAnICsgZGF0ZS5nZXRGdWxsWWVhcigpOyAlPlxuICAgICAgICAgICAgIDwlPSBkYXRlU3RyaW5nICU+XG4gICAgICAgICA8L3A+XG4gICAgIDwlIH0gJT5cbiA8L3NjcmlwdD5cbiA8c2NyaXB0IHR5cGU9XCJ0ZXh0L2pzXCI+XG4gICAgIHZhciB2b2ljZU5hdmlnYXRvckNvbmZpZyA9IHtcbiAgICAgICAgIGNhcmRUZW1wbGF0ZTogd2luZG93Wyd2bi1jYXJkLXRlbXBsYXRlJ10uaW5uZXJIVE1MXG4gICAgIH07XG4gICAgIC8vIE5vdyBsb2FkIHRoZSB2b2ljZSBuYXZpZ2F0b3JcbiA8L3NjcmlwdD5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQ3VzdG9tIENTUzogQ2hhbmdpbmcgYnV0dG9uIGNvbG9ycyBmcm9tIHRoZSBkZWZhdWx0IG9yYW5nZSB0byBncmVlbiA8L2NhcHRpb24+XG4gKlxuIDxzY3JpcHQgaWQ9XCJ2bi1jdXN0b20tY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgIC5tbS1idXR0b24tYmFja2dyb3VuZCB7XG4gICAgICAgICBiYWNrZ3JvdW5kOiAjMDA4MDAwO1xuICAgICB9XG4gICAgIC5tbS1idXR0b24tYmFja2dyb3VuZDpob3ZlciB7XG4gICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3MzAwO1xuICAgICB9XG4gICAgIC5tbS1idXR0b24tYmFja2dyb3VuZDphY3RpdmUge1xuICAgICAgICAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoIzAwNWEwMCwgIzAwODAwMCk7XG4gICAgICAgICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCgjMDA1YTAwLCAjMDA4MDAwKTtcbiAgICAgICAgIGJhY2tncm91bmQ6IC1vLWxpbmVhci1ncmFkaWVudCgjMDA1YTAwLCAjMDA4MDAwKTtcbiAgICAgICAgIGJhY2tncm91bmQ6IC1tcy1saW5lYXItZ3JhZGllbnQoIzAwNWEwMCwgIzAwODAwMCk7XG4gICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoIzAwNWEwMCwgIzAwODAwMCk7XG4gICAgIH1cbiAgICAgLm1tLWJ1dHRvbi1ib3JkZXIge1xuICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgIzAwNjYwMDtcbiAgICAgfVxuXG4gICAgICYjNjQ7LW1vei1rZXlmcmFtZXMgbW0tYnV0dG9uLWJhY2tncm91bmQtYWN0aXZlLWFuaW0ge1xuICAgICAgICAgNTAlIHsgYmFja2dyb3VuZC1jb2xvcjogIzAwNmQwMDsgfVxuICAgICB9XG4gICAgICYjNjQ7LXdlYmtpdC1rZXlmcmFtZXMgbW0tYnV0dG9uLWJhY2tncm91bmQtYWN0aXZlLWFuaW0ge1xuICAgICAgICAgNTAlIHsgYmFja2dyb3VuZC1jb2xvcjogIzAwNmQwMDsgfVxuICAgICB9XG4gICAgICYjNjQ7LW8ta2V5ZnJhbWVzIG1tLWJ1dHRvbi1iYWNrZ3JvdW5kLWFjdGl2ZS1hbmltIHtcbiAgICAgICAgIDUwJSB7IGJhY2tncm91bmQtY29sb3I6ICMwMDZkMDA7IH1cbiAgICAgfVxuICAgICAmIzY0O2tleWZyYW1lcyBtbS1idXR0b24tYmFja2dyb3VuZC1hY3RpdmUtYW5pbSB7XG4gICAgICAgICA1MCUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2ZDAwOyB9XG4gICAgIH1cbiA8L3NjcmlwdD5cbiA8c2NyaXB0IHR5cGU9XCJ0ZXh0L2pzXCI+XG4gICAgIHZhciB2b2ljZU5hdmlnYXRvckNvbmZpZyA9IHtcbiAgICAgICAgIGN1c3RvbUNTUzogd2luZG93Wyd2bi1jdXN0b20tY3NzJ10uaW5uZXJIVE1MXG4gICAgIH07XG4gICAgIC8vIE5vdyBsb2FkIHRoZSB2b2ljZSBuYXZpZ2F0b3JcbiA8L3NjcmlwdD5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQ3VzdG9tIENTUzogQ2hhbmdlIGNhcmRzIGFyZWEgYXBwZWFyYW5jZSA8L2NhcHRpb24+XG4gPHNjcmlwdCBpZD1cInZuLWN1c3RvbS1jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgI2NhcmRzIHtcbiAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtnb2xkZW5yb2Q7XG4gICAgIH1cbiAgICAgI2NhcmRzIC5jYXJkIHtcbiAgICAgICAgIGJvcmRlcjogc29saWQgIzMzMyAxcHg7XG4gICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICAgYmFja2dyb3VuZDogcmVkO1xuICAgICB9XG4gICAgICNjYXJkcyAuY2FyZDpob3ZlciB7XG4gICAgICAgICBib3JkZXItY29sb3I6IGJsYWNrO1xuICAgICB9XG4gICAgICNjYXJkcyAuY2FyZCBwIHtcbiAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgfVxuICAgICAjY2FyZHMgLmNhcmQgaDIudGl0bGUge1xuICAgICAgICAgY29sb3I6ICNkZGQ7XG4gICAgIH1cbiA8L3NjcmlwdD5cbiA8c2NyaXB0IHR5cGU9XCJ0ZXh0L2pzXCI+XG4gICAgIHZhciB2b2ljZU5hdmlnYXRvckNvbmZpZyA9IHtcbiAgICAgICAgIGN1c3RvbUNTUzogd2luZG93Wyd2bi1jdXN0b20tY3NzJ10uaW5uZXJIVE1MXG4gICAgIH07XG4gICAgIC8vIE5vdyBsb2FkIHRoZSB2b2ljZSBuYXZpZ2F0b3JcbiA8L3NjcmlwdD5cbiAqXG4gKiBAbWVtYmVyT2YgTU1cbiAqIEBuYW1lc3BhY2VcbiAqL1xuTU0udm9pY2VOYXZpZ2F0b3IgPSBNTS52b2ljZU5hdmlnYXRvciB8fCB7fTtcbk1NLmxvYWRlciA9IE1NLmxvYWRlciB8fCB7fTtcbk1NLmxvYWRlci5yb290VVJMID0gTU0ubG9hZGVyLnJvb3RVUkwgfHwgJ2h0dHBzOi8vZGV2ZWxvcGVyLmV4cGVjdGxhYnMuY29tL3B1YmxpYy9zZGtzLyc7XG5cbi8qKlxuICogVGhlICdkaXYjbWluZG1lbGQtbW9kYWwnIGVsZW1lbnQgd2hpY2ggY29udGFpbnMgYWxsIG9mIHRoZSB2b2ljZSBuYXZpZ2F0b3IgaHRtbFxuICogQHByaXZhdGVcbiAqL1xudmFyICRtbSA9IGZhbHNlO1xuXG4vKipcbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgJG1tX2lmcmFtZSA9IGZhbHNlO1xuXG4vKipcbiAqIGlzSW5pdGlhbGl6ZWQgaXMgc2V0IHRvIHRydWUgb25jZSB0aGUgd2lkZ2V0IGhhcyBiZWVuIGluaXRpYWxpemVkLiBPbmNlXG4gKiB0aGUgd2lkZ2V0IGlzIGluaXRpYWxpemVkIG9uSW5pdCgpIGlzIGNhbGxlZC4gVGhpcyBpcyB1c2VkIGJ5XG4gKiBNTS52b2ljZU5hdmlnYXRvci5zaG93TW9kYWwoKSB0byBhbGxvdyB1c2VycyB0byBjYWxsIHNob3dNb2RhbFxuICogd2l0aG91dCBoYXZpbmcgdG8ga25vdyBpZiB0aGUgd2lkZ2V0IGlzIGxvYWRlZCBvciBub3RcbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgaXNJbml0aWFsaXplZCA9IGZhbHNlO1xudmFyIG9uSW5pdCA9IGZ1bmN0aW9uICgpIHt9O1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIC8vIEFkZCB0aGUgI21pbmRtZWxkLW1vZGFsIGRpdiB0byB0aGUgcGFnZVxuICAgIHZhciBtbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1tLnNldEF0dHJpYnV0ZSgnaWQnLCAnbWluZG1lbGQtbW9kYWwnKTtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShtbSwgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzBdKTtcbiAgICAkbW0gPSBVVElMLmVsKG1tKTtcblxuICAgIC8vIEluaXRpYWxpemUgYW55IGVsZW1lbnQgd2l0aCAubW0tdm9pY2UtbmF2LWluaXQgb24gaXRcbiAgICB2YXIgJGluaXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW0tdm9pY2UtbmF2LWluaXQnKTtcbiAgICB2YXIgJHRleHRJbml0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21tLXZvaWNlLW5hdi10ZXh0LWluaXQnKTtcbiAgICB2YXIgY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gbG9vayBmb3IgdGV4dCB2YWx1ZSBpbiBtbS12b2ljZS1uYXYtdGV4dC1pbml0IGVsZW1lbnRcbiAgICAgICAgaWYgKCR0ZXh0SW5pdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gJHRleHRJbml0c1swXS52YWx1ZTtcbiAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbCh7IHF1ZXJ5OiBxdWVyeSB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgJGluaXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIFVUSUwuZWwoJGluaXRzW2ldKS5jbGljayhjbGlja0hhbmRsZXIpO1xuICAgIH1cblxuICAgIHZhciBrZXlQcmVzc0hhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKHsgcXVlcnk6IHF1ZXJ5IH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBmb3IodmFyIGogPSAwOyBqIDwgJHRleHRJbml0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBVVElMLmVsKCR0ZXh0SW5pdHNbal0pLmtleXByZXNzKGtleVByZXNzSGFuZGxlcik7XG4gICAgfVxuXG4gICAgc2V0SW5pdGlhbGl6ZWQoKTtcblxuICAgIC8vIFdhaXQgZm9yIG1lc3NhZ2VzXG4gICAgVVRJTC5lbCh3aW5kb3cpLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmRhdGEuc291cmNlICE9ICdtaW5kbWVsZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZihldmVudC5kYXRhLmFjdGlvbiA9PSAnY2xvc2UnKSB7XG4gICAgICAgICAgICAkbW0ucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0SW5pdGlhbGl6ZWQoKSB7XG4gICAgaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgb25Jbml0KCk7XG59XG5cbmZ1bmN0aW9uIHBvc3RNZXNzYWdlKGFjdGlvbiwgZGF0YSkge1xuICAgIHZhciB3aW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pbmRtZWxkLWlmcmFtZVwiKS5jb250ZW50V2luZG93O1xuICAgIHdpbi5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBzb3VyY2U6ICdtaW5kbWVsZCcsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICB9LCBcIipcIik7XG59XG5cbi8qKlxuICogT3BlbnMgdGhlIHZvaWNlIG5hdmlnYXRvciBtb2RhbCB3aW5kb3dcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5xdWVyeV0gICAgICAgICAgICAgICAgIGlmIHByb3ZpZGVkLCB0aGlzIGZpZWxkIHdpbGwgYmUgdGhlIGluaXRpYWwgcXVlcnksIGFuZCB3aWxsIGltbWVkaWF0ZWx5IHNob3cgcmVzdWx0c1xuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5mb3JjZU5ld0lGcmFtZT1mYWxzZV0gaWYgdHJ1ZSwgYW55IHZvaWNlIG5hdmlnYXRvcnMgdGhhdCBwcmV2aW91c2x5IGNyZWF0ZWQgd2lsbCBiZSBkZXN0cm95ZWQsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgYSBuZXcgaW5zdGFuY2Ugd2lsbCBiZSBjcmVhdGVkLlxuICovXG5NTS52b2ljZU5hdmlnYXRvci5zaG93TW9kYWwgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKGlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdmFyIGlmcmFtZTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB2b2ljZSBuYXZpZ2F0b3IgY29uZmlnXG4gICAgICAgIGlmICh0eXBlb2YgTU0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIE1NLndpZGdldHMgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIE1NLndpZGdldHMuY29uZmlnICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIE1vdmUgY29uZmlnIHRvIHZvaWNlIG5hdiBjb25maWdcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcgPSBNTS53aWRnZXRzLmNvbmZpZy52b2ljZSB8fCB7fTtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuYXBwSUQgPSBNTS53aWRnZXRzLmNvbmZpZy5hcHBJRDtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIE1NLndpZGdldHMuY29uZmlnLmNsZWFuVXJsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY2xlYW5VcmwgPSBNTS53aWRnZXRzLmNvbmZpZy5jbGVhblVybDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS53aWRnZXRzLmNvbmZpZy5mYXllQ2xpZW50VXJsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuZmF5ZUNsaWVudFVybCA9IE1NLndpZGdldHMuY29uZmlnLmZheWVDbGllbnRVcmw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS52b2ljZU5hdmlnYXRvci5jb25maWcgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gcGFyc2UgY2FyZCBsYXlvdXRcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jYXJkVGVtcGxhdGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jYXJkTGF5b3V0ID0gJ2N1c3RvbSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmNhcmRMYXlvdXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jYXJkTGF5b3V0ID0gJ2RlZmF1bHQnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIG1ha2UgYWJzb2x1dGUgVVJMc1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmN1c3RvbUNTU1VSTCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmN1c3RvbUNTU1VSTCA9IFVUSUwuY29udmVydFRvQWJzb2x1dGVQYXRoKE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jdXN0b21DU1NVUkwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgbGlzdGVuaW5nIG1vZGVcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubGlzdGVuaW5nTW9kZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmxpc3RlbmluZ01vZGUgPSBvcHRpb25zLmxpc3RlbmluZ01vZGU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmxpc3RlbmluZ01vZGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5saXN0ZW5pbmdNb2RlID0gJ25vcm1hbCc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUGFzcyB0b2tlbiwgdXNlciBJRCwgYW5kIHNlc3Npb24gSUQgaWYgdGhleSBhcmUgc2V0IGFscmVhZHlcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIE1NLnRva2VuICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgTU0uYWN0aXZlVXNlcklkICE9PSAndW5kZWZpbmVkJyAmJiBNTS5hY3RpdmVVc2VySWQgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIE1NLmFjdGl2ZVNlc3Npb25JZCAhPT0gJ3VuZGVmaW5lZCcgJiYgTU0uYWN0aXZlU2Vzc2lvbklkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5tbUNyZWRlbnRpYWxzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IE1NLnRva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklEOiBNTS5hY3RpdmVVc2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uSUQ6IE1NLmFjdGl2ZVNlc3Npb25JZFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiBkZWZpbmVkLCBwYXNzIGEgc3RhcnRpbmcgcXVlcnlcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5xdWVyeSAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucXVlcnkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5zdGFydFF1ZXJ5ID0gb3B0aW9ucy5xdWVyeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5zdGFydFF1ZXJ5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5mb3JjZU5ld0lGcmFtZSAmJiAkbW1faWZyYW1lKSB7XG4gICAgICAgICAgICBpZnJhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWluZG1lbGQtaWZyYW1lJyk7XG4gICAgICAgICAgICBpZnJhbWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGlmcmFtZSBpZiBmaXJzdCBsb2FkXG4gICAgICAgIGlmICghJG1tX2lmcmFtZSB8fCBvcHRpb25zLmZvcmNlTmV3SUZyYW1lKSB7XG4gICAgICAgICAgICBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2ZyYW1lQm9yZGVyJywgJzAnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21pbmRtZWxkLWlmcmFtZScpO1xuICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3d0cmFuc3BhcmVuY3knLCAndHJ1ZScpO1xuICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgTU0ubG9hZGVyLnJvb3RVUkwgKyAnd2lkZ2V0cy92b2ljZU5hdmlnYXRvci9tb2RhbC9tb2RhbC5odG1sJyk7XG5cbiAgICAgICAgICAgICRtbV9pZnJhbWUgPSBVVElMLmVsKGlmcmFtZSk7XG5cbiAgICAgICAgICAgIFVUSUwuZWwoaWZyYW1lKS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKCdjb25maWcnLCBNTS52b2ljZU5hdmlnYXRvci5jb25maWcpO1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKCdvcGVuJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJG1tLmVsKCkuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBvc3RNZXNzYWdlKCdvcGVuJywgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICAkbW0uYWRkQ2xhc3MoJ29uJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBTZXQgb25Jbml0KCkgY2FsbGJhY2sgdG8gb3BlbiBtb2RhbFxuICAgICAgICBvbkluaXQgPSBmdW5jdGlvbiAoKSB7IE1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbChvcHRpb25zKTsgfTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2xvc2VzIHRoZSB2b2ljZSBuYXZpZ2F0b3IgbW9kYWwgd2luZG93XG4gKi9cbk1NLnZvaWNlTmF2aWdhdG9yLmhpZGVNb2RhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBwb3N0TWVzc2FnZSgnY2xvc2UnKTtcbn07XG5cbi8vIHNjaGVkdWxlIGluaXRpYWxpemF0aW9uIG9mIHZvaWNlIG5hdmlnYXRvclxuVVRJTC5jb250ZW50TG9hZGVkKHdpbmRvdywgZnVuY3Rpb24oKSB7XG4gICAgaW5pdCgpO1xufSk7XG4iXX0=
