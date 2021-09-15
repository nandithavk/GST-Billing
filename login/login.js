const conn = require('../config/dbConfig')
const sessionAdd = require('../database/dbOperations')
const logger = require('../loggerConfig/logger')
const logger_err = require('../loggerConfig/errorLogConfig')

var login = function (req, res) {
    var username = req.body.usrname
    var passwd = req.body.passwd
    if (username.length > 0 && passwd.length > 0) {
        conn.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, passwd], async (err, reslt, rows) => {
            role = reslt[0].role
            if (reslt.length > 0) {
                let session = await sessionAdd.sessionAdd(conn, req.body.usrname, req.sessionID)
                if (session.affectedRows) {
                    req.session.save()
                    res.status(201).json({ "statuscode": 201 })
                    logger.info("info", { "{method}": req.method, "{url}": req.url, "{data}": req.body, "statusCode": 201 })
                }
                else {
                    res.status(406).json({ "Error": 406 })
                    logger_err.error("Verification faild", { "{method}": req.method, "{url}": req.url, "{data}": req.body, "statusCode": 406 })
                }
            }
            else {
                res.status(406).json({ "statuscode": 406 })
                logger_err.error(logger_err.error("Login Faild, Try Again !", { "{method}": req.method, "{url}": req.url, "{data}": req.body, "statusCode": 406 }))
            }
        })
    }
}

module.exports = login