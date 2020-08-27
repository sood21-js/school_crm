const { Router } = require('express')
const mongoose = require("mongoose")
const config = require("../api.config")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')
const router = Router()

// /profile/
router.post(
    '/register',
    [
        check('email', 'Некорректный email')
            .isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    code: "000.011",
                    errors: errors.array(),
                    message: 'Некорректный данные при регистрации'
                })
            }

            const { email = '123123@mail.ru', password = '1231321' } = req.body
            mongoose.connect(config.mongoose.url, config.mongoose.options)

            const user = await User.findOne({ email })
            if (user) {
                await mongoose.disconnect()
                res.status(400).json({ 
                    code: "000.023",
                    message: 'Такой пользователь уже существует в базе' 
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = new User({ email, password: hashedPassword })
            await newUser.save()
            await mongoose.disconnect()
            res.status(201).json({
                data: { message: 'Пользователь создан' }
            })

        } catch (e) {
            await mongoose.disconnect()
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

// /auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    code: "000.011",
                    errors: errors.array(),
                    message: 'Некорректный данные при входе в систему'
                })
            }

            const { email, password } = req.body
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