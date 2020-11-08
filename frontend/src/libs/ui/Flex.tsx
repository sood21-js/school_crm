import React from 'react';

export interface IFlex {
    children: React.ReactNode
    margin?: string
    marginTop?: string
    marginLeft?: string
    marginRight?: string
    marginBottom?: string
    flexDirection?: 'row' | 'column' | 'column-reverse' | 'row-reverse'
    alignItems?: 'start' | 'center' | 'end'
    justifyContent?: 'start' | 'center' | 'flex-end' | 'space-around' | 'space-between'
}

export const Flex: React.FC<IFlex> = ({
    children, ...args}: any) => {
    return (
        <div className='module__flex' style={args}>
            {children}
        </div>
    )
}