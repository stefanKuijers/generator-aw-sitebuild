'use strict';

module.exports = function( gulp, plugins ) {
    var config = {
        dir: {
            gulpTasks: '.gulp/task/',
            gulpFiles: '.gulp/',
            generatorSource: './generator-source/',
            appGenerator: './generators/app/templates/',
            gulpGenerator: './generators/gulp/templates/',
            source: 'source/',
            template: 'source/template/',
            sass: 'source/asset/sass/',
            js: 'source/asset/js/'
        },

        path: {
            gulpFiles: '.gulp/**/*',
            gulpFile: 'Gulpfile.js',
            gitignore: '.gitignore',
            pageOpen: 'source/template/pageOpen.php',
            editorConfig: '.editorconfig',
            packageJson: 'package.json',
            php: 'source/**/*.php',
            sassComponents: 'source/asset/sass/**/_*.scss',
            mainSassFile: 'source/asset/sass/style.sitebuild.scss',
            js: 'source/asset/js/**/*.js'
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