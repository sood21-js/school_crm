import { RootReducerType } from "../redux_strore"

export type AppStateType = ReturnType<RootReducerType>

export const defaultState = {
    isFetching: false,
    error: null,
    isSuccess: false,
    data: null,
}

export type TState = {
    isFetching: boolean,
    error: any,
    isSuccess: boolean,
    data: any,
}

export type TResponseError = {
    data: any,
    status: number
}

export type TResponse = {
    data: any
}

export type TFetchMethod = 'get_all' | 'get' | 'add' | 'put' | 'delete'


