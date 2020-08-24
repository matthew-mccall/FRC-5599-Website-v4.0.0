var express = require('express')
var signin = express.Router();
var crypto = require('crypto')
const asynclib = require('./asynclib')
const bodyParser = require('body-parser')
var url = "mongodb://localhost:27017/userdb"

signin.use(
    bodyParser.urlencoded({
        extended: true
    })
)

signin.use(bodyParser.json())

signin.get('/', function (req, res) {

    if (req.session.user) {
        res.redirect('/profile')
    } else {
        res.render('signin', {
            userbad: false,
            passbad: false
        })
    }
})

signin.post('/', function (req, res) {

    const postData = async function () {
        const results = await asynclib.queryDB({ username: req.body.username }, url, "userdb", "users")

        if (results.length == 1) {
            crypto.pbkdf2(req.body.password, results[0].salt, 100000, 64, 'sha512', function (err, result) {
                if (result.toString('hex') == results[0].password) {
                    req.session.user = results[0]
                    res.redirect('/profile')
                } else {
                    res.render('signin', {
                        userbad: false,
                        passbad: true
                    })
                }
            })
        } else if (results.length == 0) {
            res.render('signin', {
                userbad: true,
                passbad: false
            })
        } else {
            //We should not have more than one entries of the same username
            res.redirect('/500')
        }
    }

    postData()

})

module.exports = signin;