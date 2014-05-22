;(function() {
  var MM = window.MM || {};
  MM.voiceNavigator = MM.voiceNavigator || {};
  MM.__bootstrap = MM.__bootstrap || {};
  MM.__bootstrap.rootURL = MM.__bootstrap.rootURL || 'https://developer.expectlabs.com/public/sdks/';

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
      self.$mm = self.el(mm);

      // Initialize any element with .mm-voice-nav-init on it
      var $inits = document.getElementsByClassName('mm-voice-nav-init');
      var clickHandler = function(e) {
        e.preventDefault();
        MM.voiceNavigator.showModal();
      };
      for(var i = 0; i < $inits.length; i++) {
        this.el($inits[i]).click(clickHandler);
      }
      self.set_initialized();
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
    },

    contentLoaded : function(fn) {
      // From https://github.com/dperini/ContentLoaded
      // Same as $().ready(), but without the jQuery dependency

      var win = window;

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

    },

    /* A wrapper for dom elements, basically a lite version of jQuery's $ */
    el : function(el) {
      var self = this;
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

        removeClass : function(className) {
          el.className = el.className.replace(
            new RegExp('(^|\\s+)' + className + '(\\s+|$)', 'g'),
            '$1'
          );
        },

        addClass : function(className) {
          el.className = el.className + " " + className;
        },

        remove : function() {
          el.parentNode.removeChild(el);
        },

        el : function() {
          return el;
        }

      };
    }
  };

  MM.voiceNavigator.showModal = function () {
    if (MMVoice.is_init) {
      if(! MMVoice.$mm_iframe) {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('frameBorder', '0');
        iframe.setAttribute('id', 'mindmeld-iframe');
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('src', MM.__bootstrap.rootURL + 'voiceNavigator/modal/modal.html');
        if (typeof MM !== 'undefined' &&
          typeof MM.voiceNavigator !== 'undefined' &&
            typeof MM.voiceNavigator.options !== 'undefined') {

          if (typeof MM.voiceNavigator.options.cardStyle === 'function') {
            MM.voiceNavigator.getCardHTML = MM.voiceNavigator.options.cardStyle;
            MM.voiceNavigator.options.cardStyle = 'custom'; //
          } else if (typeof MM.voiceNavigator.options.cardStyle === 'undefined') {
              MM.voiceNavigator.options.cardStyle = 'default';
          }

          iframe.setAttribute('mm-voice-navigator-options', JSON.stringify(MM.voiceNavigator.options));
        }

        MMVoice.$mm_iframe = MMVoice.el(iframe);

        MMVoice.el(iframe).on('load', function() {
          MMVoice.postMessage('open');
          MMVoice.iframe_loaded = true;
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
      MMVoice.on_init = MM.voiceNavigator.showModal;
    }

  };

  MM.voiceNavigator.hideModal = function () {
    MMVoice.postMessage('close');
  };

  MMVoice.contentLoaded(function() {
    MMVoice.init();
  });

})();
