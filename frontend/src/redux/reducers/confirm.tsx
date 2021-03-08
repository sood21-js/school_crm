import { ActionsTypes } from "../types/confirm";

export interface IShowConfirm {
    onOk: () => void
    dialogText?: string
    okText?: string
    cancelText?: string
}

export interface IConfirmState extends IShowConfirm {
    open: boolean
}

export function confirmReducer(
    state: IConfirmState = {
        onOk: () => {},
        open: false
    },
    action: ActionsTypes
) {

    switch (action.type) {
    case "SHOW_CONFIRM":
        return {
            ...state,
            onOk: action.onOk,
            open: true,
            dialogText: action.dialogText,
            okText: action.okText,
            cancelText: action.cancelText,
        };
    case "HIDE_CONFIRM":
        return {
            ...state,
            onOk: () => {},
            open: false,
            dialogText: undefined,
            okText: undefined,
            cancelText: undefined,
        };
    default:
        return state;
    }
}