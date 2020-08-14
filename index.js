const express = require('express')
const app = express()
const port = process.env.PORT | 3000
const fs = require('fs')

app.use(express.static('www'))

app.get('/', (req, res) => {
    try {
        const data = fs.readFileSync('www/pages/index.html', 'utf8')
        res.send(data)
    } catch (err) {
        console.error(err)
        res.send("An error has occurred")
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})