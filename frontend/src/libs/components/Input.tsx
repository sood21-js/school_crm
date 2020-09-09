import React from 'react';

import TextField from '@material-ui/core/TextField';

export interface IInput {
    children?: React.ReactNode
    mode?: 'textfield'
    type?: 'password' | 'text'
    id?: string
    name: string
    label?: string
    value?: string
    variant?: 'outlined'
    size?: 'small' | 'medium'
    fullWidth?: true
    required?: true
    helperText?: string | null,
    error?: boolean 
    disabled?: boolean
    
    onBlur?: () => void
    onKeyUp?: (e: React.KeyboardEvent) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void 
}

export const Input: React.FC<IInput> = ({
    //name,
    size = 'small',
    type='text',
    mode='textfield',
    variant='outlined',
    onChange, 
    ...options
}: IInput) => {

    return (
        <>
            {mode === 'textfield' &&
             <TextField
                 {...options}
                 size={size}
                 type={type}
                 variant={variant}
                 onChange={onChange}
                 label={options.required ? 'Обязательное поле' : ''}
             />
            }
        </>
    )
}