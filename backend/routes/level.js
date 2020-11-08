const { Router } = require('express')

const level = require('../controllers/level')
const router = Router()

router.post('/get', level.get)
router.post('/put', level.put)
router.post('/delete', level.delete)
router.post('/add', level.add)

module.exports = router