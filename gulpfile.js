const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const log = require('gulplog');

const scss_src = './scss/*.scss';
const scss_dest = './css';
const js_src = './js_src/*.js'
const js_dest = './js';

function buildSCSS() {
  return src(scss_src)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest(scss_dest));
};

function buildJS() {
  var b = browserify({
    entries: ['./js_src/index.js'],
    debug: true
  });

  return b
    .transform('babelify', {
        presets: ['@babel/env'],
        plugins: ['@babel/transform-runtime']
    })
    // .transform('vueify')
    .bundle()
    .pipe(source('./bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // .pipe(uglify())
      // .on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(dest(js_dest));
};

function watchSRC() {
  watch(scss_src, buildSCSS);
  watch(js_src, buildJS);
}

exports.buildSCSS = buildSCSS
exports.buildJS = buildJS
exports.default = watchSRC