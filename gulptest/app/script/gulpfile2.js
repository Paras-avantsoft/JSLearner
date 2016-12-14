var gulp = require('gulp');
var del = require('del');

gulp.task('movefiles', function() {
    return gulp.src('app/view/**/*.scss')
        .pipe(gulp.dest('app/dest'));
});

gulp.task('deletefiles', function() {
    return del.sync('app/dest');
});