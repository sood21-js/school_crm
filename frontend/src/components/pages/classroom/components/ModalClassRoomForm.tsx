import React, { useEffect, useMemo, useState } from 'react';

import { Modal } from '#src/libs/ui/Modal';
import { Button } from '#src/libs/ui/Button';
import { useInput } from '#src/libs/hooks/useInput';
import { Grid } from '#src/libs/ui/Grid';
import { Input } from '#src/libs/ui/Input';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassroom } from '#src/redux/actions/classroom';
import { AppStateType, FetchMethod, TState } from '#src/redux/types/common_types';
import { IClassroom, ClassroomKeys, ClassroomNames } from '#src/redux/types/classrooms';
import { Text } from '#src/libs/ui/Text';
import { fetchLevel } from '#src/redux/actions/level';
import { ILevel } from '#src/redux/types/level';
import { Selection } from '#src/libs/ui/Select';
import { IOption } from '#libs/ui/Select';
import { fetchProfile } from '#src/redux/actions/profile';
import { IUser } from '#src/redux/types/users';
import { getFIO } from '#src/utils/getFIO';

type TClassroom = {
    classroom?: IClassroom
    visible: boolean
    onClose: () => void
}

type TClassroomData = {
    name: string
    level: string
    supervisor: string
}

export const ModalClassRoomForm: React.FC<TClassroom> = ({
    classroom,
    visible,
    onClose
}: TClassroom) => {
    const method = classroom ? FetchMethod.PUT : FetchMethod.ADD
    const isEdit = !!classroom
    const dispatch = useDispatch()
    const { isFetching, data } = useSelector((state: AppStateType): TState => state.classroom)
    const levels = useSelector((state: AppStateType): TState => state.level)
    const profiles = useSelector((state: AppStateType): TState => state.profile)

    const levelOptions = useMemo(() => (levels.data || []).map((level: ILevel): IOption => ({
        title: level.name,
        value: level._id
    })), [levels.data])

    const profilesOptions = useMemo(() => (profiles.data || []).map(({ lastName, middleName, name, _id}: IUser): IOption => ({
        title: getFIO({ lastName, middleName, name}),
        value: _id
    })), [profiles.data])

    const fieldData = {
        name: useInput(classroom?.name || '', ClassroomKeys.name, {required: true, maxLength: 20}),
        supervisor: useInput(classroom?.supervisor?._id || '', ClassroomKeys.supervisor, {}),
        level: useInput(classroom?.level?._id || '', ClassroomKeys.level, {}),
    }


    const getClassData = (classroomData: TClassroomData): IClassroom => {
        return {
            name: classroomData.name,
            level: levels.data.find((level: ILevel) => level._id === classroomData.level),
            supervisor: profiles.data.find((profile: IUser) => profile._id === classroomData.supervisor),
        }
    }

    const saveHandler = () => {
        const newClassroom = { ...classroom }
        Object.keys(fieldData).forEach((key) => {
            (newClassroom as any)[key] = (fieldData as any)[key].getValue()
        })
        dispatch(fetchClassroom({ data: getClassData(newClassroom as TClassroomData), method }))
    }

    useEffect(() => {
        dispatch(fetchClassroom())
        dispatch(fetchLevel())
        dispatch(fetchProfile({ method: FetchMethod.GET_ALL }))
    }, [dispatch])

    useEffect(() => {
        if (!isFetching && data?.success) {
            onClose()
            dispatch(fetchClassroom())
        }
    }, [data, dispatch, isFetching, onClose])
    return (
        <Modal
            open={visible}
            onClose={onClose}
        >
            <Grid
                modifier='module__mb2'
            >

                <Text modifier='modal__title'>
                    {isEdit ? 'Редактировать класс' : 'Создать новый класс'}
                </Text>

                <div className='modal__block'>
                    <Text modifier='modal__block__text'>
                        {ClassroomNames.name}
                    </Text>
                    <Input
                        name={ClassroomKeys.name}
                        {...fieldData.name.bind}
                        onBlur={fieldData.name.validate}
                    />
                </div>
                <div className='modal__block'>
                    <Text modifier='modal__block__text'>
                        {ClassroomNames.supervisor}
                    </Text>
                    <Selection
                        selected={profilesOptions}
                        {...fieldData.supervisor.bind}
                    />
                </div>
                <div className='modal__block'>
                    <Text modifier='modal__block__text'>
                        {ClassroomNames.level}
                    </Text>
                    <Selection
                        selected={levelOptions}
                        {...fieldData.level.bind}
                    />
                </div>
            </Grid>
            <Grid
                gridTemplateColumns='1fr 1fr'
                gridColumnGap='0.5rem'
                justifyContent='flex-end'
            >
                <Button
                    disabled={isFetching}
                    isFetching={isFetching}
                    className='ml05'
                    onClick={saveHandler}
                    variant='outlined'
                    size='small'
                    content={isEdit ? 'Редактировать' : 'Сохранить'}
                />
                <Button
                    disabled={isFetching}
                    onClick={onClose}
                    variant='outlined'
                    size='small'
                    content="Назад"
                />
            </Grid>
        </Modal>
    )
}