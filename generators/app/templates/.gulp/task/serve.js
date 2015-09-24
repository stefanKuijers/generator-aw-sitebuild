/* 
    Serve
*//*
    This task has become much more complex than I hoped. The reason is that we need to have
    multiple base dirs to serve from so that we can keep our bower_components out of our
    source folder. 'gulp-connect-php' does not support this so we need a normal connect
    server to serve the multiple base-dirs.
*/
module.exports = function( gulp, plugins, config ) {
    return function() {
        // start a php server
        plugins.connectPhp.server({
            base: config.dir.source
        }, function() {
            // once that is up and running:

            // start a normal connect server
            plugins.connect.server({
                port: 8001,
                root: [ config.dir.source, config.dir.bowerComponents],
                middleware: function() {
                    return [
                        // this server handles everything except php. Send php to our phpServer
                        plugins.modrewrite([ '^([^.]*|.*?\.php)$ http://localhost:8000$1 [P,NC]'])
                    ];
                }
            });

            // start the browserSync server
            plugins.browserSync.init({
                notify: false,
                // set online to false. This will disable some functionality but speed up the serving task
                online: false,
                // proxy data to our connect server which will talk with the php server when needed
                proxy: 'localhost:8001'
            });
        });
    };
};