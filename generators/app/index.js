'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
// var util = require('util');
// var path = require('path');
// var fs = require('fs-extra');
 
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
                'Pure CSS',
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
                    generator.log( yosay( chalk.yellow('I salute you, brave one.') + '\nNot using a framework in these times is a show of true courage, expertise and character') );
                }

                done();
            }

            if ( generator.framework === 'Pure CSS' || generator.framework === 'No framework' ) {
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


    copyingFiles: function() {
        var generator = this;
        var done = this.async();

        generator.copy( '_.gitignore', '.gitignore' );
        generator.copy( '_.editorconfig', '.editorconfig' );

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

            case 'Pure CSS': 
                generator.dependencies.output += '"pure-sass": "~0.0.4",\n    '; 
                break;

            case 'Semantic UI': 
                generator.dependencies.output += '"semantic": "~2.1.4",\n    '; 
                generator.dependencies.output += '"semantic-ui-sass": "*",\n    '; 
                break;

            case 'Foundation (ZURB)': 
                generator.dependencies.output += '"foundation": "~5.5.2",\n    ';
                generator.dependencies.output += '"foundation-sass": "~5.5.2",\n    ';
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
        generator.packageName = generator.appName.replace(' ', '-')

        this.template( '_bower.json', 'bower.json' );
        this.template( '_package.json', 'package.json' );
        this.template( 'source/asset/sass/style.sitebuild.scss', 'source/asset/sass/style.sitebuild.scss' );
    },

    installDependencies: function() {
        var generator = this;

        generator.log( chalk.blue('Basic setup is done. Just running bower and npm install. If you have any errors run:\n$ npm install && bower install\nTo install dependencies manually') );

        generator.bowerInstall();
        generator.npmInstall();
    }
} );