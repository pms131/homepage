/*******************************
            Set-up
*******************************/

var
  gulp         = require('gulp-help')(require('gulp')),

  // read user config to know what task to load
  config       = require('./semantic/config/user'),

  // watch for file changes and build
  watch        = require('./semantic/tasks/watch'),

  // build all files
  build        = require('./semantic/tasks/build'),
  buildJS      = require('./semantic/build/javascript'),
  buildCSS     = require('./semantic/build/css'),
  buildAssets  = require('./semantic/build/assets'),

  // utility tasks
  clean        = require('./semantic/clean'),
  version      = require('./semantic/version'),

  // install tasks
  install      = require('./semantic/install'),
  checkInstall = require('./semantic/check-install'),

  // docs tasks
  serveDocs    = require('./semantic/docs/serve'),
  buildDocs    = require('./semantic/docs/build'),

  // rtl
  buildRTL     = require('./semantic/rtl/build'),
  watchRTL     = require('./semantic/rtl/watch')
;


/*******************************
             Tasks
*******************************/

gulp.task('default', false, [
  'check-install'
]);

gulp.task('watch', 'Watch for site/theme changes', watch);

gulp.task('build', 'Builds all files from source', build);
gulp.task('build-javascript', 'Builds all javascript from source', buildJS);
gulp.task('build-css', 'Builds all css from source', buildCSS);
gulp.task('build-assets', 'Copies all assets from source', buildAssets);

gulp.task('clean', 'Clean dist folder', clean);
gulp.task('version', 'Displays current version of Semantic', version);

gulp.task('install', 'Runs set-up', install);
gulp.task('check-install', 'Displays current version of Semantic', checkInstall);

/*--------------
      Docs
---------------*/

/*
  Lets you serve files to a local documentation instance
  https://github.com/Semantic-Org/Semantic-UI-Docs/
*/

gulp.task('serve-docs', 'Serve file changes to SUI Docs', serveDocs);
gulp.task('build-docs', 'Build all files and add to SUI Docs', buildDocs);


/*--------------
      RTL
---------------*/

if(config.rtl) {
  gulp.task('watch-rtl', 'Watch files as RTL', watchRTL);
  gulp.task('build-rtl', 'Build all files as RTL', buildRTL);
}

/* Admin Tasks */
if(config.admin) {
  require('./semantic/collections/admin')(gulp);
}
