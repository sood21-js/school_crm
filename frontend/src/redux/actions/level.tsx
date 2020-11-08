import {
    RECEIVE_LEVEL,
    REQUEST_LEVEL,
    CLEAR_LEVEL,
    ERROR_LEVEL,
    ActionsTypes
} from '../types/level';
import { ActionsTypes as AlertActionsTypes } from '../types/alert';
import { TResponseError, TResponse, TRequest } from '../types/common_types';
import { fetchApi } from '../../libs/net/fetch';
import config from '../../config.app'
import { Dispatch } from 'redux';
import { reload } from '#src/common/reload';
import { showAlert } from './alert';
import { AxiosResponse } from 'axios';

export const receiveLevel = (data: unknown) => ({ type: RECEIVE_LEVEL, data } as const);
export const requestLevel = () => ({ type: REQUEST_LEVEL } as const);
export const clearLevel = () => ({ type: CLEAR_LEVEL } as const);
export const errorLevel = (error: TResponseError) => ({ type: ERROR_LEVEL, error } as const);

export const fetchLevel = ({data, method = 'get'}: TRequest = {}) => (dispatch: Dispatch<ActionsTypes | AlertActionsTypes>) => {
    dispatch(requestLevel())
    return fetchApi(data, `${config.url.level}${method}`)
        .then((resuilt: AxiosResponse<TResponse>) => {
            if (resuilt.data.message) {
                dispatch(showAlert(resuilt.data.message, 'success'))
            }
            dispatch(receiveLevel(resuilt.data))
        })
        .catch(( { response } : { response: AxiosResponse<TResponse>}) => {
            if (response.data.message) {
                dispatch(showAlert(response.data.message, 'error'))
            }
            dispatch(errorLevel({
                data: response?.status !== 404
                    ? response?.data
                    : { message: 'Сервер не отвечает, попробуйте повторить запрос позже'},
                status: response?.status
            }))
            reload(response)
        })
}