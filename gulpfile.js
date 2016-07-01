'use strict';

const gulp = require('gulp')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const clean = require('gulp-clean')
const runSequence = require('run-sequence')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const ngAnnotate = require('gulp-ng-annotate')
const changed = require('gulp-changed')

gulp.task('clean', function () {
  return gulp.src('./app/dist/')
    .pipe(clean())
})

gulp.task('compile-sass', () => {
  var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
  }
  return gulp.src('./app/src/css/**/style.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest('./app/dist/css'))
})

gulp.task('copyFonts', () => {
  return gulp.src('./app/src/css/fonts/*')
    .pipe(gulp.dest('app/dist/css/fonts'))
})

gulp.task('optimize-img', () => {
  return gulp.src('app/src/img/**/*')
        .pipe(changed('app/dist/img'))
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('app/dist/img'))
})

gulp.task('uglify-libs', () => {
  return gulp.src('app/src/lib/**/*.js')
    .pipe(changed('app/dist/js'))
    .pipe(uglify())
    .pipe(concat('compressed.js'))
    .pipe(gulp.dest('app/dist/js'))
})

gulp.task('uglify-scripts', () => {
  return gulp.src('app/src/js/**/*.js')
    .pipe(changed('app/dist/js'))
    .pipe(concat('scripts.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('app/dist/js'))
})

gulp.task('watchAndUpdate', () => {
  gulp.watch('./app/src/css/**/*.scss', ['compile-sass'])
  gulp.watch('./app/src/js/**/*.js', ['uglify-scripts'])
  gulp.watch('./app/src/img/**/*', ['optimize-img'])
})

gulp.task('prod', (callback) => {
  return runSequence('clean', ['uglify-libs', 'uglify-scripts', 'compile-sass', 'copyFonts', 'optimize-img'], callback)
})
gulp.task('watch', (callback) => {
  return runSequence('compile-sass', 'uglify-scripts', 'optimize-img', ['watchAndUpdate'], callback)
})
