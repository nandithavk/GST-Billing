const logger = require('../loggerConfig/logger')
const conn = require('../config/dbConfig')
const sessionRead = require('../database/dbOperations')

var validateAdmin = async function (req, res, next) {
    try {
        var session_time = await sessionRead.sessionread(conn, req.sessionID)
        if (session_time != 0) {
            if (session_time[0].role == 'admin') {
                var sess_time = session_time[0].session_time
                var curr_time = new Date().getTime()
                var sess_exp = (curr_time - sess_time) / 1000
                if (sess_exp < 360) {
                    next()
                }
                else {
                    res.send("Session Expired")
                }
            }
            else {
                res.send("Access Denied")
            }
        }
        else {
            res.send("Please Login first")
        }
    }
    catch {
        res.status(500)
    }

}

module.exports = validateAdmin