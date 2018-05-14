'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', ['clean'], function(cb) {

  global.isProd = false;

  return runSequence(['styles', 'images', 'fonts', 'webpack'], 'watch', cb);

});
