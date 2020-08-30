const { Router } = require('express')
const controller = require('../controllers/profile')
const passport = require('passport')

//const Profile = require('../models/Profile')
const router = Router()

// /profile
router.post('/', passport.authenticate('jwt', {session: false}), controller.getProfile)

module.exports = router