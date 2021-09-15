const conn = require('../config/dbConfig')
const edit = require('../database/dbOperations')
const logger = require('../loggerConfig/logger')
const logger_err = require('../loggerConfig/errorLogConfig')

var editProduct = async function (req, res) {
    try {
        let edit_item = new edit(req.body)
        let editted = await edit_item.editProduct(conn)
        if (editted.affectedRows != 0) {
            logger.info("info", { "{method}": req.method, "{url}": req.url, "{data}": req.body, "statusCode": 200 })
            res.status(200).json({ "statuscode": 200 })
        }
        else {
            res.status(406).json({ "Error": 406 })
            logger_err.error("Verification faild", { "{method}": req.method, "{url}": req.url, "{data}": req.body, "statusCode": 406 })
        }
    }
    catch {
        res.status(500).json({ "Error": 500 })
        logger_err.error("Internal Server Error", { "{method}": req.method, "{url}": req.url, "{data}": req.body, "statusCode": 500 })
    }

}

module.exports = editProduct