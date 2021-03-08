import { createStore, applyMiddleware } from "redux";
import reduxSaga from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducers } from "./reducers";
import { rootSaga } from "./rootSaga";

export type RootReducerType = typeof rootReducers;

const sagaMiddleware = reduxSaga();
export const browserHistory = createBrowserHistory();

const middleware = [sagaMiddleware, routerMiddleware(browserHistory)];

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;
