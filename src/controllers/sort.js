const sortHtml = require('../views/sort.html')
const sortNavHtml = require('../views/sort-nav-list.html')
const sortNavHtml2 = require('../views/sort-nav-list2.html')
const {
    ajax
} = require('../models/ajax')

export default function () {
    async function getSort() {
        let sortData = await ajax("http://10.9.65.195:9000/sort618")
        let globalData = await ajax("http://10.9.65.195:9000/globalData")
        // console.log(sortData);
        let sort = template.render(sortHtml, sortData)
        $("header").css("display", "none")
        $("main").html(sort)
        $("li[index='0']").addClass("sort-active")
        $(".sort-list ul li").on("click", function () {
            let index = $(this).attr("index");
            $(this).addClass("sort-active").siblings().removeClass("sort-active")
            sortData.currentCategory = sortData.categoryL1List[index];
            // console.log(sortData);
            let sortNav = template.render(sortNavHtml, sortData)
            if (index >= 4) {
                let newIndex = index - 4;
                sortData.cateList = globalData.cateList[newIndex];
                sortNav = template.render(sortNavHtml2, sortData)
            }
            $(".sort-details>div").html(sortNav)
            let bScroll = new BScroll(".sort-details", {
                probeType: 2,
                click:true
            })
            bScroll.on("scroll", function () {
                // console.log(this.y);
            })
        })
        $(".sort-list ul li:first-child").trigger("click")

    }
    getSort()
}