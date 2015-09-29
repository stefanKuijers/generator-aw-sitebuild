/*
    Build: Correct Font Paths
*/
module.exports = function (gulp, plugins, config) {
    return function() {
        return gulp.src( [ 
        	config.dir.dist + 'asset/style/vendor.sitebuild.css'
        ] )
            .pipe( plugins.replace(
            	'../../fonts.gstatic.com',
            	'http://fonts.gstatic.com'
            ) )
            .pipe( gulp.dest( config.dir.dist + 'asset/style/' ) );
    };
};