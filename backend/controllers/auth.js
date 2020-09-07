const mongoose = require("mongoose")
const config = require("../api.config")
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const User = require('../models/User')

module.exports.register = async function (req, res) {
    try {

        /* const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                code: "000.011",
                errors: errors.array(),
                message: 'Некорректный данные при регистрации'
            })
        } */

        const { email = '123123@mail.ru', password = '1231321' } = req.body

        const result = await User.save(email, password)
        if (result) {
            res.status(201).json({
                message: 'Пользователь успешно создан'
            })
        }
        else {
            res.status(400).json({
                code: "000.023",
                message: 'Такой пользователь уже существует в базе'
            })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
}

module.exports.login = async function (req, res) {

    try {
        if (req.session.userId && !req.body.email && !req.body.password) {
            console.log('userId = ', req.session.userId)
            const id = req.session.userId
            const user = await User.findById(id)
            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден', success: false })
            }
            const token = jwt.sign(
                { userId: id },
                config.jwtSecret,
                { expiresIn: '1h' }
            )
            return res.json({ token: `Bearer ${token}`, userId: id, isAuth: true })
        } else if (!req.body.email && !req.body.password) {
            return res.status(400).json({ success: false })
        }


        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                code: "000.011",
                errors: errors.array(),
                message: 'Некорректный данные при входе в систему',
                success: false
            })
        }

        const { email = '', password = '' } = req.body
        const user = await User.findOne({ email, password })
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден', success: false })
        }

        const token = jwt.sign(
            { userId: user._id },
            config.jwtSecret,
            { expiresIn: '1h' }
        )
        req.session.userId = user._id
        req.session.auth = true
        res.json({ token, userId: user._id, isAuth: true })

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
}