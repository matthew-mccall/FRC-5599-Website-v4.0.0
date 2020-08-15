const express = require('express')
const app = module.exports = express();
const port = process.env.PORT | 3000

app.use(express.static('www'))
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    //TODO: Query database for information and pass that into main page.
    res.render('index.html')
})

app.use(function (req, res, next) {
    res.status(404)
    res.render('404.html')
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500)
    res.render('500.html')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})