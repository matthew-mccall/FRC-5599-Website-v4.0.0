var express = require('express')
var session = require('express-session');
var dashboard = express.Router();

dashboard.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret'
}));

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