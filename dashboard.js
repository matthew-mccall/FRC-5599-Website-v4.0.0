var express = require('express')
const asynclib = require('./asynclib')
const bodyParser = require('body-parser')
const fs = require('fs')
var dashboard = express.Router();

var url = "mongodb://localhost:27017/userdb"

var verifyUser = function (req, res, next) {
    if (req.session.user) {
        if (req.session.user.isBoard || req.session.user.isMentor) {
            next()
            return
        }
    }
    res.redirect('/signin')
}

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

dashboard.use(verifyUser)

dashboard.get('/', function (req, res) {
    getData(req, res);
})

dashboard.post('/announcement', function (req, res) {
    fs.writeFile('data/announcement.json', JSON.stringify({
        title: req.body.title,
        message: req.body.message,
        display: req.body.display == "true",
        postedOn: new Date().toDateString() //TODO: Account for localization? (Different timezones)
    }), function (err) {
        if (err) {
            res.send({
                success: false
            })
        } else {
            res.send({
                success: true
            })
        }
    })
})

dashboard.post('/newMember', function (req, res) {
    asynclib.insertDB({
        name = req.body.name,
        username = name.toLowerCase().replace(' ', '-'),
        salt = (await asynclib.randomBytes(32)).toString('hex'),
        password = (await asynclib.pbkdf2(req.body.newMemberPassword, salt, 100000, 64, 'sha512')).toString('hex'),
        email = req.body.email,
        division = req.body.division,
        desc = req.body.desc,
        isBoard = req.body.isBoard == "true",
        isMentor = req.body.isMentor == "true",
        isAlumni = req.body.isAlumni == "true",
        joined = req.body.year
    }, url, "userdb", "users")
})

module.exports = dashboard;