import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'

import { TState } from '../redux/types/common_types'

import { AppStateType } from '../redux/types/common_types'
import { Container } from './container/Container'
import {AuthPage} from '../components/pages/auth/Auth'
import { fetchAuth } from '../redux/actions/auth'

import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '#src/materialUI/theme'

type TApp = unknown

export const App: React.FC<TApp> = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: AppStateType): TState => state.auth)
    const isAuth = auth.data?.isAuth || false
    useEffect(() => {
        dispatch(fetchAuth({}))
    }, [])
    return (
        <>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    {isAuth ? <Container /> : (
                        <>
                            <Route exact path="/">
                                <AuthPage />
                            </Route>
                            <Redirect to="/" />
                        </>
                    )}
                </ThemeProvider>
            </BrowserRouter>
        </>
    )
}
