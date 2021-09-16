const mysql = require('mysql')
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "gstbilling@123",
    database: "gstbilling"
})

conn.connect(function (err) {
    if (err) {
        console.log("Database Connection faild",err)
    }
    else {
        console.log("Database Connected successfully")
    }

})

module.exports = conn
