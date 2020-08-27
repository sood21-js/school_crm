const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')

const config = require('./api.config')

const PORT = process.env.PORT || config.port
const MODE = process.env.NODE_ENV

app
    .use(express.static(__dirname))
    .use(express.static(path.join(__dirname, '../dist')))
    .use(express.static(path.join(__dirname, '../frontend/src')))
    .use(bodyParser())

app.use('/auth', require('./routes/auth.route'))
app.use('/profile', require('./routes/profile.route'))

app.get('/*', function (req, res) {
    console.log(MODE, PORT);
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});
app.listen(PORT);

