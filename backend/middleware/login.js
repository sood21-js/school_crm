const jwt = require('jsonwebtoken')
const config = require('../../app.config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization
    if (token && token !== 'undefined') {
      const decoded = jwt.verify(token, config.jwtSecret)
      req.user = decoded
    }
    return next()

  } catch (e) {
    console.log(e)
    res.status(401).json({ message: 'Нет авторизации', success: false })
  }
}
