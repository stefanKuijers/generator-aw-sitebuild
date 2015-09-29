'use strict';

/*
    Build: Build main sass file
*/
module.exports = function (gulp, plugins, config) {

    return function() {
        var inject = {
            semantic: '<% if (dependencies.framework === \'Semantic UI\') { %>\n' + 
            '@import "../../../bower_components/semantic-ui-sass/app/assets/stylesheets/semantic-ui.scss";\n'  + 
            '<% } %>\n',
            foundation: '<% if (dependencies.framework === \'Foundation (ZURB)\') { %>\n' + 
            '@import "../../../bower_components/foundation/scss/normalize.scss";\n'  + 
            '@import "../../../bower_components/foundation/scss/foundation.scss";\n'  + 
            '<% } %>\n'
        }

        return gulp.src( config.dir.generatorSource + config.path.mainSassFile )
            .pipe( plugins.injectString.after(
                '// endbower',
                inject.foundation
            ) )
            .pipe( gulp.dest( config.dir.appGenerator + config.dir.sass ) )
        ;
    };
};
