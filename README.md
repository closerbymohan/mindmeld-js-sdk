# Expect Labs mindmeld-js-sdk Reference

This is the reference document for Expect Labs' MindMeld JavaScript SDK, mindmeld.js.

## Important Links

* [mindmeld-js-sdk Documentation][sdkDocsLink]
* [Git Repo][repoUrl]
* [Expect Labs Developer Site][developerSite]
* [MindMeld API Documentation][apiDocsLink]


## Installation

There are a few ways to get started using MindMeld JavaScript SDK

### Download from site
The easiest way to install the latest version of mindmeld.js is by downloading one
of the following files directly from the Expect Labs site:

* Un-minified latest: [mindmeld.js][latestSDKDownloadLink]
* Minified latest: [mindmeld.min.js][latestMinifiedSDKDownloadLink]
* Both + Hello World + Documentation: [mindmeld-js-sdk.zip][latestSDKZIPDownloadLink]

Note that if you are including the file we host here directly from your website,
you probably shouldn't. It is not hosted on a CDN, and your page's load time may
take a hit. However, if you must link directly, you should use the versioned URL
to prevent compatibility issues in the future.

```html
<script type="text/javascript" src="https://developer.expectlabs.com/public/sdks/mindmeld-2.4.1.js"></script>
```

* Un-minified: [mindmeld-2.4.1.js][versionedSDKDownloadLink]
* Minified: [mindmeld-2.4.1.min.js][versionedMinifiedSDKDownloadLink]
* Both + Hello World + Documentation: [mindmeld-js-sdk-2.4.1.zip][versionedSDKZIPDownloadLink]

### Clone git repository 
Both files are also available directly from the mindmeld-js-sdk git repository. Simply clone the repo:
```bash
git clone https://github.com/expectlabs/mindmeld-js-sdk.git
cd mindmeld-js-sdk
git checkout master # make sure you are using the most recent stable release
```
Copy either mindmeld.js or mindmeld.min.js into your project's directory.

