import React, {useState} from 'react';

import { UsersList } from '../components/UsersList';
import { EditUser } from '../components/EditUser';
import { IUser } from '#src/redux/types/users';

export type TMode = 'users_list' | 'edit_user'
type TUsers = {
    disableButtons: (mode: boolean) => void
}

export const Users: React.FC<TUsers> = ({disableButtons}: TUsers) =>{

    const [mode, setMode] = useState<String>('users_list')
    const [data, setData] = useState<any>('')
    
    const clickHandler = (mode: TMode, data?: IUser) => {
        if (mode === 'edit_user'){
            disableButtons(true)
            if (data) setData(data)
        } else disableButtons(false)
        setMode(mode)
    }

    return (
        <>
            {mode === 'users_list' &&
            <UsersList 
                changeMode={clickHandler} 
            />}

            {mode === 'edit_user' &&
            <EditUser 
                changeMode={clickHandler}
                data={data}
            />}
        </>
    )
}