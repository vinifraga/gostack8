import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import history from './services/history';
import Routes from './routes';
import GlobalStyle from './styles/global';
import './config/ReactotronConfig';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <GlobalStyle />
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
