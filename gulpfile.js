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
gulp.task('buildSDK', ['grunt-docs', 'uglifyMM'], function () {
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
gulp.task('buildSearchWidget', ['searchWidgetCSSMin', 'searchWidgetJS']);

// Generates standalone search widget + copies search widget, minified search widget
// and standalone widget into searchWidget/dist/
gulp.task('searchWidgetJS', ['uglifyMM', 'uglifySearchWidget'], function () {
    return es.merge(
        gulp.src('searchWidget/js/jquery.mindmeld-searchwidget.js',
            {base: 'searchWidget/js'}),

        gulp.src([
            'searchWidget/js/vendor.js',
            'mindmeld.min.js',
            'searchWidget/dist/jquery.mindmeld-searchwidget.min.js'
        ], baseDirOption)
            .pipe(concat('mindmeldSearchWidget.js'))
            .pipe(concat.footer('}(MM.__bootstrap.$jq));'))
    )
        .pipe(gulp.dest('searchWidget/dist'));
});

// Uglifies search widget
gulp.task('uglifySearchWidget', function () {
    return gulp.src('searchWidget/js/jquery.mindmeld-searchwidget.js')
        .pipe(uglify(), {mangle: true})
        .pipe(rename('jquery.mindmeld-searchwidget.min.js'))
        .pipe(gulp.dest('searchWidget/dist'))
});

// Compiles search widget's SASS into CSS
gulp.task('searchWidgetSass', function () {
    return gulp.src('searchWidget/sass/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('searchWidget/css'));
});

// Minifies search widget's CSS and copies into searchWidget/dist
gulp.task('searchWidgetCSSMin', ['searchWidgetSass'], function () {
    return gulp.src('searchWidget/css/main.css')
        .pipe(minifyCSS())
        .pipe(rename('mindmeldSearchWidget.min.css'))
        .pipe(gulp.dest('searchWidget/dist'));
});
// --------------------------------------------------------------------- //

// General Tasks
gulp.task('build', ['buildSDK', 'buildSearchWidget']);
gulp.task('default', ['build']);
