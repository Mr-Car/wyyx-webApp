const {
    src,
    dest,
    series,
    parallel,
    watch
} = require("gulp")
// const server = require('gulp-webserver')
const webStream = require('webpack-stream')
const gulpSass = require("gulp-sass")
// const proxy = require("http-proxy-middleware")
// const del = require("del")
const rev =require('gulp-rev')
const revCollector=require('gulp-rev-collector')

// 服务器
// function webserver() { 
//     return src("../day06---productStart")
//         .pipe(server({
//             port: 8888,
//             livereload: true,
//             directoryListing: true,
//             open: './dist/index.html',
//             middleware: [
//                 proxy('/api', {
//                     target: "http://www.baidu.com", //代理域名
//                     changeOrigin: true, //不同域名访问，需要配置为true
//                     pathRewrite:{
//                         '^/api':'abc.com'  //代理接口地址
//                     }

//                 })
//             ]
//         }))

// }
// 复制lib
function copyLib() {
    return src('./src/lib/**/*')
        .pipe(dest('./dist/lib'))
}
// 复制html
function copyHtml() {
    return src("./src/*.html")
        .pipe(dest("./dist"))
}
// 编译CSS
function packCss() {
    return src("./src/styles/app.scss")
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(dest("./dist/styles"))
}
// 打包js
function packJs() {
    return src("./src/**/*")
        .pipe(webStream({
            mode: 'production', //开发环境，编译后不压缩
            entry: { //入口
                app: './src/app.js',
            },
            output: {
                filename: '[name].js', //[name] == app 
                path: __dirname + '/dist/'
            },
            module: {
                rules: [{
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: "babel-loader", //用来编译ES6等语法糖从而支持IE低版本
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: ['@babel/plugin-transform-runtime']
                            }
                        }
                    },
                    {
                        test: /\.art$/,
                        loader: "string-loader"
                    }
                ]
            }
        }))
        .pipe(rev())
        .pipe(dest('./dist/scripts'))
        .pipe(rev.manifest())
        .pipe(dest('./scripts'))
}
// watch
// function watcher(){
//     watch('./src/styles/**/*',series(clear('./dist/styles'),packCss))
//     watch('./src/lib/**/*',series(clear('./dist/lib'),copyLib))
//     watch('./*html',series(clear('./dist/*.html'),copyHtml))
//     watch(['./src/**/*','!src/lib/**/*','!src/styles/**/*'],series(packJs))
// }

// function clear (target){
//     return function (){
//         return del(target)
//     }
// }


exports.default = series(parallel(packCss, packJs), parallel(copyHtml, copyLib));