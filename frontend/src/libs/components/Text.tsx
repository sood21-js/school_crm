import React from 'react';

export interface IText {
    children: React.ReactNode
    margin?: string
    marginTop?: string
    marginLeft?: string
    marginRight?: string
    marginBottom?: string
    textAlign?: 'left' | 'center' | 'right'
    fontSize?: string | '1rem'
}

export const Text: React.FC<IText> = ({children, ...args}: any) => {
    return (
        <div className='module__text' style={args}>
            {children}
        </div>
    )
}