'use strict';

module.exports = function(config){
  config.set({
    basePath : './',
    singleRun: false,

    files : [
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-ui-router/release/angular-ui-router.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/jquery/dist/jquery.min.js',
      'public/app/**/*.html',
      'public/app/**/*.js',
      'test/app/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine-jquery', 'jasmine'],

    browsers : ['PhantomJS'],
    //browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-jasmine-jquery',
      'karma-junit-reporter',
      'karma-ng-html2js-preprocessor'
    ],

    preprocessors: {
      'public/app/**/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'public/',
      moduleName: 'templatesHtml'
    },

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
