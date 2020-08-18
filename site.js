const fs = require('fs')

var rawTeamData;
var rawAnnouncementData;
var teamData;
var announcementData;

var express = require('express')
var site = express.Router()

site.get('/', function (req, res) {

    try {
        rawTeamData = fs.readFileSync('data/team.json', 'utf8')
        rawAnnouncementData = fs.readFileSync('data/announcement.json', 'utf8')
        teamData = JSON.parse(rawTeamData)
        announcementData = JSON.parse(rawAnnouncementData)
    } catch (err) {
        console.error(err)
    }

    res.render('index', {
        team: teamData,
        announcement: announcementData
    })

})

module.exports = site