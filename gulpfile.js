var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');//html压缩文件
var uglify = require('gulp-uglify');//js文件压缩
var concat = require('gulp-concat');//多个文件合并为一个
var minifyCss = require('gulp-minify-css');//压缩CSS为一行；
var imagemin = require('gulp-imagemin'); //压缩图片
var rev = require('gulp-rev');//给文件名添加md5 hash值
var revCollector = require('gulp-rev-collector');

gulp.task('minifyjs', function(){
    gulp.src('src/js/**/*.js')
        .pipe(uglify())//压缩js到一行
        .pipe(gulp.dest('dist/js'));//输出到js目录
});

gulp.task('html', function(){
    gulp.src('src/*.html')
		.pipe(htmlmin())
    	.pipe(gulp.dest('dist'));//输出到
});

gulp.task('imagemin', function() {
 	gulp.src('src/img/**/*.{jpg,png,gif}')
 		.pipe(imagemin())
 		.pipe(gulp.dest("dist/img"))
});

gulp.task('cssmin', function() {
 	gulp.src('src/css/*.css')
        .pipe(minifyCss())
        .pipe(rev()) 
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});
//
//gulp.task('rev',function(){
// 	gulp.src('dist/css/*.css')
//  .pipe( revCollector() )
//  .pipe(gulp.dest('dist/css/'));
//});

gulp.task('rev', function () {
	gulp.src(['rev/css/*.json', 'src/*.html']) 
//   gulp.src('src/css/*.css')
    .pipe(revCollector())                                   
     //- 执行文件内css名的替换
    .pipe(gulp.dest('dist'));    
});
