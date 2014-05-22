var gulp = require('gulp');
require('gulp-grunt')(gulp); // Load Grunt tasks for jsdoc until gulp-jsdoc becomes more legit
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat-util');
var rename = require('gulp-rename');
var zip = require('gulp-zip');
var es = require('event-stream');
var replace = require('gulp-replace');
var fs = require('fs');

// Voice navigator dependencies
var nib = require('nib');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var fileinclude = require('gulp-file-include');
var jshint = require('gulp-jshint');

var baseDirOption = {base: './'};
var archiveDirectory = './archive/';

// Bower version used to version files
var bowerVersion = '';
var versionedMindMeldName = '';
var versionedMinifiedMindMeldName = '';

// -------------------------- Mindmeld.js Tasks -------------------------- //
// Uglifies mindmeld.js into mindmeld.min.js
gulp.task('uglifyMM', function () {
    return gulp.src('mindmeld.js')
        .pipe(uglify(), {mangle:true})
        .pipe(rename('mindmeld.min.js'))
        .pipe(gulp.dest('./'));
});

// Moves generated JS Doc, mindmeld.js, mindmeld.min.js and
// HelloWorld page into mindmeld-js-sdk.zip
gulp.task('buildSDK', ['grunt-buildJSDocs', 'uglifyMM'], function () {
    return gulp.src([
        'LICENSE',
        'docs/**',
        'mindmeld.js',
        'mindmeld.min.js',
        'HelloWorld.html'
    ], baseDirOption)
        .pipe(zip('mindmeld-js-sdk.zip'))
        .pipe(gulp.dest('./'));
});

// Parses bower.json for current version and sets file names
// for mindmeld-<version>.js and mindmeld-<version>.min.js
gulp.task('setVersion', function () {
    var bowerPath = './bower.json';
    var bowerData = JSON.parse(fs.readFileSync(bowerPath, 'utf-8'));
    bowerVersion = bowerData.version;
    versionedMindMeldName = 'mindmeld-' + bowerVersion + '.js';
    versionedMinifiedMindMeldName = 'mindmeld-' + bowerVersion + '.min.js';
});

// Copy mindmeld.js and mindmeld.min.js to archive/ directory
gulp.task('archiveJS', ['setVersion', 'uglifyMM'], function () {
    return es.merge(
        gulp.src('mindmeld.js')
            .pipe(rename(versionedMindMeldName))
            .pipe(gulp.dest(archiveDirectory)),

        gulp.src('mindmeld.min.js')
            .pipe(rename(versionedMinifiedMindMeldName))
            .pipe(gulp.dest(archiveDirectory))
    );
});

// Creates archive of SDK at current version
gulp.task('archiveSDK', ['setVersion', 'archiveJS', 'build'], function () {
    return es.merge(
        gulp.src([
            'LICENSE',
            'docs/**'
        ], baseDirOption),

        gulp.src([
                archiveDirectory + versionedMindMeldName,
                archiveDirectory + versionedMinifiedMindMeldName
        ], {base: archiveDirectory}),

        gulp.src('HelloWorld.html')
            .pipe(replace(/mindmeld\.js/, versionedMindMeldName))
    )
        .pipe(zip(archiveDirectory + 'mindmeld-js-sdk-' + bowerVersion + '.zip'))
        .pipe(gulp.dest('./'));
});
// ----------------------------------------------------------------------- //


// ------------------------ Search Widget Tasks ------------------------ //
var searchWidgetLocation = 'widgets/searchWidget/';

gulp.task('buildSearchWidget', ['searchWidgetCSSMin', 'searchWidgetJS']);

// Generates standalone search widget + copies search widget, minified search widget
// and standalone widget into searchWidget/dist/
gulp.task('searchWidgetJS', ['uglifyMM', 'uglifySearchWidget'], function () {
    return es.merge(
        gulp.src(searchWidgetLocation + '/js/jquery.mindmeld-searchwidget.js',
            {base: searchWidgetLocation + 'js'}),

        gulp.src([
            searchWidgetLocation + 'js/vendor.js',
            'mindmeld.min.js',
            searchWidgetLocation + 'dist/jquery.mindmeld-searchwidget.min.js'
        ], baseDirOption)
            .pipe(concat('mindmeldSearchWidget.js'))
            .pipe(concat.footer('}(MM.loader.$jq));'))
    )
        .pipe(gulp.dest(searchWidgetLocation + 'dist'));
});

