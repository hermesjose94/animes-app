import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import * as serviceWorker from './serviceWorker';
import App from './routes/App';
import './fontawesome';

const initialState = {
  token: null,
  expiredAt: null,
  user: null,
  isAuthenticated: false,
  loadingAuth: true,
  loading: true,
  error: null,
  animes: [],
  animesWeek: [],
  animesFilter: [],
  query: '',
  anime: {},
};

const store = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
