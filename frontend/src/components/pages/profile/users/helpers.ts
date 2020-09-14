import { IUser } from '#src/redux/types/users'
import { TUseInput } from '#src/hooks/useInput'

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
        console.log(fieldObj[field])
        fieldObj[field].setDefaultValue()
    })
} 