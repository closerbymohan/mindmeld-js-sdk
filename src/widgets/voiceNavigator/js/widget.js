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
