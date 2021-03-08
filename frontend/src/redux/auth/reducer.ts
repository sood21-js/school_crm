import { defaultState, TResponse, TResponseError, TState } from "../types/common_types";

export enum AUTH_ACTION_TYPE {
  SET_AUTH = "SET_AUTH",
  SET_LOADING_AUTH = "SET_LOADING_AUTH",
  SET_ERROR_AUTH = "SET_ERROR_AUTH",
  CLEAR_AUTH = "CLEAR_AUTH",
  LOAD_AUTH = "LOAD_AUTH",
}

export interface ILogin {
  email?: string | any;
  password?: string | any;
}

export const setAuth = (data: any) =>
  ({ type: AUTH_ACTION_TYPE.SET_AUTH, data } as const);
export const setLoadingAuth = (loading: boolean) =>
  ({ type: AUTH_ACTION_TYPE.SET_LOADING_AUTH, loading } as const);
export const clearAuth = () => ({ type: AUTH_ACTION_TYPE.CLEAR_AUTH } as const);
export const setErrorAuth = (error: TResponse) =>
  ({ type: AUTH_ACTION_TYPE.SET_ERROR_AUTH, error } as const);

export type TSetAuth = ReturnType<typeof setAuth>;
export type TSetLoadingAuth = ReturnType<typeof setLoadingAuth>;
export type TClear = ReturnType<typeof clearAuth>;
export type TSetError = ReturnType<typeof setErrorAuth>;

export type ActionsTypes = TSetAuth | TSetLoadingAuth | TClear | TSetError;

export const authReducer = (
  state: TState = {
    ...defaultState,
  },
  action: ActionsTypes
) => {
  switch (action.type) {
    case AUTH_ACTION_TYPE.SET_AUTH:
      return {
        ...state,
        data: action.data,
      };
    case AUTH_ACTION_TYPE.SET_LOADING_AUTH:
      return {
        ...state,
        loading: action.loading,
      };
    case AUTH_ACTION_TYPE.SET_ERROR_AUTH:
      return {
        ...state,
        error: action.error,
      };
    case AUTH_ACTION_TYPE.CLEAR_AUTH:
      return { ...state, ...defaultState };
    default:
      return state;
  }
};
