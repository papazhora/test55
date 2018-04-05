import { Stream } from 'stream';

var gulp = require('gulp')
    concat = require('gulp-concat')
    uglify = require('gulp-uglifyjs')
    sass   = require('gulp-sass')
    // browserSync = require('browser-sync');


// gulp.task('browserSync', function() {
//     browserSync({
//         server: {
//             baseDir: 'app'
//         },
//         notify: false
//     })
// });


gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    // .pipe(browserSync.reload())
});


gulp.task('scripts', function(){
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js', 
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));

});

gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.sass', ['sass'])
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