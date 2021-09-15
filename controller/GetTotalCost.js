const conn = require('../config/dbConfig')
const Gstbill = require('../database/dbOperations')
const Getamount = require('../Helper/gst')
const logger = require('../loggerConfig/logger')

var GetTotalCost = async function (req, res) {
    try {
        let productValues = await Gstbill.gettotalcost(conn, req.body)
        let result = await Getamount(productValues, req.body)
        let Historyadded = await Gstbill.addHistory(conn, JSON.stringify(result.Bill_Details))
        if (Historyadded) {
            logger.info("Bill History Saved")
        }
        res.status(200).json({ "amount": result.final_amount })
        logger.info("info", { "{method}": req.method, "{url}": req.url, "{data}": req.body, "statusCode": 200 })
    }
    catch (err) {
        res.status(500).json({ "statuscode": 500 })
        logger.error("Internal Server Error", { "{method}": req.method, "{url}": req.url, "{data}": req.body, "statusCode": 500 })
    }
}

module.exports = GetTotalCost