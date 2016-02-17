//setting root relative
global._root = __dirname;

console.log(__dirname);

//breaking out tasks
require( "./gulp/vendor" );
require( "./gulp/user" );
require( "./gulp/sass" );
require( "./gulp/watch" );
require( "./gulp/build" );
require( "./gulp/serve" );


// gulp.task("test", function(){})
