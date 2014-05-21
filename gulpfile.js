var gulp = require('gulp');
require('gulp-grunt')(gulp);
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var zip = require('gulp-zip');

//BUILD
//    'clean:dist',
//    'jsdoc:dist',
//    'uglify:dist',
//    'zip:dist',
//    'buildSearchWidget'

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
   ], {base: './'})
       .pipe(zip('mindmeld-js-sdk.zip'))
       .pipe(gulp.dest('./'));
});

gulp.task('build', ['zipSDK']);

gulp.task('default', ['build']);
