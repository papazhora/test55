var gulp = require('gulp')
    concat = require('gulp-concat')
    uglify = require('gulp-uglifyjs');


gulp.task('scripts', function(){
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js', 
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));

});






    // sass = require('gulp-sass')


// gulp.task('sass', function(){
//     return gulp.src('app/sass/main.sass')
//         .pipe(sass())
//         .pipe(gulp.dest('app/css'))
// });

// gulp.task('watch', function(){
//     gulp.watch('app/sass/main.sass', ['sass'])
// });