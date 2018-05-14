'use strict';

var config        = require('../config');
var gulp          = require('gulp');

gulp.task('watch', function() {
  gulp.watch(config.styles.assets,  ['styles']);
  gulp.watch(config.images.src,  ['images']);
  gulp.watch(config.fonts.src,   ['fonts']);
});
