import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../../redux/types/common_types'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

import {useInput} from '../../hooks/useInput'
import { fetchAuth, clearAuth } from '../../redux/actions/auth'

export default function Auth(){
    const dispatch = useDispatch();
    const {isFetching, error} = useSelector(({auth}: AppStateType): any => auth);
    const email = useInput('', 'email', ['required'])
    const password = useInput('', 'password', ['required'])

    const clickHandler = () => {
        dispatch(fetchAuth({
            email: email.getValue(), 
            password: password.getValue()
        }))
    }

    useEffect(() => {
        if (error){
            dispatch(clearAuth())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        dispatch,
        email.bind.value,
        password.bind.value
    ])

    useEffect(() => {
        if (error?.data?.code === '000.011'){
            error.data.errors?.forEach((er: any) => {
                if (er.param === 'email') email.changeError(er.msg)
                if (er.param === 'password') password.changeError(er.msg)
            })
        }
    }, [error, dispatch, email, password])

    return (
        <div className="auth__body">
            <div className="auth__form">
                {error?.data?.message && (
                    <div className="auth__error">
                        <div>
                            {error?.data?.message}
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
                        disabled={isFetching}
                        {...email.bind}
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
                        disabled={isFetching}
                        {...password.bind}
                        onBlur={() => password.validate(['required'])}
                    />
                </div>
                <div className="auth__input">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isFetching}
                        onClick={clickHandler}
                    >
                        {isFetching ? <CircularProgress size='24px'/> : 'Войти'}
                    </Button>
                </div>
                
            </div>
        </div>
    );
}