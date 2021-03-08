const { Router } = require('express')

const classroom = require('../controllers/classroom')
const router = Router()

router.post('/get', classroom.get)
router.post('/put', classroom.put)
router.post('/delete', classroom.delete)
router.post('/add', classroom.add)

module.exports = router