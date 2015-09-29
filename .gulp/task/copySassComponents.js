'use strict';

/*
    Build: Copy PHP
*/
module.exports = function (gulp, plugins, config) {
    return function() {
        return gulp.src( config.dir.generatorSource + config.path.sassComponents )
            .pipe( gulp.dest( config.dir.appGenerator + config.dir.sass ) )
        ;
    };
};