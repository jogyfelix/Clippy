import React from 'react';
import {Text, StyleSheet, View, StatusBar} from 'react-native';
import colors from '../../constants/colors';
import Fab from '../../components/Fab';

const Collections = () => {
  return (
    <View style={styles.homeParent}>
      <StatusBar backgroundColor={colors.appPrimary} barStyle="light-content" />
      <View style={styles.fabParent}>
        <Fab onOpen={() => alert('clicked')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeParent: {
    flex: 1,
  },
  fabParent: {
    position: 'absolute',
    bottom: 18,
    right: 16,
    alignSelf: 'flex-end',
  },
});

export default Collections;
