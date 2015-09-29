'use strict';

/*
    Build: Copy GitIgnore
*/
module.exports = function (gulp, plugins, config) {
    return function() {
        return gulp.src( config.dir.generatorSource + config.path.editorConfig )
            .pipe( plugins.rename('editorconfig') )
            .pipe( gulp.dest( config.dir.appGenerator ) )
        ;
    };
};