/*
    Delete TMP folders
*/
module.exports = function (gulp, plugins, config) {
    return function () {
        return plugins.del( config.dir.dist );
    };
};