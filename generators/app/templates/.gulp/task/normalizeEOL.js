/*
    Dev: Copy Font
*/
module.exports = function (gulp, plugins, config) {
    return function() {
        gulp.src( config.path.scriptReference )
            .pipe( plugins.eol( config.eol ) )
            .pipe( gulp.dest( config.dir.templates ) );

        gulp.src( config.path.styleReference )
            .pipe( plugins.eol( config.eol ) )
            .pipe( gulp.dest( config.dir.templates ) );


        return gulp.src( config.path.mainSassFile )
            .pipe( plugins.eol( config.eol ) )
            .pipe( gulp.dest( config.dir.sass ) );
    };
};