import { TState, defaultState } from "../types/common_types"
import { ActionsTypes } from "../types/auth";

export default function authReducer(
    state: TState = defaultState,
    action: ActionsTypes
) {

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