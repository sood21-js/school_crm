import {useState, useEffect, useCallback} from 'react'

/*
validation
 - required
 - maxLength(Max)
 - minLength(Min)
 - check phone value
*/

export type TUseInput = {
    bind: {
        onChange: (v: string | boolean) => void,
        value?: any,
        checked?: boolean,
        helperText: string | undefined,
        error: boolean
    },
    validate: () => boolean,
    changeError: (text: string) => void,
    getValue: () => string | boolean,
    setDefaultValue: () => void,
}

type TOptions = {
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    phone?: boolean
}

export function useInput(
    defaultValue: string | boolean,
    name: string,
    options: TOptions,
    type?: 'checkBox' | 'select'
):TUseInput {
    const [value, setValue] = useState(defaultValue)
    const [error, setError] = useState('')
    const [init, setInit] = useState(false)

    const validate = useCallback(() => {
        let valid = true
        setInit(true)
        setError('')
        Object.keys(options).forEach((key: any) => {
            switch (key) {
            case 'required':
                if (key === 'required' && options.required && !value){
                    setError('Обязательное поле')
                    valid = false
                }
                break;
            case 'minLength':
                if (options.minLength && typeof value === 'string' && options.minLength > value?.length){
                    setError(`Минимальное число символов ${options.minLength}`)
                    valid = false
                }
                break
            case 'maxLength':
                if (options.maxLength && typeof value === 'string' && options.maxLength < value?.length){
                    setError(`Максимальное число символов ${options.maxLength}`)
                    valid = false
                }
                break
            case 'phone':
                if (typeof value === 'string' && value?.length > 0 && value?.length !== 18){
                    setError(`Некорректный номер`)
                    valid = false
                }
                break
            default:
                setError('')
            }
        })
        return valid
    }, [options, value])

    useEffect(() => {
        if (init) validate()
    }, [init, validate, value])

    useEffect(() => setValue(defaultValue), [defaultValue])

    const onChange = (v: string | boolean) => {
        setInit(true)
        setValue(v)
    }

    const changeError = (text: string) => setError(text)

    const getValue = () => value

    const setDefaultValue = () => {
        setInit(false)
        type === 'checkBox' ? setValue(false) : setValue('')
    }

    const result: TUseInput = {
        bind: {
            onChange,
            helperText: error,
            error: init && !!error
        },
        validate,
        changeError,
        getValue,
        setDefaultValue
    }

    if (type === 'checkBox' && typeof value === 'boolean'){
        result.bind.checked = value
    } else result.bind.value = value

    return result
}