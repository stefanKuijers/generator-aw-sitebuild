/*
    Build: image minification
*/
module.exports = function (gulp, plugins, config) {
    return function () {
        gulp.src( config.dir.image + '**/*' )
        	.pipe(plugins.plumber({ errorHandler: config.error.handler }))
		    .pipe(
		    	plugins.if(
		    		plugins.if.isFile, 
		    		plugins.cache(
		    			plugins.imagemin( {
							progressive: true,
							interlaced: true,
							// don't remove IDs from SVGs, they are often used
							// as hooks for embedding and styling
							svgoPlugins: [{cleanupIDs: false}]
		    			} )
		    		)
		    		.on('error', config.error.handler ) 
				)
		    )
		    .pipe( gulp.dest( config.dir.dist + 'asset/image/' ) );
    };
};