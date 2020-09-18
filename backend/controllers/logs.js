const Log = require('../models/Log')

module.exports.getAll = async function (req, res) {
    try {
        const { data } = req.body
        const logs = await Log.find(data)
        if (logs) {
            return res.status(200).json(logs)
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