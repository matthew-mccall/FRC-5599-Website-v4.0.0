const fs = require('fs')
var express = require('express')
var projects = express.Router()

var rawData;
var data;

projects.get('/', function (req, res) {
    try {
        rawData = fs.readFileSync('data/projects.json', 'utf8')
        data = JSON.parse(rawData)
    } catch (err) {
        console.error(err)
    }

    res.render('projects', {
        team: data.team
    })
})

module.exports = projects