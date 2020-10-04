import React from 'react';

export interface IGrid {
    children: React.ReactNode
    margin?: string
    marginTop?: string
    marginLeft?: string
    marginRight?: string
    marginBottom?: string
    alignItems?: 'start' | 'center' | 'end'
    justifyContent?: 'start' | 'center' | 'flex-end' | 'space-around' | 'space-between'
    gridTemplateColumns?: string
    modifier?: string
}

export const Grid: React.FC<IGrid> = ({
    children, ...args}: IGrid) => {
    return (
        <div className={`module__grid ${args.modifier || ''}`} style={args}>
            {children}
        </div>
    )
}