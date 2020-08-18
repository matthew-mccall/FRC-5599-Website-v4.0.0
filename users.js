var express = require('express')
var crypto = require('crypto')
const bodyParser = require('body-parser')

var MongoClient = require('mongodb').MongoClient
var users = express.Router()
var url = "mongodb://localhost:27017/userdb"

users.use(
    bodyParser.urlencoded({
        extended: true
    })
)

users.use(bodyParser.json())

users.post('/signin', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err
        var dbo = db.db("userdb")
        var query = { username: req.body.username }
        dbo.collection("users").find(query).toArray(function (err, result) {
            if (err) throw err
            if (result.length == 1) {
                const sentPassword = crypto.pbkdf2Sync(req.body.password, result[0].salt, 100000, 64, 'sha512').toString('hex')
                if (sentPassword == result[0].password) {
                    res.send("yay")
                } else {
                    res.send("incorrect password")
                }
            } else if (result.length == 0) {
                res.send("user does not exists")
            } else {
                res.send("we have a problem")
            }
            db.close()
        })
    })
})

module.exports = users