import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '#src/redux/actions/profile';

import { Module } from '#src/libs/components/Module';
import { Button } from '#src/libs/components/Button';
import CircularProgress from '@material-ui/core/CircularProgress'

import { TMode } from './Users';
import { TState, AppStateType } from '#src/redux/types/common_types';
import { IUser } from '#src/redux/types/users';
import { CheckBox } from '#src/libs/components/CheckBox';
import { Message } from '#src/libs/components/Message';

type TUsersList = {
    changeMode: (mode: TMode, data?: any) => void
}

export const UsersList: React.FC<TUsersList> = ({changeMode}: TUsersList) => {
    const dispatch = useDispatch();
    const profile = useSelector((state: AppStateType): TState => state.profile);
    const [message, setMessage] = useState('')

    useEffect(() => {
        dispatch(fetchProfile('', 'get_all'))
    }, [])

    const clickHandler = () => {
        changeMode('edit_user')
    }

    useEffect(() => {
        if (!profile.isFetching) {
            if (profile.data?.message){
                setMessage(profile.data.message)

            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile.isFetching])

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
                
                {profile.isFetching 
                    ? <div className="module__circle"><CircularProgress size='24px'/></div>
                    : <div className="table">
                        <div className="table__head">
                            <div className="head_item">ФИО</div>
                            <div className="head_item">Логин</div>
                            <div className="head_item">Группа</div>
                            <div className="head_item">Статус</div>
                            <div className="head_item">Телефон</div>
                            <div className="head_item">Позиция</div>
                        </div>
                        <div className="table__body">
                            {profile.data?.length > 0 && profile.data.map((user: IUser) => (
                                <div 
                                    className="table__body__row" 
                                    key={Math.random()}
                                    onClick={() => changeMode('edit_user', user)}
                                >
                                    <div className="table__body__row__item txt-a-l">
                                        {user.lastName} {user.name} {user.middleName}
                                    </div>
                                    <div className="table__body__row__item">
                                        {user.login}
                                    </div>
                                    <div className="table__body__row__item">
                                        {user.group}
                                    </div>
                                    <div className="table__body__row__item">
                                        <CheckBox 
                                            checked={user.active} 
                                            disabled={true} 
                                        />
                                    </div>
                                    <div className="table__body__row__item">
                                        {user.phone}
                                    </div>
                                    <div className="table__body__row__item">
                                        {user.position}
                                    </div> 
                                </div>   
                            ))}
                        </div>
                    </div>
                }
            </Module>
        </>
    )
}