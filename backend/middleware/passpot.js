const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../api.config')
const mongoose = require("mongoose")

const User = require('../models/User')


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId)
                if (user) {
                    done(null, user)
                }
                else {
                    done(null, false)
                }
            }
            catch (e) {
                console.log(e)
            }
        })
    )
}