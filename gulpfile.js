const { src, dest, series, watch } = require("gulp");
const del = require("delete");
const sass = require("gulp-sass");

sass.compiler = require("dart-sass");

function clean(cb) {
  return del(["dist"], cb);
}

function sassTask() {
  return src(["src/*.scss", "src/*.css"])
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("dist"));
}

const defaultTask = series(clean, sassTask);

watch(["src/*.scss"], defaultTask);

exports.default = defaultTask;
