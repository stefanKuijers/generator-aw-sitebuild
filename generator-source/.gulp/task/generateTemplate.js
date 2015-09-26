/*
	Generator: create template
*/
module.exports = function (gulp, plugins, config) {

    return function () {
		var name = plugins.yargs.argv.name;
		if ( name === undefined || name == true ) {
			config.error.handler(
				new plugins.util.PluginError('generator', {
			    	message: 'Pass in the component name.\n$ gulp createTemplate --name foo'
				} )
			);
			return;
		}

		var pathVars = {
			dest: config.dir.templates,
			name: name + '.php'
		}
		if ( plugins.fs.existsSync( pathVars.dest + pathVars.name ) ) {
			config.error.handler(
				new plugins.util.PluginError('generator', {
			    	message: 'File already exists. ' + pathVars.dest + pathVars.name
				} )
			);
			return;
		}

        return gulp.src( config.dir.gulpTemplates + 'component-template.php' )
	        .pipe( plugins.template( {name: name} ) )
	        .pipe( plugins.rename( pathVars.name ) )
	        .pipe( gulp.dest( pathVars.dest ) );
	};
};