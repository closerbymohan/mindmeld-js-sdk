var MM = window.MM || {};
MM.loader = MM.loader || {};
MM.loader.rootURL = MM.loader.rootURL || 'https://developer.expectlabs.com/public/sdks/';

MM.loader.loadJS = function (path, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = path;
    document.body.appendChild(script);
    script.addEventListener('load', callback, false);
};

MM.loader.loadStyle = function (path) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = path;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(link);
};

if (MM.loader.searchWidget) {
    MM.loader.loadJS(MM.loader.rootURL + 'widgets/searchWidget/mindmeldSearchWidget.js', function () {
        MM.loader.$jq('#mm-search').searchwidget(MM.loader.searchWidget.options);
    });
    MM.loader.loadStyle(MM.loader.rootURL + 'widgets/searchWidget/mindmeldSearchWidget.min.css');
}

if (MM.voiceNavigator && MM.voiceNavigator.options) {
    MM.loader.loadJS(MM.loader.rootURL + 'widgets/voiceNavigator/widget/widget.min.js');
    MM.loader.loadStyle(MM.loader.rootURL + 'widets/voiceNavigator/widget/widget.min.css');
}
