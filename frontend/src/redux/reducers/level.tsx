import { TState, defaultState } from "../types/common_types"
import { ActionsTypes } from "../types/level"

export default function profileReducer(
    state: TState = defaultState,
    action: ActionsTypes
) {

    switch (action.type) {
    case "REQUEST_LEVEL":
        return {
            ...state,
            isFetching: true,
            error: null,
            isSuccess: false
        };
    case "RECEIVE_LEVEL":
        return {
            ...state,
            isFetching: false,
            error: null,
            data: action.data,
            isSuccess: true,
        };
    case "CLEAR_LEVEL":
        return { ...state, ...defaultState}
    case "ERROR_LEVEL":
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