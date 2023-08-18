// 打包工具的引用
// 有五種方法(src, dest, series, parallel...)
const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');

// 任務型工具
function defaultTask(cb) {
    console.log('hello gulp4');
    cb();
}

exports.do = defaultTask;
// do是自己命名

// 任務A
function taskA(cb) {
    console.log('任務A');
    cb();
}

// 任務B
function taskB(cb) {
    console.log('任務B');
    cb();
}

exports.sync = parallel(taskA, taskB); // 同時執行A.B任務
exports.async = series(taskA, taskB);//執行A後，再執行B


//檔案搬移
function move() {
    return src('src/about.html').pipe(dest('dist'))  // 流程開發的方法node
}

exports.m = move;


//合併html
const fileinclude = require
    ('gulp-file-include'); // 引入套件

function includeHTML() {
    return src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('./dist'));
}
exports.html = includeHTML;

//sass
const sass = require('gulp-sass')(require('sass'));

function styleSass() {
    return src('./src/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(dest('./dist/css'));
}
exports.style = styleSass

// 監看所有檔案
function watchTask() {
    watch(['./src/*.html', './src/layout/*.html'], includeHTML) // 以陣列寫兩個路徑
    watch(['./src/sass/*.scss', './src/sass/**/*.scss'], styleSass) // **:下兩層目錄的東西
}
exports.w = watchTask