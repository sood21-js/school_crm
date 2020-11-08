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
    message?: string
    success?: boolean
}
export type TFetchMethod = 'get_all' | 'get' | 'add' | 'put' | 'delete'
export type TRequest = {
    data?: any
    method?: TFetchMethod
}

export type TObject<T = any> = { [key: string]: T };
export type TValueOf<T> = T[keyof T];

export const Collections = {
    LEVEL: 'LEVEL'
}

