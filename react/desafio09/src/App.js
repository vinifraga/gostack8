import '~/config/ReactotronConfig';

import React from 'react';
import { Router } from 'react-router-dom';

import history from '~/services/history';
import Routes from '~/routes';

import GlobalStyles from '~/style/globals';

function App() {
  return (
    <Router history={history}>
      <Routes />
      <GlobalStyles />
    </Router>
  );
}

export default App;
