'use strict';

const gulp = require('gulp');
const changed = require('gulp-changed');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');

var config = require('../config');

gulp.task('images', function () {
	return gulp.src(config.images.src)
		.pipe(changed(config.images.dest))
		.pipe(plumber({
			errorHandler: error => {
				gutil.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(imagemin(
			[
				imagemin.gifsicle({
					interlaced: true
				}),
				imagemin.svgo({
					multipass: true
				}),
				pngquant({
					quality: '60-80',
					speed: 2
				}),
				mozjpeg({
					dcScanOpt: 0,
					quality: 75,
					quantTable: 2
				})
			],
			{
				verbose: true
			}
		))
		.pipe(plumber.stop())
		.pipe(gulp.dest(config.images.dest));
});
