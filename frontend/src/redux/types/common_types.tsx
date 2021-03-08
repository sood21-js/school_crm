import { RootReducerType } from "../redux_strore"

export type AppStateType = ReturnType<RootReducerType>

export const defaultState = {
    loading: false,
    error: null,
    data: null,
}

export type TState = {
    loading: boolean,
    error: any,
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
export enum FetchMethod {
    GET_ALL = 'GET_ALL',
    GET = 'GET',
    ADD = 'ADD',
    PUT = 'PUT',
    DELETE = 'DELETE'
}
export type TRequest = {
    data?: any
    method?: FetchMethod
}

export type TObject<T = any> = { [key: string]: T };
export type TValueOf<T> = T[keyof T];

export const Collections = {
    LEVEL: 'LEVEL'
}

