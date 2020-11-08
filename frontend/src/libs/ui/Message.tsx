import React, { useEffect } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
}
export type TVariant = 'success' | 'info' | 'warning' | 'error'
type TMessage = {
    variant: TVariant,
    text: string,
    autoHideDuration?: number,
    anchorOrigin?: {
        vertical: 'top' | 'bottom',
        horizontal: 'left' | 'center' | 'right'
    }
    //clear message
    onClose: (txt: string) => void
}

export const Message: React.FC<TMessage> = ({variant, text, autoHideDuration = 6000, onClose }: TMessage) => {
    const [open, setOpen] = React.useState(false)

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        onClose('')
        setOpen(false)
    }

    useEffect(() => {
        if (text) setOpen(true)
    }, [text])

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert severity={variant}>
                {text}
            </Alert>
        </Snackbar>
    )
}

