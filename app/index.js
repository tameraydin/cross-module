'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _ = require('lodash');

var CrossModuleGenerator = yeoman.generators.Base.extend({
  initializing: function() {
    this.log(yosay(
      'Thanks for using Croos Module Generator! Your project will be ready in seconds...'
    ));
  },

  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'string',
      name: 'moduleName',
      message: 'What is the name of your module? ',
      default: 'my-module'
    },{
      type: 'string',
      name: 'moduleDesc',
      message: 'A description for your module: ',
      default: 'My very own module'
    },{
      type: 'string',
      name: 'moduleAuthor',
      message: 'Your name: ',
      default: 'You'
    },{
      type: 'string',
      name: 'moduleLicense',
      message: 'License type: ',
      default: 'MIT'
    },{
      type: 'confirm',
      name: 'moduleTravis',
      message: 'Do you want .travis.yml to be included? ',
      default: true
    }];

    this.prompt(prompts, function(props) {
      var name = _.deburr(props.moduleName);

      this.moduleName = _.kebabCase(name);
      this.moduleNameCamelCase = _.capitalize(_.camelCase(name));
      this.moduleDesc = _.deburr(props.moduleDesc);
      this.moduleAuthor = _.deburr(props.moduleAuthor);
      this.moduleLicense = _.deburr(props.moduleLicense);
      this.moduleTravis = props.moduleTravis;
      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      this.dest.mkdir('src');
      this.dest.mkdir('test');
    },
    projectfiles: function() {
      this.copy('_editorconfig', '.editorconfig');
      this.copy('_gitignore', '.gitignore');
      this.copy('_npmignore', '.npmignore');
      if (this.moduleTravis) {
        this.copy('_travis.yml', '.travis.yml');
      }
      this.copy('_package.json', 'package.json');
      this.copy('_bower.json', 'bower.json');
      this.copy('_gulpfile.js', 'gulpfile.js');
      this.copy('_README.md', 'README.md');

      this.copy('src/main.js', 'src/main.js');

      this.copy('test/main.spec.js', 'test/main.spec.js');
    }
  },

  end: function() {
    this.log(yosay(
      'Almost done! Need help? Check out ' + chalk.red('http://github.com/tameraydin/generator-cross-module')
    ));

    this.installDependencies({
      bower: false,
      npm: true
    });
  }
});

module.exports = CrossModuleGenerator;