import React from 'react';

import {Button} from './Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export interface IBtn {
    title: string,
    name: string,
    options: {
        color?: 'primary' | 'secondary'
        size?: 'small' | 'large'
        disabled?: boolean
        variant?: 'contained' | 'outlined'}
}

export interface ITabs {
    btns: Array<IBtn>,
    options?: {
        orientation?: "vertical",
    },
    onClick: (mode: string) => void
}

export const Tabs: React.FC<ITabs> = ({btns, options, onClick}: ITabs) => {
    return (
        <div className="tabs">
            <ButtonGroup 
                {...options}
            >
                {btns.map((button: IBtn) => (
                    <Button
                        key={Math.random()}
                        {...button.options}
                        onClick={() => onClick(button.name)}
                    >
                        {button.title}
                    </Button>
                ))}
            </ButtonGroup>
        </div> 
    )
}