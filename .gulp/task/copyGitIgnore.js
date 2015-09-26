'use strict';

/*
    Build: Copy GitIgnore
*/
module.exports = function (gulp, plugins, config) {
    return function() {
        gulp.src( config.dir.generatorSource + config.path.gitignore )
            .pipe( plugins.rename('gitignore') )
            .pipe( gulp.dest( config.dir.appGenerator ) )
        ;
    };
};