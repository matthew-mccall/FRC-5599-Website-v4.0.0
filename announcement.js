const fs = require('fs')

var rawData;

exports.getAnnouncement = function (req, res) {
    try {
        rawData = fs.readFileSync('data/announcement.json', 'utf8')
    } catch (err) {
        console.error(err)
    }
    res.send(rawData)
}