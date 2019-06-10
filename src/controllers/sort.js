const sortHtml = require('../views/sort.html')
const {ajax} = require('../models/ajax')

export default function () {
    async function getSort() {
        let sortData = await ajax("http://localhost:9000/sort618")
        // console.log(sortData);
        let sort = template.render(sortHtml, sortData)
        $("header").remove()
        $("main").html(sort)
        console.log("aaa我渲染了页面");
    }
    getSort()
}