import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';
import Routes from './routes';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#141419" barStyle="light-content" />
      <Routes />
    </>
  );
};

export default App;
