/**
 * Created by jj on 6/17/14.
 */
var UTIL =  require('./util');
var $ = require('./vendor/jquery-1.11.1');

// must require('mindmeld') when MM is made into CommonJS module
var listener = null;

/**
 * The pulser element for the microphone. It increases in size to indicate the volume of speech.
 * @private
 */
var $mm_pulser = $();

/**
 * The element containing the microphone
 */
var $mm_button = $();

/**
 *
 */
var $mm_button_icon = $();


/**
 * Whether or not the microphone is locked in continuous mode
 */
var isLocked = false;

// interface code
// function setListenerConfig
// function listen(locked)

// initialization code
function getElementReferences() {
    $mm_pulser = $('#mm-pulser');
    $mm_button = $('#mm-button');
    $mm_button_icon = $('#mm-button-icon');
}

function addButtonListeners() {
  $mm_button_icon.on('mousedown', function(e) {
      button_status.mousedown = true;
      button_status.just_locked = false;
      setTimeout(function() {
          if(button_status.mousedown) {
              button_status.locked = true;
              button_status.just_locked = true;
              self.listen(true);
          }
      }, 300);
  });

  $mm_button_icon.on('mouseup', function(e) {
      e.preventDefault();
      button_status.mousedown = false;
      if(!button_status.locked) {
          self.listen(false);
      }

      if(button_status.locked && !button_status.just_locked) {
          button_status.locked = false;
          button_status.mousedown = false;
          self.listen(false);
      }

      button_status.just_locked = false;
  });
}

function createListener(theConfig) {
  listener = new MM.Listener(theConfig);
}

function init(theConfig) {
    UTIL.log('initing microphone');
    createListener(theConfig);
    getElementReferences();
//     addButtonListeners();
}



module.exports = {
    init: init,
    $mm_pulser: function() { return $mm_pulser; },
    $mm_button: function() { return $mm_button; },
    $mm_button_icon: function() { return $mm_button_icon; },
    listener: function() { return listener; },
    isLocked: function() { return isLocked; },
    setIsLocked: function(value) {
      isLocked = value;
      $mm_button.toggleClass('lock', isLocked);
    }
};