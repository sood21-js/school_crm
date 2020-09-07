import React, {useState} from 'react';

import { UsersList } from './UsersList';
import { EditUser } from './EditUser';

export type TMode = 'users_list' | 'edit_user'
type TUsers = {
    disableButtons: (mode: string) => void
}

export const Users: React.FC<TUsers> = ({disableButtons}: TUsers) =>{

    const [mode, setMode] = useState<String>('users_list')

    const clickHandler = (mode: TMode) => {
        setMode(mode)
        if (mode === 'edit_user'){
            disableButtons('edit_user')
        }
    }
    console.log(mode)
    return (
        <>
            {mode === 'users_list' && <UsersList changeMode={clickHandler}/>}
            {mode === 'edit_user' && <EditUser changeMode={clickHandler}/>}
        </>
    )
}