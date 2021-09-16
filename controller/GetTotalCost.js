const conn = require('../config/dbConfig')
const Gstbill = require('../database/dbOperations')
const Getamount = require('../Helper/gst')

var GetTotalCost = async function (req, res) {
    try {
        let productValues = await Gstbill.gettotalcost(conn, req.body)
        let result = await Getamount(productValues, req.body)
        let Historyadded = await Gstbill.addHistory(conn, JSON.stringify(result.Bill_Details))
        if (Historyadded) {
            console.log("Bill History Saved")
        }
        res.status(200).json({ "amount": result.final_amount })
        let resObj = {"method":req.method,"url":req.url, "data":req.body, "status":200};
        console.log("API Response - ",resObj);
    }
    catch (err) {
        res.status(500).json({ "statuscode": 500 })
        let resObj = {"method":req.method,"url":req.url, "data":req.body, "status":500};
        console.log("API Response - ",resObj);
    }
}

module.exports = GetTotalCost