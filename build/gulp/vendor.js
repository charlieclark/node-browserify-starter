var gulp = require('gulp');
var paths = require("./paths");
var plugins = require("./plugins");
var fs = require("fs");
var gutil = require('gulp-util');
var jsonminify = require("jsonminify");
var _ = require('underscore');
var expect = require('gulp-expect-file');
var path = require('path');

console.log(__dirname);

//load vendor scripts from vendor_config
gulp.task('vendor_scripts', function(cb) {
  fs.readFile(paths.js.vendor_config, "utf-8", function(err, data) {
    var vendorScripts = JSON.parse(jsonminify(data));
    console.log(vendorScripts)
    var stream = gulp.src(vendorScripts).pipe(expect(vendorScripts))
        .pipe(plugins.sourcemaps.init()).pipe(plugins.concat('vendor.js'))
        .pipe(plugins.sourcemaps.write()).pipe(gulp.dest(paths.js.compiled))
        .pipe(plugins.livereload())

    stream.on('end', function() {
      cb();
    });
  });
});

//minify vendor scripts
gulp.task('vendor_scripts_min', ['vendor_scripts'], function() {
  return gulp.src(path.join(paths.js.compiled, "vendor.js")).pipe(plugins.uglify({
    output: {
      ascii_only: true
    }
  })).pipe(plugins.rename('vendor.min.js')).pipe(gulp.dest(paths.js.min))
});
