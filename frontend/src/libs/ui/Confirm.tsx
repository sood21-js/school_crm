import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { IConfirmState } from '#src/redux/reducers/confirm';
import { hideConfirm } from '#src/redux/actions/confirm';

export const Confirm:FC<IConfirmState> = ({
    open,
    onOk,
    okText = 'Ok',
    cancelText = 'Отмена',
    dialogText = 'Подтвердите действие'
}: IConfirmState) => {

    const dispatch = useDispatch()
    const handleClose = (status: boolean) => {
        dispatch(hideConfirm())
        if (status) {
            onOk();
        }
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)} color="secondary">
                        {cancelText}
                    </Button>
                    <Button onClick={() => handleClose(true)} color="primary" autoFocus>
                        {okText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}