var gulp = require('gulp');
var paths = require("./paths");
var fs = require('fs');
var mkdirp = require('mkdirp');
var _ = require('underscore');
var ncp = require('ncp').ncp;
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var path = require('path');

gulp.task('release', function(cb) {
  runSequence(
    ['vendor_scripts_min', 'user_scripts_min', 'minify-css'],
    // 'move-release',
    // 'serve-release',
    cb
  );
});

gulp.task('dev', function(cb) {
  runSequence(
    ['vendor_scripts', 'browserify_nowatch', 'sass'],
    'watch',
    'serve'
  );
});

gulp.task('move-release', function(cb) {
  var releasePaths = _.extend({}, paths);
  traverseMapString(releasePaths, function(key, value) {
    return value.replace(paths.rootPath, paths.releasePath);
  });
  var ignore = [".sass-cache"];
  rimraf(paths.releasePath, function() {
    fs.mkdir(paths.releasePath, function() {
      ncp(paths.rootPath, paths.releasePath, {
        filter: function(path) {
          var use = true;
          for (var i = 0, l = ignore.length; i < l; i++) {
            if (path.indexOf(ignore[i]) >= 0) {
              use = false;
              break;
            }
          }
          return use;
        }
      }, function() {

        // TODO: refactor this
        fs.renameSync(path.join(releasePaths.js.min, "bundle.min.js"), path.join(releasePaths.js.compiled, "bundle.js"));
        fs.renameSync(path.join(releasePaths.js.min, "vendor.min.js"), path.join(releasePaths.js.compiled, "vendor.js"));
        fs.renameSync(path.join(releasePaths.styles.min, "app.min.css"), path.join(releasePaths.styles.css, "app.css"));
        fs.unlink(releasePaths.js.vendor_config);
        rimraf(releasePaths.js.lib, function() {});
        rimraf(releasePaths.js.min, function() {});
        rimraf(releasePaths.js.user, function() {});
        rimraf(releasePaths.styles.sass, function() {});
        rimraf(releasePaths.styles.min, function() {});
        rimraf(releasePaths.styles.shared, function() {});

        // potentially temporary
        rimraf(path.join(releasePaths.releasePath, "test_assets"), function() {});
        fs.unlink(path.join(releasePaths.releasePath, "test.html"));
        cb();
      });
    });
  });
});

function traverseMapString(o, func) {
  for (var i in o) {
    if (o[i] !== null && typeof(o[i]) == "object") {
      //going on step down in the object tree!!
      traverseMapString(o[i], func);
    } else {
      var newValue = func.apply(this, [i, o[i]]);
      o[i] = newValue;
    }
  }
}
