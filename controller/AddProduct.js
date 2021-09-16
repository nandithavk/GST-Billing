const conn = require('../config/dbConfig')
const add = require('../database/dbOperations')

var AddProduct = async function (req, res) {
    try {
        let addNew = new add(req.body)
        let added = await addNew.addProduct(conn)
        if (added.affectedRows) {
            res.status(201).json({ "statuscode": 201 })
            let resObj = {"method":req.method,"url":req.url, "data":req.body, "status":201};
            console.log("API Response - ",resObj);
        }
        else {
            res.status(400).json({ "Error": 400 })
            let resObj = {"method":req.method,"url":req.url, "data":req.body, "status":400};
            console.log("API Response - ",resObj);
        }

    }
    catch (err) {
        res.status(500).json({ "Error": 500 })
        let resObj = {"method":req.method,"url":req.url, "data":req.body, "status":500};
        console.log("API Response - ",resObj);
    }
}

module.exports = AddProduct
