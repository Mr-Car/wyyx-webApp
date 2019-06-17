const detailsHeaderHtml = require("../views/detailsHeaderHtml.html")
const detailsHtml = require("../views/details.html")
const {ajax} = require("../models/ajax")
export default function(){
    async function getDetailsHtml(){
        let detailsData = await ajax("http://localhost:9000/details")
        $("header").css("display","block")
        let detailsHeader = template.render(detailsHeaderHtml,detailsData)
        let details = template.render(detailsHtml,detailsData)
        $("header").html(detailsHeader)
        $("main").html(details)

        new Swiper(".details-nav-list",{
            slidesPerView : 'auto',
        })

        $(".nav-item").click(function(){
            $(this).addClass("active").siblings().removeClass("active");
        })
        $(".nav-item:first").trigger("click")
    }
    getDetailsHtml()
}