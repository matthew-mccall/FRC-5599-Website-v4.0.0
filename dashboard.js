var express = require('express')
var session = require('express-session');
const fs = require('fs')
var dashboard = express.Router();

var rawTeamData;
var rawAnnouncementData;
var teamData;
var announcementData;

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

        res.render('dashboard', {
            name: req.session.user.name,
            team: teamData,
            announcement: announcementData
        })
    } else {
        res.redirect('/signin')
    }

})

module.exports = dashboard;