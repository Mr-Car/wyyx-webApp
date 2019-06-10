const index = require("./index.json")
const list = require("./list.json")
const searchwords = require("./searchwords.json")
const sort618 = require("./sort618.json")
const globalData = require("./globalData.json")

module.exports= function(){
    return {
        list,
        index,
        searchwords,
        sort618,
        globalData
    }
}
