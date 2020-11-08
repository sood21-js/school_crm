const Level = require('../models/Level')
const Log = require('../models/Log')
const logs = require('../helpers/LogsData/level')

module.exports.get = async function (req, res) {
    try {
        const levels = await Level.find()
        if (levels) {
            res.status(200).json(levels)
        }
        else {
            res.status(400).json({
                code: "051.001",
                message: 'В базе ничего не нашлось',
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
        const level = await Level.save(req.body)
        if (level) {
            await Log.save(logs.successfulAddLevel())
            return res.status(201).json({
                data: level,
                message: 'Уровень успешно создан',
                success: true
            })
        } else {
            await Log.save(logs.failedAddLevel(req.user.userId))
            res.status(400).json({
                code: "051.002",
                message: 'Ошибка при сохранении уровня',
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
        const level = await Level.update(req.body)
        if (level) {
            await Log.save(logs.successfulEditLevel(req.body._id))
            return res.status(201).json({
                data: level,
                message: 'Уровень успешно обновлен',
                success: true
            })
        } else {
            await Log.save(logs.failedEditLevel(req.body._id))
            res.status(400).json({
                code: "051.003",
                message: 'Ошибка при обновлении уровня',
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
        console.log(req.body)
        const { id } = req.body
        const level = await Level.delete(id)
        console.log(level)
        if (level) {
            await Log.save(logs.successfullDeleteLevel())
            return res.status(201).json({
                data: level,
                message: 'Уровень успешно удален',
                success: true
            })
        } else {
            await Log.save(logs.failedDeleteLevel())
            res.status(400).json({
                code: "051.004",
                message: 'Ошибка при удалении уровня',
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