
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function () {
    return browserify('./www/js/app.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./www/js/dist/'));
});