import { SHOW_CONFIRM, HIDE_CONFIRM } from '#src/redux/types/confirm';
import { IShowConfirm } from '../reducers/confirm';

export const showConfirm = ({ ...args }: IShowConfirm) => ({
    type: SHOW_CONFIRM,
    ...args
} as const)
export const hideConfirm = () => ({ type: HIDE_CONFIRM } as const)