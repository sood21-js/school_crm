import {receiveProfile, requestProfile, clearProfile, errorProfile} from '../actions/profile'

export const RECEIVE_PROFILE = "RECEIVE_PROFILE"
export const REQUEST_PROFILE = "REQUEST_PROFILE"
export const CLEAR_PROFILE = "CLEAR_PROFILE"
export const ERROR_PROFILE = "ERROR_PROFILE"

export type TRequest = ReturnType<typeof requestProfile>
export type TReceive = ReturnType<typeof receiveProfile>
export type TClear = ReturnType<typeof clearProfile>
export type TError = ReturnType<typeof errorProfile>

export type ActionsTypes = TRequest | TReceive | TClear | TError