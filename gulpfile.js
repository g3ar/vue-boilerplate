const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

const scss_src = './scss/*.scss';
const scss_dest = './css';

function buildSCSS() {
  return src(scss_src)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest(scss_dest));
};

function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask
exports.buildSCSS = buildSCSS
exports.watchSCSS = function () {
  watch(scss_src, buildSCSS);
};