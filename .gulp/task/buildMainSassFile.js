'use strict';

/*
    Build: Build main sass file
*/
module.exports = function (gulp, plugins, config) {

    return function() {
        var inject = '<% if (dependencies.framework === \'Semantic UI\') { %>\n' + 
            '@import "../../../bower_components/semantic-ui-sass/app/assets/stylesheets/semantic-ui.scss";\n'  + 
        '<% } %>\n';

        gulp.src( config.dir.generatorSource + config.path.mainSassFile )
            .pipe( plugins.injectString.after(
                '// endbower',
                inject
            ) )
            .pipe( gulp.dest( config.dir.appGenerator + config.dir.sass ) )
        ;
    };
};
