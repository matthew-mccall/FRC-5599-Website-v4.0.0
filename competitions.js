var express = require('express')
var competitions = express.Router();

competitions.get('/', function (req, res) {
    res.render('competitions')
})

module.exports = competitions;