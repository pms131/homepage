var gulp    = require('gulp'),
      gutil    = require('gulp-util'),
      uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat');

gulp.task('js', function () {
    gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./js'));
});

gulp.task('default', function(){
    gulp.run('js'); 
});

gulp.watch('./js/*', function () {
     gulp.run('js');
});