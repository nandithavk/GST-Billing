const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routers/routes')

var app = express()
app.use(bodyParser.json())
app.use('/', router)
app.listen(8080)