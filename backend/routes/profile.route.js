const { Router } = require('express')
const mongoose = require("mongoose")
const config = require("../api.config")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const Profile = require('../models/Profile')
const router = Router()

// /profile
router.post('/*', async (req, res) => {
    try {
        const { id } = req.body
        mongoose.connect(config.mongoose.url, config.mongoose.options)
        const user = await User.findOne({ email })
        await mongoose.disconnect()
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
        }
        const token = jwt.sign(
            { userId: user.id },
            config.jwtSecret,
            { expiresIn: '1h' }
        )
        res.json({
            data: { token, userId: user.id }
        })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router