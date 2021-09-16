const express = require('express')
const addProduct = require('../controller/AddProduct')
const search = require('../controller/Search')
const getTotalCost = require('../controller/GetTotalCost')
const getBillHistory = require('../controller/GetBillHistory')
const Validator = require('../validation/Validator')
var router = express.Router()

router.get('/home', function (req, res) {
    res.status(200).send("Welcome To GST Billing APP ")
    console.log("Home Page")
})

router.post('/addProduct',  Validator.validAdd, addProduct)

router.get('/search',  Validator.validSearch, search)

router.post('/getCost',  Validator.validGettotal, getTotalCost)

router.get('/gethistory', Validator.validTimestamp, getBillHistory)

module.exports = router