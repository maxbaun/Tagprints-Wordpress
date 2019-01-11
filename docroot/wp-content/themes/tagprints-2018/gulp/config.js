'use strict';

module.exports = {
	styles: {
		assets: './assets/styles/**/**/*.scss',
		src: './assets/styles/main.scss',
		dest: 'dist/styles',
		main: 'main.css'
	},
	scripts: {
		src: ['./assets/scripts/**/**/*.js', './app/work/src/**/**/*.js'],
		dest: 'dist/scripts'
	},
	images: {
		src: './assets/images/**/*',
		dest: 'dist/images'
	},
	fonts: {
		src: ['./assets/fonts/**/*', './bower_components/fontawesome/fonts/*'],
		dest: 'dist/fonts'
	},
	dist: {
		root: 'dist'
	},
	browserify: {
		entries: ['./assets/scripts/main.js'],
		appEntries: ['./assets/scripts/components/smugmug/index.js'],
		ourWorkEntries: ['./app/work/index.js'],
		ignore: ['./assets/scripts/vendor/**/*.js'],
		bundleName: 'main.js',
		sourcemap: true
	},
	test: {
		entries: ['./spec/index.js'],
		ignore: ['./assets/scripts/vendor/**/*.js'],
		bundleName: 'test.js',
		sourcemap: true
	}
};
