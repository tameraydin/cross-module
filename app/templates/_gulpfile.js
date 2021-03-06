// gulp node modules
var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');
var istanbul = require('gulp-istanbul');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');
var babel = require('gulp-babel');

// node modules
var del = require('del');
var runSequence = require('run-sequence');
var stylish = require('jshint-stylish');

// package.json
var pkg = require('./package');
var jshintConfig = pkg.jshintConfig;
var banner = [
    '/**',
    ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)',
    ' * Copyright <%= new Date().getFullYear() %> <%= pkg.author %>',
    ' * Licensed under <%= pkg.license %>',
    ' */',
    ''
  ].join('\n');

var PATH = {
  SOURCE: './src/',
  TEST: './test/',
  DIST: './dist/'
};

gulp.task('clean', function(cb) {
  del([PATH.DIST], cb);
});

jshintConfig.lookup = false;
gulp.task('jshint', function() {
  return gulp.src(PATH.SOURCE + '*.js')
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('prepare-test', function() {
  return gulp.src(PATH.SOURCE + '*.js')
    .pipe(babel({
      blacklist: ['useStrict']
    }))
    .pipe(concat(pkg.name + '.js'))
    .pipe(gulp.dest(PATH.TEST));
});

gulp.task('test', ['prepare-test'], function() {
  var cleanup = function() {
    del([PATH.TEST + pkg.name + '.js']);
  };

  return gulp.src(PATH.TEST + '*.spec.js')
    .pipe(jasmine())
    .on('error', cleanup)
    .on('end', cleanup);
});

gulp.task('coverage', ['prepare-test'], function(cb) {
  gulp.src(PATH.TEST + pkg.name + '.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      gulp.src(PATH.TEST + '*.spec.js')
        .pipe(jasmine())
        .pipe(istanbul.writeReports())
        .on('end', function() {
          del([PATH.TEST + pkg.name + '.js']);
          cb();
        });
    });
});

gulp.task('convert-and-concat', function() {
  return gulp.src(PATH.SOURCE + '*.js')
    .pipe(babel({
      blacklist: ['useStrict']
    }))
    .pipe(concat(pkg.name + '.js'))
    .pipe(gulp.dest(PATH.DIST));
});

gulp.task('uglify', function() {
  return gulp.src(PATH.DIST + pkg.name + '.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(PATH.DIST));
});

gulp.task('banner', function() {
  return gulp.src(PATH.DIST + '*.js')
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(PATH.DIST));
});

gulp.task('watch', function() {
  gulp.watch(PATH.SOURCE + '*.js', ['jshint']);
});

gulp.task('autotest', function() {
  gulp.watch(PATH.SOURCE + '*.js', ['jshint', 'test']);
  gulp.watch(PATH.TEST + '*.spec.js', ['test']);
});

gulp.task('build', ['clean'], function(cb) {
  runSequence(
    'jshint',
    'coverage',
    'convert-and-concat',
    'uglify',
    'banner',
    cb);
});

gulp.task('default', ['build']);
