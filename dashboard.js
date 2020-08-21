var express = require('express')
var MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const fs = require('fs')
var dashboard = express.Router();

var url = "mongodb://localhost:27017/userdb"

var rawTeamData;
var rawAnnouncementData;
var teamData;
var announcementData;
var members;

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

        try {
            rawTeamData = fs.readFileSync('data/team.json', 'utf8')
            rawAnnouncementData = fs.readFileSync('data/announcement.json', 'utf8')
            teamData = JSON.parse(rawTeamData)
            announcementData = JSON.parse(rawAnnouncementData)
        } catch (err) {
            console.error(err)
        }

        MongoClient.connect(url, function (err, db) {
            if (err) throw err
            var dbo = db.db("userdb")
            dbo.collection("users").find({}).toArray(function (err, result) {
                if (err) throw err
                members = result;
                db.close()
                res.render('dashboard', {
                    user: req.session.user,
                    team: teamData,
                    announcement: announcementData,
                    members: members
                })
            })
        })
    } else {
        res.redirect('/signin')
    }

})

dashboard.post('/', function (req, res) {

    if (req.session.user == undefined) {
        res.redirect('/signin')
        return;
    }

    if (req.body.announcementMessage) {
        announcementData.message = req.body.announcementMessage
        try {
            fs.writeFileSync('data/announcement.json', JSON.stringify(announcementData))
        } catch (err) {
            console.error(err)
        }
    }

    if (req.body.announcementDisplay) {
        announcementData.display = req.body.announcementDisplay
        try {
            fs.writeFileSync('data/announcement.json', JSON.stringify(announcementData))
        } catch (err) {
            console.error(err)
        }
    } else {
        announcementData.display = false;
        fs.writeFileSync('data/announcement.json', JSON.stringify(announcementData))
    }

    res.render('dashboard', {
        user: req.session.user,
        team: teamData,
        announcement: announcementData,
        members: members
    })
})

module.exports = dashboard;