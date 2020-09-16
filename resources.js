var express = require('express')
var resources = express.Router();

resources.get('/', function (req, res) {
    res.render('resources')
})

module.exports = resources;