const searchHtml = require('../views/search.html')
const {ajax} = require('../models/ajax')

export default function () {
    async function getSearch() {
        let searchData = await ajax("http://localhost:9000/searchwords")
        // console.log(searchData);
        let search = template.render(searchHtml, searchData)
        $("header").css("display","none")
        $("main").html(search)
    }
    getSearch()
}