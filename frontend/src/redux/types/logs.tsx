import {receiveLogs, requestLogs, clearLogs, errorLogs} from '../actions/logs' 

export const RECEIVE_LOGS = "RECEIVE_LOGS"
export const REQUEST_LOGS = "REQUEST_LOGS"
export const CLEAR_LOGS = "CLEAR_LOGS"
export const ERROR_LOGS = "ERROR_LOGS"

export interface ILog {
    userId: string,
    action: string,
    date: string,
    details: string
}

export type TRequest = ReturnType<typeof requestLogs>
export type TReceive = ReturnType<typeof receiveLogs>
export type TClear = ReturnType<typeof clearLogs>
export type TError = ReturnType<typeof errorLogs>

export type ActionsTypes = TRequest | TReceive | TClear | TError