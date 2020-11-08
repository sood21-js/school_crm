import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Module } from '#src/libs/ui/Module';
import { Button } from '#src/libs/ui/Button';
import { Flex } from '#src/libs/ui/Flex';
import { TMode } from './Users';
import { Text } from '#src/libs/ui/Text';
import { Grid } from '#src/libs/ui/Grid';
import { Input } from '#src/libs/ui/Input';
import { Selection } from '#src/libs/ui/Select';
import { Message } from '#src/libs/ui/Message';
import { CheckBox } from '#src/libs/ui/CheckBox';

import {getDefaultUser} from '../helpers/helpers';
import { useInput } from '#src/libs/hooks/useInput';
import { clearProfile, fetchProfile } from '#src/redux/actions/profile';

import { IUser } from '#src/redux/types/users';
import { AppStateType, TState } from '#src/redux/types/common_types';
import { USER_ROLES } from '#src/redux/types/role';

type TUserForm = {
    changeMode: (mode: TMode) => void
    data: any
}

export const UserForm: React.FC<TUserForm> = ({changeMode, data}: TUserForm) =>{

    const dispatch = useDispatch()
    const profile = useSelector((state: AppStateType): TState => state.profile)

    const method = data ? 'put' : 'add'
    const user: IUser = data ? data : getDefaultUser()
    const [message, setMessage] = useState<string>('')

    const fieldData = {
        name: useInput(data ? data.name : '', 'name', {required: true, maxLength: 20}),
        middleName: useInput(data ? data.middleName : '', 'middleName', {required: true, maxLength: 20}),
        lastName: useInput(data ? data.lastName : '', 'lastName',  {required: true, maxLength: 20}),
        login: useInput(data ? data.login : '', 'login',  {required: true}),
        password: useInput(data ? data.password : '', 'password',  {required: method === 'add', minLength: 6}),
        phone: useInput(data ? data.phone : '', 'phone', {phone: true}),
        email: useInput(data ? data.email : '', 'email',  {required: true}),
        position: useInput(data ? data.position : '', 'position', {}),
        education: useInput(data ? data.education : '', 'education', {}),
        active: useInput(data ? data.active : false, 'active', {}, 'checkBox'),
        group: useInput(data ? data.group : '', 'active', {required: true}),
    }
    type TTFDate = typeof fieldData

    function checkValidate<T extends TTFDate> (data: T): boolean {
        let formValid = true
        for (const [_, value] of Object.entries(data)){
            const valid = value.validate()
            if (!valid) formValid = false
        }
        return formValid
    }

    const saveHandler = () => {
        const newUser = { ...user }
        if (checkValidate(fieldData)){
            Object.keys(fieldData).forEach((key) => {
                (newUser as any)[key] = (fieldData as any)[key].getValue()
            })
            dispatch(fetchProfile({ data: newUser, method }))
        }
    }

    useEffect(() => {
        if (!profile.isFetching) {
            if (profile.error){
                setMessage(profile.error.data?.message)
                dispatch(clearProfile())
            }
            if (profile.data?.success && profile.data?.message){
                changeMode('users_list')
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        profile.isFetching,
        profile.error
    ])

    return (
        <>
            <Module>
                <Text modifier='user__block__title__h2'>
                    {method === 'add'
                        ? 'Создать нового пользователя'
                        : 'Редактировать пользователя'
                    }
                </Text>
                <hr />
                <Message
                    variant='error'
                    text={message}
                    onClose={() => setMessage('')}
                />

                <Grid modifier='module__border module__name'>
                    <Text modifier='user__block__title'>
                        Основное
                    </Text>
                    <Grid
                        modifier='module__mb2'
                    >
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Фамилия
                            </Text>
                            <Input
                                name='lastName'
                                {...fieldData.lastName.bind}
                                onBlur={fieldData.lastName.validate}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Имя
                            </Text>
                            <Input
                                name='name'
                                {...fieldData.name.bind}
                                onBlur={fieldData.name.validate}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Отчество
                            </Text>
                            <Input
                                name='middleName'
                                {...fieldData.middleName.bind}
                                onBlur={fieldData.middleName.validate}
                            />
                        </div>
                    </Grid>


                    <Text modifier='user__block__title'>
                        Безопастность
                    </Text>
                    <Grid
                        modifier='module__mb2'
                    >
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Логин
                            </Text>
                            <Input
                                name='login'
                                {...fieldData.login.bind}
                                onBlur={fieldData.login.validate}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Пароль
                            </Text>
                            <Input
                                name='password'
                                {...fieldData.password.bind}
                                onBlur={fieldData.password.validate}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Адрес электронной почты
                            </Text>
                            <Input
                                name='email'
                                {...fieldData.email.bind}
                                onBlur={fieldData.email.validate}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Телефон
                            </Text>
                            <Input
                                name='phone'
                                type='phone'
                                {...fieldData.phone.bind}
                                onBlur={fieldData.phone.validate}
                            />
                        </div>
                    </Grid>

                </Grid>

                <Grid modifier='module__border module__name'>
                    <Grid
                        modifier='module__mb2'
                    >
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Группа пользователя
                            </Text>
                            <Selection
                                selected={USER_ROLES}
                                defaultValue={'user'}
                                {...fieldData.group.bind}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Статус учетной записи
                            </Text>
                            <CheckBox
                                label='активна'
                                {...fieldData.active.bind}
                            />
                        </div>
                    </Grid>

                </Grid>

                <Grid modifier='module__border module__name'>
                    <Grid
                        modifier='module__mb2'
                    >
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Должность
                            </Text>
                            <Input
                                name='position'
                                {...fieldData.position.bind}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Образование
                            </Text>
                            <Input
                                name='education'
                                {...fieldData.education.bind}
                            />
                        </div>
                    </Grid>

                </Grid>

                <Flex
                    justifyContent='flex-end'
                >

                    <div className='users__btn'>
                        <Button
                            onClick={saveHandler}
                            variant='outlined'
                            size='small'
                            isFetching={profile.isFetching}
                            disabled={profile.isFetching}
                            content="Сохранить"
                        />
                    </div>

                    <div className='users__btn'>
                        <Button
                            onClick={() => changeMode('users_list')}
                            variant='outlined'
                            size='small'
                            content="Назад"
                        />
                    </div>

                </Flex>

            </Module>
        </>

    )
}