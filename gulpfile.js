
var gulp = require('gulp');
var less = require('gulp-less');
var webserver = require('gulp-webserver');

gulp.task('less1', function() {
    return gulp.src('css/styles.less')
        .pipe(less())
        .pipe(gulp.dest('css'));
});

gulp.task('webserver', function() {
    gulp.src('')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true,
            port: 3100,
            fallback: 'index.html'
        }));
});

gulp.task('watch', function() {
    gulp.watch('css/styles.less', ['less1']);  // Watch the .less file, then run the less task
});

gulp.task('default', ['less1','watch', 'webserver']); // Default will run the 'less' and 'watch' task
