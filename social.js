var express = require('express')
var social = express.Router();

social.get('/', function (req, res) {
    res.render('social')
})

module.exports = social;