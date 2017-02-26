var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('gulp-merge');
var sync = require('gulp-sync')(gulp).sync;
var clean = require('gulp-clean');
var webpack = require('gulp-webpack');
var path = require('path');

var OUTPUT = 'dist';
var TMP = '.build-tmp';
var INPUT = "src/**/*.ts";

gulp.task('typescript', function() {
      return gulp.src(TMP + '/main.ts')
          .pipe(webpack({
            resolve: {
              root: path.resolve(TMP),
              extensions: ['', '.js', '.ts']
            },
            output: {
              filename: 'main.js'
            },
            target: 'node',
            module: {
              loaders: [
                { test: /\.ts$/, loader: 'ts-loader' },
                { test: /\.json$/, loader: 'json-loader' },
              ],
            },
          }))
          .pipe(gulp.dest(OUTPUT));
});

gulp.task('copy-tsconfig', function(){
  return gulp.src(['src/tsconfig.json'])
      .pipe(gulp.dest(TMP));
});

gulp.task('copy-system-files', function(){
  return gulp.src(['system_files/**/*.ts'])
      .pipe(gulp.dest(TMP));
});

gulp.task('copy-files', function(){
  return gulp.src([INPUT])
      .pipe(gulp.dest(TMP));
});

gulp.task('remove-tmp', function() {
  return gulp.src(TMP, {read: false})
      .pipe(clean());
});

gulp.task('remove-dist', function() {
  return gulp.src(OUTPUT, {read: false})
      .pipe(clean());
});

gulp.task('build', sync([['copy-files', 'copy-system-files', 'copy-tsconfig'], 'typescript' ]) );

gulp.task('default', ['build']);