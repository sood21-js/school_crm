const config = require("../../app.config")
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const User = require('../models/User')
const Profile = require('../models/Profile')
const Log = require('../models/Log')

const logs = require('../utils/LogsData/auth')

module.exports.register = async function (req, res) {
    try {
        const newUser = req.body
        const { email, login, password } = newUser

        const result = await User.save({ email, login, password })
        const profile = await Profile.save(newUser)
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
        console.log(req.body);
        const { email, password } = req.body

        //autorization by cookie token
        if (!email && !password) {
            if (req.user) {
                const id = req.user.userId
                const user = await User.findById(id)
                const  [profile] = await Profile.find({ userId: id })
                if (user && profile) {
                    const token = jwt.sign(
                        { userId: user._id },
                        config.jwtSecret,
                        { expiresIn: '1h' }
                    )
                    return res.status(200).json({ userId: id, isAuth: true, success: true, token, user: profile })
                }
            }
            return res.status(401).json({ success: false })
        }

        //autorization by login (email) & password
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            await Log.save(logs.failedEntry())
            return res.status(400).json({
                code: "000.011",
                errors: errors.array(),
                message: 'Некорректный данные при входе в систему',
                success: false
            })
        }

        if (email && password) {
            let user = await User.findOne({ email, password })
            const [profile] = await Profile.find({ userId: user._id })
            if (!user || !profile) {
                await Log.save(logs.failedEntry())
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

            await Log.save(logs.successfulEntry(user._id))
            return res.json({
                token: `${token}`,
                userId: user._id,
                user: profile,
                isAuth: true,
                success: true
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

module.exports.logout = async function (req, res) {

    try {
        const { user } = req
        await Log.save(logs.successLogout(user.userId))
        return res.status(200).json({ success: false, isAuth: false })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
            success: false
        })
    }
}