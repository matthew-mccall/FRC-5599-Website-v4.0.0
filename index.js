const express = require('express')

var app = module.exports = express()
const port = process.env.PORT | 3000

app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')

app.use(express.static('public'))

app.use('/', require('./site'))
app.use('/members', require('./members'))
app.use('/robots', require('./robots'))
app.use('/competitions', require('./competitions'))
app.use('/projects', require('./projects'))
app.use('/social', require('./social'))
app.use('/users', require('./users'))

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

const server = app.listen(3000, () => console.log(`Server listening at port ${port}`))

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('\nServer terminated')
    })
})

process.on('SIGINT', () => {
    server.close(() => {
        console.log('\nServer terminated')
    })
})