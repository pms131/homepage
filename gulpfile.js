var gulp = require('gulp');
var del = require('del');
var push = require('git-push');
var argv = require('minimist')(process.argv.slice(2));

gulp.task('clean', del.bind(null, ['build/*', '!build/.git'], {dot: true}));

gulp.task('build', ['clean'], function() {
  // TODO: Build website from source files into the `./build` folder
});

gulp.task('serveprod', function() {
  connect.server({
    root: ['./'],
    port: process.env.PORT || 3000, // localhost:5000
    livereload: false
  });
});