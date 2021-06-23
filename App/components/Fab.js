import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-remix-icon';
import colors from '../constants/colors';

const Fab = ({onOpen}) => {
  return (
    <>
      <TouchableOpacity onPress={onOpen} style={styles.fab}>
        <Icon name="ri-add-fill" size={24} color={colors.white} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: colors.secondaryColor,
  },
});

export default Fab;
