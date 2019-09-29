
var concat = require('gulp-concat');
var gulp = require('gulp');
// var uglify = require('gulp-uglify');
const uglify = require("gulp-uglify-es").default;

gulp.task('bundle-js', function() {
    return gulp.src('./*.mjs')
        .pipe(concat('loremFill.mjs'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});
