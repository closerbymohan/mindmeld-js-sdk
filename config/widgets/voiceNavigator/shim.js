
var pathToRoot = __dirname + '/../../../../'
var pathToVNJS = pathToRoot + 'src/widgets/voiceNavigator/js/';
var pathToBower = pathToRoot + 'bower_components/';
var paths = {
    "contentloaded": pathToVNJS + "vendor/contentLoaded.js",
    // "faye": pathToRoot + 'src/sdk/vendor/faye.js',
    "isotope": pathToVNJS + "vendor/isotope.pkgd.js",
    "jquery": pathToVNJS + "vendor/jquery-1.11.1.js",
    "jquery.cookie": pathToVNJS + "vendor/jquery.cookie-1.4.0.js",
    "jquery.slimscroll": pathToVNJS + "vendor/jquery.slimscroll.js",
    "mindmeld": pathToRoot + 'dist/sdk/mindmeld.js'
};

module.exports = {};
module.exports[paths['contentloaded']] = { exports: 'contentLoaded' };
// module.exports[paths['faye']] = { exports: 'Faye' };
module.exports[paths['isotope']] = { exports: 'Isotope', depends: {} };
module.exports[paths['isotope']].depends[paths['jquery']] = '$';
module.exports[paths['jquery']] = { exports: '$' };
module.exports[paths['jquery.cookie']] = { depends: {} };
module.exports[paths['jquery.cookie']].depends[paths['jquery']] = '$'
module.exports[paths['jquery.slimscroll']] = { depends: {} };
module.exports[paths['jquery.slimscroll']].depends[paths['jquery']] = '$';
module.exports[paths['mindmeld']] = { exports: "MM", depends: {} };
module.exports[paths['mindmeld']].depends[paths['jquery']] = '$';
// module.exports[paths['mindmeld']].depends[paths['faye']] = 'Faye';
