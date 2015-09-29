'use strict';

/*
    GulpFile
*//*
    Tasks to make the development of the generator easier.

    $ gulp build
    Puts the files in the generators directory and renames them when needed

    $ gulp publish --version <patch|minor|major>  
    Bumps the version and publishes to NPM

*/
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ camelize: true });
plugins.exec         = require('child_process').exec;

var config = require('./.gulp/config')(gulp, plugins);


/*
    Tasks
*/
function getTask(task) {
    return require( './' + config.dir.gulpTasks + task )(gulp, plugins, config);
}

/* building tasks */
gulp.task('copyGulpFiles', getTask('copyGulpFiles'));
gulp.task('copyGitIgnore', getTask('copyGitIgnore'));
gulp.task('copyEditorConfig', getTask('copyEditorConfig'));
gulp.task('buildPackageJson', getTask('buildPackageJson'));
gulp.task('copyPhp', getTask('copyPhp'));
gulp.task('buildPageOpen', getTask('buildPageOpen'));
gulp.task('copySassComponents', getTask('copySassComponents'));
gulp.task('buildMainSassFile', getTask('buildMainSassFile'));
gulp.task('buildJs', getTask('buildJs'));

gulp.task('build', [ 
    'copyPhp',
    'copyGulpFiles', 
    'copyGitIgnore',
    'copyEditorConfig',
    'copySassComponents',
    'buildPackageJson',
    'buildMainSassFile',
    'buildJs',
    'buildPageOpen'
] );

/* publishing tasks */
gulp.task('publish', getTask('publish'));


/* end Tasks */