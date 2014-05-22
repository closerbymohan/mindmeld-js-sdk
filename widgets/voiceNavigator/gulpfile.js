var gulp = require('gulp');
var es = require('event-stream');
var nib = require('nib');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var jade = require('gulp-jade');
var minifyCSS = require('gulp-minify-css');
var connect = require('gulp-connect');
var fileinclude = require('gulp-file-include');

var paths = {
  'widget_css' : [
    'css/widget.styl'
  ],
  'widget_js' : [
    'js/widget.js'
  ],
  'modal_css' : [
    'css/vendor/normalize.styl',
    'css/modal.styl'
  ],
  'modal_js' : [
    'js/vendor/jquery-1.10.1.min.js',
    'js/vendor/isotope.pkgd.min.js',
    'js/vendor/jquery.slimscroll.min.js',
    'js/vendor/imagesloaded.pkgd.js',
    'js/vendor/jquery.cookie-1.4.0.js',
    'js/vendor/mindmeld-2.3.0.js',
    'js/entityHighlighting.js',
    'js/modal.js'
  ],
  'modal_img' : [
    'img/modal/*'
  ]
};

/* Shared functions */

function concatAndMinify(target, type, minify, stream) {
  var stream = stream
      .pipe(concat(target + '.' + type))
      .pipe(gulp.dest('./_build/' + target))
      .pipe(rename(target + '.min.' + type));
  if (minify) {
    stream = stream
        .pipe(type === 'css' ? minifyCSS() : uglify());
  }
  return stream
      .pipe(gulp.dest('./_build/' + target))

      .pipe(connect.reload());
}

/* Widget Tasks */

gulp.task('widget_template', function () {
    return gulp.src('widget.jade')
        .pipe(jade({client: true}))
        .pipe(concat('widget.template.js'))
        .pipe(gulp.dest('./_build'));
});

gulp.task('widget_css', function() {
  var stream = gulp.src(paths.widget_css)
      .pipe(stylus({errors: true, use: [nib()]}));

  return concatAndMinify('widget', 'css', true, stream);
});

gulp.task('widget_js', ['widget_template'], function() {
  var stream = gulp.src(paths.widget_js)
      .pipe(fileinclude('@@'))

  return concatAndMinify('widget', 'js', true, stream);
});

gulp.task('widget_css_dev', function() {
  var stream = gulp.src(paths.widget_css)
      .pipe(stylus({errors: true, use: [nib()]}));

  return concatAndMinify('widget', 'css', false, stream);
});

gulp.task('widget_js_dev', ['widget_template'], function() {
  var stream = gulp.src(paths.widget_js)
      .pipe(fileinclude('@@'))

  return concatAndMinify('widget', 'js', false, stream);
});

/* Modal Tasks */

gulp.task('modal_css', function() {
  var stream = gulp.src(paths.modal_css)
      .pipe(stylus({errors: true, use: [nib()]}));
  return concatAndMinify('modal', 'css', true, stream);
});

gulp.task('modal_js', function() {
  var stream = gulp.src(paths.modal_js);

  return concatAndMinify('modal', 'js', true, stream);
});

gulp.task('modal_css_dev', function() {
  var stream = gulp.src(paths.modal_css)
      .pipe(stylus({errors: true, use: [nib()]}));
  return concatAndMinify('modal', 'css', false, stream);
});

gulp.task('modal_js_dev', function() {
  var stream = gulp.src(paths.modal_js);

  return concatAndMinify('modal', 'js', false, stream);
});

gulp.task('modal_other', function() {
  var html = gulp.src('modal.jade')
    .pipe(jade())
    .pipe(gulp.dest('./_build/modal'))
    .pipe(connect.reload());

  var audio = gulp.src('done.wav')
    .pipe(gulp.dest('./_build/modal'));

  var img = gulp.src(paths.modal_img)
    .pipe(gulp.dest('./_build/modal'));

  return es.merge(html, audio, img);
});

/* Handle all the watching of files */

gulp.task('watch', ['default'], function() {
  gulp.watch(paths.modal_js, ['modal_js']);
  gulp.watch(paths.modal_css, ['modal_css']);

  gulp.watch((['./widget.jade']).concat(paths.widget_js), ['widget_js']);
  gulp.watch(paths.widget_css, ['widget_css']);

  gulp.watch(['./modal.jade', './done.wav'], ['modal_other']);
  gulp.watch(paths.modal_img, ['modal_other']);
});

// Doesn't minify code
gulp.task('watch_dev', ['dev'], function() {
  gulp.watch(paths.modal_js, ['modal_js_dev']);
  gulp.watch(paths.modal_css, ['modal_css_dev']);

  gulp.watch((['./widget.jade']).concat(paths.widget_js), ['widget_js_dev']);
  gulp.watch(paths.widget_css, ['widget_css_dev']);

  gulp.watch(['./modal.jade', './done.wav'], ['modal_other']);
  gulp.watch(paths.modal_img, ['modal_other']);
});

gulp.task('serve', ['watch'], function() {
  connect.server();
});
gulp.task('serve_dev', ['watch_dev'], function() {
  connect.server();
});

gulp.task('livereload', ['watch'], function() {
  connect.server({
    'livereload': true
  });
});

gulp.task('lint', function() {
  return gulp.src(['js/*.js', 'gulpfile.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

// Doesn't minify code
gulp.task('dev', [
  'widget_css_dev', 'widget_js_dev',
  'modal_css_dev', 'modal_js_dev', 'modal_other'
]);


// The default task (called when you run `gulp` from cli)
gulp.task('default', [
  'widget_css', 'widget_js',
  'modal_css', 'modal_js', 'modal_other'
]);

