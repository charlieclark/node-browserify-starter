// load gulp plugins: they become with plugins.NAME
var plugins = require('gulp-load-plugins')({
  rename: {}
});
plugins.runSequence = require('run-sequence');
module.exports = plugins;
