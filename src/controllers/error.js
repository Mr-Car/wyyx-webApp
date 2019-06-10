const errorHtml = require("../views/error.html")

export default function (){
    let error = template.render(errorHtml,{})
    $("#app").html(error)
}