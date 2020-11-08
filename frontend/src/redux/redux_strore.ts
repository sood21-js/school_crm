import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'

import auth from './reducers/auth'
import profile from './reducers/profile'
import logs from './reducers/logs'
import level from './reducers/level'
import alert from './reducers/alert'
import confirm from './reducers/confirm'

const rootReducers = combineReducers({
    auth,
    profile,
    logs,
    alert,
    confirm,
    level
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

export default store