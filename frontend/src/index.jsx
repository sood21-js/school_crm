import './styles/style.css';
import './styles/style.less';
import { render } from 'react-dom';
import React from 'react';
import 'materialize-css/dist/js/materialize.min';
import { App } from './components/App';

render(<App />, document.getElementById('app'))