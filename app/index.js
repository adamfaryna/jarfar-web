var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments);

		// this.option('coffee');


	},

	prompting: function () {
		var done = this.async();

		this.prompt({
			type: 'input',
			name: 'name',
			message: 'Your project name',
			default: this.appname
		}, function (answers) {
			this.props = answers;
			this.log(answers.name);
			done();
		}.bind(this));
	},

	writing: {
		config: function () {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'), {
					name: this.props.name
				}
			);
			this.fs.copyTpl(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json'), {
					name: this.props.name
				}
			);
			this.fs.copy(
				this.templatePath('_coffee/_src/_app/_components'),
				this.destinationPath('coffee/src/app/components')
			);
			this.fs.copy(
				this.templatePath('_coffee/_src/_app/_service'),
				this.destinationPath('coffee/src/app/service')
			);
			this.fs.copy(
				this.templatePath('_coffee/_src/_app/_app.coffee'),
				this.destinationPath('coffee/src/app/app.coffee')
			);
			this.fs.copy(
				this.templatePath('_coffee/_src/_app/_constans.coffee'),
				this.destinationPath('coffee/src/app/constans.coffee')
			);
			this.fs.copy(
				this.templatePath('_coffee/_test/_app/_components'),
				this.destinationPath('coffee/test/app/components')
			);
			this.fs.copy(
				this.templatePath('_coffee/_test/_app/_service'),
				this.destinationPath('coffee/test/app/service')
			);
			this.fs.copy(
				this.templatePath('_public/_css'),
				this.destinationPath('public/css')
			);
			this.fs.copy(
				this.templatePath('_public/_fonts'),
				this.destinationPath('public/fonts')
			);
			this.fs.copy(
				this.templatePath('_public/_images'),
				this.destinationPath('public/images')
			);
			this.fs.copy(
				this.templatePath('jshintrc'),
				this.destinationPath('.jshintrc')
			);
			this.fs.copy(
				this.templatePath('bowerrc'),
				this.destinationPath('.bowerrc')
			);
			this.fs.copy(
				this.templatePath('_gulpfile.js'),
				this.destinationPath('gulpfile.js')
			);
			this.fs.copy(
				this.templatePath('_karma.conf.js'),
				this.destinationPath('karma.conf.js')
			);
			this.fs.copy(
				this.templatePath('gitignore'),
				this.destinationPath('.gitignore')
			);
			this.fs.copy(
				this.templatePath('_LICENSE'),
				this.destinationPath('LICENSE')
			);
			this.fs.copy(
				this.templatePath('_README.md'),
				this.destinationPath('README.md')
			);
		},

		install: function() {
  		// this.installDependencies();
		}
	}
});
