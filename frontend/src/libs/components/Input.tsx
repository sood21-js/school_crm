import React from 'react';

import TextField from '@material-ui/core/TextField';

export interface IInput {
    children?: React.ReactNode
    mode?: 'textfield'
    type?: 'password' | 'text' | 'phone'
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
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
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


    const changePhoneValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const converPhonetoValue = (val: string) => {
            return val.length > 1
                ? val.replace(/[^0-9]/g, '').slice(1).slice(0, 10)
                : val.replace(/[^0-9]/g, '')
        }
        const convertValueToPhone = (val: string) => {
            let newValue = val
            if (newValue.length > 0) {
                newValue = '+7 (' + newValue
            }
            if (newValue.length > 7) {
                const part1 = newValue.slice(0, 7)
                const part2 = newValue.slice(7)
                newValue = part1 + ') ' + part2
            }
            if (newValue.length > 12) {
                const part1 = newValue.slice(0, 12)
                const part2 = newValue.slice(12)
                newValue = part1 + '-' + part2
            }
            
            if (newValue.length > 15 ) {
                const part1 = newValue.slice(0, 15)
                const part2 = newValue.slice(15)
                newValue = part1 + '-' + part2
            }
            
            return newValue
        }
        const middleValue = converPhonetoValue(e.target.value)
        const newValue = convertValueToPhone(middleValue)

        e.target.value = newValue
        onChange(e)
    }

    return (
        <>
            {mode === 'textfield' &&
         <TextField
             {...options}
             size={size}
             type={type}
             variant={variant}
             onChange={type === 'phone'
                 ? changePhoneValue
                 : onChange}
             label={options.required ? 'Обязательное поле' : ''}
         />
            }
        </>
    )
}