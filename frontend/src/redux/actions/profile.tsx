import {
    RECEIVE_PROFILE,
    REQUEST_PROFILE,
    CLEAR_PROFILE,
    ERROR_PROFILE,
    ActionsTypes
} from '../types/profile'
import { TResponseError, TResponse, TRequest } from '../types/common_types'
import { fetchApi } from '../../libs/net/fetch'
import config from '../../config.app'
import { Dispatch } from 'redux';
import { reload } from '#src/common/reload';

export const receiveProfile = (data: unknown) => ({ type: RECEIVE_PROFILE, data } as const);
export const requestProfile = () => ({ type: REQUEST_PROFILE } as const);
export const clearProfile = () => ({ type: CLEAR_PROFILE } as const);
export const errorProfile = (error: TResponseError) => ({ type: ERROR_PROFILE, error } as const);

export const fetchProfile = ({ data, method = 'get' }: TRequest) => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(requestProfile())
    return fetchApi(data, `${config.url.profile}${method}`)
        .then((resuilt: TResponse) => {
            dispatch(receiveProfile(resuilt.data))
        })
        .catch((error: any) => {
            dispatch(errorProfile({
                data: error.response?.status !== 404
                    ? error.response?.data
                    : { message: 'Сервер не отвечает, попробуйте повторить запрос позже'},
                status: error.response?.status
            }))
            reload(error)
        })
}