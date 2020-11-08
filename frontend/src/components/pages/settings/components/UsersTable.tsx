import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearProfile, fetchProfile } from '#src/redux/actions/profile';


import { Message } from '#src/libs/ui/Message';
import Table from '#src/libs/ui/Table';
import { Module } from '#src/libs/ui/Module';
import { Button } from '#src/libs/ui/Button';
import CircularProgress from '@material-ui/core/CircularProgress'

import { TMode } from './Users';
import { TState, AppStateType } from '#src/redux/types/common_types';
import { IUser, UsersKeys, UsersNames } from '#src/redux/types/users';
import { showConfirm } from '#src/redux/actions/confirm';
import { CheckBox } from '#src/libs/ui/CheckBox';

type TUsersList = {
    changeMode: (mode: TMode, data?: any) => void
}
type TUsers = any[]

const defaultHead = [
    { title: UsersNames.fio, name: UsersKeys.fio },
    { title: UsersNames.login, name: UsersKeys.login },
    { title: UsersNames.group, name: UsersKeys.group },
    { title: UsersNames.active, name: UsersKeys.active, style: { textAlign: 'center' } },
    { title: UsersNames.phone, name: UsersKeys.phone },
    { title: UsersNames.position, name: UsersKeys.position },
]

export const UsersList: React.FC<TUsersList> = ({changeMode}: TUsersList) => {
    const dispatch = useDispatch();
    const { isFetching, data } = useSelector((state: AppStateType): TState => state.profile);
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState<TUsers>(Array.isArray(data) ? data : [])

    useEffect(() => {
        dispatch(fetchProfile({method: "get_all"}))
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const removeHandler = (e: React.MouseEvent<HTMLElement>, index: number) => {
        e.stopPropagation()
        dispatch(showConfirm({
            onOk: () => {
                dispatch(fetchProfile({
                    data: {id: data[index]?._id},
                    method: 'delete'
                }))
            },
            dialogText: 'Вы действительно хотите удалить пользователя?'
        }))
    }

    const prepareData = (data: any[]) => {
        return data.map((user: IUser) => {
            return {
                [UsersKeys.fio]: `${user.lastName} ${user.name} ${user.middleName}`,
                [UsersKeys.login]: user.login,
                [UsersKeys.group]: user.group,
                [UsersKeys.active]: <CheckBox checked={user.active} disabled />,
                [UsersKeys.phone]: user.phone,
                [UsersKeys.position]: user.position,
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
                        onDelete={removeHandler}
                    />
                }
            </Module>
        </>
    )
}