var express = require('express')
var profile = express.Router();

profile.get('/', function (req, res) {

    if (req.session.user) {
        res.render('success', {
            user: req.session.user
        })
    } else {
        res.redirect('signin')
    }
})

module.exports = profile;