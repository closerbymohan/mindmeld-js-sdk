var MM = window.MM || {};
( function (MM) {
    MM.loader = MM.loader || {};
    MM.loader.rootURL = MM.loader.rootURL || 'https://developer.expectlabs.com/public/sdks/';

    // Internal loader state

    // Array of widget names that have been loaded
    var loadedWidgets = [];

    // Dictionary of widget name to arrays of callbacks
    // to be called when widget loads
    var onLoadedCallbacks = {};


    /**
     * Load a JS file asynchronously
     *
     * @param path
     * @param widgetName
     * @param {function=} callback
     */
    function loadJS (path, widgetName, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = path;
        document.body.appendChild(script);
        script.addEventListener(
            'load',
            function onScriptLoaded () {
                setWidgetLoaded(widgetName);
            },
            false
        );
        MM.loader.widgetLoaded(widgetName, callback);
    }

    /**
     * Load a CSS file asynchronously
     *
     * @param path
     */
    function loadStyle (path) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = path;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(link);
    }

    /**
     * Mark a widget name as loaded and call onLoadedCallbacks
     * if they exist
     *
     * @param widgetName
     */
    function setWidgetLoaded (widgetName) {
        loadedWidgets.push(widgetName);
        if (widgetName in onLoadedCallbacks) {
            onLoadedCallbacks[widgetName].forEach(function (callback) {
                callback();
            });
            delete onLoadedCallbacks[widgetName];
        }
    }

    /**
     * Set a callback for when a given widget is loaded. If the
     * widget is already loaded, the callback is fired
     * immediately
     *
     * @param widgetName
     * @param callback
     */
    MM.loader.widgetLoaded = function (widgetName, callback) {
        if (typeof callback === 'function') {
            if (loadedWidgets.indexOf(widgetName) !== -1) {
                callback();
            }
            else {
                if (! (widgetName in onLoadedCallbacks)) {
                    onLoadedCallbacks[widgetName] = [];
                }
                onLoadedCallbacks[widgetName].push(callback);
            }
        }
    };

    /**
     * Dictionary of widget loading functions
     */
    MM.loader.widgetLoaders = {
        search: function (widgetName) {
            if (MM.loader.widgets.indexOf('voice') !== -1) {
                MM.widgets.config.search = MM.widgets.config.search || {};
                MM.widgets.config.search.voiceNavigatorEnabled = true;
            }
            loadJS(
                MM.loader.rootURL + 'widgets/searchWidget/mindmeldSearchWidget.js',
                widgetName,
                function onSearchWidgetLoad () {
                    MM.loader.$jq('#mm-search').searchwidget();
                }
            );

            loadStyle(MM.loader.rootURL + 'widgets/searchWidget/mindmeldSearchWidget.min.css');
        },

        voice: function (widgetName) {
            var filesURL = MM.loader.rootURL + 'widgets/voiceNavigator/widget/widget.';
            if (!MM.widgets.config.voice.development) {
                filesURL += 'min.';
            }

            loadJS(filesURL + 'js', widgetName);
            loadStyle(filesURL + 'css');
        }
    };

    /**
     * Load all widgets in MM.loader.widgets. This kicks
     * everything off
     */
    if (Array.isArray(MM.loader.widgets)) {
        MM.loader.widgets.forEach(function (widgetName) {
            if (widgetName in MM.loader.widgetLoaders) {
                MM.loader.widgetLoaders[widgetName](widgetName);
            }
        });
    }
}(MM));
