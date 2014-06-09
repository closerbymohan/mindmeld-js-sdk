var gulp = require('gulp');

var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat-util');
var rename = require('gulp-rename');
var es = require('event-stream');
var taskListing = require('gulp-task-listing');
var chug = require('gulp-chug');
var replace = require('gulp-replace');

var nib = require('nib');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var connect = require('gulp-connect');

var fileinclude = require('gulp-file-include');
var jshint = require('gulp-jshint');

var voiceNavigator  = (function() {
    var object = {};
    var rootDirectory = '../';
    var sourceVoiceNav = rootDirectory + 'src/widgets/voiceNavigator/';
    object.distVoiceNav = rootDirectory + 'dist/widgets/voiceNavigator/';
    object.sdkGulpfilePath = rootDirectory + 'tasks/sdk.js';
    object.paths = {
        'build.widget.css' : [
                sourceVoiceNav + 'css/widget.styl'
        ],
        'build.widget.js' : [
                sourceVoiceNav + 'js/widget.js'
        ],
        'build.modal.css.modal' : [
                sourceVoiceNav + 'css/vendor/normalize.styl',
                sourceVoiceNav + 'css/modal/modal.styl'
        ],
        'build.modal.css.cards' : [
                sourceVoiceNav + 'css/modal/cards.styl'
        ],
        'build.modal.js' : [
                sourceVoiceNav + 'js/vendor/jquery-1.10.1.min.js',
                sourceVoiceNav + 'js/vendor/isotope.pkgd.min.js',
                sourceVoiceNav + 'js/vendor/jquery.slimscroll.min.js',
                sourceVoiceNav + 'js/vendor/imagesloaded.pkgd.js',
                sourceVoiceNav + 'js/vendor/jquery.cookie-1.4.0.js',
                sourceVoiceNav + 'js/vendor/lodash.compat.min.js',
                rootDirectory + 'dist/sdk/mindmeld.js',
                sourceVoiceNav + 'js/entityHighlighting.js',
                sourceVoiceNav + 'js/modal.js'
        ],
        'build.modal.img' : [
                sourceVoiceNav + 'img/modal/*'
        ],
        'build.modal.html' : [
                sourceVoiceNav + 'html/modal.jade'
        ],
        'build.modal.audio' : [
                sourceVoiceNav + 'audio/*'
        ]
    };
    object.paths['build.modal.css'] = object.paths['build.modal.css.modal']
        .concat(object.paths['build.modal.css.cards']);
    object.paths['build.modal.other'] = object.paths['build.modal.img']
        .concat(object.paths['build.modal.audio']);

    return object;
})();

function genericMinify(type) {
    switch (type) {
        case 'js':
            return uglify();
        case 'css':
            return minifyCSS();
        case 'html':
        default:
            return replace(/(modal|cards)\.(css|js)/g, '$1.min.$2');
    }
}

/* Shared functions */
function concatAndMinify(stream, name, type, directory) {
    directory = directory || name;
    stream = stream
        .pipe(concat(name + '.' + type))
        .pipe(gulp.dest(voiceNavigator.distVoiceNav + directory))
        .pipe(rename(name + '.min.' + type));
    if (name === 'widget' && directory === 'widget' && type === 'js') {
        stream = stream.pipe(replace(/modal\.html/g, 'modal.min.html'));
    }
    return stream
        .pipe(genericMinify(type))
        .pipe(gulp.dest(voiceNavigator.distVoiceNav + directory))

        .pipe(connect.reload());
}

/* Widget Tasks */
gulp.task('build.widget.css', function() {
    var stream = gulp.src(voiceNavigator.paths['build.widget.css'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));

    return concatAndMinify(stream, 'widget', 'css');
});

gulp.task('build.widget.js', function() {
    var stream = gulp.src(voiceNavigator.paths['build.widget.js'])
        .pipe(fileinclude('@@'));

    return concatAndMinify(stream, 'widget', 'js');
});

/* Modal Tasks */

gulp.task('build.modal.css.cards', function() {
    var stream = gulp.src(voiceNavigator.paths['build.modal.css.cards'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));
    return concatAndMinify(stream, 'cards', 'css', 'modal');
});

gulp.task('build.modal.css.modal', function() {
    var stream = gulp.src(voiceNavigator.paths['build.modal.css.modal'])
        .pipe(stylus({ errors: true, use: [ nib() ] }));
    return concatAndMinify(stream, 'modal', 'css');
});

gulp.task('build.modal.css', ['build.modal.css.modal', 'build.modal.css.cards']);

gulp.task('build.modal.js', ['buildMM'], function() {
    var stream = gulp.src(voiceNavigator.paths['build.modal.js']);
    return concatAndMinify(stream, 'modal', 'js');
});

gulp.task('build.modal.html', function() {
    var stream = gulp.src(voiceNavigator.paths['build.modal.html'])
        .pipe(jade());

    return concatAndMinify(stream, 'modal', 'html');
});

gulp.task('build.modal.other', function() {
    var audio = gulp.src(voiceNavigator.paths['build.modal.audio'])
        .pipe(gulp.dest(voiceNavigator.distVoiceNav + 'modal'));

    var img = gulp.src(voiceNavigator.paths['build.modal.img'])
        .pipe(gulp.dest(voiceNavigator.distVoiceNav + 'modal'));

    return es.merge(audio, img);
});

/* Handle all the watching of files */

gulp.task('watch', ['build'], function() {
    var watchLocations = [
        'build.modal.js',
        'build.modal.css',
        'build.modal.html',
        'build.modal.other',
        'build.widget.js',
        'build.widget.css'
    ];

    for (var i = 0; i < watchLocations.length; i++) {
        gulp.watch(voiceNavigator.paths[watchLocations[i]], [ watchLocations[i] ]);
    }
});

gulp.task('serve', ['watch'], function() {
    connect.server({
        root: '../',
        https: true,
        livereload: false
    });
});

gulp.task('serve.livereload', ['watch'], function() {
    connect.server({
        root: '../',
        https: true,
        livereload: true
    });
});

gulp.task('lint', function() {
    return gulp.src([voiceNavigator.path + 'js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('buildMM', function () {
    return gulp.src(voiceNavigator.sdkGulpfilePath, {read: false})
        .pipe(chug({tasks: ['buildMM']}));
});

// The default task (called when you run `gulp` from cli)
gulp.task('build', [
    'build.widget.css', 'build.widget.js',
    'build.modal.css', 'build.modal.js', 'build.modal.html', 'build.modal.other'
]);

// Task to show list of tasks
gulp.task('tasks', taskListing);

gulp.task('default', ['build']);
