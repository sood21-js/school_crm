module.exports = (req, res, next) => {
    if (!req.session.userId) {
        return res.json({ isAuth: false })
    } else {
        next()
    }
}