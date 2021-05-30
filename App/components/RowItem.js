import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';

export const RowItem = ({name, clips, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.clipText}>{clips}</Text>
    </TouchableOpacity>
  );
};

export const RowSeparator = () => {
  return <View style={styles.separator} />;
};

export const RowFooter = () => {
  return <View style={styles.footer} />;
};

const styles = StyleSheet.create({
  clipText: {
    marginHorizontal: 16,
    marginBottom: 8,
    fontFamily: 'IBMPlexSerif-SemiBoldItalic',
    color: 'gray',
  },
  nameText: {
    margin: 16,
    fontFamily: 'IBMPlexSerif-SemiBoldItalic',
    fontSize: 18,
  },
  separator: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth,
  },
  footer: {paddingBottom: 64},
});
