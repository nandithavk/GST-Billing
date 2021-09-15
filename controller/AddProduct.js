const conn = require('../config/dbConfig')
const add = require('../database/dbOperations')
const logger = require('../loggerConfig/logger')
const logger_err = require('../loggerConfig/errorLogConfig')

var AddProduct = async function (req, res) {
    try {
        let addNew = new add(req.body)
        let added = await addNew.addProduct(conn)
        if (added.affectedRows) {
            res.status(201).json({ "statuscode": 201 })
            logger.info("info", { "{method}": req.method, "{url}": req.url, "{data}": req.body, "statusCode": 201 })
        }
        else {
            res.status(406).json({ "Error": 406 })
            logger_err.error("Verification faild", { "{method}": req.method, "{url}": req.url, "{data}": req.body, "statusCode": 406 })
        }

    }
    catch (err) {
        res.status(500).json({ "Error": 500 })
        logger_err.error("Internal Server Error", { "{method}": req.method, "{url}": req.url, "{data}": req.body, "statusCode": 500 })
    }
}

module.exports = AddProduct
