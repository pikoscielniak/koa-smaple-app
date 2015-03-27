var gulp = require('gulp');
var connect = require('gulp-connect');
var mocha = require('gulp-mocha');

// Html task
gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(connect.reload());
});

//Js task
gulp.task('js', function () {
    gulp.src('./public/*/**.js')
        .pipe(connect.reload());
});

// Watch our changes
gulp.task('watch', function () {
    //html
    gulp.watch(['*.html'], ['html']);
    gulp.watch(['./public/*/**.js'], ['js']);
});

gulp.task('connect', function () {
    connect.server(({
        root: '.',
        liveReload: true
    }));
});


gulp.task('mocha', function () {
    gulp.watch(['./lib/*/**.js', './*.js', './test/*.js'], ['runMocha']);
});

gulp.task('runMocha', function () {
    return gulp.src('./test/*.js', {read: false})
        .pipe(mocha({}));
});

gulp.task('default', ['connect', 'watch']);
