'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');

debugger;
module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();

    class Prompt {
      constructor(type, name, message, def) {
        this.type = type;
        this.name = name;
        this.message = message;
        this.default = def;
      }
    }

    var prompts = [
      new Prompt('input', 'name', 'Your project name', this.appname),
      new Prompt('input', 'title', 'Your project title', this.appname),
      new Prompt('input', 'description', 'Your project description')
    ];

    this.prompt(prompts, (answers) => {
      this.props = answers;
      this.log(JSON.stringify(answers));
      done();
    });
  },

  writing: {
    config: function () {
      var that = this;

      function copyDataCreator(templatePath, destinationPath, params) {
        return [
          that.templatePath(templatePath),
          that.destinationPath(destinationPath),
          params || {}
        ];
      }

      [
        'src/app/components',
        'src/app/service',
        'test/app/components',
        'test/app/service',
        'public/css',
        'public/fonts',
        'public/images'
      ].forEach((elem) => {
        mkdirp.sync(elem);
      });

      [
        copyDataCreator('_src/_app/_app.es6', 'src/app/app.es6'),
        copyDataCreator('_src/_app/_config.es6', 'src/app/config.es6'),
        copyDataCreator('_src/_app/_constans.es6', 'src/app/constans.es6'),
        copyDataCreator('_less/_style.less', 'less/style.less'),
        copyDataCreator('jshintrc', '.jshintrc'),
        copyDataCreator('bowerrc', '.bowerrc'),
        copyDataCreator('babelrc', '.babelrc'),
        copyDataCreator('gitignore', '.gitignore'),
        copyDataCreator('_gulpfile.js', 'gulpfile.js'),
        copyDataCreator('_karma.conf.js', 'karma.conf.js'),
        copyDataCreator('_LICENSE', 'LICENSE'),
        copyDataCreator('_README.md', 'README.md'),
      ].forEach((elem) => {
        that.fs.copy(...elem);
      });

      [
        copyDataCreator('_public/_index.html', 'public/index.html', {
          title: this.props.title, description: this.props.description
        }),
        copyDataCreator('_package.json', 'package.json', {
          name: this.props.name
        }),
        copyDataCreator('_bower.json', 'bower.json', {
          name: this.props.name
        })
      ].forEach((elem) => {
        that.fs.copyTpl(...elem);
      });
    },

    install: function() {
       this.installDependencies();
    }
  }
});
