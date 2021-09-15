const conn = require('../config/dbConfig')
const search_details = require('../database/dbOperations')
const logger = require('../loggerConfig/logger')
const logger_err = require('../loggerConfig/errorLogConfig')

var Search = async function (req, res) {
    try {
        let searched = await search_details.search(conn, req.query.serach_element)
        if (searched != 0) {
            res.status(200).json(searched)
            logger.info("info", { "{method}": req.method, "{url}": req.url, "{data}": req.query, "statusCode": 200 })
        }
        else {
            res.status(406).json({ "status": 406 })
            logger_err.error("Invalid Input", { "{method}": req.method, "{url}": req.url, "{data}": req.query, "statusCode": 406 })
        }
    }
    catch (err) {
        res.status(500).json({ "statuscode": 500 })
        logger_err.error("Internal Server Error", { "{method}": req.method, "{url}": req.url, "{data}": req.query, "statusCode": 500 })
    }
}

module.exports = Search

