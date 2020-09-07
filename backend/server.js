const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const config = require('./api.config')


const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')

const PORT = process.env.PORT || config.port

app.use(passport.initialize())
require('./middleware/passpot')(passport)
app
    .use(express.static(__dirname))
    .use(express.static(path.join(__dirname, '../dist')))
    .use(express.static(path.join(__dirname, '../frontend/src')))
    .use(bodyParser())
    .use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }))
    .use(cookieParser())
    .use(session({
        name: config.session.name,
        resave: false,
        saveUninitialized: false,
        secret: config.session.secret,
        cookie: {
            maxAge: config.session.lifetime,
            semaSite: true,
        }
    }))

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
app.get('/*', function (req, res) {
    console.log(req.session)
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
});

app.listen(PORT);

