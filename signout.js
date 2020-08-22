var express = require('express')
var signout = express.Router();

signout.get('/', function (req, res) {
    req.session.destroy(function () {
        res.redirect('/signin')
    })
})

module.exports = signout;