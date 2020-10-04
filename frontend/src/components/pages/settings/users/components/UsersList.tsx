import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearProfile, fetchProfile } from '#src/redux/actions/profile';

import { Message } from '#src/libs/components/Message';
import Table from '#libs/components/Table';
import { Module } from '#src/libs/components/Module';
import { Button } from '#src/libs/components/Button';
import CircularProgress from '@material-ui/core/CircularProgress'

import { TMode } from './Users';
import { TState, AppStateType } from '#src/redux/types/common_types';
import { IUser } from '#src/redux/types/users';


type TUsersList = {
    changeMode: (mode: TMode, data?: any) => void
}
type TUsers = any[]

const defaultHead = [
    'ФИО',
    'Логин',
    'Группа',
    'Статус',
    'Телефон',
    'Позиция'
]

export const UsersList: React.FC<TUsersList> = ({changeMode}: TUsersList) => {
    const dispatch = useDispatch();
    const { isFetching, data } = useSelector((state: AppStateType): TState => state.profile);
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState<TUsers>(Array.isArray(data) ? data : [])

    useEffect(() => {
        dispatch(fetchProfile('', 'get_all'))
    }, [dispatch])

    const clickRowHandler = (index: number) => {
        const user = data && data[index]
        changeMode('edit_user', user)
    }
    
    const clickHandler = () => changeMode('edit_user')

    useEffect(() => {
        if (!isFetching) {
            if (data?.message){
                setMessage(data.message)
                dispatch(clearProfile())
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching])

    useEffect(() => {
        if (Array.isArray(data)) setUsers(prepareData(data))
    }, [data])

    const prepareData = (data: any[]) => {
        return data.map((user: IUser) => {
            return {
                'ФИО': `${user.lastName} ${user.name} ${user.middleName}`,
                'Логин': user.login,
                'Группа': user.group,
                'Статус': user.active,
                'Телефон': user.phone,
                'Позиция': user.position,
            }
        })
    }

    return (
        <>
            <Module>
                <div className='users__title'>
                    <h3>Список пользователей</h3>
                    <Button
                        onClick={clickHandler}
                        variant='outlined'
                        size='small'
                        content="Создать пользователя"
                        icon="fas fa-user-plus"
                    />
                </div>
                <hr />
            </Module>
            <Module>

                <Message 
                    variant='success' 
                    text={message}
                    onClose={() => setMessage('')}
                />
                
                {isFetching 
                    ? <div className="module__circle"><CircularProgress size='24px'/></div>
                    : <Table
                        headData={defaultHead}
                        rowsData={users}
                        onClickRow={clickRowHandler}
                        pageSize={10}
                    />
                }
            </Module>
        </>
    )
}