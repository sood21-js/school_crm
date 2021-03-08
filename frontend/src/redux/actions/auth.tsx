/* import {
    CLEAR_AUTH,
    ERROR_AUTH,
    ILogin,
    ActionsTypes
} from '../types/auth'
import { TResponseError, TResponse } from '../types/common_types'
import { fetchApi } from '../../libs/net/fetch'
import config from '../../config.app'
import { Dispatch } from 'redux';
import { setCookie, deleteCookie } from '#src/utils/cookie';

export const receiveAuth = (data: any) => ({ type: RECEIVE_AUTH, data } as const);
export const requestAuth = () => ({ type: REQUEST_AUTH } as const);
export const clearAuth = () => ({ type: CLEAR_AUTH } as const);
export const errorAuth = (error: TResponseError) => ({ type: ERROR_AUTH, error } as const);

export const fetchAuth = (data: ILogin, url = config.url.login) => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(requestAuth())
    return fetchApi(data, url)
        .then((resuilt: TResponse) => {
            dispatch(receiveAuth(resuilt.data))
            resuilt.data && resuilt.data.token
                ? setCookie(config.cookie.name, resuilt.data.token)
                : deleteCookie(config.cookie.name)
        })
        .catch((error: any) => {
            dispatch(errorAuth({
                data: error.response?.status !== 404
                    ? error.response?.data
                    : { message: 'Сервер не отвечает, попробуйте повторить запрос позже'},
                status: error.response?.status
            }))
        })
} */