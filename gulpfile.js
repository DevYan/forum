var gulp = require('gulp'),
		sass = require('gulp-sass'),
		uglify = require('gulp-uglify'),
		port = 12345,
		livereload = require('gulp-livereload');

gulp.task('sass',function(){
	gulp.src('./css/index.scss')
		.pipe(sass())
		.pipe(gulp.dest('./css'))	
		.pipe(livereload());
})



gulp.task('default',function(){
	gulp.watch('./css/*.scss',function(){
		livereload.listen();
		gulp.run('sass');
	})

})
