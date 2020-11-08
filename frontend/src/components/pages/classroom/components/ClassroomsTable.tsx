import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Module } from '#src/libs/ui/Module';
import { Button } from '#src/libs/ui/Button';
import CircularProgress from '@material-ui/core/CircularProgress'

import { TState, AppStateType } from '#src/redux/types/common_types';
import { TMode } from '../ClassroomsPage';

type TClassroomsTable = {
    changeMode: (mode: TMode) => void
}

export const ClassroomsTable: React.FC<TClassroomsTable> = ({
    changeMode
}: TClassroomsTable) => {
    const dispatch = useDispatch();
    const { isFetching, data } = useSelector((state: AppStateType): TState => state.profile);
    return (
        <>
            <Module>
                <div className='users__title'>
                    <h3>Список классов</h3>
                    <Button
                        onClick={() => changeMode('classrooms')}
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
                        {/*  <Table
                        headData={[]}
                        rowsData={[]}
                        onClickRow={() => {}}
                        pageSize={10}
                    /> */}
                    </>
                }
            </Module>
        </>
    )
}