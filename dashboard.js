var express = require('express')
const asynclib = require('./asynclib')
var MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const fs = require('fs')
var dashboard = express.Router();

var url = "mongodb://localhost:27017/userdb"

var announcementData;

const getData = async function (req, res) {
    res.render('dashboard', {
        user: req.session.user,
        team: JSON.parse(await asynclib.readFile('data/team.json')),
        announcement: JSON.parse(await asynclib.readFile('data/team.json')),
        members: await asynclib.queryDB({}, url, "userdb", "users")
    })
}

dashboard.use(
    bodyParser.urlencoded({
        extended: true
    })
)

dashboard.use(bodyParser.json())

dashboard.get('/', function (req, res) {

    if (req.session.user) {

        if (!req.session.user.isBoard && !req.session.user.isMentor) {
            res.redirect('profile')
            return;
        }
        getData(req, res)
    } else {
        res.redirect('/signin')
    }

})

dashboard.post('/', function (req, res) {

    if (!req.session.user) {
        res.redirect('/signin')
        return;
    }

    if (req.body.announcementMessage) {
        announcementData.message = req.body.announcementMessage
        fs.writeFile('data/announcement.json', JSON.stringify(announcementData), function (err) {
            res.redirect('/500')
        })
    }

    if (req.body.announcementDisplay) {
        announcementData.display = req.body.announcementDisplay
        fs.writeFile('data/announcement.json', JSON.stringify(announcementData), function (err) {
            res.redirect('/500')
        })
    } else {
        announcementData.display = false;
        fs.writeFile('data/announcement.json', JSON.stringify(announcementData), function (err) {
            res.redirect('/500')
        })
    }
    getData(req, res)
})

module.exports = dashboard;