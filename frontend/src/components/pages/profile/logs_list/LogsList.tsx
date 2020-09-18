import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogs } from '#src/redux/actions/logs';
import moment from 'moment';

import { Module } from '#src/libs/components/Module';
import CircularProgress from '@material-ui/core/CircularProgress';

import { TState, AppStateType } from '#src/redux/types/common_types';
import { ILog } from '#src/redux/types/logs';

export function LogsList(){
    const dispatch = useDispatch();
    const logs = useSelector((state: AppStateType): TState => state.logs);
    
    useEffect(() => {
        dispatch(fetchLogs('', 'get_all'))
    }, [])
    
    console.log(logs)
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
                    : <div className="table">
                        <div className="table__head">
                            <div className="head_item">ФИО</div>
                            <div className="head_item">Логин</div>
                            <div className="head_item">Группа</div>
                            <div className="head_item">Статус</div>
                        </div>
                        <div className="table__body">
                            {logs.data?.length > 0 && logs.data.map((log: ILog) => (
                                <div 
                                    className="table__body__row" 
                                    key={Math.random()}
                                >
                                    <div className="table__body__row__item txt-a-l">
                                        {log.action}
                                    </div>
                                    <div className="table__body__row__item">
                                        {log.userId}
                                    </div>
                                    <div className="table__body__row__item">
                                        {moment(log.date).format('ll')}
                                    </div>
                                    <div className="table__body__row__item">
                                        {log.details}
                                    </div>
                                </div>   
                            ))}
                        </div>
                    </div>
                }
            </Module>
        </>
    )
}
