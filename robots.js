var express = require('express')
var robots = express.Router()
const asynclib = require('./asynclib')

robots.get('/', function (req, res) {

    const getData = async function () {
        res.render('robots', {
            robots: JSON.parse(await asynclib.readFile('data/robots.json')).robots,
        })
    }

    getData()

})

module.exports = robots;