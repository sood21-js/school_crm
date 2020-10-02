import {
    RECEIVE_LOGS,
    REQUEST_LOGS,
    CLEAR_LOGS,
    ERROR_LOGS,
    ActionsTypes 
} from '../types/logs'
import { TResponseError, TResponse, TFetchMethod } from '../types/common_types'
import { fetchApi } from '../../libs/net/fetch'
import config from '../../config.app'
import { Dispatch } from 'redux';
import { reload } from '#src/common/reload';

export const receiveLogs = (data: unknown) => ({ type: RECEIVE_LOGS, data } as const);
export const requestLogs = () => ({ type: REQUEST_LOGS } as const);
export const clearLogs = () => ({ type: CLEAR_LOGS } as const);
export const errorLogs = (error: TResponseError) => ({ type: ERROR_LOGS, error } as const); 

export const fetchLogs = (data: any, method: TFetchMethod = 'get') => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(requestLogs())
    return fetchApi(data, `${config.url.logs}${method}`)
        .then((resuilt: TResponse) => {
            dispatch(receiveLogs(resuilt.data))
        })
        .catch((error: any) => {
            dispatch(errorLogs({
                data: error.response?.status !== 404
                    ? error.response?.data
                    : { message: 'Сервер не отвечает, попробуйте повторить запрос позже'},
                status: error.response?.status
            }))
            reload(error)
        })
}