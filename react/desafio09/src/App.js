import '~/config/ReactotronConfig';

import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

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
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
