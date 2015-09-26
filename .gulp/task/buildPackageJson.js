'use strict';

/*
    Build: build PackageJson
*/
module.exports = function (gulp, plugins, config) {
    return function() {
        gulp.src( config.dir.generatorSource + config.path.packageJson )
            .pipe( plugins.replace('<generator-source>', '<%= packageName %>') )
            .pipe( plugins.rename('_package.json') )
            .pipe( gulp.dest( config.dir.appGenerator ) )
        ;
    };
};