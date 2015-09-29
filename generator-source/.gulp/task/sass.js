/*
    Sass
*/
module.exports = function (gulp, plugins, config) {
    return function () {

        // grab this file (as it holds the imports to all other .scss files 
        // we don't have to link to any other files)
        return gulp.src( config.path.mainSassFile )
            // make sure that if we get error (invalid sass) that we don't break out of the server
            .pipe( plugins.plumber({ errorHandler: config.error.handler }) )
            // compile it to css and set some settings for error handling
            .pipe(plugins.sass())
            // autoprefix the css to make it crossbrowser compatible
            .pipe(plugins.autoprefixer())
            // write what you have in the following directory
            .pipe(gulp.dest( config.dir.css ))
            // let browserSync stream this file content to all connected browsers
            .pipe(plugins.browserSync.stream());
    };
};