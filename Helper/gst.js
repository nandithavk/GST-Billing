const Gstbill = require('../database/dbOperations')
const conn = require('../config/dbConfig')
const logger = require('../loggerConfig/logger')

var gst = async function (productValues, data) {
    // console.log("data", productValues)
    // console.log("data2", data)
    var Qty = data.qty
    var codes = data.products_code
    var final_amount = 0
    for (var i = 0; i < codes.length && Qty.length; i++) {
        let amnt = productValues[i].product_price
        let gst = productValues[i].product_gst
        var gstamnt = (amnt * gst) / 100
        var totalamnt = (gstamnt + amnt) * Qty[i]
        final_amount += totalamnt
    }
    let Bill_Details = { "products_code": codes, "qty": Qty}
    var reslt = {"final_amount" :final_amount,  "Bill_Details" : Bill_Details}
    return reslt
}

module.exports = gst