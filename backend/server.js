const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const config = require('../app.config')
const auth = require('./middleware/auth')
const login = require('./middleware/login')

const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const logsRoutes = require('./routes/logs')
const levelRoutes = require('./routes/level')
const classroomRoutes = require('./routes/classroom')

const PORT = process.env.PORT || config.serverPort

app
    .use(express.static(__dirname))
    .use(express.static(path.join(__dirname, '../dist')))
    .use(express.static(path.join(__dirname, '../frontend/src')))
    .use(bodyParser())
    .use(cookieParser())

app
    .use('/auth', login, authRoutes)
    .use('/profile', auth, profileRoutes)
    .use('/level', auth, levelRoutes)
    .use('/logs', auth, logsRoutes)
    .use('/classroom', auth, classroomRoutes)

app.get('/*', function (_, res) {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

app.listen(PORT);

