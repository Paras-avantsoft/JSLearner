/* global  require:true, console:true*/
'use strict';

var gulp = require('gulp'),
    del = require('del'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    runSequence = require('run-sequence'),
    // gutil = require('gulp-util'),
    checkCSS = require('gulp-check-unused-css'),
    logs = [];

///// Build Process /////

gulp.task('mvfiles', function() {
    logs.push('>>>>> Moving files to dest folder');
    // console.log('>>>>> Moving files to dest folder');
    return gulp.src('app/view/**/*.scss')
        .pipe(gulp.dest('app/dest'));
});

gulp.task('delfiles', function() {
    logs.push('>>>>> Deleting dest folder');
    // console.log('>>>>> Deleting dest folder');
    return del.sync('app/dest');
});

gulp.task('concatfiles', function() {
    logs.push('>>>>> Concating files and creating single script file');
    // console.log('>>>>> Concating files and creating single script file');
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('app/dest'));
});

gulp.task('printlogs', function() {
    for (var i = 0; i < logs.length; i++) {
        console.log(logs[i]);
    }
});

gulp.task('build', function() {
    logs.push('>>>>> Build start');
    runSequence('delfiles', ['mvfiles', 'concatfiles'], function() {
        logs.push('>>>>> Build Done');
        // console.log('>>>>> Build Done');
        runSequence('printlogs');
    });
});


///// Check for unused css style /////
gulp.task('check', function() {
    return gulp.src('app/*.html')
        .pipe(checkCSS());
});
