module.exports.successfulEntry = function (userId) {
    return {
        action: 'auth',
        userId,
        details: 'Успешный вход'
    }
}

module.exports.failedEntry = function (userId)  {
    return {
        action: 'auth',
        userId,
        details: 'Ошибка при авторизации'
    }
}

module.exports.successLogout = function (userId)  {
    return {
        action: 'auth',
        userId,
        details: 'Успешный выход из приложения'
    }
}