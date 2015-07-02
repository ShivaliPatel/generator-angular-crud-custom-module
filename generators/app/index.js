'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var genUtils = require('../../util.js');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp= require('mkdirp');
//var wiredep = require('wiredep');


var AngularNgCustomModule = yeoman.generators.Base.extend({
    init: function () {

    },
    promptUser: function () {
        var done = this.async();
        // have Yeoman greet the user
//        console.log(this.yeoman);
        var prompts = [
            {
                name: 'appName',
                message: 'Enter your project name?'
            }
        ];
        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            done();
        }.bind(this));
    },
    createFolders: function () {
        mkdirp("app");
        mkdirp("app/modules");
        mkdirp("app/modules/common");
        mkdirp("app/modules/common/assets");
        mkdirp("app/vendor");
        mkdirp("gulp");
    },
    copyFiles: function () {
        this.template("_.bowerrc", ".bowerrc");

        var context = {
            appName: this.appName,
            modules:[]
        };
        this.template("_bower.json", "bower.json", context);
        this.template("_index.html", "app/index.html", context);
        this.template("_app.js", "app/app.js", context);
        this.template("_main.css", "app/modules/common/assets/css/main.css");
        this.template("_directives.js", "app/modules/common/directives.js",context);
        this.template("_filters.js", "app/modules/common/filters.js", context);
        this.template("_startUpController.js", "app/modules/common/startUpController.js", context);
    },
    runNpm: function () {
        console.log("\nI'm all done.Running npm install for you to install the required dependencies.If this fails,try running the command yourself\n");
        /*this.npmInstall("", function () {
            console.log("\n Done installing node modules!\n Run 'npm start' to build and serve the project");
        });*/
        this.bowerInstall("", function () {
            console.log("\nDone installing bower Packages\n");
        });
    }
});

module.exports = AngularNgCustomModule;
