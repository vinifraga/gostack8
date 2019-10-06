import React from 'react';
import { View, Text, StatusBar } from 'react-native';

import './config/reactotronConfig';

const App = () => {
  console.tron.log('teste');
  return (
    <>
      <StatusBar barStyle="ligth-content" />
      <View>
        <Text>Desafio 07</Text>
      </View>
    </>
  );
};

export default App;
