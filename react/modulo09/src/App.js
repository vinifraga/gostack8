import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';
import history from './services/history';
import Routes from './routes';
import GlobalStyle from './styles/global';

import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <ToastContainer autoClose={3000} />
          <GlobalStyle />
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
