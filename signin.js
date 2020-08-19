var express = require('express')
var signin = express.Router();
var crypto = require('crypto')
const bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/userdb"

signin.use(
    bodyParser.urlencoded({
        extended: true
    })
)

signin.use(bodyParser.json())

signin.get('/', function (req, res) {

    if (req.session.user) {
        res.redirect('dashboard')
    } else {
        res.render('signin', {
            userbad: false,
            passbad: false
        })
    }
})

signin.post('/', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err
        var dbo = db.db("userdb")
        var query = { username: req.body.username }
        dbo.collection("users").find(query).toArray(function (err, result) {
            if (err) throw err
            if (result.length == 1) {
                const sentPassword = crypto.pbkdf2Sync(req.body.password, result[0].salt, 100000, 64, 'sha512').toString('hex')
                if (sentPassword == result[0].password) {
                    req.session.user = result[0]
                    res.redirect('/dashboard')
                } else {
                    res.render('signin', {
                        userbad: false,
                        passbad: true
                    })
                }
            } else if (result.length == 0) {
                res.render('signin', {
                    userbad: true,
                    passbad: false
                })
            } else {
                //We should not have more than one entries of the same username
                res.status(500)
                res.render('500')
            }
            db.close()
        })
    })
})

module.exports = signin;