var gulp = require('gulp');
require('gulp-grunt')(gulp); // Load Grunt tasks for jsdoc until gulp-jsdoc becomes more legit
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
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

gulp.task('cleanBuilt', function () {
   return gulp.src([
       'mindmeld.min.js',
       'mindmeld-js-sdk.zip'
   ]).
       pipe(clean());
});

gulp.task('cleanCompressed', function () {
    return gulp.src('mindmeld.min.js', {read: false})
        .pipe(clean());
});

gulp.task('cleanZip', function () {
    return gulp.src('mindmeld-js-sdk.zip', {read: false})
        .pipe(clean());
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
gulp.task('archiveJS', ['setVersion', 'compressMM'], function () {
    gulp.src('mindmeld.js')
        .pipe(rename(versionedMindMeldName))
        .pipe(gulp.dest(archiveDirectory));

    gulp.src('mindmeld.min.js')
        .pipe(rename(versionedMinifiedMindMeldName))
        .pipe(gulp.dest(archiveDirectory));
});

// Creates archive of SDK at current version
gulp.task('archiveSDK', ['setVersion', 'archiveJS', 'build'], function () {
    es.merge(
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

gulp.task('compressMM', ['cleanCompressed'], function () {
   return gulp.src('mindmeld.js')
       .pipe(uglify(), {mangle:true})
       .pipe(rename('mindmeld.min.js'))
       .pipe(gulp.dest('./'));
});

gulp.task('zipSDK', ['grunt-docs', 'compressMM', 'cleanZip'], function () {
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

gulp.task('build', ['zipSDK']);

gulp.task('default', ['build']);
