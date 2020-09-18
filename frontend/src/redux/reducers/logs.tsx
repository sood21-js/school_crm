import { TState, defaultState } from "../types/common_types"
import { ActionsTypes } from "../types/logs"

export default function profileReducer(
    state: TState = defaultState, 
    action: ActionsTypes
) {
    
    console.log(state, action)

    switch (action.type) {
    case "REQUEST_LOGS":
        return { 
            ...state, 
            isFetching: true,
            error: null,
            isSuccess: false
        };
    case "RECEIVE_LOGS":
        return { 
            ...state,
            isFetching: false,
            error: null,
            data: action.data,
            isSuccess: true,
        };
    case "CLEAR_LOGS":
        return { ...state, ...defaultState}
    case "ERROR_LOGS":
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