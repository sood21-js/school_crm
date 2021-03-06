const { Router } = require('express')
const { check } = require('express-validator')

const controller = require('../controllers/auth')
const router = Router()

// /auth/register
router.post(
    '/register',
    [
        check('email', 'Введите корректный email')
            .isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
    ],
    controller.register
)

// /auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email или логин').exists(),
        check('password', 'Введите пароль').exists()
    ],
    controller.login
)

// /auth/logout
router.post('/logout',  controller.logout)

module.exports = router