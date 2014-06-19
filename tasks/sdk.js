var gulp = require('gulp');
require('gulp-grunt')(gulp); // Load Grunt tasks for jsdoc until gulp-jsdoc becomes more legit
var concat = require('gulp-concat-util');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var es = require('event-stream');
var zip = require('gulp-zip');
var fs = require('fs');

var rootDirectory = __dirname + '/../';
var exampleDirectory = rootDirectory + 'example/';
var archiveDirectory = rootDirectory + 'archive/';
var distDirectory = rootDirectory + 'dist/';
var srcDirectory = rootDirectory + 'src/';
var baseDirOption = {base: rootDirectory};

var distMMDirectory = distDirectory + 'sdk/';
var srcMMDirectory = srcDirectory + 'sdk/';

// Bower version used to version files
var bowerVersion = '';
var versionedMindMeldName = '';
var versionedMinifiedMindMeldName = '';

gulp.task('buildMM', function () {
    return gulp.src([
            srcMMDirectory + 'vendor/faye.js',
            srcMMDirectory + 'main.js'
    ])
        .pipe(concat('mindmeld.js'))
        .pipe(gulp.dest(distMMDirectory));
});


// Uglifies mindmeld.js into mindmeld.min.js
gulp.task('uglifyMM', ['buildMM'], function () {
    return gulp.src(distMMDirectory + 'mindmeld.js')
        .pipe(uglify(), {mangle:true})
        .pipe(rename('mindmeld.min.js'))
        .pipe(gulp.dest(distMMDirectory));
});

// Moves generated JS Doc, mindmeld.js, mindmeld.min.js and
// HelloWorld page into mindmeld-js-sdk.zip
gulp.task('zipSDK', ['grunt-buildJSDocs', 'uglifyMM'], function () {
    return es.merge(
        gulp.src('LICENSE'),
        gulp.src(distDirectory + 'docs/**', {base: distDirectory}),
        gulp.src(distMMDirectory + '*.js', {base: distMMDirectory}),
        gulp.src(exampleDirectory + 'sdk/HelloWorld.html', {base: exampleDirectory + 'sdk/'})
    )
        .pipe(zip('mindmeld-js-sdk.zip'))
        .pipe(gulp.dest(distMMDirectory));
});

// Parses bower.json for current version and sets file names
// for mindmeld-<version>.js and mindmeld-<version>.min.js
gulp.task('setVersion', function () {
    var bowerPath = rootDirectory + './bower.json';
    var bowerData = JSON.parse(fs.readFileSync(bowerPath, 'utf-8'));
    bowerVersion = bowerData.version;
    versionedMindMeldName = 'mindmeld-' + bowerVersion + '.js';
    versionedMinifiedMindMeldName = 'mindmeld-' + bowerVersion + '.min.js';
});

// Copy mindmeld.js and mindmeld.min.js to archive/ directory
gulp.task('archiveJS', ['setVersion', 'uglifyMM'], function () {
    return es.merge(
        gulp.src(distMMDirectory + 'mindmeld.js', {base: distMMDirectory})
            .pipe(rename(versionedMindMeldName))
            .pipe(gulp.dest(archiveDirectory)),

        gulp.src(distMMDirectory + 'mindmeld.min.js', {base: distMMDirectory})
            .pipe(rename(versionedMinifiedMindMeldName))
            .pipe(gulp.dest(archiveDirectory))
    );
});

// Creates archive of SDK at current version
gulp.task('archiveSDK', ['setVersion', 'archiveJS', 'build'], function () {
    return es.merge(
        gulp.src('LICENSE', baseDirOption),

        gulp.src(distDirectory + 'docs/**', {base: distDirectory}),

        gulp.src([
                archiveDirectory + versionedMindMeldName,
                archiveDirectory + versionedMinifiedMindMeldName
        ], {base: archiveDirectory}),

        gulp.src(exampleDirectory + 'sdk/HelloWorld.html', {base: exampleDirectory + 'sdk/'})
    )
        .pipe(zip('mindmeld-js-sdk-' + bowerVersion + '.zip'))
        .pipe(gulp.dest(archiveDirectory));
});

// Copies embed script to dist directory
gulp.task('distLoader', function () {
    return gulp.src(srcDirectory + 'embed.js')
        .pipe(uglify(), {mangle:true})
        .pipe(gulp.dest(distDirectory));
});

// Watch for changes in mindmeld js files and build mindmeld.js
gulp.task('watchMM', ['uglifyMM', 'distLoader'], function () {
    gulp.watch(srcMMDirectory + '**/*.js', ['buildMM']);
    gulp.watch(srcDirectory + 'embed.js', ['distLoader']);
});

gulp.task('build', ['zipSDK', 'distLoader']);
gulp.task('default', ['build']);