const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], () => {
 browserSync.init({
  server: "./src"
 });

 gulp.watch("src/scss/**/*.scss", ['sass']);
 gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
 return gulp.src("src/scss/**/*.scss")
  .pipe(sass())
  .pipe(concatCss("style.min.css"))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest("src/css"))
  .pipe(browserSync.stream());
});


gulp.task('default', () => {
    gulp.start('serve');
});
