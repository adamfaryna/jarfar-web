'use strict';

var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var $            = require('gulp-load-plugins')();

gulp.task('lint', () => {
  return gulp.src(['public/app/**/*.js', 'test/**/*.js', 'gulpfile.js', 'karma.conf.js', '!/**/jquery.js'])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

// Compile less into CSS & auto-inject into browsers
gulp.task('less', () => {
  return gulp.src('less/*.less')
    .pipe($.less())
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('babel', () => {
  return gulp.src('src/**/*.es6', { base: 'src' })
    .pipe($.babel())
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
});

gulp.task('babelTest', () => {
  return gulp.src('test/**/*.es6', { base: 'babel/test' })
    .pipe(gulp.dest('./test/'));
});

gulp.task('inject', () => {
  var inject_res = gulp.src(['./public/app/**/*.js', './public/css/**/*.css'], {read: false});

  return gulp.src('./public/index.html')
    .pipe($.inject(inject_res, { addRootSlash: false, read: false, relative: true }))
    .pipe($.wiredep({
      src: './public/index.html',
      directory: './public/bower_components'
    }))
    .pipe(gulp.dest('./public'));
});

// Static Server + watching files
gulp.task('serve', ['less', 'babel', 'lint', 'inject'], () => {
  browserSync.init({
    browser: ['firefox'],
    server: 'public/',
    port: '3000'
  });

  gulp.watch('./less/*.less', ['less']);
  gulp.watch('./src/**/*.es6', ['babel']);
  gulp.watch(['./public/**/*.*', '!./public/bower_components']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
