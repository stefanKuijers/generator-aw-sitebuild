'use strict';

/*
    Build: Build js files
*/
module.exports = function (gulp, plugins, config) {

    return function() {
        gulp.src( config.dir.generatorSource + config.path.js )
            .pipe( plugins.replace(
                '/* generator:js if-jquery */',
                '<% if ( dependencies.framework !== \'Pure CSS\' && dependencies.framework !== \'No framework\' && !dependencies.jQuery ) { %>'
            ) )
            .pipe( plugins.replace(
                '\n/* generator:js end-if-jquery */',
                '<% } %>'
            ) )
            // .pipe( plugins.debug() )
            .pipe( gulp.dest( config.dir.appGenerator + config.dir.js ) )
        ;
    };
};
