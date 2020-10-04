export type TRole = 'admin' | 'senior' | 'teacher'| 'student' | 'user'

export const FULL_ACCESS: TRole[] = [
    'admin',
    'senior',
    'teacher',
    'student',
    'user'
]
export type TFullAccess = typeof FULL_ACCESS

export const USER_ROLES = [
    { title: 'Администратор', value: 'admin' },
    { title: 'Руководитель', value: 'senior' },
    { title: 'Учитель', value: 'teacher' },
    { title: 'Ученик', value: 'student' },
    { title: 'Пользователь', value: 'user' }
]

