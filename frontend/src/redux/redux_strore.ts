import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'

import auth from './reducers/auth';
import profile from './reducers/profile';

const rootReducers = combineReducers({ 
    auth,
    profile
})
export type RootReducerType = typeof rootReducers

export const browserHistory = createBrowserHistory();

const middleware = [
    thunk,
    routerMiddleware(browserHistory),
]

const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(...middleware))
)

//@ts-ignore
window.store = store

export default store