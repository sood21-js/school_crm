const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const PORT = process.env.PORT || 8080
const MODE = process.env.NODE_ENV

app
    .use(express.static(__dirname))
    .use(express.static(path.join(__dirname, '../dist')))
    .use(bodyParser())

app.get('/*', function (req, res) {
    console.log(MODE);
    const src = MODE === 'production' ? '../dist' : '../frontend/src'
    res.sendFile(path.join(__dirname, src, 'index.html'));
});

app.listen(PORT);
