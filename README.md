# Expect Labs mindmeld-js-sdk Reference

This is the reference document for Expect Labs' MindMeld JavaScript SDK, mindmeld-2.0.js.

## Important Links

* [mindmeld-js-sdk Documentation][sdkDocsLink]
* [Git Repo][repoUrl]
* [Expect Labs Developer Site][developerSite]
* [MindMeld API Documentation][apiDocsLink]


## Installation

There are a few ways to get started using MindMeld JavaScript SDK

### Download from site
The easiest way to install mindmeld-2.0.js is by downloading one of the following
files directly from the Expect Labs site:

* Un-minified: [mindmeld-2.0.js][sdkDownloadLink]
* Minified: [mindmeld-2.0.min.js][sdkMinifiedDownloadLink]

### Clone git repository 
Both files are also available directly from the mindmeld-js-sdk git repository. Simply clone the repo:
```bash
git clone https://github.com/expectlabs/mindmeld-js-sdk.git
```
Copy either mindmeld-2.0.js or mindmeld-2.0.min.js into your project's directory

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
<script src="path/to/mindmeld-2.0.min.js"></script>
```

### With Bower
```html
<script src="bower_components/jquery/jquery.min.js"></script>
<script src="bower_components/mindmeld-js-sdk/mindmeld-2.0.js"></script>
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
To post a text entry to the session

```javascript
var textEntryData = {
    text: 'Sandra Bullock might win an Academy Award for Best Actress in the movie Gravity',
    type: 'text',
    weight: 1.0

};
MM.activeSession.textentries.post(textEntryData);
```

### Example Flow to Get Contextually Relevant Documents to a Conversation
The following code snippet will post a text entry, receive a notification once the MindMeld API
has extracted entities from a text entry, and fetch documents related to the original text entry

```javascript
// Subscribe to push events for when the entities collection updates
MM.activeSession.entities.onUpdate(onEntitiesUpdate, onSubscribedToEntityUpdates);

function onSubscribedToEntityUpdates () {
    console.log('subscribed to updates to the entities collection');

    var textEntryData = {
        text: 'Sandra Bullock might win an Academy Award for Best Actress in the movie Gravity',
        type: 'text',
        weight: 1.0

    };
    console.log('posting a new text entry to the session');
    MM.activeSession.textentries.post(textEntryData);
}

function onEntitiesUpdate () {
    console.log('received an update to the entities collection');
    var entities = MM.activeSession.entities.json();
    console.log('Entities extracted: ' + JSON.stringify(entities));

    // Now, fetch documents
    MM.activeSession.documents.get(null, onDocumentsFetched);
}

function onDocumentsFetched () {
    console.log('fetched documents related to the session');
    // get the documents fetched from MM.activeSession.documents.get()
    var documents =  MM.activeSession.documents.json();
    console.log('Related Documents: ' + JSON.stringify(documents));
}
```

### Sending and Receiving Custom Push Events
In addition to the push events that indicate that API objects have changed, you can also create custom
push events. In the example below, we show you how to subscribe to a custom push event on the user
channel, and then publish a custom push event with a on that same channel. We also do the same for
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

## Repository Contents ([mindmeld-js-sdk](https://github.com/expectlabs/mindmeld-js-sdk))
* *mindmeld-2.0.js*: Un-minified, documented JavaScript SDK
* *mindmeld-2.0.min.js*: Minified, production ready version of mindmeld-2.0.js
* *HelloWorld.html*: Fully functional, stand-alone HTML page demonstrating basic use of mindmeld-2.0.js
* *mindmeld-js-sdk.zip*: Zip archive containing mindmeld-2.0.js, mindmeld-2.0.min.js, and HelloWorld.html
* *docsTemplate/* - templates and configuration required to build JSDoc. Based on
[jaguarjs-doc](https://github.com/davidshimjs/jaguarjs-jsdoc/)
* *Gruntfile.js*: [grunt](http://gruntjs.com/) file for mindmeld-2.0.js used to minify JS, create zip archive, and
generate JSDocs
* *bower.json*: Used to describe client-side dependencies for mindmeld-2.0.js and publish repository to
[bower](http://bower.io/) registry
* *package.json*: Used to describe grunt dependencies
* *README.md*: Describes this file!

## Grunt Tasks

`Gruntfile.js` specifies a `grunt build` task that executes the following tasks:

* `grunt clean` (Cleans up auto-generated files)
* `grunt exec:jsdoc` (Generates JSDocs)
* `grunt uglify:dist` (Minifies `mindmeld-2.0.js` into `mindmeld-2.0.min.js`)
* `grunt zip:dist` (Creates a zip archive of `mindmeld-2.0.js`, `mindmeld-2.0.min.js`, and `HelloWorld.html`)



[sdkDocsLink]:https://developer.expectlabs.com/docs/sdks/js/referenceDocs/
[apiDocsLink]:https://developer.expectlabs.com/docs
[developerSite]:https://developer.expectlabs.com
[repoUrl]:https://github.com/expectlabs/mindmeld-js-sdk
[sdkDownloadLink]:https://developer.expectlabs.com/public/sdks/mindmeld-2.0.js
[sdkMinifiedDownloadLink]:https://developer.expectlabs.com/public/sdks/mindmeld-2.0.min.js