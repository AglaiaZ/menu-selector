/**
 * @author zhangboxuan@thinkerx.com
 */
var htmlminConfig = {
    collapseWhitespace: true
};

var gulp = require('gulp');
var del = require('del');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var flatten = require('gulp-flatten');
var browserSync = require('browser-sync').create();

var projectName = 'menu-selector';

var paths = {
    src: 'src',
    demo: 'demo',
    dist: 'dist',
    js: [
        'src/filters/*.js',
        'src/*.js'
    ],
    css: [
        'scss/*.scss'
    ],
    html: [
        'src/*.html'
    ]
};

gulp.task('clean', function () {
    return del('dist');
});

gulp.task('lint', function() {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// js task
gulp.task('build:js', ['lint'], function() {
    return gulp.src(paths.js)
        .pipe(concat(projectName + '.js'))
        .pipe(gulp.dest(paths.dist + '/js/'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.dist + '/js/'));
});

// css task
gulp.task('build:css', function() {
    return gulp.src(paths.css)
        .pipe(concat(projectName + '.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dist + '/css'))
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.dist + '/css'));
});

gulp.task('build:html', function() {
    return gulp.src(paths.html)
        .pipe(flatten())
        .pipe(gulp.dest(paths.dist + '/views'));
});

gulp.task('build', [
    'build:js',
    'build:css',
    'build:html'
]);

gulp.task('watch', ['build'], function() {
    gulp.watch(paths.libs + '/**/*', ['build:vendor']);
    gulp.watch([
        paths.app + '/**/*.js'
    ], ['build:js']);
    gulp.watch([
        paths.assets + '/**/*.scss'
    ], ['build:css']);
    gulp.watch(paths.app + '/**/*.html', ['build:html']);
});

gulp.task('debug', ['watch'], function () {
    browserSync.init({
        startPath: '/',
        server: {
            baseDir: paths.demo,
            routes: {
                '/dist': 'dist',
                '/views': 'dist/views'
            }
        }
    });

    gulp.watch(paths.dist + '/**/*').on('change', browserSync.reload);
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});

