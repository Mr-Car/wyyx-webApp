// import index from './controllers/index'
// index();
const rootHtml = require('./views/root.html')
let root = template.render(rootHtml, {});
$("#app").html(root);


import Router from "./router/router"
new Router({
    mode: "hash"
})