module.exports.successfulAddClassroom = function (userId)  {
    return {
        action: 'add',
        userId,
        details: 'Успешное добавление уровня'
    }
}

module.exports.failedAddClassroom = function (userId)  {
    return {
        action: 'add',
        userId,
        details: 'Неудачная попытка добавления уровня'
    }
}

module.exports.successfulEditClassroom = function (userId)  {
    return {
        action: 'edit',
        userId,
        details: 'Успешное редактирование уровня'
    }
}

module.exports.failedEditClassroom = function (userId)  {
    return {
        action: 'edit',
        userId,
        details: 'Неудачная попытка редактирования уровня'
    }
}

module.exports.successfullDeleteClassroom = function (userId)  {
    return {
        action: 'delete',
        userId,
        details: 'Успешное удаление уровня'
    }
}

module.exports.failedDeleteClassroom = function (userId)  {
    return {
        action: 'delete',
        userId,
        details: 'Неудачная попытка удаления уровня'
    }
}
