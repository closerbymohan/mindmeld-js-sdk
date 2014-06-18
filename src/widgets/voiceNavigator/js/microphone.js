/* jshint undef: true, unused: true */
/* global document, require, window, MM, module */

var UTIL =  require('./util');
var $ = require('./vendor/jquery-1.11.1');


var hasInitialized = false;

// must require('mindmeld') when MM is made into CommonJS module
var listener = null;

/**
 * The pulser element for the microphone. It increases in size to indicate the volume of speech.
 * This element is a sibling of $mm_button
 * @private
 */
var $mm_pulser = $();

/**
 * The element containing the microphone.
 * This element is a sibling of $mm_pulser
 */
var $mm_button = $();

/**
 * The element
 * This element is a descendant of $mm_button
 */
var $mm_button_icon = $();

/**
 * Whether or not the microphone is locked in continuous mode
 */
var isLocked = false;

/**
 * True after user has requested start and before onStart has fired.
 * False when continuous mode is restarting.
 */
var isFirstStart = true;

/**
 *
 */
var lockOnNextEnd = false;


// volume monitor

function pulse(volume) {
    var scale = ((volume / 100) * 0.5) + 1.4;
    $mm_pulser.css('transform', 'scale(' + scale + ')');
}

var volumeMonitor = (function() {
  function startVolumeMonitor() {
    if (!volumeMonitor.audio_started) {
        // GETUSERMEDIA INPUT
        window.navigator.getUserMedia = (window.navigator.getUserMedia ||
            window.navigator.webkitGetUserMedia ||
            window.navigator.mozGetUserMedia ||
            window.navigator.msGetUserMedia);
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        var Uint8Array = window.Uint8Array;

        volumeMonitor.context = new AudioContext();
        volumeMonitor.analyzer = volumeMonitor.context.createAnalyser();
        volumeMonitor.analyzer.smoothingTimeConstant = 0.18;
        volumeMonitor.analyzer.fftSize = 256;

        volumeMonitor.frequencies = new Uint8Array( volumeMonitor.analyzer.frequencyBinCount );
        volumeMonitor.times = new Uint8Array( volumeMonitor.analyzer.frequencyBinCount );

        window.navigator.getUserMedia ( { audio: true }, microphoneReady, function(err) {
            UTIL.log("The following error occured: " + err);
        });

        volumeMonitor.audio_started = true;
    } else {
        loop();
    }

    function microphoneReady(stream) {
        volumeMonitor.stream = stream;
        var stream_source = volumeMonitor.context.createMediaStreamSource( stream );
        stream_source.connect( volumeMonitor.analyzer );
        loop();
    }

    function loop() {
        if (!(listener.pending || listener.listening)) {
            // stop recording
            volumeMonitor.stream.stop();
            volumeMonitor.audio_started = false;
            return;
        }

        volumeMonitor.analyzer.getByteFrequencyData( volumeMonitor.frequencies );
        volumeMonitor.analyzer.getByteTimeDomainData( volumeMonitor.times );

        pulse(getVolume());

        window.setTimeout(loop, 75);
    }

    function getVolume() {
        return window.parseInt( getFreqencyRange( 0, volumeMonitor.analyzer.frequencyBinCount - 1 ), 10 );
    }

    function getFreqencyRange(from, to) {
        var volume = 0;

        for ( var i = from; i < to; i++ ) {
            volume += volumeMonitor.frequencies[i];
        }

        return volume / ( to - from );
    }
  }
  return {
    stream : null,
    context : null,
    analyzer : null,
    frequencies : null,
    times : null,
    audio_started : false,
    start: startVolumeMonitor
  };
})();


// interface code

var eventHandlers = null;

/**
 * Sets the configuration of the active session. Pass null for callback fields to remove previous callbacks.
 * See {@link MM.Listener#setConfig} for more details.
 *
 * @param {ListenerConfig} config an object containing listener configuration properties
 * @memberOf MM.Microphone
 * @instance
 */
function setConfig(config) {
    var configProperties = {
        onResult: 'onListenerResult',
        onPending: 'onListenerPending',
        onStart: 'onListenerStart',
        onEnd: 'onListenerEnd',
        onError: 'onListenerError',
    };

    for (var configProperty in configProperties) { // only look at safe properties
        if (config.hasOwnProperty(configProperty)) { // only update property if it is in the config object
            eventHandlers[configProperties[configProperty]] = config[configProperty];
            delete config[configProperty]; // remove from config
        }
    }

    listener.setConfig(config); // pass other configuration settings to listener
}

