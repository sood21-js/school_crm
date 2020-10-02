import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogs } from '#src/redux/actions/logs';
import moment from 'moment';

import Table from '#src/libs/components/Table';
import { Module } from '#src/libs/components/Module';
import CircularProgress from '@material-ui/core/CircularProgress';

import { TState, AppStateType } from '#src/redux/types/common_types';

export function LogsList(){
    const defaultHead = [
        'action',
        'userId',
        'date',
        'details'
    ]
    const dispatch = useDispatch();
    const logs = useSelector((state: AppStateType): TState => state.logs);
    const [data, setData] = useState(logs.data || [])
    
    useEffect(() => {
        dispatch(fetchLogs('', 'get_all'))
    }, [dispatch])

    useEffect(() => {
        if (logs.data?.length > 0){
            const newData = prepareData(logs.data)
            setData([...newData])
        }
    }, [logs.data])

    const prepareData = (data: any[]) => {
        return data.map((row: any) => {
            return {
                ...row,
                date: moment(row.date).format('ll')
            }
        })
    }

    const handleClick = () => {}

    return (
        <>
            <Module>
                <div className='logs__title'>
                    <h3>Список активностей</h3>
                </div>
                <hr />
            </Module>
            <Module>
                
                {logs.isFetching 
                    ? <div className="module__circle"><CircularProgress size='24px'/></div>
                    : 
                    <Table
                        headData={defaultHead}
                        rowsData={data}
                        onClickRow={handleClick}
                    />
                }
            </Module>
        </>
    )
}