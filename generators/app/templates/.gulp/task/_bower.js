/*
    Bower
*/
module.exports = function (gulp, plugins, config) {
    return function () {
        // SASS
        gulp.src( config.path.mainSassFile )
            // user the wiredep plugin to wire dependencies into this file
            .pipe( plugins.wiredep() )
            // write the file which you have to this directory. As the file
            // came from here, it will be overwritten. 
            .pipe(gulp.dest( config.dir.sass ));


        // CSS
        gulp.src( config.path.styleReference )
            // user the wiredep plugin to wire dependencies into this file
            .pipe( plugins.wiredep({
                // exclude the files from which we can get the sass-version
                exclude: [
                    'foundation',
                    'font-awesome'
                ],
                // config: the file is not in the root but the bower_components
                // are so we need to remove this from the path to the files
                ignorePath: '../../bower_components/'
            }) )
            // write the file which you have to this directory. As the file
            // came from here, it will be overwritten. 
            .pipe(gulp.dest( config.dir.templates ));

        // Javascript
        gulp.src( config.path.scriptReference )
            // user the wiredep plugin to wire dependencies into this file
            .pipe( plugins.wiredep({
                // config: the file is not in the root but the bower_components
                // are so we need to remove this from the path to the files
                ignorePath: '../../bower_components/'
            }) )
            // write the file which you have to this directory. As the file
            // came from here, it will be overwritten. 
            .pipe(gulp.dest( config.dir.templates ));


    };
};