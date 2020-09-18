const { Router } = require('express')

const controller = require('../controllers/logs')
const router = Router()

router.post('/get_all', controller.getAll)

module.exports = router