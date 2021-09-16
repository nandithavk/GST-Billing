const getData = require('../database/dbOperations')
const conn = require('../config/dbConfig')
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
        let resObj = {"method":req.method,"url":req.url, "data":req.body, "status":200};
        console.log("API Response - ",resObj);
    }
    catch (err) {
        res.status(500).json({ "statuscode": 500 })
        let resObj = {"method":req.method,"url":req.url, "data":req.query, "status":500};
        console.log("API Response - ",resObj);
        console.log("error",err)
    }

}

module.exports = GetBillHistory