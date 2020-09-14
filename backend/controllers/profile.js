const User = require('../models/User')
const Profile = require('../models/Profile')

module.exports.getAll = async function (req, res) {
    try {
        const { data } = req.body
        const profileList = await Profile.find(data)
        console.log(profile)
        if (profileList) {
            res.status(200).json(profileList)
        }
        else {
            res.status(400).json({
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
            console.log(user, newUser)
            newUser.userId = user._id
            const profile = await Profile.save(newUser)
            if (user && profile) {
                res.status(201).json({
                    message: 'Пользователь успешно создан',
                    success: true
                })
            } else {
                console.log('Не удалост сохранить profile, удалаяем user')
                await User.delete(user._id)
            }
        } else {
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
        console.log(req.body)
        const { data } = req.body
        const profile = await Profile.update(data)
        console.log(profile)
        if (profile) {
            res.status(200).json({
                message: 'Профиль успешно изменен',
                success: true
            })
        }
        else {
            res.status(400).json({
                code: "000.100",
                message: "Ошибка при запросе к базе",
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

module.exports.delete = async function (req, res) {
    try {
        console.log(req.body)
        const { id } = req.body
        const profile = await Profile.delete(id)
        console.log(profile)
        if (profile) {
            res.status(200).json({
                message: 'Профиль успешно удален',
                success: true
            })
        }
        else {
            res.status(400).json({
                code: "001.003",
                message: 'Произошла ошибка при удалении профиля',
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