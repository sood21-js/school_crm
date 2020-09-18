import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Module } from '#src/libs/components/Module';
import { Button } from '#src/libs/components/Button';
import { Flex } from '#src/libs/components/Flex';
import { TMode } from './Users';
import { Text } from '#src/libs/components/Text';
import { Grid } from '#src/libs/components/Grid';
import { Input } from '#src/libs/components/Input';
import { Selection } from '#src/libs/components/Select';

import config from '#src/config.app';
import {getDefaultUser} from '../helpers/helpers';
import { useInput } from '#src/hooks/useInput';
import { clearProfile, fetchProfile } from '#src/redux/actions/profile';

import { IUser } from '#src/redux/types/users';
import { CheckBox } from '#src/libs/components/CheckBox';
import { AppStateType, TState } from '#src/redux/types/common_types';
import { Message } from '#src/libs/components/Message';


type TEditUser = {
    changeMode: (mode: TMode) => void
    data: any 
}

export const EditUser: React.FC<TEditUser> = ({changeMode, data}: TEditUser) =>{

    const dispatch = useDispatch()
    const profile = useSelector((state: AppStateType): TState => state.profile)
    
    const method = data ? 'put' : 'add'
    const [user, setUser] = useState<IUser>(data ? data : getDefaultUser())
    const [message, setMessage] = useState<string>('')

    const changeHandler = (v: any, field: string) => {
        setUser({...user, [field]: v})
    }

    const textFieldData = {
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
        group: useInput(data ? data.group : '', 'active', {}),
    }
    type TTFDate = typeof textFieldData

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
        if (checkValidate(textFieldData)){
            Object.keys(textFieldData).forEach((key) => {
                (newUser as any)[key] = (textFieldData as any)[key].getValue()
            })
            dispatch(fetchProfile(newUser, method))
        }
    }

    useEffect(() => {
        if (!profile.isFetching) {
            if (profile.error){
                /* if (profile.error.data?.code === '000.023'){
                    textFieldData.login.changeError('Измените данные')
                    textFieldData.email.changeError('Измените данные')
                } */
                setMessage(profile.error.data?.message)
                dispatch(clearProfile())
            }
            if (profile.data?.success){
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
                                {...textFieldData.lastName.bind}
                                onBlur={textFieldData.lastName.validate}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Имя
                            </Text>
                            <Input
                                name='name'
                                {...textFieldData.name.bind}
                                onBlur={textFieldData.name.validate}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Отчество
                            </Text>
                            <Input
                                name='middleName'
                                {...textFieldData.middleName.bind}
                                onBlur={textFieldData.middleName.validate}
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
                                {...textFieldData.login.bind}
                                onBlur={textFieldData.login.validate}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Пароль
                            </Text>
                            <Input
                                name='password'
                                {...textFieldData.password.bind}
                                onBlur={textFieldData.password.validate}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Адрес электронной почты
                            </Text>
                            <Input
                                name='email'
                                {...textFieldData.email.bind}
                                onBlur={textFieldData.email.validate}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Телефон
                            </Text>
                            <Input
                                name='phone'
                                type='phone'
                                {...textFieldData.phone.bind}
                                onBlur={textFieldData.phone.validate}
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
                                selected={config.usersRole}
                                {...textFieldData.group.bind}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Статус учетной записи
                            </Text>
                            <CheckBox
                                label='активна'
                                {...textFieldData.active.bind}
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
                                {...textFieldData.position.bind}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Образование
                            </Text>
                            <Input
                                name='education'
                                {...textFieldData.education.bind}
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