EL = EL || {};
EL.rootURL = EL.rootURL || 'https://developer.expectlabs.com/public/sdks/';

EL.loadJS = function (path, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = path;
    document.body.appendChild(script);
    script.addEventListener('load', callback, false);
};

EL.loadStyle = function (path) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = path;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(link);
};

if (EL.searchWidget) {
    EL.loadJS(EL.rootURL + 'searchWidget/mindmeldSearchWidget.js', function () {
        EL.$jq('#mm-search').searchwidget(EL.searchWidget.options);
    });
    EL.loadStyle(EL.rootURL + 'searchWidget/mindmeldSearchWidget.min.css');
}