/*
	Generator: create a sass component and link it
*/
module.exports = function (gulp, plugins, config) {

    return function () {
		var name = plugins.yargs.argv.name;
		if ( name === undefined || name == true ) return;

		var pathVars = {
			dest: config.dir.sassComponent,
			name: '_' + name + '.scss'
		}
		if ( plugins.fs.existsSync( pathVars.dest + pathVars.name ) ) {
			config.error.handler(
				new plugins.util.PluginError('generator', {
			    	message: 'File already exists. ' + pathVars.dest + pathVars.name
				} )
			);
			return;
		}
		
        return gulp.src( config.dir.gulpTemplates + 'component.scss' )
	        .pipe( plugins.template( {name: name} ) )
	        .pipe( plugins.rename( pathVars.name ) )
	        .pipe( gulp.dest( pathVars.dest ) );
    };
};