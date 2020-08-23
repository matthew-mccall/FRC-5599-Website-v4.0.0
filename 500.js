var express = require('express')
var err500 = express.Router();

err500.get('/', function (req, res) {
    res.status(500)
    res.render('500')
})

module.exports = err500;