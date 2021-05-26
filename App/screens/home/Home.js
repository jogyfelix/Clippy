import React from 'react';
import {Text, StyleSheet} from 'react-native';

const App = () => {
  return <Text style={styles.app}>Hello</Text>;
};

const styles = StyleSheet.create({
  app: {
    alignSelf: 'center',
  },
});

export default App;
