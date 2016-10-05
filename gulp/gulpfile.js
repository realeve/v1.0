var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var cssmin = require('gulp-minify-css'); //css压缩
var rev = require('gulp-rev'); //更改版本号
//var revCollector = require('gulp-rev-collector'); //gulp-rev的插件，用于html模板更改引用路径

var header = require('gulp-header');
var footer = require('gulp-footer');
var jshint = require('gulp-jshint');
var cached = require('gulp-cached');
var remember = require('gulp-remember');
var changed = require('gulp-changed');

var rename = require('gulp-rename'); //文件更名

var SRC = {
	images: './src/img/*'
};

var taskList = require('./settings/tasklist.js');

var DEST = {
	scripts: '../assets/build/js',
	images: 'build/img',
	css: '../assets/build/css'
};

gulp.task('clean', function() {
	return del(['build']);
});

//gulp.task('scripts', ['clean'], function() {
gulp.task('js', function() {

	for (var key in taskList) {
		if (typeof taskList[key].js != 'undefined') {
			build(key);
		}
	}

	function build(fileName) {
		console.log('正在编译' + fileName + '...');
		gulp.src(taskList[fileName].js)
			// `changed` 任务需要提前知道目标目录位置才能找出哪些文件是被修改过的
			.pipe(changed(DEST.scripts))
			// 只有被更改过的文件才会通过这里
			.pipe(sourcemaps.init()) //生成sourcemap
			.pipe(uglify()) //压缩
			.pipe(cached('scripts')) // 只传递更改过的文件
			.pipe(jshint()) // 对这些更改过的文件做一些特殊的处理...
			//.pipe(header('(function () {')) // 比如 jshinting ^^^
			//.pipe(footer('})();')) // 增加一些类似模块封装的东西
			.pipe(remember('scripts')) // 把所有的文件放回 stream
			.pipe(concat(fileName + '.min.js'))
			//添加上版本号
			//.pipe(rev())
			.pipe(gulp.dest(DEST.scripts));
		//.pipe(rev.manifest())
		//.pipe(sourcemaps.write());
		//.pipe(gulp.dest(DEST.scripts + '/manifest'));
	}
});

//合并css文件
gulp.task('css', function() {

	for (var key in taskList) {
		if (typeof taskList[key].css != 'undefined') {
			build(key);
		}
	}

	function build(fileName) {
		gulp.src(taskList[fileName].css)
			.pipe(concat(fileName + '.min.css'))
			.pipe(cssmin({
				advanced: false,
				compatibility: 'ie7',
				keepBreaks: false
			}))
			//添加上版本号
			//.pipe(rev())
			.pipe(gulp.dest(DEST.css));
		//.pipe(rev.manifest())
		//.pipe(gulp.dest(DEST.css + '/manifest'));
	}

});

gulp.task('img', function() {
	return gulp.src(SRC.images)
		.pipe(imagemin({
			optimizationLevel: 5
		}))
		.pipe(gulp.dest(DEST.images));
});

gulp.task('default', ['js', 'img', 'css']);