const conn = require('../config/dbConfig')
const search_details = require('../database/dbOperations')

var Search = async function (req, res) {
    try {
        let searched = await search_details.search(conn, req.query.search_element)
        if (searched != 0) {
            res.status(200).json(searched)
            let resObj = {"method":req.method,"url":req.url, "data":req.query, "status":200};
            console.log("API Response - ",resObj);
        }
        else {
            res.status(406).json({ "status": 400 })
            let resObj = {"method":req.method,"url":req.url, "data":req.query, "status":400};
            console.log("API Response - ",resObj);
        }
    }
    catch (err) {
        res.status(500).json({ "statuscode": 500 })
        let resObj = {"method":req.method,"url":req.url, "data":req.query, "status":500};
        console.log("API Response - ",resObj);
    }
}

module.exports = Search

