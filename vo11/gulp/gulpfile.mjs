import {src, dest, watch, series, parallel} from "gulp";
import terser from "gulp-terser";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import sourcemaps from "gulp-sourcemaps";
import esLintNew from "gulp-eslint-new";
import browserSync from "browser-sync";

const sass = gulpSass(dartSass);
const bs = browserSync.create();

export function test(cb) {
    console.log("Hallo Welt!");
    cb();
}

export function scripts() {
    return src("_js/**/*.js")
        .pipe(terser())
        .pipe(dest("js"));
}

export function styles() {
    return src("_scss/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(dest("css"));
}

export function lint() {
    return src("_js/**/*.js")
        .pipe(esLintNew())
        .pipe(esLintNew.format())
        .pipe(esLintNew.failAfterError());
}

export function server(done) {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
    done();
}

function reload(done) {
    bs.reload();
    done();
}

export function watcher() {
    watch("_scss/**/*.scss", series(styles, reload));
    watch("_js/**/*.js", series(scripts, reload));
    watch("./*.html", reload);
}

export default series(parallel(styles, scripts), server, watcher);
