var express = require('express')
var forgot = express.Router();

forgot.get('/', function (req, res) {
    res.render('forgot')
})

module.exports = forgot;