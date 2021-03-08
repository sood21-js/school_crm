import { TState, defaultState } from "../types/common_types";
import { ActionsTypes } from "../types/profile";

export function profileReducer(
  state: TState = defaultState,
  action: ActionsTypes
) {
  switch (action.type) {
    case "REQUEST_PROFILE":
      return {
        ...state,
        isFetching: true,
        error: null,
        isSuccess: false,
      };
    case "RECEIVE_PROFILE":
      return {
        ...state,
        isFetching: false,
        error: null,
        data: action.data,
        isSuccess: true,
      };
    case "CLEAR_PROFILE":
      return { ...state, ...defaultState };
    case "ERROR_PROFILE":
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
