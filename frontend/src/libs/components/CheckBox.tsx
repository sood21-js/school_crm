import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface ICheckBox {
    checked: boolean
    label?: string
    disabled?: boolean
    onChange?: (v: boolean) => void
}

export const CheckBox: React.FC<ICheckBox> = ({checked, label, disabled, onChange = () => {}}: ICheckBox) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };
    return (
        <FormControlLabel
            control={
                <Checkbox
                    disabled={disabled}
                    checked={checked}
                    onChange={handleChange}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            }
            label={label}
        />
    )
}