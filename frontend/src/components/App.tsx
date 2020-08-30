import React from 'react';
import { useSelector } from 'react-redux'

import Auth from './auth/Auth';
import { Container } from './container/Container';
import { TAuth } from '../redux/types/auth';
import { AppStateType } from '../redux/types/common_types';

type TApp = unknown

export const App: React.FC<TApp> = () => {
    const {data} = useSelector(({auth}: AppStateType): TAuth => auth);
    console.log(data)
    return (
        <>
            {data?.isAuth ? <Container /> : <Auth />}
        </>
    )
}
