const fs = require('fs')

var rawData;
var data;

exports.index = function (req, res) {

    try {
        rawData = fs.readFileSync('data/projects.json', 'utf8')
        data = JSON.parse(rawData)
    } catch (err) {
        console.error(err)
    }

    res.render('projects', {
        team: data.team
    });

}