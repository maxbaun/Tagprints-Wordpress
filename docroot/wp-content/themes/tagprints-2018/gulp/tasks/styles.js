'use strict';

const config = require('../config');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const cssNano = require('gulp-cssnano');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const handleErrors = require('../error');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function () {
	return gulp.src(config.styles.src)
		.pipe(gulpif(!global.isProd, sourcemaps.init()))
		.pipe(sass({
			outputStyle: 'nested',
			precision: 10,
			errLogToConsole: !global.isProd
		}).on('error', handleErrors))
		.pipe(concat(config.styles.main))
		.pipe(gulpif(true, autoprefixer({
			browsers: [
				'last 2 versions',
				'ie >= 9',
				'android 4',
				'opera 12'
			]
		})))
		.pipe(gulpif(global.isProd, cssNano({
			safe: true
		})))
		.pipe(gulpif(!global.isProd, sourcemaps.write('.', {
			sourceRoot: 'assets/styles/'
		})))
		.on('error', handleErrors)
		.pipe(gulp.dest(config.styles.dest));
});
