import {receiveAuth, requestAuth, clearAuth, errorAuth} from '../actions/auth' 

export const RECEIVE_AUTH = "RECEIVE_AUTH"
export const REQUEST_AUTH = "REQUEST_AUTH"
export const CLEAR_AUTH = "CLEAR_AUTH"
export const ERROR_AUTH = "ERROR_AUTH"

export type TAuth = {
    isFetching: boolean,
    error: null | any,
    isSuccess: boolean,
    data: null | any
}

export interface ILogin {
    email?: string,
    password?: string
}

export type TRequestAuth = ReturnType<typeof requestAuth>
export type TReceiveAuth = ReturnType<typeof receiveAuth>
export type TClearAuth = ReturnType<typeof clearAuth>
export type TErrorAuth = ReturnType<typeof errorAuth>

export type ActionsTypes = TRequestAuth | TReceiveAuth | TClearAuth | TErrorAuth