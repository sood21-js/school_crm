/* import { RECEIVE_AUTH, REQUEST_AUTH, CLEAR_AUTH, ERROR_AUTH, ILogin, ActionsTypes } from '../types/auth'
import { TResponseError, TResponse } from '../types/common_types'
import { fetchApi } from '../../libs/net/fetch'
import config from '../../config.app'
import { Dispatch } from 'redux';

export const receiveAuth = (data: unknown) => ({ type: RECEIVE_AUTH, data } as const);
export const requestAuth = () => ({ type: REQUEST_AUTH } as const);
export const clearAuth = () => ({ type: CLEAR_AUTH } as const);
export const errorAuth = (error: TResponseError) => ({ type: ERROR_AUTH, error } as const);

export const fetchProfile = (data: ILogin) => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(requestAuth())
    return fetchApi(data, config.url.login)
        .then((resuilt: TResponse) => {
            console.log(resuilt)
            dispatch(receiveAuth(resuilt.data))
        })
        .catch((error: any) => {
            console.log(error.response)
            dispatch(errorAuth({
                data: error.response?.status !== 404
                    ? error.response?.data
                    : { message: 'Сервер не отвечает, попробуйте повторить запрос позже'},
                status: error.response?.status
            }))
        })
} */