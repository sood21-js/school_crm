import React, {useState} from 'react';

import { UsersList } from './UsersTable';
import { UserForm } from './UserForm';
import { IUser } from '#src/redux/types/users';

export enum SettingPageMode {
    users_list = 'users_list',
    edit_user = 'edit_user'
}
type TUsers = {
    disableButtons: (mode: boolean) => void
}

export const Users: React.FC<TUsers> = ({disableButtons}: TUsers) =>{

    const [mode, setMode] = useState<String>(SettingPageMode.users_list)
    const [data, setData] = useState<IUser | null>(null)

    const clickHandler = (mode: SettingPageMode, data: IUser | null = null) => {
        mode === SettingPageMode.edit_user ? disableButtons(true) : disableButtons(false)
        setMode(mode)
        setData(data)
    }

    return (
        <>
            {mode === SettingPageMode.users_list &&
            <UsersList
                changeMode={clickHandler}
            />}

            {mode === SettingPageMode.edit_user &&
            <UserForm
                changeMode={clickHandler}
                data={data}
            />}
        </>
    )
}