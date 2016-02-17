var path = require('path');
var buildPath = global._root;
var projectPath = path.resolve(buildPath, '../server');
var rootPath = path.join(projectPath, 'public');
var assetPath = path.join(rootPath, 'assets');
var gulpPath = path.join(buildPath, 'gulp');
var releasePath = path.join(projectPath, 'release');

var paths = {
  projectPath: projectPath,
  buildPath: buildPath,
  rootPath: rootPath,
  assetPath: assetPath,
  gulpPath: gulpPath,
  releasePath: releasePath,
  docsPath: path.join(projectPath, 'docs'),
  build: {
    nodeModules: path.join(buildPath, 'node_modules')
  },
  js: {
    base: path.join(assetPath, 'js'),
    user: path.join(assetPath, 'js/user'),
    vendor_config: path.join(assetPath, 'js/vendor_config.json'),
    lib: path.join(assetPath, 'js/lib'),
    compiled: path.join(assetPath, 'js/compiled'),
    min: path.join(assetPath, 'js/min'),
  },
  styles: {
    sass: path.join(assetPath, 'styles/sass'),
    css: path.join(assetPath, 'styles/css'),
    min: path.join(assetPath, 'styles/min'),
    shared: path.join(assetPath, 'styles/shared')
  },
  //custom
  demo: {
    public: path.join(rootPath, 'demo')
  }
};

module.exports = paths;
