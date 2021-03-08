module.exports.successfulAddProfile = function (userId)  {
    return {
        action: 'profile',
        userId,
        details: 'Успешное добавление пользователя'
    }
}

module.exports.failedAddProfile = function (userId)  {
    return {
        action: 'profile',
        userId,
        details: 'Неудачная попытка добавления пользователя'
    }
}

module.exports.successfulEditProfile = function (userId)  {
    return {
        action: 'profile',
        userId,
        details: 'Успешное редактирование пользователя'
    }
}

module.exports.failedEditProfile = function (userId)  {
    return {
        action: 'profile',
        userId,
        details: 'Неудачная попытка редактирования пользователя'
    }
}

module.exports.successfulDeleteProfile = function (userId)  {
    return {
        action: 'profile',
        userId,
        details: 'Успешное удаление пользователя'
    }
}

module.exports.failedDeleteProfile = function (userId)  {
    return {
        action: 'profile',
        userId,
        details: 'Неудачная попытка удаления пользователя'
    }
}
