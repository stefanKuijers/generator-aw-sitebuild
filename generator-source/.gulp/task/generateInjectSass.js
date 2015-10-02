/*
    Generator: inject the sass component to the main sass file
*/
module.exports = function (gulp, plugins, config) {
    return function () {
    	var name = plugins.yargs.argv.name;
		if ( name === undefined || name == true ) return;

    	var importString = '@import \'' + config.dir.relativeSassComponent + name + '\';'
        return gulp.src( config.path.mainSassFile )
	        .pipe( plugins.injectString.before(
	        	'// endgenerator', 
	        	importString + '\r\n'
	        ) )
	        .pipe( gulp.dest( config.dir.sass ) );
    };
};