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
    	.pipe(rev())
    	.pipe(uglify())
    	.pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest( 'rev/js' ) );
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

gulp.task('css', function () {
    return gulp.src('src/css/*.css')
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/css' ) );
});


gulp.task('rev', function () {
	 return gulp.src(['rev/**/*.json', 'src/*.html']) 
        .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': '/dist/css',
                'js': '/dist/js',
                'cdn/': function(manifest_value) {
                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                }
            }
        }) )
        .pipe( htmlmin({
                empty:true,
                spare:true
            }) )
        .pipe( gulp.dest('dist') );   
});

gulp.task('default',["html","css","minifyjs","rev"])
