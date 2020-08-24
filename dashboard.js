var express = require('express')
const asynclib = require('./asynclib')
const bodyParser = require('body-parser')
const fs = require('fs')
const crypto = require('crypto')
var dashboard = express.Router();

var url = "mongodb://localhost:27017/userdb"

var announcementData;

const getData = async function (req, res) {
    res.render('dashboard', {
        user: req.session.user,
        team: JSON.parse(await asynclib.readFile('data/team.json')),
        announcement: JSON.parse(await asynclib.readFile('data/announcement.json')),
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
            res.redirect('/profile')
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

        const updateAnnouncements = async function () {

            var announcementData = JSON.parse(await asynclib.readFile('data/team.json'))

            announcementData.message = req.body.announcementMessage
            fs.writeFile('data/announcement.json', JSON.stringify(announcementData), function (err) {
                res.redirect('/500')
            })

            if (req.body.announcementDisplay) {
                announcementData.display = true
                fs.writeFile('data/announcement.json', JSON.stringify(announcementData), function (err) {
                    res.redirect('/500')
                })
            } else {
                announcementData.display = false;
                fs.writeFile('data/announcement.json', JSON.stringify(announcementData), function (err) {
                    res.redirect('/500')
                })
            }
        }

        updateAnnouncements()
    }


    if (req.body.newMemberName) {

        const addUser = async function () {
            var newMember = new Object()
            newMember.name = req.body.newMemberName
            newMember.username = newMember.name.toLowerCase().replace(' ', '-')
            newMember.salt = (await asynclib.randomBytes(32)).toString('hex')
            newMember.password = (await asynclib.pbkdf2(req.body.newMemberPassword, newMember.salt, 100000, 64, 'sha512')).toString('hex')

            newMember.email = req.body.newMemberEmail
            newMember.division = req.body.newMemberDivision

            if (req.body.newMemberDesc) {
                newMember.desc = newMemberDesc
            } else {
                newMember.desc = ""
            }

            if (req.body.newMemberBoard) {
                newMember.isBoard = true
            }
            if (req.body.newMemberMentor) {
                newMember.isMentor = true
            }
            if (req.body.newMemberAlumni) {
                newMember.isAlumni = true
            }

            newMember.year = req.body.newMemberYear

            asynclib.insertDB(newMember, url, "userdb", "users")
        }

        addUser()

    }

    res.redirect('/success')
})

module.exports = dashboard;