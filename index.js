const express = require('express')
const bodyParser = require('body-parser')
const site = require('./site')
const social = require('./social')
const competitions = require('./competitions')
const users = require('./users')
const announcements = require('./announcement')
const robots = require('./robots')

const app = express();
const port = process.env.PORT | 3000

exports.app = app

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json())
app.use(express.static('public'))

app.engine('.html', require('ejs').__express);

app.set('view engine', 'html');

app.get('/', site.index)
app.get('/competitions', competitions.index)
app.get('/social', social.index)
app.get('/robots', robots.index)
app.get('/announcement', announcements.getAnnouncement)

app.post('/signin', users.signin)

// Maybe extract these into separate files too?
app.use(function (req, res, next) {
    res.status(404)
    res.render('404')
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500)
    res.render('500')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})