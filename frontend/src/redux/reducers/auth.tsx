import { TInitialState, defaultState } from "../types/common_types"
import { TReceiveAuth, TRequestAuth, TClearAuth, TErrorAuth } from "../types/auth";

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