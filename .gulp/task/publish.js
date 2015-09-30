'use strict';

/*
    Publish
*/
module.exports = function (gulp, plugins, config) {
    return function() {
        function log( cmd, out, err ) {
            console.log( cmd + out );
            console.log( cmd + err );
        }

    	return plugins.exec('gulp build', function (err, stdout, stderr) {
		    log( 'BUILD: ', stdout, stderr );

            return plugins.exec('git add -A', function (err, stdout, stderr) {
                log( 'ADD: ', stdout, stderr );

                return plugins.exec('git commit -m "PATCH | publish new version patch"', function (err, stdout, stderr) {
                    log( 'COMMIT: ', stdout, stderr );

        		    return plugins.exec('npm version patch', function (err, stdout, stderr) {
                        log( 'PATCH: ', stdout, stderr );

			    		plugins.exec('git push origin master', function (err, stdout, stderr) {
                            log( 'PUSH: ', stdout, stderr );				    	
                        } );
		    			
						return plugins.exec('npm publish', function (err, stdout, stderr) {
                            log( 'PUBLISH: ', stdout, stderr );
			    			return true;
						} );
					} );
				} );
			} );
		} );
    };
};