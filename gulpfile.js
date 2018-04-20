var gulp = require('gulp'),
    ejs = require('gulp-ejs'),
    yaml = require('js-yaml'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify');

var fsrc = {
    pages: 'views/pages/*.ejs',
    images: 'public/images/**/*',
    styles: 'public/stylesheets/*.css',
    scripts: 'public/scripts/*.js'
}
var builds = {
    html: 'builds/',
    css: 'builds/stylesheets/',
    scripts: '/builds/scripts/',
    images: 'builds/images/'
}

gulp.task('ejs', function() {
    return gulp.src(fsrc.pages)
        .pipe(newer(builds.html))
        .pipe(ejs({}, {}, {ext:'.html'}))
        .pipe(gulp.dest(builds.html));
});

gulp.task('images', function() {
    return gulp.src(fsrc.images)
        .pipe(newer(builds.images))
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(builds.images))
});

gulp.task('css', function() {
    return gulp.src(fsrc.styles)
        .pipe(newer(builds.css))
        .pipe(cssmin())
        .pipe(gulp.dest(builds.css));
})

gulp.task('default', ['images', 'css', 'ejs'], function() {});