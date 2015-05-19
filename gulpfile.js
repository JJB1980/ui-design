
var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less1', function() {
    return gulp.src('styles.less')
        .pipe(less())
        .pipe(gulp.dest(''));
});


gulp.task('watch', function() {
    gulp.watch('styles.less', ['less1']);  // Watch the .less file, then run the less task
});

gulp.task('default', ['less1','watch']); // Default will run the 'less' and 'watch' task
