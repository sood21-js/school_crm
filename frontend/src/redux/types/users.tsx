export interface IUser {
    _id: string
    name: string
    lastName: string
    middleName: string

    login: string
    email: string
    phone?: string

    group: string
    active: boolean

    position?: string
    education?: string
}

export enum UsersKeys {
    fio = 'fio',
    name = 'name',
    lastName = 'lastName',
    middleName = 'middleName',
    login = 'login',
    email = 'email',
    phone = 'phone',
    group = 'group',
    active = 'active',
    position = 'position',
    education = 'education'
}

export enum UsersNames {
    fio = 'ФИО',
    name = 'Имя',
    lastName = 'Фамилия',
    middleName = 'Отчество',
    login = 'Логин / Имя пользователя',
    email = 'email',
    phone = 'Телефон',
    group = 'Группа',
    active = 'Статус учетной записи',
    position = 'Позиция',
    education = 'Образование'
}