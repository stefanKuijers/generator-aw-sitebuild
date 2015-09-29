'use strict';

/*
    Build: Build main sass file
*/
module.exports = function (gulp, plugins, config) {

    return function() {
        var replace = '<% if (dependencies.framework === \'Semantic UI\') { %><link rel="stylesheet" href="semantic/dist/semantic.css" /><% } %>';

        return gulp.src( config.dir.generatorSource + config.path.pageOpen )
            .pipe( plugins.replace(
                '<!-- generator:css if-sementic-ui -->',
                replace
            ) )
            .pipe( gulp.dest( config.dir.appGenerator + config.dir.template ) )
        ;
    };
};