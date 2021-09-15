const getData = require('../database/dbOperations')
const conn = require('../config/dbConfig')
const logger = require('../loggerConfig/logger')
const Getamount = require('../Helper/gst')

var GetBillHistory = async function (req, res) {
    try {
        var total_cost = 0
        var getBillHistory = await getData.getHisory(conn, req.query)
        for (var i = 0; i < getBillHistory.length; i++) {
            var Bill_data = JSON.parse(getBillHistory[i].Bill_Details)
            var productValues = await getData.gettotalcost(conn, Bill_data)
            let result = await Getamount(productValues, Bill_data)
            total_cost += result.final_amount
        }
        res.status(200).json({ "Bill_HIstory": getBillHistory, "amount": total_cost })
        logger.info("info", { "{method}": req.method, "{url}": req.url, "{data}": req.body, "statusCode": 200 })
    }
    catch (err) {
        res.status(500).json({ "statuscode": 500 })
        logger.error("Internal Server Error", { "{method}": req.method, "{url}": req.url, "{data}": req.query, "statusCode": 500 })
    }

}

module.exports = GetBillHistory