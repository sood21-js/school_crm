module.exports.getProfile = async (req, res) => {
    try {
        res.json({ message: 'Profile' })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
}
