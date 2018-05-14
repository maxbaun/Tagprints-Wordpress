'use strict';

var gulp   		= require('gulp');
var config 		= require('../config');
var rev			= require('gulp-rev');
var through 	= require('through2');
var del 		= require('del');

gulp.task('revision', function () {
	return gulp.src(['dist/**/**/*.{css,js}'], {base: 'dist'})
		.pipe(gulp.dest('./dist'))
		.pipe(rev())
		.pipe(gulp.dest('./dist'))
		.pipe(rev.manifest('dist/assets.json'))
		.pipe(deleteOld('dist'))
		.pipe(gulp.dest('.'));
});

function deleteOld(base) {
	return through.obj(function (file, enc, cb) {
		var manifest = JSON.parse(file.contents.toString(enc));
		var files = Object.keys(manifest);

		for (var i = 0; i < files.length; i++) {
			files[i] = file.base + '/' + base + '/' + files[i];
		}

		del(files, function (err) {
			cb(err, file);
		});
	});
}
