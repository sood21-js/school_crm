import { RootReducerType } from "../redux_strore"

export type AppStateType = ReturnType<RootReducerType>
//export type TDispatch = Dispatch<AppStateType>

export type TInitialState = typeof defaultState
export const defaultState = {
    isFetching: false,
    error: null,
    isSuccess: false,
    data: null,
}

export type TResponseError = {
    data: any,
    status: number
}

export type TResponse = {
    data: any
}
