var express = require('express')
var MongoClient = require('mongodb').MongoClient
const fs = require('fs')
var dashboard = express.Router();

var url = "mongodb://localhost:27017/userdb"

var rawTeamData;
var rawAnnouncementData;
var teamData;
var announcementData;
var members;

dashboard.get('/', function (req, res) {

    if (req.session.user) {

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
            })
        })

        res.render('dashboard', {
            user: req.session.user,
            team: teamData,
            announcement: announcementData,
            members: members
        })
    } else {
        res.redirect('/signin')
    }

})

module.exports = dashboard;