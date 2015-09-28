'use strict';

/*
    Build: Copy PHP
*/
module.exports = function (gulp, plugins, config) {
    return function() {
        gulp.src( [
        		config.dir.generatorSource + config.path.php,
        		'!' + config.dir.generatorSource + config.path.openPage
        	] )
            .pipe( gulp.dest( config.dir.appGenerator + config.dir.source ) )
        ;
    };
};