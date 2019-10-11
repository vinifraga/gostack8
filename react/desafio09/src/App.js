import '~/config/ReactotronConfig';

import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ToastContainer } from 'react-toastify';

import { store, persistor } from '~/store';
import history from '~/services/history';
import Routes from '~/routes';

import GlobalStyles from '~/style/globals';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyles />
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
