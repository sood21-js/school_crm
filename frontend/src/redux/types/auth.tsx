export const RECEIVE_AUTH = "RECEIVE_AUTH"
export const REQUEST_AUTH = "REQUEST_AUTH"
export const CLEAR_AUTH = "CLEAR_AUTH"
export const ERROR_AUTH = "ERROR_AUTH"

export type TAuth = typeof AuthState
const AuthState = {
    isFetching: false,
    error: null,
    isSuccess: false,
    data: null,
}

export type TLogin = {
    email: string,
    password: string
}