const User = require('../models/User')
const Profile = require('../models/Profile')
const Log = require('../models/Log')
const logs = require('../utils/LogsData/profile')

module.exports.getAll = async function (req, res) {
    try {
        const { data } = req.body
        const profileList = await Profile.find(data)
        if (profileList) {
            return res.status(200).json(profileList)
        }
        else {
            return res.status(400).json({
                code: "000.100",
                message: 'Ошибка при запросе к базе',
                success: false
            })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
}

module.exports.get = async function (req, res) {
    try {
        const { id } = req.body
        const profile = await Profile.findById(id)
        if (profile) {
            res.status(200).json(profile)
        }
        else {
            res.status(400).json({
                code: "001.001",
                message: 'Такого пользователя не существует в базе',
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

module.exports.add = async function (req, res) {
    try {
        const newUser = req.body
        const { email, login, password } = newUser

        const user = await User.save({ email, login, password })
        if (user) {
            newUser.userId = user._id
            const profile = await Profile.save(newUser)
            if (user && profile) {
                await Log.save(logs.successfulAddProfile(req.user.userId))
                return res.status(201).json({
                    message: 'Пользователь успешно создан',
                    success: true
                })
            } else {
                await User.delete(user._id)
            }
        } else {
            await Log.save(logs.failedAddProfile(req.user.userId))
            res.status(400).json({
                code: "000.023",
                message: 'Такой пользователь уже существует в базе',
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

module.exports.put = async function (req, res) {
    try {
        const { email, login, userId } = req.body
        const user = await User.update({ email, login, _id: userId })
        if (user) {
            const profile = await Profile.update(req.body)
            if (profile) {
                await Log.save(logs.successfulEditProfile(req.user.userId))
                return res.status(201).json({
                    message: 'Пользователь успешно отредактирован',
                    success: true
                })
            } else {
                await User.delete(user._id)
            }
        } else {
            await Log.save(logs.failedEditProfile(req.user.userId))
            return res.status(400).json({
                code: "000.023",
                message: 'Такой пользователь уже существует в базе, измените email или логин',
                success: false
            })
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
            success: false
        })
    }
}

module.exports.delete = async function (req, res) {
    try {
        const { id } = req.body
        console.log(id)
        const profile = await Profile.findById(id)
        console.log(profile)
        if (profile) {
            User.delete(profile.userId)
                .then(() => Profile.delete(profile._id))
                .then(() => Log.save(logs.successfulDeleteProfile(req.user.userId)))
                .then(() => {
                    return res.status(200).json({
                        message: 'Профиль успешно удален',
                        success: true
                    })
                })
                .catch(() => {
                    Log.save(logs.failedDeleteProfile(req.user.userId))
                    return res.status(400).json({
                        code: "001.003",
                        message: 'Произошла ошибка при удалении профиля',
                        success: false
                    })
                })
        }
        else {
            await Log.save(logs.failedDeleteProfile(req.user.userId))
            return res.status(400).json({
                code: "001.003",
                message: 'Произошла ошибка при удалении профиля',
                success: false
            })
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
            success: false
        })
    }
}