import { IUser } from '#src/redux/types/users'

export const getDefaultUser = (): IUser => {
    return {
        group: 'user',
        email: '',
        login: '',
        active: false
    }
}