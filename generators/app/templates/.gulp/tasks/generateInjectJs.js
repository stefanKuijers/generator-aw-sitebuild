/*
    Generator: inject the js component to our file which loads our scripts
*/
module.exports = function (gulp, plugins, config) {
    return function () {
    	var name = plugins.yargs.argv.name;
		if ( name === undefined || name == true ) { return; }

    	var inject = '<script src="' + config.dir.relativeApp + name + '.js"></script>'
        return gulp.src( config.path.scriptReference )
	        .pipe( plugins.injectString.before(
	        	'<!-- endgenerator -->', 
	        	inject + '\n		'
	        ) )
	        .pipe( gulp.dest( config.dir.templates ) );
    };
};