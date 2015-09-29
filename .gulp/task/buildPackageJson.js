'use strict';

/*
    Build: build PackageJson
*/
module.exports = function (gulp, plugins, config) {
    return function() {
        return gulp.src( config.dir.generatorSource + config.path.packageJson )
            .pipe( plugins.replace('generator-source-files', '<%= packageName %>') )
            .pipe( plugins.rename('_package.json') )
            .pipe( gulp.dest( config.dir.appGenerator ) )
        ;
    };
};