import React, {useState} from 'react';

import { UsersList } from './UsersList';
import { EditUser } from './EditUser';
import { IUser } from '#src/redux/types/users';

export type TMode = 'users_list' | 'edit_user'
type TUsers = {
    disableButtons: (mode: boolean) => void
}

export const Users: React.FC<TUsers> = ({disableButtons}: TUsers) =>{

    const [mode, setMode] = useState<String>('users_list')
    const [data, setData] = useState<IUser | null>(null)
    
    const clickHandler = (mode: TMode, data: IUser | null = null) => {
        mode === 'edit_user' ? disableButtons(true) : disableButtons(false)
        setMode(mode)
        setData(data)
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