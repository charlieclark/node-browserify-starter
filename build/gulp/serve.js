var gulp = require('gulp');
var paths = require("./paths");
var plugins = require("./plugins");

var connect = require('gulp-connect');
var open = require('gulp-open');

gulp.task('serve', function() {
  var port = 8080;

  connect.server({
    root: paths.rootPath,
    livereload: true,
    port: port
  });

  gulp.src(__filename).pipe(open({
    uri: 'http://localhost:' + port
  }));
});

gulp.task('serve-release', function() {
  var port = 8090;

  connect.server({
    root: paths.releasePath,
    livereload: false,
    port: port
  });

  gulp.src(__filename).pipe(open({
    uri: 'http://localhost:' + port
  }));
});
