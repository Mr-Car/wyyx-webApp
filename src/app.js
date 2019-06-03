// ES6规范
// import {name} from "./controllers/name";
// console.log(name);

// commonJS规范
const Name = require("./controllers/name")
const aaTpl=require("./views/aaa.art")
const {list} =require("./controllers/position")

async function getName(){
    console.log(Name.name)
    let name =await Name.getName()
    console.log(name)
}
getName()

let testHtml=template.render(aaTpl,{title:"车心伟"})
console.log(testHtml)

list()
