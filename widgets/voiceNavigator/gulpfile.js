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
        'voice-navigator:build:widget:css' : [
            object.path + 'css/widget.styl'
        ],
        'voice-navigator:build:widget:js' : [
            object.path + 'js/widget.js'
        ],
        'voice-navigator:build:modal:css' : [
            object.path + 'css/vendor/normalize.styl',
            object.path + 'css/modal.styl'
        ],
        'voice-navigator:build:modal:js' : [
            object.path + 'js/vendor/jquery-1.10.1.min.js',
            object.path + 'js/vendor/isotope.pkgd.min.js',
            object.path + 'js/vendor/jquery.slimscroll.min.js',
            object.path + 'js/vendor/imagesloaded.pkgd.js',
            object.path + 'js/vendor/jquery.cookie-1.4.0.js',
            object.path + '../../mindmeld.js',
            object.path + 'js/entityHighlighting.js',
            object.path + 'js/modal.js'
        ],
        'voice-navigator:build:modal:img' : [
            object.path + 'img/modal/*'
        ],
        'voice-navigator:build:modal:html' : [
            object.path + 'templates/modal.jade'
        ],
        'voice-navigator:build:modal:audio' : [
            object.path + 'audio/*'
        ]
    };
    object.paths['voice-navigator:build:modal:other'] = object.paths['voice-navigator:build:modal:img']
        .concat(object.paths['voice-navigator:build:modal:html'],
                object.paths['voice-navigator:build:modal:audio']);

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
gulp.task('voice-navigator:build:widget:css', function() {
    var stream = gulp.src(voiceNavigator.paths['voice-navigator:build:widget:css'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));

    return concatAndMinify('widget', 'css', true, stream);
});

gulp.task('voice-navigator:build:widget:js', function() {
    var stream = gulp.src(voiceNavigator.paths['voice-navigator:build:widget:js'])
        .pipe(fileinclude('@@'));

    return concatAndMinify('widget', 'js', true, stream);
});

gulp.task('voice-navigator:build:widget:css:nomin', function() {
    var stream = gulp.src(voiceNavigator.paths['voice-navigator:build:widget:css'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));

    return concatAndMinify('widget', 'css', false, stream);
});

gulp.task('voice-navigator:build:widget:js:nomin', function() {
    var stream = gulp.src(voiceNavigator.paths['voice-navigator:build:widget:js']);

    return concatAndMinify('widget', 'js', false, stream);
});

/* Modal Tasks */

gulp.task('voice-navigator:build:modal:css', function() {
    var stream = gulp.src(voiceNavigator.paths['voice-navigator:build:modal:css'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));
    return concatAndMinify('modal', 'css', true, stream);
});

gulp.task('voice-navigator:build:modal:js', function() {
    var stream = gulp.src(voiceNavigator.paths['voice-navigator:build:modal:js']);

    return concatAndMinify('modal', 'js', true, stream);
});

gulp.task('voice-navigator:build:modal:css:nomin', function() {
    var stream = gulp.src(voiceNavigator.paths['voice-navigator:build:modal:css'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));
    return concatAndMinify('modal', 'css', false, stream);
});

gulp.task('voice-navigator:build:modal:js:nomin', function() {
    var stream = gulp.src(voiceNavigator.paths['voice-navigator:build:modal:js']);

    return concatAndMinify('modal', 'js', false, stream);
});

gulp.task('voice-navigator:build:modal:other', function() {
    var html = gulp.src(voiceNavigator.paths['voice-navigator:build:modal:html'])
        .pipe(jade())
        .pipe(gulp.dest(voiceNavigator.buildLocation + 'modal'))
        .pipe(connect.reload());

    var audio = gulp.src(voiceNavigator.paths['voice-navigator:build:modal:audio'])
        .pipe(gulp.dest(voiceNavigator.buildLocation + 'modal'));

    var img = gulp.src(voiceNavigator.paths['voice-navigator:build:modal:img'])
        .pipe(gulp.dest(voiceNavigator.buildLocation + 'modal'));

    return es.merge(html, audio, img);
});

/* Handle all the watching of files */

gulp.task('watch', ['build'], function() {
    var watchLocations = [
        'voice-navigator:build:modal:js',
        'voice-navigator:build:modal:css',
        'voice-navigator:build:widget:js',
        'voice-navigator:build:widget:css',
        'voice-navigator:build:widget:other'
    ];

    for (var i = 0; i < watchLocations.length; i++) {
        gulp.watch(voiceNavigator.paths[watchLocations[i]], watchLocations[i]);
    }
});

// Doesn't minify code
gulp.task('watch:nomin', ['voice-navigator:build:nomin'], function() {
    var watchLocations = [
        'voice-navigator:build:modal:js',
        'voice-navigator:build:modal:css',
        'voice-navigator:build:widget:js',
        'voice-navigator:build:widget:css'
    ];

    for (var i = 0; i < watchLocations.length; i++) {
        gulp.watch(voiceNavigator.paths[watchLocations[i]], watchLocations[i] + ':nomin');
    }
    gulp.watch(voiceNavigator.paths['voice-navigator:build:widget:other'], 'voice-navigator:build:widget:other');
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
        .pipe(jshint.reporter('voice-navigator:build'));
});

// Doesn't minify code
gulp.task('voice-navigator:build:nomin', [
    'voice-navigator:build:widget:css:nomin', 'voice-navigator:build:widget:js:nomin',
    'voice-navigator:build:modal:css:nomin', 'voice-navigator:build:modal:js:nomin', 'voice-navigator:build:modal:other'
]);


// The default task (called when you run `gulp` from cli)
gulp.task('voice-navigator:build', [
    'voice-navigator:build:widget:css', 'voice-navigator:build:widget:js',
    'voice-navigator:build:modal:css', 'voice-navigator:build:modal:js', 'voice-navigator:build:modal:other'
]);

gulp.task('test', function() {
    util.log('Hello from Voice Navigator\'s gulpfile');
    return null;
});

// Task to show list of tasks
gulp.task('tasks', taskListing);

gulp.task('default', ['build']);
>>>>>>> Stashed changes
