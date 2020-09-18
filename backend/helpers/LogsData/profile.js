const defaultUser = 'none'

//profile
module.exports.successfulAddProfile = function (userId = defaultUser)  {
    return {
        action: 'profile',
        userId,
        details: 'Успешное добавление пользователя'
    }
}

module.exports.failedAddProfile = function (userId = defaultUser)  {
    return {
        action: 'profile',
        userId,
        details: 'Неудачная попытка добавления пользователя'
    }
}

module.exports.successfulEditProfile = function (userId = defaultUser)  {
    return {
        action: 'profile',
        userId,
        details: 'Успешное редактирование пользователя'
    }
}

module.exports.failedEditProfile = function (userId = defaultUser)  {
    return {
        action: 'profile',
        userId,
        details: 'Неудачная попытка редактирования пользователя'
    }
}

module.exports.successfulDeleteProfile = function (userId = defaultUser)  {
    return {
        action: 'profile',
        userId,
        details: 'Успешное удаление пользователя'
    }
}

module.exports.failedDeleteProfile = function (userId = defaultUser)  {
    return {
        action: 'profile',
        userId,
        details: 'Неудачная попытка удаления пользователя'
    }
}
