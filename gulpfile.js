const gulp = require('gulp');
const vulcanize = require('gulp-vulcanize');
const del = require('del');
const dist = './dist';

gulp.task('build', ['clear', 'copy-files'], () => {
  gulp.src('./src/mc-app.html')
    .pipe(vulcanize({
      stripComments: false,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest(dist + '/src'));
});

gulp.task('clear', () => {
  del.sync([dist], {
    force: true
  });
});

gulp.task('copy-files', () => {
  gulp.src([
    './index.html'
  ])
  .pipe(gulp.dest(dist));
});