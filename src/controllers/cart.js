const cartHtml = require("../views/cart.html")
export default function(){
    function getCartHtml(){
        let cart = template.render(cartHtml,{})
        $("header").css("display","none")
        $("main").html(cart)
    }
    getCartHtml()
}