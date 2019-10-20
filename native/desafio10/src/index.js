import React from 'react';
import { SafeAreaView, Text, StatusBar } from 'react-native';

const App = () => (
  <>
    <StatusBar backgroundColor="transparent" barStyle="dark-content" />
    <SafeAreaView
      style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
    >
      <Text>Desafio 10</Text>
    </SafeAreaView>
  </>
);

export default App;
