import React from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

export interface IOption {title: string, value: string}

export interface ISelection {
    id?: string
    label?: string
    labelId?: string
    value?: string
    variant?: 'outlined' | 'filled'
    selected: Array<IOption>
    defaultValue?: string
    disabled?: boolean
    modifier?: string
    helperText?: string
    error?: boolean

    onChange: (v: string | any) => void
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
    defaultValue,
    value = '',
    error = false,
    ...args
}: ISelection) => {

    const handleChange = (event: React.ChangeEvent<{name?: string | undefined, value: unknown}>) => {
        onChange(event.target.value);
    }

    return(
        <>
            <FormControl
                variant={variant}
                className={modifier}
                disabled={disabled}
                size="small"
                defaultValue={defaultValue}
                style={{ width: '100%' }}
            >
                <InputLabel id={labelId}>{label}</InputLabel>
                <Select
                    labelId={labelId}
                    id={id}
                    value={value}
                    onChange={handleChange}
                    error={error}
                    defaultValue={defaultValue}
                >
                    <MenuItem value="">Не выбрано</MenuItem>
                    {selected.map((item: IOption) => (
                        <MenuItem
                            key={Math.random()}
                            value={item.value}
                        >
                            {item.title}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText error={error}>{helperText}</FormHelperText>
            </FormControl>
        </>
    )
}