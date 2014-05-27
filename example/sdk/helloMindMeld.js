
var config = {
    appid: '7d6d5d9a76691f2dee36dcc28b77ed83a8ba1e1e',
    onInit: onMMInit
};
MM.init(config);
function onMMInit () {
    console.log('MM SDK Ready with version: ' + MM.version);
}