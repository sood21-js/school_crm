//auth action
const defaultUser = 'none'

module.exports.successfulEntry = function (userId = defaultUser) {
    return {
        action: 'auth',
        userId,
        details: 'Успешный вход'
    }
}

module.exports.failedEntry = function (userId = defaultUser)  {
    return {
        action: 'auth',
        userId,
        details: 'Ошибка при авторизации'
    }
}