// ES6规范
// import {name} from "./controllers/name";
// console.log(name);

// commonJS规范
const Name = require("./controllers/name")
async function getName() {
    console.log(Name.name)
    let name = await Name.getName()
    console.log(name)
}
getName()

// 首页
const index = require("./views/index.html")
const {
    ajax
} = require('./controllers/ajax') //ajax模块

async function getIndexHtml() { //填充首页数据
    let indexJson = await ajax("http://localhost:9000/index");
    console.log(indexJson);
    let testHtml = template.render(index, indexJson)
    $("#app").html(testHtml)
    // 轮播图
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            }
        },
        loop: true
    })
}
getIndexHtml();