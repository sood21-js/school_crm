import { ActionsTypes } from "../types/alert";
import { TVariant } from "#src/libs/ui/Message";

export interface IAlertState {
    message: string
    variant: TVariant
}
export default function alertReducer(
    state: IAlertState = {
        message: '',
        variant: 'success',
    },
    action: ActionsTypes
) {

    switch (action.type) {
    case "SHOW_ALERT":
        return {
            ...state,
            message: action.message,
            variant: action.variant
        };
    case "HIDE_ALERT":
        return {
            ...state,
            message: '',
            variant: 'success'
        };
    default:
        return state;
    }
}