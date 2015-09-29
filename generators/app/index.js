'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var exec  = require('child_process').exec;

 
module.exports = yeoman.generators.Base.extend( {
    dependencies: {},

    promptUser: function() {
        var done = this.async();
        var generator = this;
 
        generator.log( yosay( chalk.blue('Welcome to the AW Sitebuild generator!') + '\nI heard you want to create a sitebuild project...') );
 
        var prompts = [ {
            name: 'appName',
            message: 'What is the name of the project?',
            default: generator.appname
        }, {
            type: 'list',
            name: 'framework',
            message: 'Wich framework would you like to use?',
            choices: [
                'Bootstrap', 
                'Semantic UI',
                'Foundation (ZURB)',
                'No framework'
            ],
            default: 'Bootstrap'
        }, {
            type: 'confirm',
            name: 'fontAwesome',
            message: 'Do you want to use font-awesome?',
            default: true
        } ];

        generator.prompt( prompts , function ( props ) {
            function wrapUp() {
                generator.appName = props.appName;
                generator.dependencies.jQuery = !!(props.jQuery);
                generator.dependencies.framework = props.framework;
                generator.dependencies.fontAwesome = props.fontAwesome;

                if ( generator.dependencies.framework === 'No framework' ) {
                    generator.log( yosay( chalk.yellow('I salute you, brave one.') + '\nNot using a framework in these times is a show of true courage and maybe a bit of overconfidence') );
                }

                done();
            }

            if ( props.framework === 'No framework' ) {
                generator.prompt( {
                    type: 'confirm',
                    name: 'jQuery',
                    message: 'Do you want to use jQuery?',
                    default: true
                } , function() {
                    wrapUp();
                } );
            } else {
                wrapUp();
            }
        }.bind( generator ));
    },


    makeBowerComponentDir: function() {
        exec('mkdir bower_components');
    },


    copyingFiles: function() {
        var generator = this;
        var done = this.async();

        generator.copy( 'gitignore', '.gitignore' );
        generator.copy( 'editorconfig', '.editorconfig' );
        generator.copy( 'Gulpfile.js', 'Gulpfile.js' );

        generator.directory('source', 'source');
        generator.directory('.gulp', '.gulp');

        done();
    },

    setupDependencies: function() {
        var generator = this;
        generator.dependencies.output = '';

        switch( generator.dependencies.framework ) {
            case 'Bootstrap': 
                generator.dependencies.output += '"bootstrap-sass": "~3.3.5",\n    '; 
                break;

            case 'Semantic UI': 
                generator.dependencies.output += '"semantic": "~2.1.4",\n    '; 
                // possibly dropping sass cause there is no stable version of this lib
                // generator.dependencies.output += '"semantic-ui-sass": "*",\n    '; 
                break;

            case 'Foundation (ZURB)': 
                generator.dependencies.output += '"foundation": "~5.5.2",\n    ';
                // generator.dependencies.output += '"foundation-sass": "~5.5.2",\n    ';
                break;

            default: break;
        }

        if ( generator.dependencies.jQuery ) {
            generator.dependencies.output += '"jquery": "~2.1.4",\n    ';
        }

        if ( generator.dependencies.fontAwesome ) {
            generator.dependencies.output += '"font-awesome": "~4.4.0",\n    ';
        }

        generator.dependencies.output = generator.dependencies.output.substring(0, generator.dependencies.output.length - 6);
    },

    templating: function() {
        var generator = this;
        generator.packageName = generator.appName.replace(' ', '-').replace(' ', '-').replace(' ', '-');

        this.template( '_bower.json', 'bower.json' );
        this.template( '_package.json', 'package.json' );
        this.template( 'source/template/pageOpen.php', 'source/template/pageOpen.php' );
        this.template( 'source/asset/sass/style.sitebuild.scss', 'source/asset/sass/style.sitebuild.scss' );
        this.template( 'source/asset/js/app/home.js', 'source/asset/js/app/home.js' );
        this.template( 'source/asset/js/app/mainMenu.js', 'source/asset/js/app/mainMenu.js' );
        this.template( 'source/asset/js/app/products.js', 'source/asset/js/app/products.js' );
        this.template( 'source/asset/js/app/product.js', 'source/asset/js/app/product.js' );
    }

    // installDependencies: function() {
    //     var generator = this;

    //     generator.log( chalk.blue('Basic setup is done. Just running bower and npm install. If you have any errors run:\n$ npm install && bower install\nTo install dependencies manually') );

    //     generator.bowerInstall();
    //     generator.npmInstall();
    // }
} );