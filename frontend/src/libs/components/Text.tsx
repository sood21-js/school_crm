import React from 'react';

export interface IText {
    children: React.ReactNode
    modifier?: string
}

export const Text: React.FC<IText> = ({children, modifier, ...args}: IText) => {
    return (
        <div className={`module__text ${modifier || ''}`} style={args}>
            {children}
        </div>
    )
}