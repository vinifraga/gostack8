import React from 'react';
import { StatusBar } from 'react-native';

import '~/config/ReactotronConfig';

import App from './App';

export default function index() {
  const isSigned = false;

  return (
    <>
      <StatusBar
        backgroundColor={isSigned ? '#18161f' : '#22202C'}
        barStyle="light-content"
      />
      <App />
    </>
  );
}