// Uglifies search widget
gulp.task('uglifySearchWidget', function () {
    return gulp.src(searchWidgetLocation + 'js/jquery.mindmeld-searchwidget.js')
        .pipe(uglify(), {mangle: true})
        .pipe(rename('jquery.mindmeld-searchwidget.min.js'))
        .pipe(gulp.dest(searchWidgetLocation + 'dist'))
});

// Compiles search widget's SASS into CSS
gulp.task('searchWidgetSass', function () {
    return gulp.src(searchWidgetLocation + 'sass/main.scss')
        .pipe(sass())
        .pipe(gulp.dest(searchWidgetLocation + 'css'));
});

// Minifies search widget's CSS and copies into searchWidget/dist
gulp.task('searchWidgetCSSMin', ['searchWidgetSass'], function () {
    return gulp.src(searchWidgetLocation + 'css/main.css')
        .pipe(minifyCSS())
        .pipe(rename('mindmeldSearchWidget.min.css'))
        .pipe(gulp.dest(searchWidgetLocation + 'dist'));
});
// --------------------------------------------------------------------- //

// -------------------------- Voice Navigator -------------------------- //

var voiceNavigatorPath = 'widgets/voiceNavigator/';
var voiceNavBuildLocation = voiceNavigatorPath + 'dist/';

var voiceNavPaths = {
    'voiceNavWidgetCSS' : [
        voiceNavigatorPath + 'css/widget.styl'
    ],
    'voiceNavWidgetJS' : [
        voiceNavigatorPath + 'js/widget.js'
    ],
    'voiceNavModalCSS' : [
        voiceNavigatorPath + 'css/vendor/normalize.styl',
        voiceNavigatorPath + 'css/modal.styl'
    ],
    'voiceNavModalJS' : [
        voiceNavigatorPath + 'js/vendor/jquery-1.10.1.min.js',
        voiceNavigatorPath + 'js/vendor/isotope.pkgd.min.js',
        voiceNavigatorPath + 'js/vendor/jquery.slimscroll.min.js',
        voiceNavigatorPath + 'js/vendor/imagesloaded.pkgd.js',
        voiceNavigatorPath + 'js/vendor/jquery.cookie-1.4.0.js',
        voiceNavigatorPath + 'js/vendor/mindmeld-2.3.0.js',
        voiceNavigatorPath + 'js/entityHighlighting.js',
        voiceNavigatorPath + 'js/modal.js'
    ],
    'modal_img' : [
        voiceNavigatorPath + 'img/modal/*'
    ]
};

/* Shared functions */
function concatAndMinify(target, type, minify, stream) {
    stream = stream
        .pipe(concat(target + '.' + type))
        .pipe(gulp.dest(voiceNavBuildLocation + target))
        .pipe(rename(target + '.min.' + type));
    if (minify) {
        stream = stream
            .pipe(type === 'css' ? minifyCSS() : uglify());
    }
    return stream
        .pipe(gulp.dest(voiceNavBuildLocation + target))

        .pipe(connect.reload());
}
/* Widget Tasks */
gulp.task('voiceNavWidgetCSS', function() {
    var stream = gulp.src(voiceNavPaths.voiceNavWidgetCSS)
        .pipe(stylus({errors: true, use: [nib()]}));

    return concatAndMinify('widget', 'css', true, stream);
});

gulp.task('voiceNavWidgetJS', function() {
    var stream = gulp.src(voiceNavPaths.voiceNavWidgetJS)
        .pipe(fileinclude('@@'));

    return concatAndMinify('widget', 'js', true, stream);
});

gulp.task('voiceNavWidgetCSS_dev', function() {
    var stream = gulp.src(voiceNavPaths.voiceNavWidgetCSS)
        .pipe(stylus({errors: true, use: [nib()]}));

    return concatAndMinify('widget', 'css', false, stream);
});

gulp.task('voiceNavWidgetJS_dev', function() {
    var stream = gulp.src(voiceNavPaths.voiceNavWidgetJS)
        .pipe(fileinclude('@@'));

    return concatAndMinify('widget', 'js', false, stream);
});

/* Modal Tasks */

