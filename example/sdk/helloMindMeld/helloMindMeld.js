
var config = {
    appid: '7d6d5d9a76691f2dee36dcc28b77ed83a8ba1e1e',
    onInit: onMMInit
};
MM.init(config);
function onMMInit () {
    var message = 'MM SDK Ready with version: ' + MM.version;
    if (typeof document !== 'undefined') {
        var p = document.getElementById('message');
        if (p) {
            p.innerHTML = message;
        }
    }

    console.log(message);
}