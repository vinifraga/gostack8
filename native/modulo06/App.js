import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5f5f5',
  },
  welcole: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const App = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.welcole}>Hello World</Text>
      </View>
    </>
  );
};

export default App;
