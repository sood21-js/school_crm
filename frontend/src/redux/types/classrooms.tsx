import {receiveClassroom, requestClassroom, clearClassroom, errorClassroom} from '../actions/classroom';
import { ILevel } from './level';
import { IUser } from './users';

export const RECEIVE_CLASSROOM = "RECEIVE_CLASSROOM"
export const REQUEST_CLASSROOM = "REQUEST_CLASSROOM"
export const CLEAR_CLASSROOM = "CLEAR_CLASSROOM"
export const ERROR_CLASSROOM = "ERROR_CLASSROOM"

export interface IClassroom {
    name: string
    id?: string
    created?: string
    supervisor: IUser
    level: ILevel
}

export enum ClassroomKeys {
    name = 'name',
    id = 'id',
    created = 'created',
    supervisor = 'supervisor',
    level = 'level',
}

export enum ClassroomNames {
    name = 'Название',
    id = 'id',
    created = 'Создано',
    supervisor = 'Классный руководитель',
    level = 'Уровень',
}

export type TRequest = ReturnType<typeof requestClassroom>
export type TReceive = ReturnType<typeof receiveClassroom>
export type TClear = ReturnType<typeof clearClassroom>
export type TError = ReturnType<typeof errorClassroom>

export type ActionsTypes = TRequest | TReceive | TClear | TError