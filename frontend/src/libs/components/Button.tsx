import React from 'react';

import * as material from '@material-ui/core/Button';

export interface IButton {
    color?: 'primary' | 'secondary'
    size?: 'small' | 'large'
    disabled?: boolean
    variant?: 'contained' | 'outlined'
    onClick: () => void
}

export const Button: React.FC<IButton> = ({children, ...args}: any) => {
    return (
        <material.default
            {...args}
        >
            {children}
        </material.default>
    )
}