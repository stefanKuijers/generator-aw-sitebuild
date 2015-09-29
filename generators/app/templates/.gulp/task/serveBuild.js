/* 
    Build Serve
*/
module.exports = function( gulp, plugins, config ) {
    return function() {
        // start a php server
        return plugins.connectPhp.server( {
            base: config.dir.dist,
            open: true
        } );
    };
};