function setIsLocked(value) {
    isLocked = value;
    $mm_button.toggleClass('lock', isLocked);
}

function buttonFired(longPress) {
    if(!MM.support.speechRecognition) {
      return;
    }

    if (!longPress) {
        if (listener.pending || listener.listening) {
            stopListening();
        } else {
            startListening();
        }
    } else {
        if (!isLocked && (listener.pending || listener.listening)) {
            lockOnNextEnd = true;
            setIsLocked(true);
        } else if (isLocked) {
            stopListening();
        } else {
            startListening(true);
        }
    }
}

function startListening(continuous) {
  continuous = !!continuous;
  isFirstStart = true;
  setIsLocked(continuous);
  setConfig({ continuous: continuous });
  listener.start();
}

function stopListening() {
    if(MM.support.speechRecognition) {
        listener.cancel();
        setIsLocked(false);
    }
}

function hide() {
    $mm_button.hide();
    $mm_pulser.hide();
}

// event handlers
function testAndCallThis(func, thisArg) {
  if ($.isFunction(func)) {
    var args = Array.prototype.slice.call(arguments, 2);
    func.apply(thisArg, args);
  }
}

// initialization code
function getElementReferences() {
    $mm_pulser = $('#mm-pulser');
    $mm_button = $('#mm-button');
    $mm_button_icon = $('#mm-button-icon');
}

// Button Actions
var buttonStatus = {
    mousedown : false,
    locked : false,
    justLocked : true
};

function addButtonListeners() {
  $mm_button_icon.on('mousedown', function(e) {
      buttonStatus.mousedown = true;
      buttonStatus.justLocked = false;
      window.setTimeout(function() {
          if (buttonStatus.mousedown) {
              buttonStatus.locked = true;
              buttonStatus.justLocked = true;
              buttonFired(true);
          }
      }, 300);
  });

  $mm_button_icon.on('mouseup', function(e) {
      e.preventDefault();
      buttonStatus.mousedown = false;
      if(!buttonStatus.locked) {
          buttonFired(false);
      }

      if(buttonStatus.locked && !buttonStatus.justLocked) {
          buttonStatus.locked = false;
          buttonStatus.mousedown = false;
          buttonFired(false);
      }

      buttonStatus.justLocked = false;
  });
}

function createListener(config) {
  eventHandlers = {};
  listener = new MM.Listener({
    onResult: function(result, resultIndex, results, event) {
      testAndCallThis(eventHandlers.onListenerResult, listener, result, resultIndex, results, event);
    },
    onPending: function() {
      $mm_button.removeClass('status-listening');
      $mm_button.addClass('status-pending');

      testAndCallThis(eventHandlers.onListenerPending, listener);
    },
    onStart: function(event) {

      if (isFirstStart) {
        isFirstStart = false;
        $mm_button.removeClass('status-pending');
        $mm_button.addClass('status-listening');
        volumeMonitor.start();

        testAndCallThis(eventHandlers.onListenerStart, listener, event);
      }
    },
    onEnd: function(event) {
      if (isLocked) {
        if (lockOnNextEnd) {
          setIsLocked(true);
          lockOnNextEnd = false;
          listener.setConfig({ 'continuous': isLocked });
        }
        listener.start();
      } else {
        $mm_pulser.css('transform', 'scale(0)');
        $mm_button.removeClass('status-pending');
        $mm_button.removeClass('status-listening');
      }

      testAndCallThis(eventHandlers.onListenerEnd, listener, event);
    },
    onError: function(error) {
       testAndCallThis(eventHandlers.onListenerError, listener, error);
    }
  });
  setConfig(config);
}

function init(config) {
    UTIL.log('initing microphone');
    createListener(config);
    getElementReferences();
    addButtonListeners();
    hasInitialized = true;
}

module.exports = {
    init: init,
    $mm_pulser: function() { return $mm_pulser; },
    $mm_button: function() { return $mm_button; },
    $mm_button_icon: function() { return $mm_button_icon; },
    listener: function() { return listener; },
    isLocked: function() { return isLocked; },
    hide: hide,
    setConfig: setConfig,
    startListening: buttonFired,
    stopListening: stopListening,
    listening: function() { return listener.listening; },
    pending: function() { return listener.pending; }
};

