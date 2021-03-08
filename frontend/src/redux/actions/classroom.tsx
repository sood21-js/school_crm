import {
    RECEIVE_CLASSROOM,
    REQUEST_CLASSROOM,
    CLEAR_CLASSROOM,
    ERROR_CLASSROOM,
    ActionsTypes
} from '../types/classrooms';
import { ActionsTypes as AlertActionsTypes } from '../types/alert';
import { TResponseError, TResponse, TRequest, FetchMethod } from '../types/common_types';
import { fetchApi } from '../../libs/net/fetch';
import config from '../../config.app'
import { Dispatch } from 'redux';
import { reload } from '#src/common/reload';
import { showAlert } from './alert';
import { AxiosResponse } from 'axios';

export const receiveClassroom = (data: unknown) => ({ type: RECEIVE_CLASSROOM, data } as const);
export const requestClassroom = () => ({ type: REQUEST_CLASSROOM } as const);
export const clearClassroom = () => ({ type: CLEAR_CLASSROOM } as const);
export const errorClassroom = (error: TResponseError) => ({ type: ERROR_CLASSROOM, error } as const);

export const fetchClassroom = ({data, method = FetchMethod.GET}: TRequest = {}) => (dispatch: Dispatch<ActionsTypes | AlertActionsTypes>) => {
    dispatch(requestClassroom())
    return fetchApi(data, `${config.url.classroom}${method}`)
        .then((resuilt: AxiosResponse<TResponse>) => {
            if (resuilt.data.message) {
                dispatch(showAlert(resuilt.data.message, 'success'))
            }
            dispatch(receiveClassroom(resuilt.data))
        })
        .catch(( { response } : { response: AxiosResponse<TResponse>}) => {
            if (response.data.message) {
                dispatch(showAlert(response.data.message, 'error'))
            }
            dispatch(errorClassroom({
                data: response?.status !== 404
                    ? response?.data
                    : { message: 'Сервер не отвечает, попробуйте повторить запрос позже'},
                status: response?.status
            }))
            reload(response)
        })
}