const asynclib = require('./asynclib')

var express = require('express')
var site = express.Router()

site.get('/', function (req, res) {

    const getData = async function () {
        res.render('index', {
            team: JSON.parse(await asynclib.readFile('data/team.json')),
            announcement: JSON.parse(await asynclib.readFile('data/announcement.json'))
        })
    }

    getData()
})

module.exports = site