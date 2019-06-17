const productDetailHtml = require('../views/productDetail.html')
const {
    ajax
} = require('../models/ajax')

export default function () {
    async function getProductDetail() {
        let productDetailData = await ajax("http://localhost:9000/productDetail")
        // console.log(productDetailData);
        let productDetail = template.render(productDetailHtml, productDetailData)
        $("main").html(productDetail)
        $(".detailHtml").html(productDetailData.itemDetail.detailHtml)
        new Swiper(".productDetail-swiper", {

        })
    }
    getProductDetail()
}