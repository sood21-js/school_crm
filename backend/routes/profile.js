const { Router } = require('express')
const controller = require('../controllers/profile')

const router = Router()
router.post('/get_all', controller.getAll)
router.post('/get', controller.get)
router.post('/put', controller.put)
router.post('/delete', controller.delete)
router.post('/add', controller.add)

module.exports = router