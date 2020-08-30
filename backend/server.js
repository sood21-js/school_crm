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
    .use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
    .use(cookieParser())
    .use(session({
        name: config.session.name,
        resave: false,
        saveUninitialized: false,
        secret: config.session.secret,
        cookie: {
            maxAge: config.session.lifetime,
            semaSite: true,
        },
        USER_ID: null,
        TOKEN: null
    }))

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
app.use('/*', function (req, res) {
    console.log(req.session)
    if (req.session.USER_ID) {
        const json = { 
            token: req.session.TOKEN, 
            userId: req.session.USER_ID, 
            isAuth: true 
        }
        console.log(json)
        res
            .sendFile(path.join(__dirname, '../dist', 'index.html'))
            .json(json)
    }
    else res.sendFile(path.join(__dirname, '../dist', 'index.html'))
});

app.listen(PORT);

