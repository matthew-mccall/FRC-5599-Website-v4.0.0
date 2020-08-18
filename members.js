var express = require('express')
var MongoClient = require('mongodb').MongoClient
var members = express.Router()

var url = "mongodb://localhost:27017/userdb"

members.get('/', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err
        var dbo = db.db("userdb")
        dbo.collection("users").find({}).toArray(function (err, result) {
            if (err) throw err
            res.render('members', {
                members: result
            })
            db.close()
        })
    })
})

module.exports = members