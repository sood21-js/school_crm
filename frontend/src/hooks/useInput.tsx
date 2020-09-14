import {useState, useEffect, useCallback} from 'react'

export type TUseInput = {
    bind: {
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        value: any,
        helperText: string | null,
        error: boolean
    },
    validate: () => void,
    changeError: (text: string) => void,
    getValue: () => string,
    setDefaultValue: () => void,
}

type TOptions = {
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    phone?: boolean
}

export function useInput(defaultValue: any, name: any, options: TOptions):TUseInput {

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
                if (key === 'required' && !value){
                    setError('Обязательное поле')
                    valid = false
                }
                break;
            case 'minLength': 
                if (options.minLength && options.minLength > value.length){
                    setError(`Минимальное число символов ${options.minLength}`)
                    valid = false
                }
                break
            case 'maxLength':
                if (options.maxLength && options.maxLength < value.length){
                    setError(`Максимальное число символов ${options.maxLength}`)
                    valid = false
                }
                break
            case 'phone':
                if (value.length > 0 && value.length !== 18){
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
    
    //const regExp: RegExp = config.regexps[name]
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInit(true)
        setValue(e.target.value)
    }

    const changeError = (text: string) => setError(text)

    const getValue = () => value

    const setDefaultValue = () => {
        setInit(false)
        setValue('')
    }

    const result = { 
        bind: {
            onChange, 
            value,
            helperText: error,
            error: init && !!error 
        },
        validate,
        changeError,
        getValue,
        setDefaultValue
    }
    return result
}