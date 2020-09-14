import React from 'react';

import * as material from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'

export interface IButton {
    color?: 'primary' | 'secondary'
    size?: 'small' | 'large'
    disabled?: boolean
    variant?: 'contained' | 'outlined'
    content: any
    icon?: string
    isFetching?: boolean
    onClick: () => void
}

export const Button: React.FC<IButton> = ({isFetching, content, icon, ...args}: any) => {
    return (
        <material.default
            {...args}
        >
            {isFetching && <CircularProgress size='24px'/>}
            
            <div className={`buuton__text ${isFetching && 'ml05'}`}>
                {icon && !isFetching && <i className="fas fa-user-plus"></i>}
                {content}
            </div>
        </material.default>
    )
}