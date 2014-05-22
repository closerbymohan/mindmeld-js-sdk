var MM = window.MM || {};
MM.__bootstrap = MM.__bootstrap || {};
MM.__bootstrap.rootURL = MM.__bootstrap.rootURL || 'https://developer.expectlabs.com/public/sdks/';

MM.__bootstrap.loadJS = function (path, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = path;
    document.body.appendChild(script);
    script.addEventListener('load', callback, false);
};

MM.__bootstrap.loadStyle = function (path) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = path;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(link);
};

if (MM.__bootstrap.searchWidget) {
    MM.__bootstrap.loadJS(MM.__bootstrap.rootURL + 'searchWidget/mindmeldSearchWidget.js', function () {
        MM.__bootstrap.$jq('#mm-search').searchwidget(MM.__bootstrap.searchWidget.options);
    });
    MM.__bootstrap.loadStyle(MM.__bootstrap.rootURL + 'searchWidget/mindmeldSearchWidget.min.css');
}