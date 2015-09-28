/*
    Build: Copy Font
*/
module.exports = function (gulp, plugins, config) {
    return function() {
        gulp.src( require('main-bower-files')( {
        	filter: '**/*.{eot,svg,ttf,woff,woff2}'
        } ).concat( config.dir.source + 'font/**/*' ) )
            .pipe( plugins.plumber({ errorHandler: config.error.handler }) )
            .pipe( gulp.dest( config.dir.dist + 'asset/font/' ) );
    };
};