import {receiveLevel, requestLevel, clearLevel, errorLevel} from '../actions/level';

export const RECEIVE_LEVEL = "RECEIVE_LEVEL"
export const REQUEST_LEVEL = "REQUEST_LEVEL"
export const CLEAR_LEVEL = "CLEAR_LEVEL"
export const ERROR_LEVEL = "ERROR_LEVEL"

export interface ILevel {
    name: string
    _id: string
    created: string
}

export enum LevelKeys {
    name = 'name',
    created = 'created'
}

export enum LevelNames {
    name = 'Название уровня',
    created = 'Создано'
}

export type TRequest = ReturnType<typeof requestLevel>
export type TReceive = ReturnType<typeof receiveLevel>
export type TClear = ReturnType<typeof clearLevel>
export type TError = ReturnType<typeof errorLevel>

export type ActionsTypes = TRequest | TReceive | TClear | TError