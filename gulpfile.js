var gulp = require('gulp');
var del = require('del');
var push = require('git-push');
var argv = require('minimist')(process.argv.slice(2));

gulp.task('clean', del.bind(null, ['build/*', '!build/.git'], {dot: true}));

gulp.task('build', ['clean'], function() {
  // TODO: Build website from source files into the `./build` folder
});

gulp.task('deploy', function(cb) {
  var remote = argv.production ?
    {name: 'production', url: 'https://github.com/<org>/site.com', branch: 'gh-pages'},
    {name: 'test', url: 'https://github.com/<org>/test.site.com', branch: 'gh-pages'};
  push('./build', remote, cb);
});