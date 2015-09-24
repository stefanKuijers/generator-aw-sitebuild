'use strict';
var yeoman = require('yeoman-generator');
// var chalk = require('chalk');
var yosay = require('yosay');
// var util = require('util');
// var path = require('path');
var fs = require('fs-extra');
 
module.exports = yeoman.generators.Base.extend({
    dependencies: {},


    promptUser: function() {
        var done = this.async();
        var generator = this;
 
        generator.log( yosay('Welcome to the AW Sitebuild generator!\nI heard you want to create a sitebuild project...') );
 
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
 
        generator.prompt(prompts, function ( props ) {
            function wrapUp() {
                generator.appName = props.appName;
                generator.dependencies.jQuery = !!(props.jQuery);
                generator.dependencies.framework = props.framework;
                generator.dependencies.fontAwesome = props.fontAwesome;

                done();
            }

            if ( generator.framework === 'Pure CSS' || generator.framework === 'No framework' ) {
                generator.prompt( {
                    type: 'confirm',
                    name: 'jQuery',
                    message: 'Do you want to use jQuery?',
                    default: true
                }, function() {
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

        generator.copy( '_package.json', 'package.json' );
        generator.copy( '_.gitignore', '.gitignore' );
        generator.copy( '_.editorconfig', '.editorconfig' );

        // generator.directory('source', 'source');
        // generator.directory('.gulp', '.gulp');


        generator.log('Copying the files');
        done();
    },

    setupDependencies: function() {
        /*
            <% if (dependencies.framework === 'Bootstrap') { %>
    "bootstrap-sass": "~3.3.5",<% } %> <% if (dependencies.framework === 'Pure CSS') { %>
    "pure-sass": "~0.0.4",<% } %> <% if (dependencies.framework === 'Semantic UI') { %>
    "semantic": "~2.1.4",
    "semantic-ui-sass": "*",<% } %><% if (dependencies.framework === 'Foundation (ZURB)') { %>
    "foundation": "~5.5.2",
    "foundation-sass": "~5.5.2",<% } %><% if (dependencies.jQuery == true) { %>
    "jquery": "~2.1.4",<% } %><% if (dependencies.fontAwesome == true) { %>
    "font-awesome": "~4.4.0",<% } %>
        */
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
        this.template( '_bower.json', 'bower.json' );
        this.template( 'source/asset/sass/style.sitebuild.scss', 'source/asset/sass/style.sitebuild.scss' );
    },

    bowerDependencies: function() {
        var generator = this;

        this.log('Setting bower dependencies');
        
    },

    installDependencies: function() {
        var generator = this;

        // generator.installDependencies();

        this.log('npm && bower install');
    },

    postInstall: function () {
        var generator = this;

        this.log('Post install ($ gulp bower)');
    },

    goodBye: function() {
        var generator = this;

        this.log( 'Dependencies are managed throught Bower, you can start the server with: $ gulp' );
    }

});
 
// module.exports = OnepageGenerator;

// module.exports = yeoman.generators.Base.extend({
//   prompting: function () {
//     var done = this.async();

//     // Have Yeoman greet the user.
//     this.log(yosay(
//       'Welcome to the laudable ' + chalk.red('AwSitebuild') + ' generator!'
//     ));

//     var prompts = [{
//       type: 'confirm',
//       name: 'someOption',
//       message: 'Would you like to enable this option?',
//       default: true
//     }];

//     this.prompt(prompts, function (props) {
//       this.props = props;
//       // To access props later use this.props.someOption;

//       done();
//     }.bind(this));
//   },

//   writing: {
//     app: function () {
//       this.fs.copy(
//         this.templatePath('_package.json'),
//         this.destinationPath('package.json')
//       );
//       this.fs.copy(
//         this.templatePath('_bower.json'),
//         this.destinationPath('bower.json')
//       );
//     },

//     projectfiles: function () {
//       this.fs.copy(
//         this.templatePath('editorconfig'),
//         this.destinationPath('.editorconfig')
//       );
//       this.fs.copy(
//         this.templatePath('jshintrc'),
//         this.destinationPath('.jshintrc')
//       );
//     }
//   },

//   install: function () {
//     this.installDependencies();
//   }
// });
