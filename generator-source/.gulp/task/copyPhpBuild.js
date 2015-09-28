/*
    Build: Copy Php
*/
module.exports = function (gulp, plugins, config) {
    return function() {
    	return gulp.src( config.dir.source + '**/*.php' )
	        .pipe(  gulp.dest( config.dir.dist )  )
	    ;
    }
};