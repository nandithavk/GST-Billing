const SessionDel = require('../database/dbOperations')
const conn = require('../config/dbConfig')

var logout = async function (req, res) {
    try {
        var sess_del = await SessionDel.sessionDel(conn, req.sessionID)
        if (sess_del.affectedRows) {
            req.session.destroy()
            res.status(200).send("Logout Successfully")
        }
        else {
            res.send("Try again")
        }
    }
    catch {
        res.status(500).json({ "statuscode": 500 })
    }
}

module.exports = logout