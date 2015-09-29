/*
    Dev: Copy Font
*/
module.exports = function (gulp, plugins, config) {
    return function() {
        gulp.src( [
        	'bower_components/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}',
        	'bower_components/bootstrap-sass/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}',
        ] )
            .pipe( plugins.plumber({ errorHandler: config.error.handler }) )
            .pipe( gulp.dest( config.dir.source + 'asset/fonts/' ) );
    };
};