import React from 'react';

export interface IMsg {
    text: string,
    status: string
}

export const Message: React.FC<IMsg> = ({text, status}: IMsg) => {
    return (
        <div className={`module__message ${status === 'primary'
            ? 'module__message__primary'
            : 'module__message__error'}`
        }>
            {text}
        </div>
    )
}