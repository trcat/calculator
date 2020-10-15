const { src, dest, series, watch } = require("gulp");
const del = require("delete");
const sass = require("gulp-sass");
const babel = require("gulp-babel");

sass.compiler = require("dart-sass");

function clean(cb) {
  return del(["dist"], cb);
}

function sassTask() {
  return src(["src/*.scss", "src/*.css"])
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("dist"));
}

function jsTask() {
  return src("src/*.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(dest("dist"));
}

const defaultTask = series(clean, sassTask, jsTask);

watch(["src/*.scss", "src/*.js"], defaultTask);

exports.default = defaultTask;
