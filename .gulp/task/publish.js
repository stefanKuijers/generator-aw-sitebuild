'use strict';

/*
    Publish
*/
module.exports = function (gulp, plugins, config) {
    return function() {

    	return plugins.exec('gulp build', function (err, stdout, stderr) {
		    console.log( 'BUILD_out:' + stdout );
		    console.log( 'BUILD_err:' + stderr );

    		return plugins.exec('git add -A', function (err, stdout, stderr) {
			    console.log( 'ADD_out:' + stdout );
		    	console.log( 'ADD_err:' + stderr );

				return plugins.exec('git commit -m "PATCH | publish new version patch"', function (err, stdout, stderr) {
				    console.log( 'COMMIT_out:' + stdout );
		    		console.log( 'COMMIT_err:' + stderr );

		    		plugins.exec('git push origin master', function (err, stdout, stderr) {
					    console.log( 'PUSH_out:' + stdout );
			    		console.log( 'PUSH_err:' + stderr );
			    	} );

					return plugins.exec('npm version patch', function (err, stdout, stderr) {
					    console.log( 'PATCH_out: ' + stdout );
					    console.log( 'PATCH_err: ' + stderr );

		    			
						return plugins.exec('npm publish', function (err, stdout, stderr) {
						    console.log( 'PUBLISH_out: ' + stdout );
						    console.log( 'PUBLISH_err: ' + stderr );

			    			return true;
						} );
					} );
				} );
			} );
		} );
    };
};