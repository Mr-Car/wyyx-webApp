const {
    src,
    dest,
    series,
    parallel,
    watch
} = require("gulp")
const server = require('gulp-webserver')
const webStream = require('webpack-stream')
const gulpSass = require("gulp-sass")
const proxy = require("http-proxy-middleware")
const del = require("del")

// 服务器
function webserver() { 
    return src("../day06---productStart")
        .pipe(server({
            port: 8888,
            livereload: true,
            directoryListing: true,
            open: './dev/index.html',
            middleware: [
                proxy('/json/index', {
                    target: "http://localhost:9000/", //代理域名
                    changeOrigin: true, //不同域名访问，需要配置为true
                    // pathRewrite:{
                    //     '^/json':''  //代理接口地址
                    // }   
                }),
                proxy('/json/list',{     //商品分类下的数据
                    target : "http://localhost:9000/"
                })
                
            ]
        }))

}
// 复制lib
function copyLib() {
    return src('./src/lib/**/*')
        .pipe(dest('./dev/lib'))
}
// 复制html
function copyHtml() {
    return src("./src/*.html")
        .pipe(dest("./dev"))
}

// 复制icon
function copyIcon() {
    return src("./src/icons/**/*")
        .pipe(dest("./dev/icons"))
}

// 编译CSS
function packCss() {
    return src("./src/styles/app.scss")
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(dest("./dev/styles"))
}

//复制CSS
function copyCss() {
    return src("./src/styles/lib/**/*")
        .pipe(dest("./dev/styles/lib"))
}

// 打包js
function packJs() {
    return src("./src/**/*")
        .pipe(webStream({
            mode: 'development', //开发环境，编译后不压缩
            entry: { //入口
                app: './src/app.js',
            },
            output: {
                filename: '[name].js', //[name] == app 
                path: __dirname + '/dev/'
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
                        test: /\.html$/,
                        loader: "string-loader"
                    }
                ]
            }
        }))
        .pipe(dest('./dev/scripts'))
}
// watch
function watcher(){
    watch('./src/*.html',series(clear('./dev/*.html'),copyHtml))
    watch('./src/styles/**/*',series(clear('./dev/styles'),copyCss,packCss))
    watch('./src/icons/**/*',series(clear('./dev/icons'),copyIcon))
    watch('./src/lib/**/*',series(clear('./dev/lib'),copyLib))
    watch(['./src/**/*','!src/lib/**/*','!src/styles/**/*','!src/*.html','!src/icon/**/*'],series(series(clear('./dev/scripts'),packJs)))
}

function clear (target){
    return function (){
        return del(target)
    }
}


exports.default = series(parallel(packCss, packJs), parallel(copyHtml, copyLib,copyCss,copyIcon), webserver,watcher);