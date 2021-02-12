
const {src,dest, series, parallel} = require('gulp')

const HTMLMin = require('gulp-htmlmin')

function htmlTask(params){
    return src('*.html')
    .pipe(HTMLMin({collapseWhitespace: true, removeComments:true}))
    .pipe(dest('build'))
}

const IMGMin = require ('gulp-imagemin')
function imgTask(params){
    return src('Images/*')
    .pipe(IMGMin())
    .pipe(dest('build/assets'))
}

const CSCCMin = require ('gulp-clean-css')
const concat = require('gulp-concat')
function cssTask(params) {
    return src('*.css')
    .pipe(concat('style.min.css'))
    .pipe(CSCCMin())
    .pipe(dest('build/css'))
    
}

const JSMin = require('gulp-terser')
const { watch } = require('graceful-fs')
function jsTask(params) {
    return src('*.js')
    .pipe(concat('script.min.js'))
    .pipe(JSMin())
    .pipe(dest('build/js'))
    
}

// function watchTask(params) {
//     watch(['*.html','Images/*','*.css','*.js'],{interval:1000},parallel(jsTask,cssTask))
    
// }

exports.html = htmlTask
exports.img= imgTask
exports.css = cssTask
exports.js = jsTask

// exports.default = series(parallel(jsTask,cssTask,imgTask,htmlTask), watchTask)
exports.default = parallel(jsTask,cssTask,imgTask,htmlTask)