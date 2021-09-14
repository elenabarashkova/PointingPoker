import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import store from './redux/store';
import App from './App';
import './scss/style.scss';
import { history } from './shared/history';

const rootElement = document.getElementById('root');

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
), rootElement);
