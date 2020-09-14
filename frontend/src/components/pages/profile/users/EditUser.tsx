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
import {getDefaultUser, setDefaultUseInputValue} from './helpers';
import { useInput } from '#src/hooks/useInput';
import { fetchProfile } from '#src/redux/actions/profile';

import { IUser } from '#src/redux/types/users';
import { CheckBox } from '#src/libs/components/CheckBox';
import { AppStateType, TState } from '#src/redux/types/common_types';
import { Message } from '#src/libs/components/Message';


type TEditUser = {
    changeMode: (mode: TMode) => void
}

export const EditUser: React.FC<TEditUser> = ({changeMode}: TEditUser) =>{
    
    const dispatch = useDispatch();
    const profile = useSelector((state: AppStateType): TState => state.profile);
    const [user, setUser] = useState<IUser>(getDefaultUser())
    const [message, setMessage] = useState({
        show: false, 
        status: 'primary', 
        text: ''
    })

    const changeHandler = (v: any, field: string) => {
        setUser({...user, [field]: v})
    }

    const textFieldData = {
        name: useInput('', 'name', {required: true, maxLength: 20}),
        middleName: useInput('', 'middleName', {required: true, maxLength: 20}),
        lastName: useInput('', 'lastName',  {required: true, maxLength: 20}),
        login: useInput('', 'login',  {required: true}),
        password: useInput('', 'password',  {required: true, minLength: 6}),
        phone: useInput('', 'phone', {phone: true}),
        email: useInput('', 'email',  {required: true}),
        position: useInput('', 'position', {}),
        education: useInput('', 'education', {}),
    }

    const checkValidate = (data: any) => {
        let formValid = true
        Object.keys(data).forEach((key) =>{
            const valid = data[key].validate()
            if (!valid) formValid = false
        })
        return formValid
    }
    
    const saveHandler = () => {
        const newUser = { ...user }
        if (checkValidate(textFieldData)){
            Object.keys(textFieldData).forEach((key) => {
                (newUser as any)[key] = (textFieldData as any)[key].getValue()
            })
            dispatch(fetchProfile(newUser, 'add'))
        }
    }

    useEffect(() => {
        if (!profile.isFetching) {
            if (profile.error){
                if (profile.error.data?.code === '000.023'){
                    console.log('error')
                    textFieldData.login.changeError('Измените данные')
                    textFieldData.email.changeError('Измените данные')
                }
                setMessage({
                    show: true,
                    status: 'error',
                    text: profile.error.data?.message
                })
            }
            if (profile.data){
                setMessage({
                    show: true,
                    status: 'primary',
                    text: profile.data.message
                })
            }
            if (profile.data?.success){
                setDefaultUseInputValue(textFieldData)
                setUser(getDefaultUser())
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile.isFetching])

    console.log(profile)
    return (
        <>
            <Module>
                <Text modifier='user__block__title__h2'>
                Создать нового пользователя
                </Text>
                <hr />
                
                {message.show &&
                    <Message
                        text={message.text}
                        status={message.status}
                    />
                }

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
                                onChange={(v) => changeHandler(v, 'group')}
                                value={user.group}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Статус учетной записи
                            </Text>
                            <CheckBox
                                checked={user.active}
                                label='активна'
                                onChange={(v) => changeHandler(v, 'active')}
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