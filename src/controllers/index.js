    // 首页
    const indexHtml = require("../views/index.html")
    const indexHeaderHtml = require("../views/indexHeaderHtml.html")
    const {ajax} = require('../models/ajax') //ajax模块

    export default function indexJs() {
        async function getIndexHtml() { //填充首页数据
            let indexJson = await ajax("http://localhost:9000/index");
            // console.log(indexJson);
            let index = template.render(indexHtml, indexJson)
            $("header").html(indexHeaderHtml);
            $("main").html(index);
            // 顶部导航条滑动
            var nav_list = new Swiper('.nav-list', {
                slidesPerView: 'auto'
            })
            // 轮播图
            var bannerSwiper = new Swiper('.swiper-banner', {
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                    pagination: {
                        el: '.banner-pagination',
                        type: 'bullets',
                    }
                },
                loop: true
            })
            // 618模块横向滑动
            var cateSwiper = new Swiper('.cate-swiper', {
                slidesPerView: 'auto',
            })

            // 箭头翻转展开全部频道
            $('.arrow').click(function () {
                if ($(this).children('span').css('transform') == "none" || $(this).children('span').css('transform') == "rotate(0deg)") {
                    $(this).children('span').css("transform", "rotate(180deg)")
                    // 展开
                    $(".moreCate").css("display", "block");
                    $(".nav-list").children("ul").css("display", "none");
                    $(".all").css("display", "block");
                } else {
                    $(this).children('span').css("transform", "rotate(0deg)")
                    // 折叠
                    $(".moreCate").css("display", "none");
                    $(".nav-list").children("ul").css("display", "");
                    $(".all").css("display", "none");

                }
            });
            // 展开前列表点击
            $(".nav-list ul li").click(function () {
                $(this).addClass("nav-active").siblings().removeClass("nav-active");
            });
            // 展开后列表点击
            $(".cateTag").click(function () {
                $(this).addClass("cateTag-active").siblings().removeClass("cateTag-active");
            });
        }


        getIndexHtml();



    }