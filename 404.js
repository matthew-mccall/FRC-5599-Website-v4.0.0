var express = require('express')
var err404 = express.Router();

err404.get('/', function (req, res) {
    res.status(404)
    res.render('404')
})

module.exports = err404;