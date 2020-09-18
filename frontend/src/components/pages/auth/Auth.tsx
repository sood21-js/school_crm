import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import {useInput} from '#src/hooks/useInput'
import { fetchAuth, clearAuth } from '#src/redux/actions/auth'
import { TState } from '#src/redux/types/common_types'
import { AppStateType } from '#src/redux/types/common_types'
import { Input } from '#src/libs/components/Input'

export function AuthPage(){
    const dispatch = useDispatch();
    const auth = useSelector((state: AppStateType): TState => state.auth);
    const email = useInput('', 'email', {required: true})
    const password = useInput('', 'password', {required: true})
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
                    <Input
                        required = {true}
                        fullWidth = {true}
                        margin="normal"
                        id="email"
                        label="Email или Логин"
                        name="email"
                        size="medium"
                        autoComplete="email"
                        disabled={auth.isFetching}
                        onKeyUp={keyUpHandler}
                        onBlur={email.validate}
                        {...email.bind}
                    />
                </div>
                <div className="auth__input">
                    <Input
                        required = {true}
                        fullWidth = {true}
                        margin="normal"
                        id="password"
                        label="Пароль"
                        type='password'
                        name="email"
                        size="medium"
                        autoComplete="password"
                        disabled={auth.isFetching}
                        onKeyUp={keyUpHandler}
                        onBlur={password.validate}
                        {...password.bind}
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
                        {auth.isFetching ? <CircularProgress size='24px' color='inherit'/> : 'Войти'}
                    </Button>
                </div>
                
            </div>
        </div>
    );
}