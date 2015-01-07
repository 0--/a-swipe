var gulp = require('gulp'),
	debug = require('gulp-debug'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),	
	browserify = require('gulp-browserify'),
	jshint = require('gulp-jshint'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	globScripts = 'src/scripts/**/*.js',
	globStyles = ['src/styles/**/*.sass', 'src/styles/**/*.scss'],
	globScaffold = 'src/scaffold/**';

gulp.task('js', function () {
	gulp.src(globScripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(browserify())
		.pipe(uglify())
		.pipe(concat('main.js'))
		.pipe(
			gulp.dest('build/js')
		)
		.pipe(connect.reload());
})

gulp.task('css', function () {
	gulp.src(globStyles)
		.pipe(compass({
			config_file: './src/config.rb',
			css: 'src/styles/css',
			sass: 'src/styles/sass'
		}))
		.pipe(
			gulp.dest('build/css')
		)
		.pipe(connect.reload());
})

gulp.task('scaffold', function () {
	gulp.src(globScaffold)
		.pipe(
			gulp.dest('build')
		)
		.pipe(connect.reload());
})

gulp.task('hello', function () {
	console.log("--------- GULP ----------");
})

gulp.task('dev', function(){
	console.log('launching Connect dev server, Ctrl-c to stop');
	connect.server({
		livereload: true,
		root: 'build'
	})
})

gulp.task('build', ['scaffold', 'js', 'css']);

gulp.task('default', ['build']);

gulp.task('watch', function(){
	console.log('starting Gulp watch tasks, Ctrl-c to stop');
	gulp.run('default');

	gulp.watch(globScripts, function(){
		console.log('----- SCRIPT WATCH CHANGE -----');
		gulp.run('js');
	});
	gulp.watch(globStyles, function(){
		console.log('----- STYLES WATCH CHANGE -----');
		gulp.run('css');
	});
	gulp.watch(globScaffold, function(){
		console.log('----- SCAFFOLD WATCH CHANGE -----');
		gulp.run('scaffold');
	})
})