'use strict';

/*
    Build: Copy Gulpfiles
*/
module.exports = function (gulp, plugins, config) {
    return function() {
        gulp.src( config.dir.generatorSource + config.path.gulpFile )
            .pipe(  gulp.dest( config.dir.appGenerator )  )
        ;

        return gulp.src( config.dir.generatorSource + config.path.gulpFiles )
            .pipe(  gulp.dest( config.dir.appGenerator + config.dir.gulpFiles )  )
        ;
    };
};