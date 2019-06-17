const index = require("./index.json")
const list = require("./list.json")
const searchwords = require("./searchwords.json")
const sort618 = require("./sort618.json")
const globalData = require("./globalData.json")
const details = require("./details.json")
const productDetail=require('./productDetail.json')

module.exports= function(){
    return {
        list,
        index,
        searchwords,
        sort618,
        globalData,
        details,
        productDetail
    }
}