### Install with Bower
Bower is a popular package manager for the web. Read more about it at [bower.io](http://bower.io/)

If you are using Bower, install mindmeld-js-sdk as a bower package
```bash
bower install mindmeld-js-sdk
```
To save the dependency in bower.json, run the above command with `--save`


## Usage

The MindMeld JavaScript SDK relies on the popular jQuery library. You should first load the jQuery library before
loading the MindMeld library.

### Without Bower
```html
<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
<script src="path/to/mindmeld.min.js"></script>
```

### With Bower
```html
<script src="bower_components/jquery/jquery.min.js"></script>
<script src="bower_components/mindmeld-js-sdk/dist/sdk/mindmeld.js"></script>
```

## Getting Started

This is a quick guide on how to start using the MindMeld JavaScript SDK in your own projects. The MindMeld JavaScript
SDK enables developers to build browser-based applications that take advantage of the full range of functionality
supported by the MindMeld API. The JavaScript SDK wraps the objects and collections supported by the MindMeld
RESTful API with convenient JavaScript objects. These objects can then be used to communicate with the MindMeld
API. The JavaScript SDK also provides the ability to send and receive real-time push events in most modern browsers.


### Initialization

When the JavaScript SDK creates the global MM object, which contains all of the data classes and functionality to
access MindMeld. The first step is to initialize the SDK by calling `MM.init` with a `config` object specifying
your application id and a callback for when the SDK is initialized:

```javascript
var config = {
    appid: "<your application id>",
    onInit: start
};
MM.init(config);

// This is where things begin after the MindMeld JavaScript API is initialized.
function start () {
    console.log('MindMeld SDK ready!');
}
```

Once the JavaScript SDK has been initialized, the MM object is your interface to the MindMeld API.

### Request an Access Token

With your application's app secret you can generate a new user token. You can find the app secret on the
[Management Console](https://developer.expectlabs.com/console).

```javascript
var credentials = {
    appsecret: '<app secret>',
    simple: {
        userid: 'einstein79',
        name: 'Albert Einstein'
    }
};
MM.getToken(credentials, onTokenSuccess, onTokenError);

function onTokenSuccess () {
    console.log('Your access token was successfully retrieved: ' + MM.token + '.');
    console.log('The active user id has been set to: ' + MM.activeUserId);
}

function onTokenError (error) {
    console.log('Error getting access token:  (Type ' + error.code +
        ' - ' + error.type + '): ' + error.message + '  ' +
        'Please make sure your appid and appsecret are set correctly.');
}
```

### Create a Session
All entity extraction and document ranking happens inside of a MindMeld session. Using this SDK, you create
you own session to which you can later add text entries and fetch relevant documents.

```javascript
var newSessionData = {
    name: 'A test session',
    privacymode: 'inviteonly'
};
MM.activeUser.sessions.post(newSessionData,
    // New session created successfully
    function (response) {
        var sessionID = response.data.sessionid;
        console.log('New session created with id ' + sessionID);
        MM.setActiveSessionID(sessionID);
    },
    // Error
    function (error) {
        console.log('Error creating new session:  (Type ' + error.code +
            ' - ' + error.type + '): ' + error.message);
    }
);
```

### Post a Text Entry
To post a text entry to the session, you can optionally specify the language.

```javascript
var textEntryData = {
    text: 'Sandra Bullock might win an Academy Award for Best Actress in the movie Gravity',
    type: 'text',
    weight: 1.0,
    language: 'eng' // this is not required
};
MM.activeSession.textentries.post(textEntryData);
```

### Example Flow to Get Contextually Relevant Documents to a Conversation
The following code snippet will subscribe to the documents collection, post a text entry, and receive 
a notification once the MindMeld API has updated documents for the text entry.

```javascript
// Subscribe to push events for when the documents collection updates
MM.activeSession.documents.onUpdate(onDocumentsUpdate, onSubscribedToDocumentUpdates);

function onSubscribedToDocumentUpdates () {
    console.log('subscribed to updates to the documents collection');

    var textEntryData = {
        text: 'Sandra Bullock might win an Academy Award for Best Actress in the movie Gravity',
        type: 'text',
        weight: 1.0

    };
    console.log('posting a new text entry to the session');
    MM.activeSession.textentries.post(textEntryData);
}

function onDocumentsUpdate () {
    console.log('received an update to the documents collection');
    var documents = MM.activeSession.documents.json();
    console.log('Related Documents: ' + JSON.stringify(documents));
}
```

### Sending and Receiving Custom Push Events
In addition to the push events that indicate that API objects have changed, you can also create custom
push events. In the example below, we show you how to subscribe to a custom push event on the user
channel, and then publish a custom push event on that same channel. We also do the same for
the session channel.

```javascript
// subscribe / publish a custom event on user channel
MM.activeUser.subscribe('CustomUserEvent', onCustomUserEvent, onSubscribedCustomUserEvent);

function onSubscribedCustomUserEvent () {
    console.log('successfully subscribed to CustomUserEvent on user channel');
    var payload = {
        field1: 'test field',
        field2: 'temet nosce'
    };
    MM.activeUser.publish('CustomUserEvent', payload);
}
function onCustomUserEvent (payload) {
    console.log('received CustomUserEvent. field2 of payload: ' + payload.field2);
    // received CustomUserEvent. field2 of payload: temet nosce
}

// subscribe / publish a custom event on session channel
MM.activeSession.subscribe('CustomSessionEvent', onCustomSessionEvent, onSubscribedCustomSessionEvent);

function onSubscribedCustomSessionEvent () {
   console.log('successfully subscribed to CustomSessionEvent on session channel');
   var payload = 'cause and effect';
   MM.activeSession.publish('CustomSessionEvent', payload);
}
function onCustomSessionEvent (payload) {
   console.log('received CustomSessionEvent with payload: ' + payload);
   // received CustomSessionEvent with payload: cause and effect
}
```

### Using Speech Recognition
If you would like to use speech recognition to enable users to interact with your application with their voices
use MM.Listener. Currently the browsers known to support MM.Listener are Google Chrome for Desktop (versions 25+)
and Android (versions 31+). The MM.Listener class relies upon the speech recognition portion of the Web Speech API
(https://dvcs.w3.org/hg/speech-api/raw-file/tip/webspeechapi.html) which has not yet been implemented by all major
browsers. The simplest way to enable speech recognition is to use the active session listener, which is
preconfigured to post text entries when it receives final results. Below we illustrate how to use the active session
listener.


```html
<div id="textStream">
  <span id="confirmed"></span>
  <span id="pending" style="opacity: 0.5;"></span>
</div>
```

```javascript
if (MM.support.speechRecognition) { // check for support in the current browser
  MM.activeSession.setListenerConfig({
    onResult: function(result) {
      console.log("Listener received result: " + result);
      // Display speech
      if (result.final) {
        // Display speech segment as final
        $('#confirmed').append(' <span class="tran">' + result.transcript + '</span>');
        $('#pending').text('');
      } else {
        $('#pending').text(result.transcript);
      }
    },
    onStart: function(event) {
      // Update UI so user knows to speak

      // Clear previous text
      $('#confirmed').text('');
      $('#pending').text('');
    },
    onEnd: function(event) {
      // Update UI so user knows recording has ended
      var pendingText = $("#pending").text();
      if (pendingText.length > 0) {
        $('#confirmed').append(' <span class="tran">' + pendingText + '</span>');
        $('#pending').text('');
      }
    },
    onError: function(error) {
      // let user know something went wrong
      alert('Sorry, there was a problem with speech recognition');
    }
  });
  MM.activeSession.listener.start();
  // user begins speaking now
}
```

If you would like to have more control over how and when text entries are posted, you can create your own MM.Listener
object, as shown below.

```javascript
if (MM.support.speechRecognition) { // check for support in the current browser
  var myListener = new MM.Listener({
    continuous: true, // we will continue listening until myListener.stop() is called
    interimResults:, true // we will receive results before the API
    onResult: function(result) {
      console.log("Listener received result: " + result);

      if (result.final) {
        MM.activeSession.textentries.post({
          text: result.transcript,
          type: 'speech',
          weight: 1.0
        });
        // Display speech segment as final
        $('#confirmed').append(' <span class="tran">' + result.transcript + '</span>');
        $('#pending').text('');
      } else {
        // Display speech segment as pending
        $('#pending').text(result.transcript);
      }
    },
    onStart: function(event) {
      // Update UI so user knows to speak
      // Clear previous text
      $('#confirmed').text('');
      $('#pending').text('');
    },
    onEnd: function(event) {
      // Update UI so user knows recording has ended
      //
      var pendingText = $("#pending").text();
      if (pendingText != '') {
        $('#confirmed').append(' <span class="tran">' + pendingText + '</span>');
        $('#pending').text('');
      }
    },
    onError: function(error) {
      // let user know something went wrong
      alert('Sorry, there was a problem with speech recognition');
    }
  });

  myListener.start();
  // user begins speaking now
}
```

## Repository Contents ([mindmeld-js-sdk](https://github.com/expectlabs/mindmeld-js-sdk))
* *src/*: Directory containing all source files for SDK and widgets
* *src/sdk/*: Directory containing source files for mindmeld.js
* *src/sdk/main.js/*: Main source file for mindmeld.js
* *src/sdk/widgets/searchWidget/*: Directory containing source files for autocomplete search widget
* *src/sdk/widgets/searchWidget/js/jquery.mindmeld-searchwidget.js*: Source for autocomplete jQuery widget
* *src/sdk/widgets/searchWidget/js/util/*: Directory containing headers and footers for creating a standalone search widget file
* *src/sdk/widget/voiceNavigator/*: Directory containing source files for voice navigator widget
* *src/docsTemplate/*: Directory containing templates and configuration files for building JS Docs
* *src/embed.js*: Source for embed script used to asynchronously load widgets
* *dist/*: Directory containing all built, uglified, and production-ready files for JS SDK
* *dist/sdk/*: Directory containing compiled mindmeld.js, mindmeld.min.js, mindmeld-js-sdk.zip, and examples
* *dist/widgets/searchWidget/*: Directory containing all files necessary for using autocomplete search widget
* *dist/widgets/voiceNavigator/*: Directory containing all files necessary for using voice navigator widget
* *dist/widgets/voiceNavigator/widget/*: Directory containing voice navigator widget files that create the voice navigator iframe
* *dist/widgets/voiceNavigator/modal/*: Directory containing voice navigator modal files loaded in the iframe modal
* *dist/embed.js*: Minified embed script used in prod
* *example/*: Directory mirroring src/ and dist/ directories containing example HTML pages showing basic usage of SDK and widgets
* *archive/*: Directory containing all previous versions of mindmeld.js
* *gulp/*: Directory containing gulpfiles for building SDK and widgets
* *gulpfile.js*: Main gulpfile used to orchestrate build processes
* *Gruntfile.js*: Legacy grunt file currently only used for building JS Doc because gulp-js doc does not support our JS doc template
* *bump.txt*: Add garbage to this file and and check it in when you just want a new SHA for this repo


[sdkDocsLink]:https://developer.expectlabs.com/docs/sdks/js/referenceDocs/
[apiDocsLink]:https://developer.expectlabs.com/docs
[developerSite]:https://developer.expectlabs.com
[repoUrl]:https://github.com/expectlabs/mindmeld-js-sdk
[latestSDKDownloadLink]:https://developer.expectlabs.com/public/sdks/mindmeld.js
[latestMinifiedSDKDownloadLink]:https://developer.expectlabs.com/public/sdks/mindmeld.min.js
[latestSDKZIPDownloadLink]:https://developer.expectlabs.com/public/sdks/mindmeld-js-sdk.zip
[versionedSDKDownloadLink]:https://developer.expectlabs.com/public/sdks/mindmeld-2.4.1.js
[versionedMinifiedSDKDownloadLink]:https://developer.expectlabs.com/public/sdks/mindmeld-2.4.1.min.js
[versionedSDKZIPDownloadLink]:https://developer.expectlabs.com/public/sdks/mindmeld-js-sdk-2.4.1.zip

