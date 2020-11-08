import { hideAlert, showAlert } from '../actions/alert';

export const SHOW_ALERT = 'SHOW_ALERT'
export const HIDE_ALERT = 'HIDE_ALERT'

export type TShow = ReturnType<typeof showAlert>
export type THide = ReturnType<typeof hideAlert>

export type ActionsTypes = TShow | THide