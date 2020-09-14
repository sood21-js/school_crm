const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const config = require('./api.config')
const auth = require('./middleware/auth')
const login = require('./middleware/login')

const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')

const PORT = process.env.PORT || config.port

app
    .use(express.static(__dirname))
    .use(express.static(path.join(__dirname, '../dist')))
    .use(express.static(path.join(__dirname, '../frontend/src')))
    .use(bodyParser())
    .use(cookieParser())

app.use('/auth', login, authRoutes)
app.use('/profile', auth, profileRoutes)
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
});

app.listen(PORT);

