module.exports.successfulAddLevel = function (userId)  {
    return {
        action: 'profile',
        userId,
        details: 'Успешное добавление уровня'
    }
}

module.exports.failedAddLevel = function (userId)  {
    return {
        action: 'profile',
        userId,
        details: 'Неудачная попытка добавления уровня'
    }
}

module.exports.successfulEditLevel = function (userId)  {
    return {
        action: 'profile',
        userId,
        details: 'Успешное редактирование уровня'
    }
}

module.exports.failedEditLevel = function (userId)  {
    return {
        action: 'profile',
        userId,
        details: 'Неудачная попытка редактирования уровня'
    }
}

module.exports.successfullDeleteLevel = function (userId)  {
    return {
        action: 'profile',
        userId,
        details: 'Успешное удаление уровня'
    }
}

module.exports.failedDeleteLevel = function (userId)  {
    return {
        action: 'profile',
        userId,
        details: 'Неудачная попытка удаления уровня'
    }
}
