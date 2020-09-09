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
    getValue: () => string
}

export function useInput(defaultValue: any, name: any, options: string[]):TUseInput {

    const [value, setValue] = useState(defaultValue)
    const [error, setError] = useState('')
    const [init, setInit] = useState(false)

    const validate = useCallback(() => {
        let valid = true
        setInit(true)
        options.forEach( (opt: string) => {
            if (opt === 'required' && !value){
                setError('Обязательное поле')
                valid = false
            } else setError('')
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

    const result = { 
        bind: {
            onChange, 
            value,
            helperText: error,
            error: init && !!error 
        },
        validate,
        changeError,
        getValue
    }
    return result
}