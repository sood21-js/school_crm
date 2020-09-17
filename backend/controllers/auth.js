const config = require("../api.config")
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const User = require('../models/User')
const Profile = require('../models/Profile')

//login = '123123@mail.ru', password = '1231321'
module.exports.register = async function (req, res) {
    try {
        console.log(req.body)
        const newUser = req.body
        const { email, login, password } = newUser

        const result = await User.save({ email, login, password })
        console.log(result)
        const profile = await Profile.save(newUser)
        console.log(profile)
        if (result && profile) {
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
        const { email, password } = req.body

        //autorization by cookie token
        if (!email && !password) {
            console.log('req.user', req.user)
            if (req.user) {
                const id = req.user.userId
                const user = await User.findById(id)
                console.log('48 user', user)
                if (user) {
                    console.log('50 user', user)
                    return res.status(200).json({ userId: id, isAuth: true, success: true })
                }
            }
            return res.status(400).json({ success: false })
        }

        //autorization by login (email) & password
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                code: "000.011",
                errors: errors.array(),
                message: 'Некорректный данные при входе в систему',
                success: false
            })
        }

        if (email && password) {
            let user = await User.findOne({ email, password })
            console.log('67 = ', user)
            if (!user) {
                return res.status(400).json({
                    code: '000.024',
                    message: 'Пользователь не найден',
                    success: false
                })
            }

            const token = jwt.sign(
                { userId: user._id },
                config.jwtSecret,
                { expiresIn: '1h' }
            )
            res.json({
                token: `${token}`,
                userId: user._id,
                isAuth: true,
                success: false
            })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
            success: false
        })
    }
}