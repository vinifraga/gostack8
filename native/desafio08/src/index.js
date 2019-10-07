import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';
import Routes from './routes';
import store from './store';
import navigation from './services/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#141419" barStyle="light-content" />
      <Routes
        ref={navigatorRef => {
          navigation.setNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
};

export default App;
