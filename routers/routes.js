const express = require('express')
const addProduct = require('../controller/AddProduct')
const editProduct = require('../controller/EditProduct')
const search = require('../controller/Search')
const getTotalCost = require('../controller/GetTotalCost')
const getBillHistory = require('../controller/GetBillHistory')
const login = require('../login/login')
const validateSession = require('../login/validateSession')
const validateAdmin = require('../login/validateAdmin')
const logout = require('../login/logout')
const Validator = require('../validation/Validator')
const logger = require('../loggerConfig/logger')

var router = express.Router()

router.get('/home', validateSession, function (req, res) {
    res.status(200).send("Welcome To GST Billing APP ")
    logger.info("Home Page")
})

router.post('/login', login)

router.get('/logout', logout)

router.post('/addProduct', validateAdmin, Validator.validAdd, addProduct)

router.get('/search', validateSession, Validator.validSearch, search)

router.post('/getCost', validateSession, Validator.validGettotal, getTotalCost)

router.get('/gethistory', validateSession, Validator.validTimestamp, getBillHistory)

router.put('/editproduct', validateAdmin, Validator.validAdd, editProduct)

module.exports = router