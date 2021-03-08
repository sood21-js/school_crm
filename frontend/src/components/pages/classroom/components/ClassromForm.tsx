import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Module } from '#src/libs/ui/Module';
import { Button } from '#src/libs/ui/Button';
import { Flex } from '#src/libs/ui/Flex';
import { Text } from '#src/libs/ui/Text';
import { Grid } from '#src/libs/ui/Grid';
import { Input } from '#src/libs/ui/Input';
import { Message } from '#src/libs/ui/Message';

import { useInput } from '#src/libs/hooks/useInput';
import { clearProfile, fetchProfile } from '#src/redux/actions/profile';

import { IUser } from '#src/redux/types/users';
import { AppStateType, FetchMethod, TState } from '#src/redux/types/common_types';
import { ClassroomPageMode } from '../ClassroomsPage';

type TEditUser = {
    changeMode: (mode: ClassroomPageMode) => void
    data: any
}

export const ClassroomForm: React.FC<TEditUser> = ({
    changeMode,
    data
}: TEditUser) =>{

    const dispatch = useDispatch()
    const profile = useSelector((state: AppStateType): TState => state.profile)

    const method = data ? FetchMethod.PUT : FetchMethod.ADD
    const user: IUser = data
    const [message, setMessage] = useState<string>('')

    const fieldData = {
        name: useInput(data ? data.name : '', 'name', {required: true, maxLength: 20}),
        level: useInput(data ? data.level : '', 'level', {required: true, maxLength: 20}),
        info: useInput(data ? data.lastName : '', 'info',  {maxLength: 20}),
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
                changeMode(ClassroomPageMode.classrooms)
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
                    {method === FetchMethod.ADD
                        ? 'Создать новый класс'
                        : 'Редактировать класс'
                    }
                </Text>
                <hr />
                <Message
                    variant='error'
                    text={message}
                    onClose={() => setMessage('')}
                />

                <Grid modifier='module__border module__name'>
                    <Grid modifier='module__mb2'>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Название класса
                            </Text>
                            <Input
                                name='name'
                                {...fieldData.name.bind}
                                onBlur={fieldData.name.validate}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Уровень
                            </Text>
                            <Input
                                name='level'
                                {...fieldData.level.bind}
                                onBlur={fieldData.level.validate}
                            />
                        </div>
                        <div className='user__block'>
                            <Text modifier='user__block__text'>
                                Дополнителньая информация
                            </Text>
                            <Input
                                name='info'
                                {...fieldData.info.bind}
                                onBlur={fieldData.info.validate}
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
                            onClick={() => changeMode(ClassroomPageMode.classrooms)}
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