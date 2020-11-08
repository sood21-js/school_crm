import React from 'react';

import { default as MaterialModal } from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';

export interface IModal {
    open: boolean,
    onClose: () => void
    children: React.ReactNode
}

export const Modal: React.FC<IModal> = ({
    onClose,
    children,
    ...args
}: any) => {
    return (
        <MaterialModal
            {...args}
            className='modal'
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className='modal__paper'>
                {children}
                <div className='modal__close'>
                    <CloseIcon onClick={onClose}/>
                </div>
            </div>
        </MaterialModal>
    )
}