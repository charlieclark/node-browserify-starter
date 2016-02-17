var gulp = require('gulp');
var paths = require('./paths');
var plugins = require('./plugins');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var path = require('path');
var watch;
var myBundle = null;

gulp.task('user_scripts_min', ['browserify_nowatch'], function() {
  return gulp.src(path.join(paths.js.compiled, 'bundle.js'))
    .pipe(plugins.uglify().on('error', gutil.log))
    .pipe(plugins.rename('bundle.min.js'))
    .pipe(gulp.dest(paths.js.min))
});

gulp.task('browserify_watch', function() {
  watch = true;
  return browserifyWrap();
});

gulp.task('browserify_nowatch', function() {
  watch = false
  return browserifyWrap();
});

function browserifyWrap() {
  b = browserify({
    debug: true,
    paths: [paths.js.user, paths.build.nodeModules, paths.styles.shared, paths.demo.public],
    cache: {},
    packageCache: {}
  });

  b.transform('node-underscorify').transform(babelify)

  if (watch) {
    b = watchify(b);
    b.on('update', function() {
      console.log('user code updated');
      bundle(b);
    });
  }

  b.add(path.join(paths.js.user, 'app.js'));

  return bundle(b);
};

function bundle(myBundle) {
  return myBundle.bundle()
  .on("error", plugins.notify.onError(function (error) {
    return "JS error: " + error;
  }))
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(paths.js.compiled))
  .pipe(plugins.livereload());
};
