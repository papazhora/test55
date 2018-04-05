

var gulp        = require('gulp')
    concat      = require('gulp-concat')
    uglify      = require('gulp-uglifyjs')
    sass        = require('gulp-sass')
    browserSync = require('browser-sync')
    rename      = require('gulp-rename')
    cssnano     = require('gulp-cssnano')
    del         = require('del')
    rsync       = require('gulp-rsync');


gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    })
});


gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
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

gulp.task('css-libs', ['sass'], function(){
    return(gulp.src('app/css/libs.css'))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('watch', ['browserSync', 'css-libs', 'scripts'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass'])
    gulp.watch('app/**/*.html', browserSync.reload)
    gulp.watch('app/**/*.js', browserSync.reload)
});

gulp.task('build', ['clean', 'sass', 'scripts'], function() {
    var buildCss = gulp.src([
        'app/css/main.css',
        'app/css/libs.min.css',

    ])
    .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')

    .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});


gulp.task('deploy', function() {
    gulp.src('build/**')
      .pipe(rsync({
        root: 'build/',
        hostname: 'example.com',
        destination: 'path/to/site/',
        archive: true,
        silent: false,
        compress: true
      }));






    // sass = require('gulp-sass')


// gulp.task('sass', function(){
//     return gulp.src('app/sass/main.sass')
//         .pipe(sass())
//         .pipe(gulp.dest('app/css'))
// });

// gulp.task('watch', function(){
//     gulp.watch('app/sass/main.sass', ['sass'])
// });