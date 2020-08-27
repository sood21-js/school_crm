import { TInitialState, defaultState, TResponseError } from "../types/common_types"
import { RECEIVE_AUTH, TAuth, REQUEST_AUTH, CLEAR_AUTH, ERROR_AUTH } from "../types/auth"

type TRequestAuth = { type: typeof REQUEST_AUTH }
type TReceiveAuth = { type: typeof RECEIVE_AUTH, data: TAuth }
type TClearAuth = { type: typeof CLEAR_AUTH }
type TErrorAuth = { type: typeof ERROR_AUTH, error: TResponseError }

type TAction = TReceiveAuth | TRequestAuth | TClearAuth | TErrorAuth

export default function authReducer(state: TInitialState = defaultState, action: TAction) {
    
    console.log(state, action)

    switch (action.type) {
    case "REQUEST_AUTH":
        return { 
            ...state, 
            isFetching: true,
            error: null,
            isSuccess: false
        };
    case "RECEIVE_AUTH":
        return { 
            ...state,
            isFetching: false,
            error: null,
            data: action.data,
            isSuccess: true,
        };
    case "CLEAR_AUTH":
        return { ...state, ...defaultState}
    case "ERROR_AUTH":
        return { 
            ...state,
            isFetching: false,
            isSuccess: false,
            error: action.error,
        };
    default:
        return state;
    }
}