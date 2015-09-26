'use strict';

module.exports = function( gulp, plugins ) {
    var config = {
        dir: {
            gulpTasks: '.gulp/task/',
            gulpFiles: '.gulp/',
            generatorSource: './generator-source/',
            appGenerator: './generators/app/templates/',
            gulpGenerator: './generators/gulp/templates/'
        },

        path: {
            gulpFiles: '.gulp/**/*',
            gulpFile: 'Gulpfile.js',
            gitignore: '.gitignore',
            editorConfig: '.editorconfig'
        },

        error: {
            params: {
                title:    'Gulp',
                message:  '<%= error.message %>',
                sound: false
            },
            handler: function(err) {
                plugins.notify.onError( config.error.params )(err);

                if ( this.emit !== undefined ) this.emit('end');
            }
        }
    };

    return config;
};