const mysql = require('mysql')
const logger = require('../loggerConfig/logger')
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "gstapi"
})

conn.connect(function (err) {
    if (err) {
        logger.error("Database Connection faild")
    }
    else {
        logger.info("Database Connected successfully")
    }

})

module.exports = conn
