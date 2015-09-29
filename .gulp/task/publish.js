'use strict';

/*
    Publish
*/
module.exports = function (gulp, plugins, config) {
    return function() {

        	plugins.exec('gulp build', function (err, stdout, stderr) {
			    console.log( 'BUILD:' + stdout );

			    // return gulp.src( './*' )
			    // 	.pipe( plugins.plumber() )
			    // 	.pipe( plugins.git.commit(
			    // 		'PATCH | publish new version patch',
			    // 		{ args: '-A' }
			    // 	) );

        		plugins.exec('git add -A', function (err, stdout, stderr) {
				    console.log( 'ADD:' + stdout, stderr, err );

					plugins.exec('git commit -m "PATCH | publish new version patch"', function (err, stdout, stderr) {
					    console.log( 'COMMIT:' + stdout, stderr, err );
					    // return true;
					} ) ;
				    
				} ) ;


				// return plugins.exec('npm version patch', function (err, stdout, stderr) {
				//     console.log( 'PATCH: ' + stdout );
				//     console.log( 'PATCH: ' + stderr );
	   //  			console.log( 'PATCH: ' + err );

	    			
				// 	return plugins.exec('npm publish', function (err, stdout, stderr) {
				// 	    console.log( 'PUBLISH: ' + stdout );
				// 	    console.log( 'PUBLISH: ' + stderr );
		  //   			console.log( 'PUBLISH: ' + err );
		  //   			return true;
				// 	});
				// });
			});


        ;
    };
};