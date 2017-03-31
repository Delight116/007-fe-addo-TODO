'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var miniCss = require('gulp-minify-css');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var server = require('gulp-server-livereload');

var path = {
  build: {
    css: 'app/build/css/',
    js: 'app/build/js/'
  },
  src: {
    style: 'app/style/main.scss',
    js: 'app/js/app.js'
  },
  clean: './app/build'
};

gulp.task('style:build', function () {
    gulp.src(path.src.style)
    .pipe(sass())
    .pipe(autoprefix())
    .pipe(miniCss())
    .pipe(gulp.dest(path.build.css));
});

gulp.task('js:build', function() {
  return browserify(path.src.js)
  .transform('babelify', {
    presets: ["es2015", "react"]
  })
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest(path.build.js));
})

gulp.task('watcher', function () {
  gulp.watch('app/style/**/*.scss', ['style:build']);
  gulp.watch('app/js/**/*.js', ['js:build']);
})

gulp.task('webserver', function () {
  gulp.src('app')
  .pipe(server({
    livereload: true,
    open: true,
    port: 8085
  })
);
})

gulp.task('default', function () {
  gulp.run('style:build','js:build', 'watcher');
});
