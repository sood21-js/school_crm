import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Module } from '#src/libs/ui/Module';
import { Button } from '#src/libs/ui/Button';
import CircularProgress from '@material-ui/core/CircularProgress'
import { ModalLevelForm } from './ModalLevelForm';

import moment from 'moment';
import { TState, AppStateType } from '#src/redux/types/common_types';
import { fetchLevel } from '#src/redux/actions/level';
import Table, { THeadData, TRowsData } from '#src/libs/ui/Table';
import { ILevel, LevelNames, LevelKeys } from '#src/redux/types/level';
import { showConfirm } from '#src/redux/actions/confirm';

const DEFAULT_LEVEL_NAME = 'Название отсутствует'

export const Levels: React.FC = () => {
    const dispatch = useDispatch();
    const { isFetching, data } = useSelector((state: AppStateType): TState => state.level);

    const [levelFormVisible, setLevelFormVisible] = useState<boolean>(false)
    const [level, setLevel] = useState<ILevel | undefined>(undefined)

    const removeHandler = (e: React.MouseEvent<HTMLElement>, index: number) => {
        e.stopPropagation()
        dispatch(showConfirm({
            onOk: () => {
                dispatch(fetchLevel({
                    data: {id: data[index]?._id},
                    method: 'delete'
                }))
            },
            dialogText: 'Вы действительно хотите удалить уровень?'
        }))
    }

    const editHandler = (index: number) => {
        setLevel(data[index])
        setLevelFormVisible(true)
    }

    const handelCLose = () => {
        setLevel(undefined)
        setLevelFormVisible(false)
    }

    useEffect(() => {
        dispatch(fetchLevel())
    }, [dispatch])

    const headData: THeadData[] = useMemo(() => [
        { title: LevelNames.name, name: LevelKeys.name},
        { title: LevelNames.created, name: LevelKeys.created}
    ], [])

    const rowsData: TRowsData = useMemo(() => {
        return ((Array.isArray(data) && data) || []).map((level: ILevel) => ({
            [LevelKeys.name]: level.name || DEFAULT_LEVEL_NAME,
            [LevelKeys.created]: moment(level.created).format('ll')
        }))
    }, [data])

    return (
        <>
            <ModalLevelForm
                visible={levelFormVisible}
                onClose={handelCLose}
                level={level}
            />

            <Module>
                <div className='users__title'>
                    <h3>Список уровней</h3>
                    <Button
                        onClick={() => setLevelFormVisible(true)}
                        variant='outlined'
                        size='small'
                        content="Создать уровень"
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