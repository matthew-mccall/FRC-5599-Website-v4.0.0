const fs = require('fs')
var express = require('express')
var robots = express.Router()

var rawData;
var data;

robots.get('/', function (req, res) {

    try {
        rawData = fs.readFileSync('data/robots.json', 'utf8')
        data = JSON.parse(rawData)
    } catch (err) {
        console.error(err)
    }

    res.render('robots', {
        robots: data.robots
    })

})

module.exports = robots;