/*
    Build: Useref
*/
module.exports = function (gulp, plugins, config) {
	var assets = plugins.useref.assets();

    return function() {
    	gulp.src( [
    		config.path.scriptReference,
    		config.path.styleReference,
    	] )
    	.pipe( plugins.plumber({ errorHandler: config.error.handler }) )
        .pipe( assets)
        .pipe( plugins.if( '*.js', plugins.uglify() ) )
        .pipe( plugins.if( '*.css', plugins.minifyCss() ) )
        .pipe( assets.restore() )
        .pipe( plugins.useref() )
        .pipe( gulp.dest( config.dir.dist + 'templates/' ) );
    }
	
};