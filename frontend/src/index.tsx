import 'materialize-css/dist/js/materialize.min'
import './styles/style.css'
import './styles/style.scss'
import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter } from "react-router-dom"
import store from "./redux/redux_strore"
import { Provider } from "react-redux"
import { App } from './components/App'

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('app')
)