'use strict';

/*
    Publish
*/
module.exports = function (gulp, plugins, config) {
    return function() {

        	return plugins.exec('gulp build', function (err, stdout, stderr) {
			    console.log( 'BUILD_out:' + stdout );
			    console.log( 'BUILD_err:' + stderr );

			    // return gulp.src( './*' )
			    // 	.pipe( plugins.plumber() )
			    // 	.pipe( plugins.git.commit(
			    // 		'PATCH | publish new version patch',
			    // 		{ args: '-A' }
			    // 	) );

        		return plugins.exec('git add -A', function (err, stdout, stderr) {
				    console.log( 'ADD_out:' + stdout );
			    	console.log( 'ADD_err:' + stderr );

					return plugins.exec('git commit -m "PATCH | publish new version patch"', function (err, stdout, stderr) {
					    console.log( 'COMMIT_out:' + stdout );
			    		console.log( 'COMMIT_err:' + stderr );
			    		
					    return true;
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