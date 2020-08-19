var express = require('express')
var session = require('express-session');
var dashboard = express.Router();

dashboard.get('/', function (req, res) {

    if (req.session.user) {
        res.render('dashboard', {
            name: req.session.user.name
        })
    } else {
        res.redirect('/')
    }

})

module.exports = dashboard;