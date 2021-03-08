const Classroom = require('../models/Classroom')
const Log = require('../models/Log')
const logs = require('../utils/LogsData/classroom')

module.exports.get = async function (req, res) {
    try {
        console.log('req =', req.body)
        const classrooms = await Classroom.find()
        if (classrooms) {
            res.status(200).json(classrooms)
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
        const classroom = await Classroom.save(req.body)
        console.log(classroom)
        if (classroom) {
            await Log.save(logs.successfulAddClassroom())
            return res.status(201).json({
                data: classroom,
                message: 'Класс успешно создан',
                success: true
            })
        } else {
            await Log.save(logs.failedAddClassroom(req.user.userId))
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
        const classroom = await Classroom.update(req.body)
        console.log(classroom)
        if (classroom) {
            await Log.save(logs.successfulEditClassroom(req.body._id))
            return res.status(201).json({
                data: classroom,
                message: 'Класс успешно обновлен',
                success: true
            })
        } else {
            await Log.save(logs.failedEditClassroom(req.body._id))
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
        const classroom = await Classroom.delete(id)
        console.log(classroom)
        if (classroom) {
            await Log.save(logs.successfullDeleteClassroom())
            return res.status(201).json({
                data: classroom,
                message: 'Класс успешно удален',
                success: true
            })
        } else {
            await Log.save(logs.failedDeleteClassroom())
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