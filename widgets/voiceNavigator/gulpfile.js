var gulp = require('gulp');

var util = require('gulp-util');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat-util');
var rename = require('gulp-rename');
var es = require('event-stream');
var taskListing = require('gulp-task-listing');

var nib = require('nib');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var connect = require('gulp-connect');

var fileinclude = require('gulp-file-include');
var jshint = require('gulp-jshint');

//var voiceNavigator.path = 'widgets/voiceNavigator/';
var voiceNavigator  = (function(){
    var object = {};
    object.path = './';
    object.buildLocation = object.path + 'dist/';
    object.paths = {
        'build:widget:css' : [
            object.path + 'css/widget.styl'
        ],
        'build:widget:js' : [
            object.path + 'js/widget.js'
        ],
        'build:modal:css' : [
            object.path + 'css/vendor/normalize.styl',
            object.path + 'css/modal.styl'
        ],
        'build:modal:js' : [
            object.path + 'js/vendor/jquery-1.10.1.min.js',
            object.path + 'js/vendor/isotope.pkgd.min.js',
            object.path + 'js/vendor/jquery.slimscroll.min.js',
            object.path + 'js/vendor/imagesloaded.pkgd.js',
            object.path + 'js/vendor/jquery.cookie-1.4.0.js',
            object.path + '../../mindmeld.js',
            object.path + 'js/entityHighlighting.js',
            object.path + 'js/modal.js'
        ],
        'build:modal:img' : [
            object.path + 'img/modal/*'
        ],
        'build:modal:html' : [
            object.path + 'templates/modal.jade'
        ],
        'build:modal:audio' : [
            object.path + 'audio/*'
        ]
    };
    object.paths['build:modal:other'] = object.paths['build:modal:img']
        .concat(object.paths['build:modal:html'],
                object.paths['build:modal:audio']);

    return object;
})();

/* Shared functions */
function concatAndMinify(target, type, minify, stream) {
    stream = stream
        .pipe(concat(target + '.' + type))
        .pipe(gulp.dest(voiceNavigator.buildLocation + target))
        .pipe(rename(target + '.min.' + type));
    if (minify) {
        stream = stream
            .pipe(type === 'css' ? minifyCSS() : uglify());
    }
    return stream
        .pipe(gulp.dest(voiceNavigator.buildLocation + target))

        .pipe(connect.reload());
}

/* Widget Tasks */
gulp.task('build:widget:css', function() {
    var stream = gulp.src(voiceNavigator.paths['build:widget:css'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));

    return concatAndMinify('widget', 'css', true, stream);
});

gulp.task('build:widget:js', function() {
    var stream = gulp.src(voiceNavigator.paths['build:widget:js'])
        .pipe(fileinclude('@@'));

    return concatAndMinify('widget', 'js', true, stream);
});

gulp.task('build:widget:css:nomin', function() {
    var stream = gulp.src(voiceNavigator.paths['build:widget:css'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));

    return concatAndMinify('widget', 'css', false, stream);
});

gulp.task('build:widget:js:nomin', function() {
    var stream = gulp.src(voiceNavigator.paths['build:widget:js']);

    return concatAndMinify('widget', 'js', false, stream);
});

/* Modal Tasks */

gulp.task('build:modal:css', function() {
    var stream = gulp.src(voiceNavigator.paths['build:modal:css'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));
    return concatAndMinify('modal', 'css', true, stream);
});

gulp.task('build:modal:js', function() {
    var stream = gulp.src(voiceNavigator.paths['build:modal:js']);

    return concatAndMinify('modal', 'js', true, stream);
});

gulp.task('build:modal:css:nomin', function() {
    var stream = gulp.src(voiceNavigator.paths['build:modal:css'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));
    return concatAndMinify('modal', 'css', false, stream);
});

gulp.task('build:modal:js:nomin', function() {
    var stream = gulp.src(voiceNavigator.paths['build:modal:js']);

    return concatAndMinify('modal', 'js', false, stream);
});

gulp.task('build:modal:other', function() {
    var html = gulp.src(voiceNavigator.paths['build:modal:html'])
        .pipe(jade())
        .pipe(gulp.dest(voiceNavigator.buildLocation + 'modal'))
        .pipe(connect.reload());

    var audio = gulp.src(voiceNavigator.paths['build:modal:audio'])
        .pipe(gulp.dest(voiceNavigator.buildLocation + 'modal'));

    var img = gulp.src(voiceNavigator.paths['build:modal:img'])
        .pipe(gulp.dest(voiceNavigator.buildLocation + 'modal'));

    return es.merge(html, audio, img);
});

/* Handle all the watching of files */

gulp.task('watch', ['build'], function() {
    var watchLocations = [
        'build:modal:js',
        'build:modal:css',
        'build:widget:js',
        'build:widget:css',
        'build:widget:other'
    ];

    for (var i = 0; i < watchLocations.length; i++) {
        gulp.watch(voiceNavigator.paths[watchLocations[i]], watchLocations[i]);
    }
});

// Doesn't minify code
gulp.task('watch:nomin', ['build:nomin'], function() {
    var watchLocations = [
        'build:modal:js',
        'build:modal:css',
        'build:widget:js',
        'build:widget:css'
    ];

    for (var i = 0; i < watchLocations.length; i++) {
        gulp.watch(voiceNavigator.paths[watchLocations[i]], watchLocations[i] + ':nomin');
    }
    gulp.watch(voiceNavigator.paths['build:widget:other'], 'build:widget:other');
});

gulp.task('serve', ['watch'], function() {
    connect.server();
});
gulp.task('serve:nomin', ['watch:nomin'], function() {
    connect.server();
});

gulp.task('serve:livereload', ['watch'], function() {
    connect.server({
        'livereload': true
    });
});

gulp.task('serve:livereload:nomin', ['watch:nomin'], function() {
    connect.server({
        'livereload': true
    });
});

gulp.task('lint', function() {
    return gulp.src([voiceNavigator.path + 'js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('build'));
});

// Doesn't minify code
gulp.task('build:nomin', [
    'build:widget:css:nomin', 'build:widget:js:nomin',
    'build:modal:css:nomin', 'build:modal:js:nomin', 'build:modal:other'
]);


// The default task (called when you run `gulp` from cli)
gulp.task('build', [
    'build:widget:css', 'build:widget:js',
    'build:modal:css', 'build:modal:js', 'build:modal:other'
]);

gulp.task('test', function() {
    util.log('Hello from Voice Navigator\'s gulpfile');
    return null;
});

// Task to show list of tasks
gulp.task('tasks', taskListing);

gulp.task('default', ['build']);
