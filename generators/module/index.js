'use strict';
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var util = require('util');
var s = require('underscore.string');
var mkdirp = require('mkdirp');

var AngularNgCustomModule1 = yeoman.generators.Base.extend({
    init: function () {

        try {
            this.appName = require(path.join(process.cwd(), 'bower.json')).name;
        } catch (e) {
            this.appName = path.basename(process.cwd());
        }
        this.modules = this.config.get("modules") || [];
        this.fields = [];
        this.field = {};
    },
    promptUser: function () {
        var self = this;
        var done = this.async();
        var prompts = [
            {
                name: 'moduleName',
                message: 'Enter your module name?'
            },
            {
                name: 'dir',
                message: 'Where would you like to create this module?',
                default: 'app/modules'
            }
        ];
        var fieldPrompts = [
            {
                type: "confirm",
                name: 'wantToCreateField',
                message: '\n************************************\nWould you like to create field?'
            },
            {
                type: "list",
                name: 'fieldType',
                message: 'Please select field..',
                choices: [ "input", "select", "textarea", "checkbox", "multiCheckbox", "radio"],
                when: function (answers) {
                    return answers.wantToCreateField;
                }
            },
            {
                name: 'fieldLabelKey',
                message: 'Please enter label:key:required for this field..Ex(First Name:fName:true)..\n',
                when: function (answers) {
                    return answers.wantToCreateField;
                }
            },
            {
                type: "list",
                name: 'fieldTOType',
                message: 'Please select input field..',
                choices: [ "text", "password", "email"],
                when: function (answers) {
                    return answers.wantToCreateField && answers.fieldType == 'input';
                }
            },
            {
                name: 'fieldTOOptions',
                message: 'Please enter options in label:value format with comma saperated..\n Ex(Adminstrator:1,User:2).. \n',
                when: function (answers) {
                    return answers.wantToCreateField && (answers.fieldType == 'select' || answers.fieldType == 'multiCheckbox' || answers.fieldType == 'radio');
                }
            }
        ]

        function fieldPromptFn(self) {
            self.prompt(fieldPrompts, function (props) {

                if (props.wantToCreateField ) {
                    var labelKey=props.fieldLabelKey.split(":");
                    delete props.wantToCreateField;
                    var field = {type: props.fieldType,
                        key: labelKey[1],
                        templateOptions: {
                            label: labelKey[0],
                            required:labelKey.length==3 && labelKey[2]=='true' ? true : false
                        }
                    }
                    if (field.type == 'input') {
                        field.templateOptions.type = props.fieldTOType;
                    }
                    else if (props.fieldType == 'select' || props.fieldType == 'multiCheckbox' || props.fieldType == 'radio') {
                        var options = props.fieldTOOptions.split(','), finalOptions = [], optionObj;
                        for (var index in options) {
                            optionObj = options[index].split(':');
                            if (optionObj.length == 2)
                                finalOptions.push({name: optionObj[0], value: optionObj[1]});
                        }
                        field.templateOptions.options=finalOptions;
                        if(props.fieldType=='multiCheckbox'){
                            field.templateOptions.valueProp='value';
                            field.templateOptions.labelProp='name';
                        }
                    }
                    self.fields.push(field);
                    fieldPromptFn(self);
                }
                else {
                    done();
                }
            }.bind(this));
        }

        this.prompt(prompts, function (props) {
            this.moduleName = s(props.moduleName).decapitalize().value();
            this.dir = props.dir;
            fieldPromptFn(this);

        }.bind(this));


    },
    saveSettings: function () {
        this.modules.push({
            moduleName: s(this.moduleName).capitalize().value(),
            moduleVariable: this.moduleName + 's',
            module: this.moduleName,
            dir: this.dir,
            relativePath: this.dir.substr(this.dir.indexOf('/') + 1, this.dir.length)
        })
        this.config.set('modules', this.modules);
    },
    createFolders: function () {
        mkdirp(this.dir + "/" + this.moduleName);
        mkdirp(this.dir + "/" + this.moduleName + '/views');
    },
    copyFiles: function () {

        var context = {
            moduleName: s(this.moduleName).capitalize().value(),
            moduleVariable: this.moduleName + 's',
            module: this.moduleName,
            appName: this.appName,
            modules: this.modules,
            dir: this.dir,
            relativePath: this.dir.substr(this.dir.indexOf('/') + 1, this.dir.length),
            fields: JSON.stringify(this.fields),
            listFields:this.fields
        };
        this.template("../../app/templates/_app.js", "app/app.js", context);
        this.template("../../app/templates/_index.html", "app/index.html", context);
        this.template("_controller.js", this.dir + "/" + this.moduleName + "/" + this.moduleName + "Controller.js", context);
        this.template("_service.js", this.dir + "/" + this.moduleName + "/" + this.moduleName + "Services.js", context);
        this.template("_list.html", this.dir + "/" + this.moduleName + "/views/" + context.moduleVariable + ".html", context);
        this.template("_add.html", this.dir + "/" + this.moduleName + "/views/add" + context.moduleName + ".html", context);
        this.template("_update.html", this.dir + "/" + this.moduleName + "/views/update" + context.moduleName + ".html", context);
        this.template("_delete.html", this.dir + "/" + this.moduleName + "/views/delete" + context.moduleName + ".html", context);
    }
});
module.exports = AngularNgCustomModule1;