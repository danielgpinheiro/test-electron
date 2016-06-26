'use strict';

var gulp = require('gulp')
var sass = require('gulp-sass')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var clean = require('gulp-clean')
var runSequence = require('run-sequence')
var imagemin = require('gulp-imagemin')
var pngquant = require('imagemin-pngquant')
var ngAnnotate = require('gulp-ng-annotate')

gulp.task('clean', function () {
  return gulp.src('./app/dist/')
    .pipe(clean())
})

gulp.task('compile-sass', function () {
  var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
  }
  return gulp.src('./app/style/**/style.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest('./app/dist/css'))
})

gulp.task('copyFonts', function () {
  return gulp.src('./app/style/fonts/*')
    .pipe(gulp.dest('app/dist/css/fonts'))
})

gulp.task('optimize-img', function () {
  return gulp.src('app/img/**/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('app/dist/img'))
})

gulp.task('uglify-libs', function () {
  return gulp.src('app/lib/**/*.js')
    .pipe(uglify())
    .pipe(concat('compressed.js'))
    .pipe(gulp.dest('app/dist/js'))
})

gulp.task('uglify-scripts', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('app/dist/js'))
})

gulp.task('watchAndUpdate', function () {
  gulp.watch('./app/style/**/*.scss', ['compile-sass'])
  gulp.watch('./app/js/**/*.js', ['uglify-scripts'])
})

gulp.task('prod', function (callback) {
  return runSequence('clean', ['uglify-libs', 'uglify-scripts', 'compile-sass', 'copyFonts', 'optimize-img'], callback)
})
gulp.task('watch', function (callback) {
  return runSequence('compile-sass', 'uglify-scripts', ['watchAndUpdate'], callback)
})
