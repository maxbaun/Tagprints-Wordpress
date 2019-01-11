const gulp = require('gulp');
const gulpWebpack = require('webpack-stream');

let webpackConfig = require('../../webpack.config.dev');
const gulpConfig = require('../config');

gulp.task('webpack', done => {
	const isDev = process.env.NODE_ENV !== 'production';

	let config = webpackConfig(isDev);

	if (!isDev) {
		process.env.NODE_ENV = 'production';
		config = require('../../webpack.config.prod');
	}

	config = Object.assign(config, {
		watch: isDev
	});

	if (isDev) {
		done();
	}

	return gulp.src(gulpConfig.scripts.src)
		.pipe(gulpWebpack(config))
		.pipe(gulp.dest('./dist/scripts'));
});
