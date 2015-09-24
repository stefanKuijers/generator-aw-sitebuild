module.exports = function() {
    return {
        dir: {
            gulpTasks: './.gulp/tasks/',
            gulpTemplates: './.gulp/templates/',
            source: './source/',
            dist: './build/',
            bowerComponents: './bower_components',
            templates: './source/templates/',
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
            scriptReference: './source/templates/pageClose.php',
            styleReference: './source/templates/pageOpen.php',
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
};