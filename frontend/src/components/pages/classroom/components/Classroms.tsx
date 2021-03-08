import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Module } from '#src/libs/ui/Module';
import { Button } from '#src/libs/ui/Button';
import CircularProgress from '@material-ui/core/CircularProgress'

import moment from 'moment';
import { TState, AppStateType, FetchMethod } from '#src/redux/types/common_types';
import Table, { THeadData, TRowsData } from '#src/libs/ui/Table';
import { showConfirm } from '#src/redux/actions/confirm';
import { ClassroomKeys, ClassroomNames, IClassroom } from '#src/redux/types/classrooms';
import { fetchClassroom } from '#src/redux/actions/classroom';
import { ModalClassRoomForm } from './ModalClassRoomForm';


export const Classrooms: React.FC = () => {
    const dispatch = useDispatch();
    const { isFetching, data } = useSelector((state: AppStateType): TState => state.classroom);

    const [classroomFormVisible, setClassRoomFormVisible] = useState<boolean>(false)
    const [classroom, setClassRoom] = useState<IClassroom | undefined>(undefined)

    const removeHandler = (e: React.MouseEvent<HTMLElement>, index: number) => {
        e.stopPropagation()
        dispatch(showConfirm({
            onOk: () => {
                dispatch(fetchClassroom({
                    data: {id: data[index]?._id},
                    method: FetchMethod.DELETE
                }))
            },
            dialogText: 'Вы действительно хотите удалить уровень?'
        }))
    }

    const editHandler = (index: number) => {
        setClassRoom(data[index])
        setClassRoomFormVisible(true)
    }

    const closeHandler = () => {
        setClassRoom(undefined)
        setClassRoomFormVisible(false)
    }

    useEffect(() => {
        dispatch(fetchClassroom())
    }, [dispatch])

    const headData: THeadData[] = useMemo(() => [
        { title: ClassroomNames.name, name: ClassroomKeys.name},
        { title: ClassroomNames.level, name: ClassroomKeys.level},
        { title: ClassroomNames.supervisor, name: ClassroomKeys.supervisor},
        { title: ClassroomNames.created, name: ClassroomKeys.created}
    ], [])

    const rowsData: TRowsData = useMemo(() => {
        return ((Array.isArray(data) && data) || []).map((classroom: IClassroom) => ({
            [ClassroomKeys.name]: classroom.name,
            [ClassroomKeys.level]: classroom.level,
            [ClassroomKeys.supervisor]: classroom.supervisor,
            [ClassroomKeys.created]: moment(classroom.created).format('ll')
        }))
    }, [data])

    return (
        <>
            <ModalClassRoomForm
                visible={classroomFormVisible}
                onClose={closeHandler}
                classroom={classroom}
            />

            <Module>
                <div className='users__title'>
                    <h3>Список классов</h3>
                    <Button
                        onClick={() => setClassRoomFormVisible(true)}
                        variant='outlined'
                        size='small'
                        content="Создать класс"
                        icon="fas fa-user-plus"
                    />
                </div>
                <hr />
            </Module>
            <Module>

                {isFetching
                    ? <div className="module__circle"><CircularProgress size='24px'/></div>
                    : <>
                        <Table
                            headData={headData}
                            rowsData={rowsData}
                            pageSize={10}
                            onDelete={removeHandler}
                            onClickRow={editHandler}
                        />
                    </>
                }
            </Module>
        </>
    )
}