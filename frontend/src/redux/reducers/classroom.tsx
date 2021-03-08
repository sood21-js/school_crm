import { TState, defaultState } from "../types/common_types"
import { ActionsTypes } from "../types/classrooms"

export function classroomReducer(
    state: TState = defaultState,
    action: ActionsTypes
) {

    switch (action.type) {
    case "REQUEST_CLASSROOM":
        return {
            ...state,
            isFetching: true,
            error: null,
            isSuccess: false
        };
    case "RECEIVE_CLASSROOM":
        return {
            ...state,
            isFetching: false,
            error: null,
            data: action.data,
            isSuccess: true,
        };
    case "CLEAR_CLASSROOM":
        return { ...state, ...defaultState}
    case "ERROR_CLASSROOM":
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