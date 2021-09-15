const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routers/routes')
var session = require('express-session')
const { v4: uuidv4 } = require('uuid')

var app = express()
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  genid: function (req) {
    var uuid = uuidv4()
    var sessid = uuid.replace(/[^a-zA-Z0-9]/g, '')
    return sessid
  }
}))

app.use('/', router)
app.listen(8080)