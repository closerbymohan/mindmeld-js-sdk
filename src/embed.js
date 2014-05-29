var MM = window.MM || {};
( function (MM) {
    MM.loader = MM.loader || {};
    MM.loader.rootURL = MM.loader.rootURL || 'https://developer.expectlabs.com/public/sdks/';

    /**
     * Load a JS file asynchronously
     *
     * @param path
     * @param callback
     */
    function loadJS (path, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = path;
        document.body.appendChild(script);
        script.addEventListener('load', callback, false);
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
     * Dictionary of widget loading functions
     */
    MM.loader.widgetLoaders = {
        search: function () {
            if (MM.loader.widgets.indexOf('voice') !== -1) {
                MM.widgets.config.search = MM.widgets.config.search || {};
                MM.widgets.config.search.voiceNavigatorEnabled = true;
            }
            loadJS(MM.loader.rootURL + 'widgets/searchWidget/mindmeldSearchWidget.js',
                function onSearchWidgetLoad () {
                    MM.loader.$jq('#mm-search').searchwidget();
                }
            );
            loadStyle(MM.loader.rootURL + 'widgets/searchWidget/mindmeldSearchWidget.min.css');
        },

        voice: function () {
            loadJS(MM.loader.rootURL + 'widgets/voiceNavigator/widget/widget.min.js');
            loadStyle(MM.loader.rootURL + 'widgets/voiceNavigator/widget/widget.min.css');
        }
    };

    /**
     * Load all widgets in MM.loader.widgets
     */
    if (Array.isArray(MM.loader.widgets)) {
        MM.loader.widgets.forEach(function (widgetType) {
            if (widgetType in MM.loader.widgetLoaders) {
                MM.loader.widgetLoaders[widgetType]();
            }
        });
    }
}(MM));
