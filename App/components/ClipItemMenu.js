import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../constants/colors';
import strings from '../constants/strings';

const ClipItemMenu = ({toggle, type}) => {
  return (
    <View style={styles.parent}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => {
          type('browser');
          toggle();
        }}>
        <Text style={styles.createText}>{strings.OPEN_IN_BROWSER}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemTouchParent}
        onPress={() => {
          type('read');
          toggle();
        }}>
        <Text style={styles.createCollectionText}>{strings.MARK_AS_READ}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemTouchParent}
        onPress={() => {
          type('edit');
          toggle();
        }}>
        <Text style={styles.createCollectionText}>{strings.EDIT}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemTouchBottomParent}
        onPress={() => {
          type('delete');
          toggle();
        }}>
        <Text style={styles.createCollectionText}>{strings.DELETE}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: colors.white,
  },
  createButton: {alignSelf: 'center', marginTop: 24},
  createText: {
    fontSize: 14,
    fontFamily: 'IBMPlexSerif-SemiBoldItalic',
    color: colors.secondaryColor,
  },
  itemTouchParent: {alignSelf: 'center', marginTop: 28},
  itemTouchBottomParent: {alignSelf: 'center', marginVertical: 28},
  createCollectionText: {
    fontSize: 14,
    fontFamily: 'IBMPlexSerif-SemiBoldItalic',
  },
});

export default ClipItemMenu;
