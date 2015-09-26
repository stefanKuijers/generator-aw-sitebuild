/*
    Build: Copy SASS
*/
module.exports = function (gulp, plugins, config) {
    return function() {
        return gulp.src( config.dir.sass + '**/*.scss' )
            .pipe(  gulp.dest( config.dir.dist + 'asset/sass/' )  )
        ;
    }
};