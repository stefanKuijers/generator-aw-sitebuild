/*
    GulpFile
*//*
    All you need to know:
    Gulp needs this file to know what it should do. Open a command-line, go to this folder,
    type 'gulp' and hit enter.

    It will compile your sass, inject any libraries you install with bower and serve 
    your project. When you change files, just hit save and your browser will stay up to 
    date.

    You don't have to understand any of what comes after this but please read on if you want 
    to learn more about gulp.
*/



/*
    Require Modules
*/
// loading gulp and all the gulp-plugins which we have in package.json
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ camelize: true });

// these plugins are not gulp-specific and have to be loaded individually
plugins.browserSync  = require('browser-sync').create();
plugins.modrewrite   = require('connect-modrewrite');
plugins.wiredep      = require('wiredep').stream;
plugins.del          = require('del');
plugins.yargs        = require('yargs');
plugins.fs           = require('fs');
/* End Require */



/*
    Config
*/
var config = {
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
/* End Config */



/*
    Tasks
*/
// get tasks from our 'gulp-tasks' directory and passes in gulp, our plugins and config
// if you want to know what a task does, go to the 'gulp-tasks'-directory and check them out.
function getTask(task) {
    return require( config.dir.gulpTasks + task )(gulp, plugins, config);
}

/* Default: sass, serve, bower, watch */
// registering simple tasks. The following two lines expose 'sass', 'serve' to the 
// command line interface of gulp. Each task that is registered can be called like this:
// $ gulp <task-name>
// Example: 
// $ gulp sass
gulp.task('sass', getTask('sass'));
gulp.task('serve', getTask('serve'));


// A single task register line by line:
gulp.task(                // register a task
    'bower',              // it will be know under the name 'bower'
    getTask('bower')      // when someone types '$ gulp bower' run the following module or task
);


// if you ommit a task name gulp will run the 'default'-task. So this task will run if you type: '$ gulp'
// this task runs a series of other tasks; sass, bower, serve. Once they are done it will execute the
// function we passed in.
// So here we compile our sass, inject our bower dependencies and after that start our server.
gulp.task('default', ['sass', 'bower', 'serve'], function () {
    // once the server is up:

    //  start watching our php and js files. Reload all browsers if the files change.
    gulp.watch( [ config.path.php, config.path.js ] ).on('change', plugins.browserSync.reload);

    // watch our sass files. If they change, run the sass task which compiles them to css and injects it
    // to browsers which are connected to this server.
    gulp.watch( config.path.sass, ['sass']);

    // watch bower.json whichs holds our front-end dependencies. If it changes, run the bower task.
    gulp.watch( config.path.bower, ['bower']);

});


/* Build: deleteTmpFolders, copyPhpBuild, copyFontBuild, imageMinBuild, userefBuild, serveBuild */
gulp.task('deleteTmpFolders',   getTask('deleteTmpFolders'));
gulp.task('copyPhpBuild',       getTask('copyPhpBuild'));
gulp.task('copyFontBuild',      getTask('copyFontBuild'));
gulp.task('imageMinBuild',      getTask('imageMinBuild'));
gulp.task('userefBuild',        ['copyPhpBuild'], getTask('userefBuild'));

// A series of gulp tasks under one command. When we type '$ gulp build' it will execute all the tasks in 
// array after it in order
gulp.task( 'build', [
    'sass',
    'copyPhpBuild',
    'copyFontBuild',
    'imageMinBuild',
    'userefBuild'
] );

// Task to serve the build. Of course this task depends on making the build
gulp.task('serveBuild', ['build'], getTask('serveBuild'));


/* Generator */
gulp.task('generatePage',       getTask('generatePage'));
gulp.task('generateTemplate',   getTask('generateTemplate'));
gulp.task('generateSass',       getTask('generateSass'));
gulp.task('generateJs',         getTask('generateJs'));
gulp.task('injectSass',         getTask('generateInjectSass'));
gulp.task('injectJs',           getTask('generateInjectJs'));

gulp.task('addPage', [
    'generatePage', 
    'generateSass', 
    'generateJs', 
    'injectSass',
    'injectJs'
] );

gulp.task('addTemplate', [
    'generateTemplate', 
    'generateSass', 
    'generateJs', 
    'injectSass',
    'injectJs'
] );


/* end Tasks */