gulp.task('voiceNavModalCSS', function() {
    var stream = gulp.src(voiceNavPaths.voiceNavModalCSS)
        .pipe(stylus({errors: true, use: [nib()]}));
    return concatAndMinify('modal', 'css', true, stream);
});

gulp.task('voiceNavModalJS', function() {
    var stream = gulp.src(voiceNavPaths.voiceNavModalJS);

    return concatAndMinify('modal', 'js', true, stream);
});

gulp.task('voiceNavModalCSS_dev', function() {
    var stream = gulp.src(voiceNavPaths.voiceNavModalCSS)
        .pipe(stylus({errors: true, use: [nib()]}));
    return concatAndMinify('modal', 'css', false, stream);
});

gulp.task('voiceNavModalJS_dev', function() {
    var stream = gulp.src(voiceNavPaths.voiceNavModalJS);

    return concatAndMinify('modal', 'js', false, stream);
});

gulp.task('voiceNavModalOther', function() {
    var html = gulp.src(voiceNavigatorPath + 'modal.jade')
        .pipe(jade())
        .pipe(gulp.dest(voiceNavBuildLocation + 'modal'))
        .pipe(connect.reload());

    var audio = gulp.src(voiceNavigatorPath + 'done.wav')
        .pipe(gulp.dest(voiceNavBuildLocation + 'modal'));

    var img = gulp.src(voiceNavPaths.modal_img)
        .pipe(gulp.dest(voiceNavBuildLocation + 'modal'));

    return es.merge(html, audio, img);
});

/* Handle all the watching of files */

gulp.task('watchVoiceNav', ['buildVoiceNavigator'], function() {
    gulp.watch(voiceNavPaths.voiceNavModalJS, ['voiceNavModalJS']);
    gulp.watch(voiceNavPaths.voiceNavModalCSS, ['voiceNavModalCSS']);

    gulp.watch(([voiceNavigatorPath + './widget.jade']).concat(voiceNavPaths.voiceNavWidgetJS), ['voiceNavWidgetJS']);
    gulp.watch(voiceNavPaths.voiceNavWidgetCSS, ['voiceNavWidgetCSS']);

    gulp.watch([voiceNavigatorPath + './modal.jade', voiceNavigatorPath + './done.wav'], ['voiceNavModalOther']);
    gulp.watch(voiceNavPaths.modal_img, ['voiceNavModalOther']);
});

// Doesn't minify code
gulp.task('watchVoiceNav_dev', ['devVoiceNav'], function() {
    gulp.watch(voiceNavPaths.voiceNavModalJS, ['voiceNavModalJS_dev']);
    gulp.watch(voiceNavPaths.voiceNavModalCSS, ['voiceNavModalCSS_dev']);

    gulp.watch(([voiceNavigatorPath + './widget.jade']).concat(voiceNavPaths.voiceNavWidgetJS), ['voiceNavWidgetJS_dev']);
    gulp.watch(voiceNavPaths.voiceNavWidgetCSS, ['voiceNavWidgetCSS_dev']);

    gulp.watch([voiceNavigatorPath + './modal.jade', voiceNavigatorPath + './done.wav'], ['voiceNavModalOther']);
    gulp.watch(voiceNavPaths.modal_img, ['voiceNavModalOther']);
});

gulp.task('serve', ['watchVoiceNav'], function() {
    connect.server();
});
gulp.task('serve_dev', ['watchVoiceNav_dev'], function() {
    connect.server();
});

gulp.task('livereload', ['watchVoiceNav'], function() {
    connect.server({
        'livereload': true
    });
});

gulp.task('voiceNavLint', function() {
    return gulp.src([voiceNavigatorPath + 'js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('buildVoiceNavigator'));
});

// Doesn't minify code
gulp.task('devVoiceNav', [
    'voiceNavWidgetCSS_dev', 'voiceNavWidgetJS_dev',
    'voiceNavModalCSS_dev', 'voiceNavModalJS_dev', 'voiceNavModalOther'
]);


// The default task (called when you run `gulp` from cli)
gulp.task('buildVoiceNavigator', [
    'voiceNavWidgetCSS', 'voiceNavWidgetJS',
    'voiceNavModalCSS', 'voiceNavModalJS', 'voiceNavModalOther'
]);

// --------------------------------------------------------------------- //

// General Tasks
gulp.task('build', ['buildSDK', 'buildSearchWidget']);
gulp.task('default', ['build']);
