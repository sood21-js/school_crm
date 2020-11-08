const jwt = require('jsonwebtoken')
const config = require('../../app.config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {

    const token = req.headers.authorization

    if (!token || token === 'undefined') {
      return res.status(401).json({ message: 'Нет авторизации' })
    }

    const decoded = jwt.verify(token, config.jwtSecret)
    req.user = decoded
    next()

  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации', success: false })
  }
}
