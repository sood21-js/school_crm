import { hideConfirm, showConfirm } from '../actions/confirm';

export const SHOW_CONFIRM = 'SHOW_CONFIRM'
export const HIDE_CONFIRM = 'HIDE_CONFIRM'

export type TShow = ReturnType<typeof showConfirm>
export type THide = ReturnType<typeof hideConfirm>

export type ActionsTypes = TShow | THide