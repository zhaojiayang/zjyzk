var gulp = require("gulp");

var less = require("gulp-less");

var css = require("gulp-clean-css");

var uglify = require("gulp-uglify");

var server = require("gulp-webserver");

gulp.task("less", function(){
    gulp.src("src/css/*.less")
        .pipe(less())
        .pipe(css())
        .pipe(gulp.dest("build/css"));
})

gulp.task("copyhtml", function(){
    gulp.src("src/*.html")
        .pipe(dest("build"))
})

gulp.task("uglify", function(){
    gulp.src("src/css/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("build/js"))
})

gulp.task("watch", function(){
    gulp.watch("src/css/*.less", ["less"]);
    gulp.watch("src/*.html", ["copyhtml"]);
    gulp.watch("src/css/*.js", ["uglify"]);
})

gulp.task("server", ["less", "copyhtml", "uglify", "watch"], function(){
    gulp.src("src")
        .pipe(server({
            port: 8090,
            open: true
        }))
})

gulp.task("default", ["server"]);