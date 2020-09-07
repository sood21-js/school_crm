import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../../../redux/types/common_types'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

import {useInput} from '../../../hooks/useInput'
import { fetchAuth, clearAuth } from '../../../redux/actions/auth'
import { TAuth } from 'frontend/src/redux/types/auth'

export function AuthPage(){
    const dispatch = useDispatch();
    const auth = useSelector((state: AppStateType): TAuth => state.auth);
    const email = useInput('', 'email', ['required'])
    const password = useInput('', 'password', ['required'])
    const [disableSubmiit, setDisableSubmit] = useState(true)

    const submitHandler = () => {
        dispatch(fetchAuth({
            email: email.getValue(), 
            password: password.getValue()
        }))
    }

    useEffect(() => {
        if (email.bind.value || password.bind.value) {
            setDisableSubmit(false)
        }
        if (auth.error) dispatch(clearAuth())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        dispatch, 
        email.bind.value, 
        password.bind.value
    ])

    useEffect(() => {
        if (auth.error){
            setDisableSubmit(true)
            if (auth.error?.data?.code === '000.011'){
                console.log(auth.error)
                auth.error.data.errors?.forEach((er: any) => {
                    if (er.param === 'email') email.changeError(er.msg)
                    if (er.param === 'password') password.changeError(er.msg)
                })
            }
            
        }
    }, [auth.error, dispatch, email, password])

    const keyUpHandler = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13) submitHandler()
    }

    return (
        <div className="auth__body">
            <div className="auth__form">
                {auth.error?.data?.message && (
                    <div className="auth__error">
                        <div>
                            {auth.error?.data?.message}
                        </div>
                    </div>
                )}
                <div className="auth__title">
                    <div>
                        <i className="fas fa-graduation-cap"></i>
                    </div>
                    <div>
                        school crm
                    </div>
                </div>
                <div className="auth__input">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email или Логин"
                        name="email"
                        autoComplete="email"
                        disabled={auth.isFetching}
                        {...email.bind}
                        onKeyUp={keyUpHandler}
                        onBlur={() => email.validate(['required'])}
                    />
                </div>
                <div className="auth__input">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Пароль"
                        name="password"
                        autoComplete="password"
                        disabled={auth.isFetching}
                        {...password.bind}
                        onKeyUp={keyUpHandler}
                        onBlur={() => password.validate(['required'])}
                    />
                </div>
                <div className="auth__input">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={auth.isFetching || disableSubmiit}
                        onClick={submitHandler}
                    >
                        {auth.isFetching ? <CircularProgress size='24px'/> : 'Войти'}
                    </Button>
                </div>
                
            </div>
        </div>
    );
}