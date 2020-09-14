import React, {useState} from 'react';

import { Module } from '#src/libs/components/Module';
import { Button } from '#src/libs/components/Button';
import { TMode } from './Users';

type TUsersList = {
    changeMode: (mode: TMode) => void
}

export const UsersList: React.FC<TUsersList> = ({changeMode}: any) => {

    const clickHandler = () => {
        changeMode('edit_user')
    }
    return (
        <Module>
            <div className='users__title'>
                <h3>Список пользователей</h3>
                <Button
                    onClick={clickHandler}
                    variant='outlined'
                    size='small'
                    content="Создать пользователя"
                    icon="fas fa-user-plus"
                >
                    
                    
                </Button>
            </div>
            <hr />
        </Module>
    )
}