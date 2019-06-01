const {
    src,
    dest,
    series,
    parallel
} = require("gulp")
const server = require('gulp-webserver')
const webStream = require('webpack-stream')

function webserver() {
    return src("../day06---productStart")
        .pipe(server({
            port: 8888,
            livereload: true,
            directoryListing: true,
            open: true
        }))

}
// 复制html
function copyHtml() {
    return src("./src/*.html")
        .pipe(dest("./dev"))
}
// 打包js
function packJs() {
    return src("./src/app.js")
        .pipe(webStream({
            mode:'development', //开发环境，编译后不压缩
            entry:{ //入口
                app:'./src/app.js',
            },
            output:{
                filename:'[name].js',    //[name] == app 
                path:__dirname + '/dev/'
            }
        }))
        .pipe(dest('./dev'))
}

exports.default = series(copyHtml, packJs, webserver);