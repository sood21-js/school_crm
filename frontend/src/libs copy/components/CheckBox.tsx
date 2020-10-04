import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface ICheckBox {
    label?: string
    disabled?: boolean
    onChange?: (v: boolean) => void,
    helperText?: string,
    error?: boolean,
    checked?: boolean
}

export const CheckBox: React.FC<ICheckBox> = ({label, checked = false, disabled, onChange = () => {}, ...arg}: ICheckBox) => {
    
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    disabled={disabled}
                    onChange={changeHandler}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            }
            label={label}
        />
    )
}