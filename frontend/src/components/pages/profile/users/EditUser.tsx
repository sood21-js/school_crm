import React, {useState} from 'react';

import { Module } from '#src/libs/components/Module';
import { Button } from '#src/libs/components/Button';
import { Flex } from '#src/libs/components/Flex';
import { TMode } from './Users';
import { Text } from '#src/libs/components/Text';
import { Grid } from '#src/libs/components/Grid';
import { Input } from '#src/libs/components/Input';
import { Selection } from '#src/libs/components/Select';

import config from '#src/config.app';
import {getDefaultUser} from './helpers';

import { IUser } from '#src/redux/types/users';
import { CheckBox } from '#src/libs/components/CheckBox';
import { useInput } from '#src/hooks/useInput';
import { fetchAuth } from '#src/redux/actions/auth';

type TEditUser = {
    changeMode: (mode: TMode) => void
}

export const EditUser: React.FC<TEditUser> = ({changeMode}: TEditUser) =>{
    const [user, setUser] = useState<IUser>(getDefaultUser())
    
    const changeHandler = (v: any, field: string) => {
        setUser({...user, [field]: v})
    }

    const textFieldData = {
        name: useInput('', 'name', ['required']),
        middleName: useInput('', 'middleName', ['required']),
        lastName: useInput('', 'lastName', ['required']),
        login: useInput('', 'login', ['required']),
        password: useInput('', 'password', ['required']),
        email: useInput('', 'email', ['required']),
        position: useInput('', 'position', []),
        education: useInput('', 'education', []),
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
                (user as any)[key] = (textFieldData as any)[key].getValue()
            })
            fetchAuth(newUser, config.url.register)
        }
    }

    console.log(user)

    return (
        <>
            <Module>
                <Text modifier='user__block__title__h2'>
                Создать нового пользователя
                </Text>
                <hr />
                
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
                        >
                            Сохранить
                        </Button>
                    </div>

                    <div className='users__btn'>
                        <Button
                            onClick={() => changeMode('users_list')}
                            variant='outlined'
                            size='small'
                        >
                            Отмена
                        </Button>
                    </div>

                </Flex>
                
            </Module>
        </>
        
    )
}