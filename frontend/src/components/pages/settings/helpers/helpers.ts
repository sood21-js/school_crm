import { IUser } from '#src/redux/types/users'

export const getDefaultUser = (): IUser => {
    return {
        group: 'user',
        email: '',
        login: '',
        active: false
    }
}

export const setDefaultUseInputValue = (fieldObj: any) => {
    Object.keys(fieldObj).forEach((field: any) =>{
        fieldObj[field].setDefaultValue()
    })
}