const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concatCss = require('gulp-concat-css');
const concat = require('gulp-concat');

const scss_src = './scss/*.scss';
const scss_dest = './css';
const js_src = './js_src/*.js'
const js_dest = './js';

function buildSCSS() {
  return src(scss_src)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concatCss('bundle.css'))
    .pipe(sourcemaps.write())
    .pipe(dest(scss_dest));
};

function buildJS() {
  return src(js_src)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env'],
        plugins: ['@babel/transform-runtime']
    }))
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write())
    .pipe(dest(js_dest));
};

function watchSRC() {
  watch(scss_src, buildSCSS);
  watch(js_src, buildJS);
}

exports.buildSCSS = buildSCSS
exports.buildJS = buildJS
exports.default = watchSRC