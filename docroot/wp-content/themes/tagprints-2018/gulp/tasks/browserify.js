'use strict';

var config	   			= require('../config');
var gulp		 		= require('gulp');
var gulpif	   			= require('gulp-if');
var gutil				= require('gulp-util');
var source	   			= require('vinyl-source-stream');
var sourcemaps   		= require('gulp-sourcemaps');
var buffer	   			= require('vinyl-buffer');
var streamify			= require('gulp-streamify');
var watchify	 		= require('watchify');
var browserify   		= require('browserify');
var babelify	 		= require('babelify');
var uglify				= require('gulp-uglify');
var handleErrors 		= require('../error');
var ngAnnotate   		= require('browserify-ngannotate');
var lazypipe  		    = require('lazypipe');

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file, entries) {
	var bundler = browserify({
		entries: entries,
		noParse: ['lightbox2'],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	}, watchify.args);

	if (!global.isProd) {
		bundler = watchify(bundler);
		bundler.on('update', function () {
			return rebundle();
		});
	}

	var transforms = [
		'browserify-shim',
		babelify.configure({
			ignore: config.browserify.ignore,
			presets: [
				'react',
				[
					'env',
					{
						targets: {
							browsers: ['last 2 versions']
						}
					}
				],
				'stage-0'
			],
			plugins: [
				'es6-promise',
				'transform-object-rest-spread',
				'syntax-decorators',
				'transform-decorators-legacy',
				'transform-async-to-generator',
				'transform-react-constant-elements',
				'babel-plugin-transform-react-inline-elements',
				['transform-runtime', {
					polyfill: false,
					regenerator: true
				}]
			]
		}),
		ngAnnotate,
		'brfs'
		// 'bulkify'
	];

	transforms.forEach(function (transform) {
		bundler.transform(transform);
	});

	function rebundle() {
		var stream = bundler.bundle();
		var createSourcemap = !global.isProd && config.browserify.sourcemap;

		gutil.log('Rebundle...');

		return stream
			.on('error', handleErrors)
			.pipe(source(file))
			.pipe(gulp.dest(config.scripts.dest));
	}

	return rebundle();
}

gulp.task('browserify', function () {
	return lazypipe()
		.pipe(function () {
			return buildScript('smugmug.js', config.browserify.appEntries);
		})
		.pipe(function () {
			return buildScript('ourWork.js', config.browserify.ourWorkEntries);
		})
		.pipe(function () {
			return buildScript('main.js', config.browserify.entries);
		})();
});
