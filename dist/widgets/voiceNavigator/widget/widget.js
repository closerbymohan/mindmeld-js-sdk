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
 * @property {String} [listeningMode="normal"]     defines the listening mode of the voice navigator when it is opened. Acceptable
 *                                                 values include 'normal', 'continuous', and false. False prevents listening
 *                                                 and the default is 'normal'.
 * @property {Number} [numResults]                 if specified, this number of cards will appear as results
 * @property {CardField[]} [cardFields]            an array of card fields which will be appended to the card. With card fields,
 *                                                 you can render document fields that are specific to your application.
 *                                                 See {@link CardField} for more information
 * @property {String} [cardTemplate]               an [underscore](http://underscorejs.org/#template) (or lodash) html
 *                                                 template which is used to create a card representation of a document
 *                                                 object. The resulting html, is wrapped in an anchor element which links
 *                                                 to the document's url. The template is supplied with the document object
 *                                                 returned by the API. A card template can be used to render any document
 *                                                 fields that are specific to your application with custom logic.
 * @property {boolean} [resetCardsCSS]             if true, removes CSS specific to the cards container. This can be helpful
 *                                                 if the default cards CSS is conflicting with your own customCSS
 * @property {String} [customCSS]                  specifies custom CSS to be applied to the voice navigator. You can use
 *                                                 custom CSS to change the appearance of the voice navigator widget and
 *                                                 it's document cards, to better suit your branding. When using this parameter,
 *                                                 the styling will be included as embedded CSS, which takes precedence
 *                                                 over external CSS.
 * @property {String} [customCSSURL]               specifies the url of a file containing custom CSS to be applied to the
 *                                                 voice navigator. This parameter works the same as customCSS, except that
 *                                                 the styling will be applied as external CSS, by linking to the url provided.
 *                                                 This can be helpful if you would like to refer to images with relative paths.
 * @property {Number} [baseZIndex=100000]          the voice navigator elements will have a Z index between the value
 *                                                 given and 1000 greater than the value. If the voice navigator is hidden
 *                                                 underneath elements on a page, try setting it to something higher.
 *
 */

/**
 * An Object representing a field to display in a document card for the Voice Navigator widget. You can use card fields to
 * quickly include more information on your cards.
 *
 * @typedef {Object} CardField
 * @property {String} key           the key containing the value of this field in document objects. This field must be specified.
 * @property {String} [placeholder] if specified, when the key is not present in a document or is empty, this value will be displayed.
 *                                  if omitted the value will be hidden from the card
 * @property {String} [label]       if specified, a label with the provided text will precede the value
 * @property {String} [format]      for formatter to be used to present the value in a user friendly form. Valid formatters
 *                                  are default, and date. The date format converts unix timestamps into the 'MM/dd/YYYY'
 *                                  format.
 *
 * @example <caption> Basic example </caption>
 *
 // When author is John Doe -> 'Written By: John Doe'
 // When author is omitted the field is not displayed
 //
 var authorField = {
   key: 'author',
   label: 'Written By:',
 };
 *
 * @example <caption> Using the date format </caption>
 *
 // When pubdate is Oct. 10, 1996 -> 'Released 10/13/1996'
 // When pubdate is omitted -> 'Released Unknown'
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
 var MM = window.MM || {};
     ( function () {
         MM.loader = {
             rootURL: 'https://developer.expectlabs.com/public/sdks/'
         ,   widgets: ['voice']
         };
         MM.widgets = {
             config: {
                 appID: 'YOUR APPID'
             ,   voice: voiceNavigatorConfig  // this object contains your configuration options
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
 * @example <caption> Advanced example: card template, custom css, and other options </caption>
 *
 <script id="card-template" type="text/template">
     <h2 class="title"><%= title %></h2>
     <% if (typeof image !== 'undefined' && image.url && image.url !== '') { %>
         <p class="image not-loaded">
             <img src="<%= image.url %>">
         </p>
     <% } %>

     <%  var desc = "No description";
         if (typeof description === 'string') {
             desc = description.substr(0, 150) + (description.length > 150 ? "&hellip;" : "");
         } %>
     <p class="description"><%= desc %></p>

     <div class="mm-vn-row">
     <%  if (typeof rating !== 'undefined' && rating && rating !== '') { %>
         <p class="align-left rating">
             <span class="rating-stars stars69x13">
                 <%  var processedRating = Math.floor(rating * 2 + 0.5) / 2;
                     var ratingClass = 'r' + processedRating.toString().replace('.', '-');; %>
                 <span class="rating-stars-grad <%= ratingClass %>"></span>
                 <span class="rating-stars-img"></span>
             </span>
         </p>
     <%  } else { %>
         <p class="align-left rating placeholder">No rating</p>
     <%  }
         if (typeof reviewcount !== 'undefined' && reviewcount && reviewcount !== '') { %>
             <p class="align-right review-count">
             <%  var scales = ['', 'k', 'M'];
                 var scale = scales.shift();
                 var value = parseInt(reviewcount);
                 while (value > 1000 && scales.length > 0) {
                     scale = scales.shift(); // remove next scale
                     value = value / 1000;
                 } %>
             <%= Math.floor(value * 100) / 100 + scale %> reviews
             </p>
     <%  } else { %>
             <p class="align-right review-count placeholder">No reviews</p>
     <%  } %>
     <p class="clear-fix"></p>
     </div>
 </script>
 <script id="vn-card-css" type="text/css">
     #cards a.card .mm-vn-row p { margin: 2px 0; display: block; }
     #cards a.card .mm-vn-row p.clear-fix { clear: both; }
     #cards a.card .mm-vn-row p.align-left { float: left; text-align: left; }
     #cards a.card .mm-vn-row p.align-right { float: right; text-align: right; }
     #cards a.card .mm-vn-row p.placeholder { font-size: 10px; font-style: italic; color: #aaa; }
     #cards a.card .mm-vn-row .rating { display: inline-block; }
     #cards a.card .mm-vn-row .rating-stars { margin-top: 0; margin-left: 0; position: relative; }
     #cards a.card .mm-vn-row .rating-stars.stars69x13 { width: 69px; height: 13px; }
     #cards a.card .mm-vn-row .rating-stars-grad {
         background: #d77835;
         background: -moz-linear-gradient(top,#d77835 0,#f08727 40%,#f4a066 100%);
         background: -webkit-gradient(linear,left top,left bottom,color-stop(0%,#d77835),color-stop(40%,#f08727),color-stop(100%,#f4a066));
         background: -webkit-linear-gradient(top,#d77835 0,#f08727 40%,#f4a066 100%);
         filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#d77835',endColorstr='#f4a066',GradientType=0);
         position: absolute;
         top: 0;
         left: 0;
         height: 13px;
     }
     #cards a.card .mm-vn-row .rating-stars-grad.r5   { width: 69px; }
     #cards a.card .mm-vn-row .rating-stars-grad.r4-5 { width: 63px; }
     #cards a.card .mm-vn-row .rating-stars-grad.r4   { width: 55px; }
     #cards a.card .mm-vn-row .rating-stars-grad.r3-5 { width: 49px; }
     #cards a.card .mm-vn-row .rating-stars-grad.r3   { width: 41px; }
     #cards a.card .mm-vn-row .rating-stars-grad.r2-5 { width: 35px; }
     #cards a.card .mm-vn-row .rating-stars-grad.r2   { width: 27px; }
     #cards a.card .mm-vn-row .rating-stars-grad.r1-5 { width: 21px; }
     #cards a.card .mm-vn-row .rating-stars-grad.r1   { width: 14px; }
     #cards a.card .mm-vn-row .rating-stars-grad.r0-5 { width:  7px; }
     #cards a.card .mm-vn-row .rating-stars-grad.r0   { width:  0px; }
     #cards a.card .mm-vn-row .stars69x13 .rating-stars-img {
        width: 69px;
        background: url(/public/images/stars.png) no-repeat center center;
        height: 13px;
        position: absolute;
        top: 0;
        left: 0;
     }
 </script>
 <script type="text/js">
     var MM = window.MM || {};
     ( function () {
         MM.loader = {
             rootURL: 'https://developer.expectlabs.com/public/sdks/'
         ,   widgets: ['voice']
         };
         MM.widgets = {
             config: {
                 appID: 'YOUR APPID'
             ,   voice: {
                     cardTemplate: window['vn-card-template'].innerHTML
                 ,   customCSS: window['vn-custom-css'].innerHTML
                 ,   listeningMode: 'continuous' // extended listening when opened
                 ,   cardLinkBehavior: '_blank' // links open in new tabs
                 ,   numResults: 20 // show more cards
                 }
             }
         };
         var script = document.createElement('script');
         script.type = 'text/javascript'; script.async = true;
         script.src = MM.loader.rootURL + 'embed.js';
         var t = document.getElementsByTagName('script')[0];
         t.parentNode.insertBefore(script, t);
     }());
 </script>

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
 * @param {boolean} [options.forceNewIFrame=false] if true, any voice navigators that have previously been created will
 *                                                 be destroyed, and a new instance will be created.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvc3dhcmFqL3JlcG9zL21pbmRtZWxkLWpzLXNkay9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3N3YXJhai9yZXBvcy9taW5kbWVsZC1qcy1zZGsvc3JjL3dpZGdldHMvdm9pY2VOYXZpZ2F0b3IvanMvdXRpbC5qcyIsIi9Vc2Vycy9zd2FyYWovcmVwb3MvbWluZG1lbGQtanMtc2RrL3NyYy93aWRnZXRzL3ZvaWNlTmF2aWdhdG9yL2pzL3ZlbmRvci9jb250ZW50bG9hZGVkLmpzIiwiL1VzZXJzL3N3YXJhai9yZXBvcy9taW5kbWVsZC1qcy1zZGsvc3JjL3dpZGdldHMvdm9pY2VOYXZpZ2F0b3IvanMvd2lkZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuL3ZlbmRvci9jb250ZW50bG9hZGVkJyk7XG5cbi8qIEEgd3JhcHBlciBmb3IgZG9tIGVsZW1lbnRzLCBiYXNpY2FsbHkgYSBsaXRlIHZlcnNpb24gb2YgalF1ZXJ5J3MgJCAqL1xuZXhwb3J0cy5lbCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb246IGZ1bmN0aW9uKGV2ZW50LCBmdW5jKSB7XG4gICAgICAgICAgICBpZihlbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCxmdW5jLGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihlbC5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgICAgIGVsLmF0dGFjaEV2ZW50KFwib25cIitldmVudCxmdW5jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjbGljazogZnVuY3Rpb24oZnVuYykge1xuICAgICAgICAgICAgdGhpcy5vbignY2xpY2snLCBmdW5jKTtcbiAgICAgICAgfSxcblxuICAgICAgICBrZXlwcmVzczogZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMub24oJ2tleXByZXNzJywgZnVuYyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgbmV3IFJlZ0V4cCgnKF58XFxcXHMrKScgKyBjbGFzc05hbWUgKyAnKFxcXFxzK3wkKScsICdnJyksXG4gICAgICAgICAgICAgICAgJyQxJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICBhZGRDbGFzczogZnVuY3Rpb24oY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUgKyBcIiBcIiArIGNsYXNzTmFtZTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydHMuY29udmVydFRvQWJzb2x1dGVQYXRoID0gZnVuY3Rpb24oaHJlZikge1xuICAgIHZhciBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYW5jaG9yLmhyZWYgPSBocmVmO1xuICAgIHJldHVybiAoYW5jaG9yLnByb3RvY29sICsgJy8vJyArIGFuY2hvci5ob3N0ICsgYW5jaG9yLnBhdGhuYW1lICsgYW5jaG9yLnNlYXJjaCArIGFuY2hvci5oYXNoKTtcbn07XG5cbmZ1bmN0aW9uIGFkZExlYWRpbmdaZXJvcyhudW1iZXIsIGRpZ2l0cykge1xuICAgIHZhciBiYXNlID0gTWF0aC5wb3coMTAsIGRpZ2l0cyk7XG4gICAgbnVtYmVyICs9IGJhc2U7XG4gICAgbnVtYmVyID0gbnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgcmV0dXJuIG51bWJlci5zdWJzdHJpbmcobnVtYmVyLmxlbmd0aCAtIGRpZ2l0cyk7XG59XG5cbmV4cG9ydHMudGltZXN0YW1wID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICBkYXRlID0gZGF0ZSB8fCBuZXcgRGF0ZSgpO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRGdWxsWWVhcigpLCA0KSArICcuJ1xuICAgICAgICArIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldE1vbnRoKCkgKyAxLCAyKSArICcuJ1xuICAgICAgICArIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldERhdGUoKSwgMikgKyAnICcgKyBkYXRlLnRvVGltZVN0cmluZygpO1xufTtcblxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgYXJncy5zcGxpY2UoMCwgMCwgZXhwb3J0cy50aW1lc3RhbXAoKSk7XG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XG59O1xuXG5leHBvcnRzLmNvbnRlbnRMb2FkZWQgPSBjb250ZW50TG9hZGVkOyIsIi8qIVxuICogY29udGVudGxvYWRlZC5qc1xuICpcbiAqIEF1dGhvcjogRGllZ28gUGVyaW5pIChkaWVnby5wZXJpbmkgYXQgZ21haWwuY29tKVxuICogU3VtbWFyeTogY3Jvc3MtYnJvd3NlciB3cmFwcGVyIGZvciBET01Db250ZW50TG9hZGVkXG4gKiBVcGRhdGVkOiAyMDEwMTAyMFxuICogTGljZW5zZTogTUlUXG4gKiBWZXJzaW9uOiAxLjJcbiAqXG4gKiBVUkw6XG4gKiBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vQ29udGVudExvYWRlZC9cbiAqIGh0dHA6Ly9qYXZhc2NyaXB0Lm53Ym94LmNvbS9Db250ZW50TG9hZGVkL01JVC1MSUNFTlNFXG4gKlxuICovXG5cbi8vIEB3aW4gd2luZG93IHJlZmVyZW5jZVxuLy8gQGZuIGZ1bmN0aW9uIHJlZmVyZW5jZVxud2luZG93LmNvbnRlbnRMb2FkZWQgPSBmdW5jdGlvbiBjb250ZW50TG9hZGVkKHdpbiwgZm4pIHtcblxuXHR2YXIgZG9uZSA9IGZhbHNlLCB0b3AgPSB0cnVlLFxuXG5cdGRvYyA9IHdpbi5kb2N1bWVudCwgcm9vdCA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG5cblx0YWRkID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAnYXR0YWNoRXZlbnQnLFxuXHRyZW0gPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdkZXRhY2hFdmVudCcsXG5cdHByZSA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJycgOiAnb24nLFxuXG5cdGluaXQgPSBmdW5jdGlvbihlKSB7XG5cdFx0aWYgKGUudHlwZSA9PSAncmVhZHlzdGF0ZWNoYW5nZScgJiYgZG9jLnJlYWR5U3RhdGUgIT0gJ2NvbXBsZXRlJykgcmV0dXJuO1xuXHRcdChlLnR5cGUgPT0gJ2xvYWQnID8gd2luIDogZG9jKVtyZW1dKHByZSArIGUudHlwZSwgaW5pdCwgZmFsc2UpO1xuXHRcdGlmICghZG9uZSAmJiAoZG9uZSA9IHRydWUpKSBmbi5jYWxsKHdpbiwgZS50eXBlIHx8IGUpO1xuXHR9LFxuXG5cdHBvbGwgPSBmdW5jdGlvbigpIHtcblx0XHR0cnkgeyByb290LmRvU2Nyb2xsKCdsZWZ0Jyk7IH0gY2F0Y2goZSkgeyBzZXRUaW1lb3V0KHBvbGwsIDUwKTsgcmV0dXJuOyB9XG5cdFx0aW5pdCgncG9sbCcpO1xuXHR9O1xuXG5cdGlmIChkb2MucmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnKSBmbi5jYWxsKHdpbiwgJ2xhenknKTtcblx0ZWxzZSB7XG5cdFx0aWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCAmJiByb290LmRvU2Nyb2xsKSB7XG5cdFx0XHR0cnkgeyB0b3AgPSAhd2luLmZyYW1lRWxlbWVudDsgfSBjYXRjaChlKSB7IH1cblx0XHRcdGlmICh0b3ApIHBvbGwoKTtcblx0XHR9XG5cdFx0ZG9jW2FkZF0ocHJlICsgJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0LCBmYWxzZSk7XG5cdFx0ZG9jW2FkZF0ocHJlICsgJ3JlYWR5c3RhdGVjaGFuZ2UnLCBpbml0LCBmYWxzZSk7XG5cdFx0d2luW2FkZF0ocHJlICsgJ2xvYWQnLCBpbml0LCBmYWxzZSk7XG5cdH1cblxufVxuIiwidmFyIFVUSUwgPSAgcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgTU0gPSB3aW5kb3cuTU0gPSB3aW5kb3cuTU0gfHwge307XG5cblxuLyoqXG4gKiBBbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBjb25maWd1cmF0aW9uIG9mIHtAbGluayBNTS52b2ljZU5hdmlnYXRvcn1cbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBWb2ljZU5hdmlnYXRvckNvbmZpZ1xuICogQHByb3BlcnR5IHtTdHJpbmd9IFtjYXJkTGlua0JlaGF2aW9yPVwiX3BhcmVudFwiXSBzZXRzIHRoZSBiZWhhdmlvciBmb3IgYW5jaG9ycyB3cmFwcGluZyBjYXJkcy4gVXNlICdmYWxzZScgdG9cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZlbnQgb3BlbmluZyBsaW5rcywgJ19wYXJlbnQnIHRvIG9wZW4gbGlua3MgaW4gdGhlIHNhbWUgdGFiIG9yIHdpbmRvdyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yICdfYmxhbmsnIHRvIG9wZW4gbGlua3MgaW4gYSBuZXcgdGFiIG9yIHdpbmRvdy4gU2VlIHRoZSB0YXJnZXQgYXR0cmlidXRlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZiBbYW5jaG9yXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvYSlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtsaXN0ZW5pbmdNb2RlPVwibm9ybWFsXCJdICAgICBkZWZpbmVzIHRoZSBsaXN0ZW5pbmcgbW9kZSBvZiB0aGUgdm9pY2UgbmF2aWdhdG9yIHdoZW4gaXQgaXMgb3BlbmVkLiBBY2NlcHRhYmxlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgaW5jbHVkZSAnbm9ybWFsJywgJ2NvbnRpbnVvdXMnLCBhbmQgZmFsc2UuIEZhbHNlIHByZXZlbnRzIGxpc3RlbmluZ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBkZWZhdWx0IGlzICdub3JtYWwnLlxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFtudW1SZXN1bHRzXSAgICAgICAgICAgICAgICAgaWYgc3BlY2lmaWVkLCB0aGlzIG51bWJlciBvZiBjYXJkcyB3aWxsIGFwcGVhciBhcyByZXN1bHRzXG4gKiBAcHJvcGVydHkge0NhcmRGaWVsZFtdfSBbY2FyZEZpZWxkc10gICAgICAgICAgICBhbiBhcnJheSBvZiBjYXJkIGZpZWxkcyB3aGljaCB3aWxsIGJlIGFwcGVuZGVkIHRvIHRoZSBjYXJkLiBXaXRoIGNhcmQgZmllbGRzLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeW91IGNhbiByZW5kZXIgZG9jdW1lbnQgZmllbGRzIHRoYXQgYXJlIHNwZWNpZmljIHRvIHlvdXIgYXBwbGljYXRpb24uXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWUge0BsaW5rIENhcmRGaWVsZH0gZm9yIG1vcmUgaW5mb3JtYXRpb25cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbY2FyZFRlbXBsYXRlXSAgICAgICAgICAgICAgIGFuIFt1bmRlcnNjb3JlXShodHRwOi8vdW5kZXJzY29yZWpzLm9yZy8jdGVtcGxhdGUpIChvciBsb2Rhc2gpIGh0bWxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlIHdoaWNoIGlzIHVzZWQgdG8gY3JlYXRlIGEgY2FyZCByZXByZXNlbnRhdGlvbiBvZiBhIGRvY3VtZW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QuIFRoZSByZXN1bHRpbmcgaHRtbCwgaXMgd3JhcHBlZCBpbiBhbiBhbmNob3IgZWxlbWVudCB3aGljaCBsaW5rc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIGRvY3VtZW50J3MgdXJsLiBUaGUgdGVtcGxhdGUgaXMgc3VwcGxpZWQgd2l0aCB0aGUgZG9jdW1lbnQgb2JqZWN0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5lZCBieSB0aGUgQVBJLiBBIGNhcmQgdGVtcGxhdGUgY2FuIGJlIHVzZWQgdG8gcmVuZGVyIGFueSBkb2N1bWVudFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzIHRoYXQgYXJlIHNwZWNpZmljIHRvIHlvdXIgYXBwbGljYXRpb24gd2l0aCBjdXN0b20gbG9naWMuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtyZXNldENhcmRzQ1NTXSAgICAgICAgICAgICBpZiB0cnVlLCByZW1vdmVzIENTUyBzcGVjaWZpYyB0byB0aGUgY2FyZHMgY29udGFpbmVyLiBUaGlzIGNhbiBiZSBoZWxwZnVsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiB0aGUgZGVmYXVsdCBjYXJkcyBDU1MgaXMgY29uZmxpY3Rpbmcgd2l0aCB5b3VyIG93biBjdXN0b21DU1NcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbY3VzdG9tQ1NTXSAgICAgICAgICAgICAgICAgIHNwZWNpZmllcyBjdXN0b20gQ1NTIHRvIGJlIGFwcGxpZWQgdG8gdGhlIHZvaWNlIG5hdmlnYXRvci4gWW91IGNhbiB1c2VcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbSBDU1MgdG8gY2hhbmdlIHRoZSBhcHBlYXJhbmNlIG9mIHRoZSB2b2ljZSBuYXZpZ2F0b3Igd2lkZ2V0IGFuZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXQncyBkb2N1bWVudCBjYXJkcywgdG8gYmV0dGVyIHN1aXQgeW91ciBicmFuZGluZy4gV2hlbiB1c2luZyB0aGlzIHBhcmFtZXRlcixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBzdHlsaW5nIHdpbGwgYmUgaW5jbHVkZWQgYXMgZW1iZWRkZWQgQ1NTLCB3aGljaCB0YWtlcyBwcmVjZWRlbmNlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyIGV4dGVybmFsIENTUy5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbY3VzdG9tQ1NTVVJMXSAgICAgICAgICAgICAgIHNwZWNpZmllcyB0aGUgdXJsIG9mIGEgZmlsZSBjb250YWluaW5nIGN1c3RvbSBDU1MgdG8gYmUgYXBwbGllZCB0byB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvaWNlIG5hdmlnYXRvci4gVGhpcyBwYXJhbWV0ZXIgd29ya3MgdGhlIHNhbWUgYXMgY3VzdG9tQ1NTLCBleGNlcHQgdGhhdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHN0eWxpbmcgd2lsbCBiZSBhcHBsaWVkIGFzIGV4dGVybmFsIENTUywgYnkgbGlua2luZyB0byB0aGUgdXJsIHByb3ZpZGVkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhpcyBjYW4gYmUgaGVscGZ1bCBpZiB5b3Ugd291bGQgbGlrZSB0byByZWZlciB0byBpbWFnZXMgd2l0aCByZWxhdGl2ZSBwYXRocy5cbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBbYmFzZVpJbmRleD0xMDAwMDBdICAgICAgICAgIHRoZSB2b2ljZSBuYXZpZ2F0b3IgZWxlbWVudHMgd2lsbCBoYXZlIGEgWiBpbmRleCBiZXR3ZWVuIHRoZSB2YWx1ZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2l2ZW4gYW5kIDEwMDAgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZS4gSWYgdGhlIHZvaWNlIG5hdmlnYXRvciBpcyBoaWRkZW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVybmVhdGggZWxlbWVudHMgb24gYSBwYWdlLCB0cnkgc2V0dGluZyBpdCB0byBzb21ldGhpbmcgaGlnaGVyLlxuICpcbiAqL1xuXG4vKipcbiAqIEFuIE9iamVjdCByZXByZXNlbnRpbmcgYSBmaWVsZCB0byBkaXNwbGF5IGluIGEgZG9jdW1lbnQgY2FyZCBmb3IgdGhlIFZvaWNlIE5hdmlnYXRvciB3aWRnZXQuIFlvdSBjYW4gdXNlIGNhcmQgZmllbGRzIHRvXG4gKiBxdWlja2x5IGluY2x1ZGUgbW9yZSBpbmZvcm1hdGlvbiBvbiB5b3VyIGNhcmRzLlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENhcmRGaWVsZFxuICogQHByb3BlcnR5IHtTdHJpbmd9IGtleSAgICAgICAgICAgdGhlIGtleSBjb250YWluaW5nIHRoZSB2YWx1ZSBvZiB0aGlzIGZpZWxkIGluIGRvY3VtZW50IG9iamVjdHMuIFRoaXMgZmllbGQgbXVzdCBiZSBzcGVjaWZpZWQuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW3BsYWNlaG9sZGVyXSBpZiBzcGVjaWZpZWQsIHdoZW4gdGhlIGtleSBpcyBub3QgcHJlc2VudCBpbiBhIGRvY3VtZW50IG9yIGlzIGVtcHR5LCB0aGlzIHZhbHVlIHdpbGwgYmUgZGlzcGxheWVkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgb21pdHRlZCB0aGUgdmFsdWUgd2lsbCBiZSBoaWRkZW4gZnJvbSB0aGUgY2FyZFxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtsYWJlbF0gICAgICAgaWYgc3BlY2lmaWVkLCBhIGxhYmVsIHdpdGggdGhlIHByb3ZpZGVkIHRleHQgd2lsbCBwcmVjZWRlIHRoZSB2YWx1ZVxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtmb3JtYXRdICAgICAgZm9yIGZvcm1hdHRlciB0byBiZSB1c2VkIHRvIHByZXNlbnQgdGhlIHZhbHVlIGluIGEgdXNlciBmcmllbmRseSBmb3JtLiBWYWxpZCBmb3JtYXR0ZXJzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmUgZGVmYXVsdCwgYW5kIGRhdGUuIFRoZSBkYXRlIGZvcm1hdCBjb252ZXJ0cyB1bml4IHRpbWVzdGFtcHMgaW50byB0aGUgJ01NL2RkL1lZWVknXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+IEJhc2ljIGV4YW1wbGUgPC9jYXB0aW9uPlxuICpcbiAvLyBXaGVuIGF1dGhvciBpcyBKb2huIERvZSAtPiAnV3JpdHRlbiBCeTogSm9obiBEb2UnXG4gLy8gV2hlbiBhdXRob3IgaXMgb21pdHRlZCB0aGUgZmllbGQgaXMgbm90IGRpc3BsYXllZFxuIC8vXG4gdmFyIGF1dGhvckZpZWxkID0ge1xuICAga2V5OiAnYXV0aG9yJyxcbiAgIGxhYmVsOiAnV3JpdHRlbiBCeTonLFxuIH07XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+IFVzaW5nIHRoZSBkYXRlIGZvcm1hdCA8L2NhcHRpb24+XG4gKlxuIC8vIFdoZW4gcHViZGF0ZSBpcyBPY3QuIDEwLCAxOTk2IC0+ICdSZWxlYXNlZCAxMC8xMy8xOTk2J1xuIC8vIFdoZW4gcHViZGF0ZSBpcyBvbWl0dGVkIC0+ICdSZWxlYXNlZCBVbmtub3duJ1xuIC8vXG4gdmFyIGRhdGVGaWVsZCA9IHtcbiAgIGtleTogJ3B1YmRhdGUnLFxuICAgcGxhY2Vob2xkZXI6ICdVbmtub3duJyxcbiAgIGxhYmVsOiAnUmVsZWFzZWQnLFxuICAgZm9ybWF0OiAnZGF0ZSdcbiB9O1xuICpcbiAqL1xuXG4vKipcbiAqIFRoZSB2b2ljZSBuYXZpZ2F0b3IgaXMgYSB3aWRnZXQgdGhhdCBhbGxvd3MgZGV2ZWxvcGVycyB0byBhZGQgdm9pY2UtZHJpdmVuIHNlYXJjaCB0byB0aGVpciB3ZWIgYXBwbGljYXRpb25zLlxuICogQnkgYWRkaW5nIGEgc21hbGwgc25pcHBldCBvZiBKYXZhU2NyaXB0IHRvIHlvdXIgcGFnZSwgeW91IGNhbiBhZGQgb3VyIHZvaWNlIG5hdmlnYXRvciB0byB5b3VyIHBhZ2UgYWxsb3dpbmcgeW91clxuICogdXNlcnMgdG8gc2VhcmNoIGFuZCBkaXNjb3ZlciB5b3VyIGNvbnRlbnQgaW4gbmF0dXJhbCwgc3Bva2VuIGxhbmd1YWdlLiBUaGUgdm9pY2UgbmF2aWdhdG9yIHdpZGdldCB0YWtlcyBjYXJlIG9mXG4gKiBjYXB0dXJpbmcgc3BlZWNoIGlucHV0IGZyb20geW91ciB1c2VycywgZGlzcGxheWluZyBhIHJlYWwtdGltZSB0cmFuc2NyaXB0IG9mIHdoYXQgaXMgYmVpbmcgcmVjb3JkZWQsIGFuZCBkaXNwbGF5aW5nXG4gKiBhIGNvbGxlY3Rpb24gb2YgcmVzdWx0cyBpbiB0aGUgYnJvd3Nlci5cbiAqXG4gKiBUaGUgdm9pY2UgbmF2aWdhdG9yIHdpbGwgZGlzcGxheSB3aGVuIGVsZW1lbnRzIHdpdGggdGhlICdtbS12b2ljZS1uYXYtaW5pdCcgY2xhc3MgYXJlIGNsaWNrZWQgYW5kIHdoZW4gZWxlbWVudHMgd2l0aFxuICogdGhlICdtbS12b2ljZS1uYXYtdGV4dC1pbml0JyByZWNlaXZlIGFuIGVudGVyIGtleXByZXNzLlxuICpcbiAqIEBzZWUge0BsaW5rIFZvaWNlTmF2aWdhdG9yQ29uZmlnfSBmb3IgZnVsbCBkb2N1bWVudGF0aW9uIG9mIGNvbmZpZ3VyYXRpb24gb3B0aW9ucy5cbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmV4cGVjdGxhYnMuY29tL2RvY3Mvdm9pY2VXaWRnZXR8TWluZE1lbGQgVm9pY2UgTmF2aWdhdG9yfSB0byBnZXQgc3RhcnRlZCB3aXRoIFZvaWNlIE5hdmlnYXRvci5cbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmV4cGVjdGxhYnMuY29tL2RlbW9zfE1pbmRNZWxkIERlbW9zfSB0byBzZWUgdGhlIFZvaWNlIE5hdmlnYXRvciBpbiBhY3Rpb24uXG4gKlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPiBMb2FkaW5nIHRoZSB2b2ljZSBuYXZpZ2F0b3IgPC9jYXB0aW9uPlxuICpcbiA8c2NyaXB0IHR5cGU9XCJ0ZXh0L2pzXCI+XG4gdmFyIE1NID0gd2luZG93Lk1NIHx8IHt9O1xuICAgICAoIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgIE1NLmxvYWRlciA9IHtcbiAgICAgICAgICAgICByb290VVJMOiAnaHR0cHM6Ly9kZXZlbG9wZXIuZXhwZWN0bGFicy5jb20vcHVibGljL3Nka3MvJ1xuICAgICAgICAgLCAgIHdpZGdldHM6IFsndm9pY2UnXVxuICAgICAgICAgfTtcbiAgICAgICAgIE1NLndpZGdldHMgPSB7XG4gICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgIGFwcElEOiAnWU9VUiBBUFBJRCdcbiAgICAgICAgICAgICAsICAgdm9pY2U6IHZvaWNlTmF2aWdhdG9yQ29uZmlnICAvLyB0aGlzIG9iamVjdCBjb250YWlucyB5b3VyIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgICAgICAgICAgIH1cbiAgICAgICAgIH07XG4gICAgICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnOyBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgICAgc2NyaXB0LnNyYyA9IE1NLmxvYWRlci5yb290VVJMICsgJ2VtYmVkLmpzJztcbiAgICAgICAgIHZhciB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgICAgICAgdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzY3JpcHQsIHQpO1xuICAgICB9KCkpO1xuIDwvc2NyaXB0PlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPiBDYXJkIFRlbXBsYXRlIDwvY2FwdGlvbj5cbiAqXG4gPHNjcmlwdCBpZD1cInZuLWNhcmQtdGVtcGxhdGVcIiB0eXBlPVwidGV4dC90ZW1wbGF0ZVwiPlxuICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPjwlPSB0aXRsZSAlPjwvaDI+XG4gICAgIDwlIGlmICh0eXBlb2YgaW1hZ2UgIT09ICd1bmRlZmluZWQnICYmIGltYWdlLnVybCAmJiBpbWFnZS51cmwgIT09ICcnKSB7ICU+XG4gICAgICAgICA8cCBjbGFzcz1cImltYWdlIG5vdC1sb2FkZWRcIj5cbiAgICAgICAgICAgICA8aW1nIHNyYz1cIjwlPSBpbWFnZS51cmwgJT5cIj5cbiAgICAgICAgIDwvcD5cbiAgICAgICAgIDwlIH0gJT5cblxuICAgICA8JSB2YXIgZGVzYyA9IFwiTm8gZGVzY3JpcHRpb25cIjtcbiAgICAgaWYgKHR5cGVvZiBkZXNjcmlwdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgIGRlc2MgPSBkZXNjcmlwdGlvbi5zdWJzdHIoMCwgMTUwKSArIChkZXNjcmlwdGlvbi5sZW5ndGggPiAxNTAgPyBcIiZoZWxsaXA7XCIgOiBcIlwiKTtcbiAgICAgfSAlPlxuICAgICA8cCBjbGFzcz1cImRlc2NyaXB0aW9uXCI+PCU9IGRlc2MgJT48L3A+XG5cbiAgICAgPCUgaWYgKHR5cGVvZiBwdWJkYXRlICE9PSAndW5kZWZpbmVkJyAmJiBwdWJkYXRlICYmIHB1YmRhdGUgIT09ICcnKSB7ICU+XG4gICAgICAgICA8cCBjbGFzcz1cInB1Yi1kYXRlXCI+XG4gICAgICAgICAgICAgPCUgdmFyIGRhdGUgPSBuZXcgRGF0ZShwdWJkYXRlICogMTAwMCk7XG4gICAgICAgICAgICAgdmFyIG1vbnRocyA9IFsgJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJyBdO1xuICAgICAgICAgICAgIHZhciBtb250aE5hbWUgPSBtb250aHNbZGF0ZS5nZXRNb250aCgpXTtcbiAgICAgICAgICAgICB2YXIgZGF0ZVN0cmluZyA9IG1vbnRoTmFtZSArICcgJyArIGRhdGUuZ2V0RGF0ZSgpICsgJywgJyArIGRhdGUuZ2V0RnVsbFllYXIoKTsgJT5cbiAgICAgICAgICAgICA8JT0gZGF0ZVN0cmluZyAlPlxuICAgICAgICAgPC9wPlxuICAgICA8JSB9ICU+XG4gPC9zY3JpcHQ+XG4gPHNjcmlwdCB0eXBlPVwidGV4dC9qc1wiPlxuICAgICB2YXIgdm9pY2VOYXZpZ2F0b3JDb25maWcgPSB7XG4gICAgICAgICBjYXJkVGVtcGxhdGU6IHdpbmRvd1sndm4tY2FyZC10ZW1wbGF0ZSddLmlubmVySFRNTFxuICAgICB9O1xuICAgICAvLyBOb3cgbG9hZCB0aGUgdm9pY2UgbmF2aWdhdG9yXG4gPC9zY3JpcHQ+XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+IEN1c3RvbSBDU1M6IENoYW5naW5nIGJ1dHRvbiBjb2xvcnMgZnJvbSB0aGUgZGVmYXVsdCBvcmFuZ2UgdG8gZ3JlZW4gPC9jYXB0aW9uPlxuICpcbiA8c2NyaXB0IGlkPVwidm4tY3VzdG9tLWNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAubW0tYnV0dG9uLWJhY2tncm91bmQge1xuICAgICAgICAgYmFja2dyb3VuZDogIzAwODAwMDtcbiAgICAgfVxuICAgICAubW0tYnV0dG9uLWJhY2tncm91bmQ6aG92ZXIge1xuICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwNzMwMDtcbiAgICAgfVxuICAgICAubW0tYnV0dG9uLWJhY2tncm91bmQ6YWN0aXZlIHtcbiAgICAgICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KCMwMDVhMDAsICMwMDgwMDApO1xuICAgICAgICAgYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQoIzAwNWEwMCwgIzAwODAwMCk7XG4gICAgICAgICBiYWNrZ3JvdW5kOiAtby1saW5lYXItZ3JhZGllbnQoIzAwNWEwMCwgIzAwODAwMCk7XG4gICAgICAgICBiYWNrZ3JvdW5kOiAtbXMtbGluZWFyLWdyYWRpZW50KCMwMDVhMDAsICMwMDgwMDApO1xuICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCMwMDVhMDAsICMwMDgwMDApO1xuICAgICB9XG4gICAgIC5tbS1idXR0b24tYm9yZGVyIHtcbiAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDY2MDA7XG4gICAgIH1cblxuICAgICAmIzY0Oy1tb3ota2V5ZnJhbWVzIG1tLWJ1dHRvbi1iYWNrZ3JvdW5kLWFjdGl2ZS1hbmltIHtcbiAgICAgICAgIDUwJSB7IGJhY2tncm91bmQtY29sb3I6ICMwMDZkMDA7IH1cbiAgICAgfVxuICAgICAmIzY0Oy13ZWJraXQta2V5ZnJhbWVzIG1tLWJ1dHRvbi1iYWNrZ3JvdW5kLWFjdGl2ZS1hbmltIHtcbiAgICAgICAgIDUwJSB7IGJhY2tncm91bmQtY29sb3I6ICMwMDZkMDA7IH1cbiAgICAgfVxuICAgICAmIzY0Oy1vLWtleWZyYW1lcyBtbS1idXR0b24tYmFja2dyb3VuZC1hY3RpdmUtYW5pbSB7XG4gICAgICAgICA1MCUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2ZDAwOyB9XG4gICAgIH1cbiAgICAgJiM2NDtrZXlmcmFtZXMgbW0tYnV0dG9uLWJhY2tncm91bmQtYWN0aXZlLWFuaW0ge1xuICAgICAgICAgNTAlIHsgYmFja2dyb3VuZC1jb2xvcjogIzAwNmQwMDsgfVxuICAgICB9XG4gPC9zY3JpcHQ+XG4gPHNjcmlwdCB0eXBlPVwidGV4dC9qc1wiPlxuICAgICB2YXIgdm9pY2VOYXZpZ2F0b3JDb25maWcgPSB7XG4gICAgICAgICBjdXN0b21DU1M6IHdpbmRvd1sndm4tY3VzdG9tLWNzcyddLmlubmVySFRNTFxuICAgICB9O1xuICAgICAvLyBOb3cgbG9hZCB0aGUgdm9pY2UgbmF2aWdhdG9yXG4gPC9zY3JpcHQ+XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+IEN1c3RvbSBDU1M6IENoYW5nZSBjYXJkcyBhcmVhIGFwcGVhcmFuY2UgPC9jYXB0aW9uPlxuIDxzY3JpcHQgaWQ9XCJ2bi1jdXN0b20tY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICNjYXJkcyB7XG4gICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZ29sZGVucm9kO1xuICAgICB9XG4gICAgICNjYXJkcyAuY2FyZCB7XG4gICAgICAgICBib3JkZXI6IHNvbGlkICMzMzMgMXB4O1xuICAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgICAgIGJhY2tncm91bmQ6IHJlZDtcbiAgICAgfVxuICAgICAjY2FyZHMgLmNhcmQ6aG92ZXIge1xuICAgICAgICAgYm9yZGVyLWNvbG9yOiBibGFjaztcbiAgICAgfVxuICAgICAjY2FyZHMgLmNhcmQgcCB7XG4gICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgIH1cbiAgICAgI2NhcmRzIC5jYXJkIGgyLnRpdGxlIHtcbiAgICAgICAgIGNvbG9yOiAjZGRkO1xuICAgICB9XG4gPC9zY3JpcHQ+XG4gPHNjcmlwdCB0eXBlPVwidGV4dC9qc1wiPlxuICAgICB2YXIgdm9pY2VOYXZpZ2F0b3JDb25maWcgPSB7XG4gICAgICAgICBjdXN0b21DU1M6IHdpbmRvd1sndm4tY3VzdG9tLWNzcyddLmlubmVySFRNTFxuICAgICB9O1xuICAgICAvLyBOb3cgbG9hZCB0aGUgdm9pY2UgbmF2aWdhdG9yXG4gPC9zY3JpcHQ+XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+IEFkdmFuY2VkIGV4YW1wbGU6IGNhcmQgdGVtcGxhdGUsIGN1c3RvbSBjc3MsIGFuZCBvdGhlciBvcHRpb25zIDwvY2FwdGlvbj5cbiAqXG4gPHNjcmlwdCBpZD1cImNhcmQtdGVtcGxhdGVcIiB0eXBlPVwidGV4dC90ZW1wbGF0ZVwiPlxuICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPjwlPSB0aXRsZSAlPjwvaDI+XG4gICAgIDwlIGlmICh0eXBlb2YgaW1hZ2UgIT09ICd1bmRlZmluZWQnICYmIGltYWdlLnVybCAmJiBpbWFnZS51cmwgIT09ICcnKSB7ICU+XG4gICAgICAgICA8cCBjbGFzcz1cImltYWdlIG5vdC1sb2FkZWRcIj5cbiAgICAgICAgICAgICA8aW1nIHNyYz1cIjwlPSBpbWFnZS51cmwgJT5cIj5cbiAgICAgICAgIDwvcD5cbiAgICAgPCUgfSAlPlxuXG4gICAgIDwlICB2YXIgZGVzYyA9IFwiTm8gZGVzY3JpcHRpb25cIjtcbiAgICAgICAgIGlmICh0eXBlb2YgZGVzY3JpcHRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgZGVzYyA9IGRlc2NyaXB0aW9uLnN1YnN0cigwLCAxNTApICsgKGRlc2NyaXB0aW9uLmxlbmd0aCA+IDE1MCA/IFwiJmhlbGxpcDtcIiA6IFwiXCIpO1xuICAgICAgICAgfSAlPlxuICAgICA8cCBjbGFzcz1cImRlc2NyaXB0aW9uXCI+PCU9IGRlc2MgJT48L3A+XG5cbiAgICAgPGRpdiBjbGFzcz1cIm1tLXZuLXJvd1wiPlxuICAgICA8JSAgaWYgKHR5cGVvZiByYXRpbmcgIT09ICd1bmRlZmluZWQnICYmIHJhdGluZyAmJiByYXRpbmcgIT09ICcnKSB7ICU+XG4gICAgICAgICA8cCBjbGFzcz1cImFsaWduLWxlZnQgcmF0aW5nXCI+XG4gICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJyYXRpbmctc3RhcnMgc3RhcnM2OXgxM1wiPlxuICAgICAgICAgICAgICAgICA8JSAgdmFyIHByb2Nlc3NlZFJhdGluZyA9IE1hdGguZmxvb3IocmF0aW5nICogMiArIDAuNSkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgdmFyIHJhdGluZ0NsYXNzID0gJ3InICsgcHJvY2Vzc2VkUmF0aW5nLnRvU3RyaW5nKCkucmVwbGFjZSgnLicsICctJyk7OyAlPlxuICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInJhdGluZy1zdGFycy1ncmFkIDwlPSByYXRpbmdDbGFzcyAlPlwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJyYXRpbmctc3RhcnMtaW1nXCI+PC9zcGFuPlxuICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgIDwvcD5cbiAgICAgPCUgIH0gZWxzZSB7ICU+XG4gICAgICAgICA8cCBjbGFzcz1cImFsaWduLWxlZnQgcmF0aW5nIHBsYWNlaG9sZGVyXCI+Tm8gcmF0aW5nPC9wPlxuICAgICA8JSAgfVxuICAgICAgICAgaWYgKHR5cGVvZiByZXZpZXdjb3VudCAhPT0gJ3VuZGVmaW5lZCcgJiYgcmV2aWV3Y291bnQgJiYgcmV2aWV3Y291bnQgIT09ICcnKSB7ICU+XG4gICAgICAgICAgICAgPHAgY2xhc3M9XCJhbGlnbi1yaWdodCByZXZpZXctY291bnRcIj5cbiAgICAgICAgICAgICA8JSAgdmFyIHNjYWxlcyA9IFsnJywgJ2snLCAnTSddO1xuICAgICAgICAgICAgICAgICB2YXIgc2NhbGUgPSBzY2FsZXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gcGFyc2VJbnQocmV2aWV3Y291bnQpO1xuICAgICAgICAgICAgICAgICB3aGlsZSAodmFsdWUgPiAxMDAwICYmIHNjYWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IHNjYWxlcy5zaGlmdCgpOyAvLyByZW1vdmUgbmV4dCBzY2FsZVxuICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSAvIDEwMDA7XG4gICAgICAgICAgICAgICAgIH0gJT5cbiAgICAgICAgICAgICA8JT0gTWF0aC5mbG9vcih2YWx1ZSAqIDEwMCkgLyAxMDAgKyBzY2FsZSAlPiByZXZpZXdzXG4gICAgICAgICAgICAgPC9wPlxuICAgICA8JSAgfSBlbHNlIHsgJT5cbiAgICAgICAgICAgICA8cCBjbGFzcz1cImFsaWduLXJpZ2h0IHJldmlldy1jb3VudCBwbGFjZWhvbGRlclwiPk5vIHJldmlld3M8L3A+XG4gICAgIDwlICB9ICU+XG4gICAgIDxwIGNsYXNzPVwiY2xlYXItZml4XCI+PC9wPlxuICAgICA8L2Rpdj5cbiA8L3NjcmlwdD5cbiA8c2NyaXB0IGlkPVwidm4tY2FyZC1jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgI2NhcmRzIGEuY2FyZCAubW0tdm4tcm93IHAgeyBtYXJnaW46IDJweCAwOyBkaXNwbGF5OiBibG9jazsgfVxuICAgICAjY2FyZHMgYS5jYXJkIC5tbS12bi1yb3cgcC5jbGVhci1maXggeyBjbGVhcjogYm90aDsgfVxuICAgICAjY2FyZHMgYS5jYXJkIC5tbS12bi1yb3cgcC5hbGlnbi1sZWZ0IHsgZmxvYXQ6IGxlZnQ7IHRleHQtYWxpZ246IGxlZnQ7IH1cbiAgICAgI2NhcmRzIGEuY2FyZCAubW0tdm4tcm93IHAuYWxpZ24tcmlnaHQgeyBmbG9hdDogcmlnaHQ7IHRleHQtYWxpZ246IHJpZ2h0OyB9XG4gICAgICNjYXJkcyBhLmNhcmQgLm1tLXZuLXJvdyBwLnBsYWNlaG9sZGVyIHsgZm9udC1zaXplOiAxMHB4OyBmb250LXN0eWxlOiBpdGFsaWM7IGNvbG9yOiAjYWFhOyB9XG4gICAgICNjYXJkcyBhLmNhcmQgLm1tLXZuLXJvdyAucmF0aW5nIHsgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XG4gICAgICNjYXJkcyBhLmNhcmQgLm1tLXZuLXJvdyAucmF0aW5nLXN0YXJzIHsgbWFyZ2luLXRvcDogMDsgbWFyZ2luLWxlZnQ6IDA7IHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxuICAgICAjY2FyZHMgYS5jYXJkIC5tbS12bi1yb3cgLnJhdGluZy1zdGFycy5zdGFyczY5eDEzIHsgd2lkdGg6IDY5cHg7IGhlaWdodDogMTNweDsgfVxuICAgICAjY2FyZHMgYS5jYXJkIC5tbS12bi1yb3cgLnJhdGluZy1zdGFycy1ncmFkIHtcbiAgICAgICAgIGJhY2tncm91bmQ6ICNkNzc4MzU7XG4gICAgICAgICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsI2Q3NzgzNSAwLCNmMDg3MjcgNDAlLCNmNGEwNjYgMTAwJSk7XG4gICAgICAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxsZWZ0IGJvdHRvbSxjb2xvci1zdG9wKDAlLCNkNzc4MzUpLGNvbG9yLXN0b3AoNDAlLCNmMDg3MjcpLGNvbG9yLXN0b3AoMTAwJSwjZjRhMDY2KSk7XG4gICAgICAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsI2Q3NzgzNSAwLCNmMDg3MjcgNDAlLCNmNGEwNjYgMTAwJSk7XG4gICAgICAgICBmaWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudChzdGFydENvbG9yc3RyPScjZDc3ODM1JyxlbmRDb2xvcnN0cj0nI2Y0YTA2NicsR3JhZGllbnRUeXBlPTApO1xuICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgIGhlaWdodDogMTNweDtcbiAgICAgfVxuICAgICAjY2FyZHMgYS5jYXJkIC5tbS12bi1yb3cgLnJhdGluZy1zdGFycy1ncmFkLnI1ICAgeyB3aWR0aDogNjlweDsgfVxuICAgICAjY2FyZHMgYS5jYXJkIC5tbS12bi1yb3cgLnJhdGluZy1zdGFycy1ncmFkLnI0LTUgeyB3aWR0aDogNjNweDsgfVxuICAgICAjY2FyZHMgYS5jYXJkIC5tbS12bi1yb3cgLnJhdGluZy1zdGFycy1ncmFkLnI0ICAgeyB3aWR0aDogNTVweDsgfVxuICAgICAjY2FyZHMgYS5jYXJkIC5tbS12bi1yb3cgLnJhdGluZy1zdGFycy1ncmFkLnIzLTUgeyB3aWR0aDogNDlweDsgfVxuICAgICAjY2FyZHMgYS5jYXJkIC5tbS12bi1yb3cgLnJhdGluZy1zdGFycy1ncmFkLnIzICAgeyB3aWR0aDogNDFweDsgfVxuICAgICAjY2FyZHMgYS5jYXJkIC5tbS12bi1yb3cgLnJhdGluZy1zdGFycy1ncmFkLnIyLTUgeyB3aWR0aDogMzVweDsgfVxuICAgICAjY2FyZHMgYS5jYXJkIC5tbS12bi1yb3cgLnJhdGluZy1zdGFycy1ncmFkLnIyICAgeyB3aWR0aDogMjdweDsgfVxuICAgICAjY2FyZHMgYS5jYXJkIC5tbS12bi1yb3cgLnJhdGluZy1zdGFycy1ncmFkLnIxLTUgeyB3aWR0aDogMjFweDsgfVxuICAgICAjY2FyZHMgYS5jYXJkIC5tbS12bi1yb3cgLnJhdGluZy1zdGFycy1ncmFkLnIxICAgeyB3aWR0aDogMTRweDsgfVxuICAgICAjY2FyZHMgYS5jYXJkIC5tbS12bi1yb3cgLnJhdGluZy1zdGFycy1ncmFkLnIwLTUgeyB3aWR0aDogIDdweDsgfVxuICAgICAjY2FyZHMgYS5jYXJkIC5tbS12bi1yb3cgLnJhdGluZy1zdGFycy1ncmFkLnIwICAgeyB3aWR0aDogIDBweDsgfVxuICAgICAjY2FyZHMgYS5jYXJkIC5tbS12bi1yb3cgLnN0YXJzNjl4MTMgLnJhdGluZy1zdGFycy1pbWcge1xuICAgICAgICB3aWR0aDogNjlweDtcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKC9wdWJsaWMvaW1hZ2VzL3N0YXJzLnBuZykgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXI7XG4gICAgICAgIGhlaWdodDogMTNweDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgIH1cbiA8L3NjcmlwdD5cbiA8c2NyaXB0IHR5cGU9XCJ0ZXh0L2pzXCI+XG4gICAgIHZhciBNTSA9IHdpbmRvdy5NTSB8fCB7fTtcbiAgICAgKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICBNTS5sb2FkZXIgPSB7XG4gICAgICAgICAgICAgcm9vdFVSTDogJ2h0dHBzOi8vZGV2ZWxvcGVyLmV4cGVjdGxhYnMuY29tL3B1YmxpYy9zZGtzLydcbiAgICAgICAgICwgICB3aWRnZXRzOiBbJ3ZvaWNlJ11cbiAgICAgICAgIH07XG4gICAgICAgICBNTS53aWRnZXRzID0ge1xuICAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgICBhcHBJRDogJ1lPVVIgQVBQSUQnXG4gICAgICAgICAgICAgLCAgIHZvaWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICBjYXJkVGVtcGxhdGU6IHdpbmRvd1sndm4tY2FyZC10ZW1wbGF0ZSddLmlubmVySFRNTFxuICAgICAgICAgICAgICAgICAsICAgY3VzdG9tQ1NTOiB3aW5kb3dbJ3ZuLWN1c3RvbS1jc3MnXS5pbm5lckhUTUxcbiAgICAgICAgICAgICAgICAgLCAgIGxpc3RlbmluZ01vZGU6ICdjb250aW51b3VzJyAvLyBleHRlbmRlZCBsaXN0ZW5pbmcgd2hlbiBvcGVuZWRcbiAgICAgICAgICAgICAgICAgLCAgIGNhcmRMaW5rQmVoYXZpb3I6ICdfYmxhbmsnIC8vIGxpbmtzIG9wZW4gaW4gbmV3IHRhYnNcbiAgICAgICAgICAgICAgICAgLCAgIG51bVJlc3VsdHM6IDIwIC8vIHNob3cgbW9yZSBjYXJkc1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfTtcbiAgICAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7IHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICAgICBzY3JpcHQuc3JjID0gTU0ubG9hZGVyLnJvb3RVUkwgKyAnZW1iZWQuanMnO1xuICAgICAgICAgdmFyIHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgICAgICB0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgdCk7XG4gICAgIH0oKSk7XG4gPC9zY3JpcHQ+XG5cbiAqIEBtZW1iZXJPZiBNTVxuICogQG5hbWVzcGFjZVxuICovXG5NTS52b2ljZU5hdmlnYXRvciA9IE1NLnZvaWNlTmF2aWdhdG9yIHx8IHt9O1xuTU0ubG9hZGVyID0gTU0ubG9hZGVyIHx8IHt9O1xuTU0ubG9hZGVyLnJvb3RVUkwgPSBNTS5sb2FkZXIucm9vdFVSTCB8fCAnaHR0cHM6Ly9kZXZlbG9wZXIuZXhwZWN0bGFicy5jb20vcHVibGljL3Nka3MvJztcblxuLyoqXG4gKiBUaGUgJ2RpdiNtaW5kbWVsZC1tb2RhbCcgZWxlbWVudCB3aGljaCBjb250YWlucyBhbGwgb2YgdGhlIHZvaWNlIG5hdmlnYXRvciBodG1sXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgJG1tID0gZmFsc2U7XG5cbi8qKlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciAkbW1faWZyYW1lID0gZmFsc2U7XG5cbi8qKlxuICogaXNJbml0aWFsaXplZCBpcyBzZXQgdG8gdHJ1ZSBvbmNlIHRoZSB3aWRnZXQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuIE9uY2VcbiAqIHRoZSB3aWRnZXQgaXMgaW5pdGlhbGl6ZWQgb25Jbml0KCkgaXMgY2FsbGVkLiBUaGlzIGlzIHVzZWQgYnlcbiAqIE1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbCgpIHRvIGFsbG93IHVzZXJzIHRvIGNhbGwgc2hvd01vZGFsXG4gKiB3aXRob3V0IGhhdmluZyB0byBrbm93IGlmIHRoZSB3aWRnZXQgaXMgbG9hZGVkIG9yIG5vdFxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBpc0luaXRpYWxpemVkID0gZmFsc2U7XG52YXIgb25Jbml0ID0gZnVuY3Rpb24gKCkge307XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgLy8gQWRkIHRoZSAjbWluZG1lbGQtbW9kYWwgZGl2IHRvIHRoZSBwYWdlXG4gICAgdmFyIG1tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbW0uc2V0QXR0cmlidXRlKCdpZCcsICdtaW5kbWVsZC1tb2RhbCcpO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKG1tLCBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0pO1xuICAgICRtbSA9IFVUSUwuZWwobW0pO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBhbnkgZWxlbWVudCB3aXRoIC5tbS12b2ljZS1uYXYtaW5pdCBvbiBpdFxuICAgIHZhciAkaW5pdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtbS12b2ljZS1uYXYtaW5pdCcpO1xuICAgIHZhciAkdGV4dEluaXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW0tdm9pY2UtbmF2LXRleHQtaW5pdCcpO1xuICAgIHZhciBjbGlja0hhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBsb29rIGZvciB0ZXh0IHZhbHVlIGluIG1tLXZvaWNlLW5hdi10ZXh0LWluaXQgZWxlbWVudFxuICAgICAgICBpZiAoJHRleHRJbml0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnkgPSAkdGV4dEluaXRzWzBdLnZhbHVlO1xuICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKHsgcXVlcnk6IHF1ZXJ5IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3Iuc2hvd01vZGFsKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCAkaW5pdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgVVRJTC5lbCgkaW5pdHNbaV0pLmNsaWNrKGNsaWNrSGFuZGxlcik7XG4gICAgfVxuXG4gICAgdmFyIGtleVByZXNzSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnkgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5zaG93TW9kYWwoeyBxdWVyeTogcXVlcnkgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGZvcih2YXIgaiA9IDA7IGogPCAkdGV4dEluaXRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIFVUSUwuZWwoJHRleHRJbml0c1tqXSkua2V5cHJlc3Moa2V5UHJlc3NIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBzZXRJbml0aWFsaXplZCgpO1xuXG4gICAgLy8gV2FpdCBmb3IgbWVzc2FnZXNcbiAgICBVVElMLmVsKHdpbmRvdykub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuZGF0YS5zb3VyY2UgIT0gJ21pbmRtZWxkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKGV2ZW50LmRhdGEuYWN0aW9uID09ICdjbG9zZScpIHtcbiAgICAgICAgICAgICRtbS5yZW1vdmVDbGFzcygnb24nKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRJbml0aWFsaXplZCgpIHtcbiAgICBpc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICBvbkluaXQoKTtcbn1cblxuZnVuY3Rpb24gcG9zdE1lc3NhZ2UoYWN0aW9uLCBkYXRhKSB7XG4gICAgdmFyIHdpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluZG1lbGQtaWZyYW1lXCIpLmNvbnRlbnRXaW5kb3c7XG4gICAgd2luLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIHNvdXJjZTogJ21pbmRtZWxkJyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgIH0sIFwiKlwiKTtcbn1cblxuLyoqXG4gKiBPcGVucyB0aGUgdm9pY2UgbmF2aWdhdG9yIG1vZGFsIHdpbmRvd1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnF1ZXJ5XSAgICAgICAgICAgICAgICAgaWYgcHJvdmlkZWQsIHRoaXMgZmllbGQgd2lsbCBiZSB0aGUgaW5pdGlhbCBxdWVyeSwgYW5kIHdpbGwgaW1tZWRpYXRlbHkgc2hvdyByZXN1bHRzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmZvcmNlTmV3SUZyYW1lPWZhbHNlXSBpZiB0cnVlLCBhbnkgdm9pY2UgbmF2aWdhdG9ycyB0aGF0IGhhdmUgcHJldmlvdXNseSBiZWVuIGNyZWF0ZWQgd2lsbFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmUgZGVzdHJveWVkLCBhbmQgYSBuZXcgaW5zdGFuY2Ugd2lsbCBiZSBjcmVhdGVkLlxuICovXG5NTS52b2ljZU5hdmlnYXRvci5zaG93TW9kYWwgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKGlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdmFyIGlmcmFtZTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB2b2ljZSBuYXZpZ2F0b3IgY29uZmlnXG4gICAgICAgIGlmICh0eXBlb2YgTU0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIE1NLndpZGdldHMgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIE1NLndpZGdldHMuY29uZmlnICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIE1vdmUgY29uZmlnIHRvIHZvaWNlIG5hdiBjb25maWdcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcgPSBNTS53aWRnZXRzLmNvbmZpZy52b2ljZSB8fCB7fTtcbiAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuYXBwSUQgPSBNTS53aWRnZXRzLmNvbmZpZy5hcHBJRDtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIE1NLndpZGdldHMuY29uZmlnLmNsZWFuVXJsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuY2xlYW5VcmwgPSBNTS53aWRnZXRzLmNvbmZpZy5jbGVhblVybDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS53aWRnZXRzLmNvbmZpZy5mYXllQ2xpZW50VXJsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBNTS52b2ljZU5hdmlnYXRvci5jb25maWcuZmF5ZUNsaWVudFVybCA9IE1NLndpZGdldHMuY29uZmlnLmZheWVDbGllbnRVcmw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBNTS52b2ljZU5hdmlnYXRvci5jb25maWcgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gcGFyc2UgY2FyZCBsYXlvdXRcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jYXJkVGVtcGxhdGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jYXJkTGF5b3V0ID0gJ2N1c3RvbSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmNhcmRMYXlvdXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jYXJkTGF5b3V0ID0gJ2RlZmF1bHQnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIG1ha2UgYWJzb2x1dGUgVVJMc1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmN1c3RvbUNTU1VSTCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmN1c3RvbUNTU1VSTCA9IFVUSUwuY29udmVydFRvQWJzb2x1dGVQYXRoKE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5jdXN0b21DU1NVUkwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgbGlzdGVuaW5nIG1vZGVcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubGlzdGVuaW5nTW9kZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmxpc3RlbmluZ01vZGUgPSBvcHRpb25zLmxpc3RlbmluZ01vZGU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnLmxpc3RlbmluZ01vZGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5saXN0ZW5pbmdNb2RlID0gJ25vcm1hbCc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUGFzcyB0b2tlbiwgdXNlciBJRCwgYW5kIHNlc3Npb24gSUQgaWYgdGhleSBhcmUgc2V0IGFscmVhZHlcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIE1NLnRva2VuICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgTU0uYWN0aXZlVXNlcklkICE9PSAndW5kZWZpbmVkJyAmJiBNTS5hY3RpdmVVc2VySWQgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIE1NLmFjdGl2ZVNlc3Npb25JZCAhPT0gJ3VuZGVmaW5lZCcgJiYgTU0uYWN0aXZlU2Vzc2lvbklkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5tbUNyZWRlbnRpYWxzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IE1NLnRva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklEOiBNTS5hY3RpdmVVc2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uSUQ6IE1NLmFjdGl2ZVNlc3Npb25JZFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiBkZWZpbmVkLCBwYXNzIGEgc3RhcnRpbmcgcXVlcnlcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5xdWVyeSAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucXVlcnkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5zdGFydFF1ZXJ5ID0gb3B0aW9ucy5xdWVyeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE1NLnZvaWNlTmF2aWdhdG9yLmNvbmZpZy5zdGFydFF1ZXJ5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5mb3JjZU5ld0lGcmFtZSAmJiAkbW1faWZyYW1lKSB7XG4gICAgICAgICAgICBpZnJhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWluZG1lbGQtaWZyYW1lJyk7XG4gICAgICAgICAgICBpZnJhbWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGlmcmFtZSBpZiBmaXJzdCBsb2FkXG4gICAgICAgIGlmICghJG1tX2lmcmFtZSB8fCBvcHRpb25zLmZvcmNlTmV3SUZyYW1lKSB7XG4gICAgICAgICAgICBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2ZyYW1lQm9yZGVyJywgJzAnKTtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21pbmRtZWxkLWlmcmFtZScpO1xuICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3d0cmFuc3BhcmVuY3knLCAndHJ1ZScpO1xuICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgTU0ubG9hZGVyLnJvb3RVUkwgKyAnd2lkZ2V0cy92b2ljZU5hdmlnYXRvci9tb2RhbC9tb2RhbC5odG1sJyk7XG5cbiAgICAgICAgICAgICRtbV9pZnJhbWUgPSBVVElMLmVsKGlmcmFtZSk7XG5cbiAgICAgICAgICAgIFVUSUwuZWwoaWZyYW1lKS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKCdjb25maWcnLCBNTS52b2ljZU5hdmlnYXRvci5jb25maWcpO1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKCdvcGVuJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJG1tLmVsKCkuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBvc3RNZXNzYWdlKCdvcGVuJywgTU0udm9pY2VOYXZpZ2F0b3IuY29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICAkbW0uYWRkQ2xhc3MoJ29uJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBTZXQgb25Jbml0KCkgY2FsbGJhY2sgdG8gb3BlbiBtb2RhbFxuICAgICAgICBvbkluaXQgPSBmdW5jdGlvbiAoKSB7IE1NLnZvaWNlTmF2aWdhdG9yLnNob3dNb2RhbChvcHRpb25zKTsgfTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2xvc2VzIHRoZSB2b2ljZSBuYXZpZ2F0b3IgbW9kYWwgd2luZG93XG4gKi9cbk1NLnZvaWNlTmF2aWdhdG9yLmhpZGVNb2RhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBwb3N0TWVzc2FnZSgnY2xvc2UnKTtcbn07XG5cbi8vIHNjaGVkdWxlIGluaXRpYWxpemF0aW9uIG9mIHZvaWNlIG5hdmlnYXRvclxuVVRJTC5jb250ZW50TG9hZGVkKHdpbmRvdywgZnVuY3Rpb24oKSB7XG4gICAgaW5pdCgpO1xufSk7XG4iXX0=
