import React from 'react';

import {Button} from './Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export const changeButtons = (buttons: Array<IBtn>, mode: string) => {
    return buttons.map((btn: IBtn) => {
        const newButton: IBtn = {
            ...btn,
            options: { size: 'small'}
        }
        if (btn.name === mode) {
            newButton.options.color = 'primary',
            newButton.options.variant = 'contained'
        }
        return newButton
    })
}

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
                        content={button.title}
                    />
                ))}
            </ButtonGroup>
        </div>
    )
}