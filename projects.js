const fs = require('fs')
var express = require('express')
var projects = express.Router()
const asynclib = require('./asynclib')

projects.get('/', function (req, res) {
    const getData = async function () {
        res.render('projects', {
            team: JSON.parse(await asynclib.readFile('data/projects.json')).team,
        })
    }

    getData()
})

module.exports = projects