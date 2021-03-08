import {
  receiveAuth,
  requestAuth,
  clearAuth,
  errorAuth,
} from "../actions/auth";

export const SET_AUTH = "SET_AUTH";
export const LOAD_AUTH = "LOAD_AUTH";
export const CLEAR_AUTH = "CLEAR_AUTH";
export const ERROR_AUTH = "ERROR_AUTH";

export interface ILogin {
  email?: string | any;
  password?: string | any;
}

export type TRequest = ReturnType<typeof requestAuth>;
export type TReceive = ReturnType<typeof receiveAuth>;
export type TClear = ReturnType<typeof clearAuth>;
export type TError = ReturnType<typeof errorAuth>;

export type ActionsTypes = TRequest | TReceive | TClear | TError;
