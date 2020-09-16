const express = require('express')
const crypto = require('crypto')
var session = require('express-session');
var redis = require("redis").createClient();

var RedisStore = require('connect-redis')(session);

var app = module.exports = express()
const port = process.env.PORT | 3000

var cacheStatic = function (req, res, next) {
    res.set('Cache-Control', 'max-age=3600000')
    next()
}

app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')

app.use(express.static('public'))

app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: crypto.randomBytes(8).toString(),
    name: 'sessionId',

    // TODO: Mandate HTTP in production

    //cookie: {
    //    secure: true,
    //    httpOnly: true
    //},

    store: new RedisStore({ client: redis })
}));

// app.use(cacheStatic)

app.use('/nav', require('./nav'))
app.use('/', require('./site'))
app.use('/members', require('./members'))
app.use('/robots', require('./robots'))
app.use('/competitions', require('./competitions'))
app.use('/projects', require('./projects'))
app.use('/social', require('./social'))
app.use('/signin', require('./signin'))
app.use('/forgot', require('./forgot'))
app.use('/dashboard', require('./dashboard'))
app.use('/success', require('./success'))
app.use('/resources', require('./resources'))
app.use('/profile', require('./profile'))
app.use('/signout', require('./signout'))
app.use('/404', require('./404'))
app.use('/500', require('./500'))

app.use(function (req, res, next) {
    res.redirect('/404')
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.redirect('/500')
})

const server = app.listen(3000, function () {
    console.log(`Server listening at port ${port}`)
})

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

let connections = [];

server.on('connection', function (connection) {
    connections.push(connection);
    connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});

function shutdown() {
    console.log('\nTerminating server.')
    server.close(function () {
        console.log('Server terminated')
        process.exit(0)
    })

    connections.forEach(function (curr) {
        curr.end()
    })

    setTimeout(function () {
        connections.forEach(function (curr) {
            curr.destroy()
        })
    }, 5000)

    setTimeout(function () {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000)

}