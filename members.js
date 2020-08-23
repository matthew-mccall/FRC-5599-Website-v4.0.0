var express = require('express')
var members = express.Router()
const asynclib = require('./asynclib')

var url = "mongodb://localhost:27017/userdb"

members.get('/', function (req, res) {
    const getData = async function () {
        res.render('members', {
            members: await asynclib.queryDB({}, url, "userdb", "users")
        })
    }

    getData()
})

module.exports = members