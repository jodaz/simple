var gulp = require('gulp'),
    ejs = require('gulp-ejs'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify');
    yaml = require('js-yaml'),
    fs = require('fs');
    clean = require('gulp-clean');
    uglify = require('gulp-uglify');
    pump = require('pump');

var fsrc = {
    pages: 'views/pages/*.ejs',
    images: 'public/images/**/*',
    styles: 'public/stylesheets/*.css',
    scripts: 'public/scripts/*.js'
}
var builds = {
    html: 'builds/',
    css: 'builds/stylesheets/',
    scripts: 'builds/scripts/',
    images: 'builds/images/'
}
gulp.task('clean', function() {
    return gulp.src('builds/', {read: false})
        .pipe(clean())
});
gulp.task('ejs', function(){
    var yaml_data = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf-8'));
    return gulp.src(fsrc.pages)
        .pipe(newer(builds.html))
        .pipe(ejs({ data: yaml_data }, {}, {ext:'.html'}))
        .pipe(gulp.dest(builds.html))
});

gulp.task('ejs-with-yaml', function() {
    var yaml_data = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf-8'));
    return gulp.src(fsrc.pages)
        .pipe(newer(builds.html))
        .pipe(ejs({ data: yaml_data }, {}, { ext: '.html' }))
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
});

gulp.task('compress', function (cb) {
    pump([
          gulp.src(fsrc.scripts),
          uglify(),
          gulp.dest(builds.scripts)
      ],
      cb
    );
});

gulp.task('default', ['ejs', 'css','images', 'compress'], function() {});