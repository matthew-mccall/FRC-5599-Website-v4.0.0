const fs = require('fs')

var rawData;
var data;

exports.index = function (req, res) {

    try {
        rawData = fs.readFileSync('data/team.json', 'utf8')
        data = JSON.parse(rawData)
    } catch (err) {
        console.error(err)
    }

    res.render('index.html', {
        desc: data.desc,
        history: data.history
    });

}