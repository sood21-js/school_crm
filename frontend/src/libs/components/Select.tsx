import React from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

type TItem = {title: string, value: string}

export interface ISelection {
    id?: string
    label?: string
    labelId?: string
    value: string
    variant?: 'outlined' | 'filled'
    selected: Array<TItem>
    defaultValue?: string
    disabled?: boolean
    modifier?: string
    helperText?: string
    error?: boolean

    onChange: (v: string) => void
}

export const Selection: React.FC<ISelection> = ({
    selected,
    modifier,
    labelId,
    id,
    label,
    variant = 'outlined',
    disabled = false,
    helperText,
    onChange,
    value,
    error = false
}: ISelection) => {
 
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        onChange(event.target.value as string);
    };

    return(
        <>
            <FormControl 
                variant={variant} 
                className={modifier} 
                disabled={disabled}
                size="small"
            >
                <InputLabel id={labelId}>{label}</InputLabel>
                <Select
                    labelId={labelId}
                    id={id}
                    value={value}
                    onChange={handleChange}
                    error={error}
                >
                    <MenuItem value="">Не выбрано</MenuItem>
                    {selected.map((item:TItem) => (
                        <MenuItem 
                            key={Math.random()}
                            value={item.value}
                        >
                            {item.title}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
        </>
    )
}