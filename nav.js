var express = require('express')
var nav = express.Router();

nav.get('/', function (req, res) {
    res.render('nav')
})

module.exports = nav;