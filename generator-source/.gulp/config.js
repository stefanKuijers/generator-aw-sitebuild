module.exports = function( gulp, plugins ) {
    var config = {
        dir: {
            gulpTasks: './.gulp/task/',
            gulpTemplates: './.gulp/template/',
            source: './source/',
            dist: './build/',
            bowerComponents: './bower_components',
            templates: './source/template/',
            css: './source/asset/css/',
            image: './source/asset/image/',
            sass: './source/asset/sass/',
            sassComponent: './source/asset/sass/component/',
            relativeSassComponent: 'component/',
            app: './source/asset/js/app/',
            relativeApp: 'asset/js/app/'
        },

        path: {
            sass: './source/asset/sass/**/*.scss',
            mainSassFile: './source/asset/sass/style.sitebuild.scss',
            php: './**/*.php',
            js: './source/asset/js/app/**/*.js',
            scriptReference: './source/template/pageClose.php',
            styleReference: './source/template/pageOpen.php',
            bower: './bower.json'
        },

        error: {
            params: {
                title:    "Gulp",
                message:  "<%= error.message %>",
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