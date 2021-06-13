import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../constants/colors';
import strings from '../constants/strings';

const FabMenu = ({toggle, type}) => {
  return (
    <View style={styles.parent}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => {
          type('clip');
          toggle();
        }}>
        <Text style={styles.createText}>{strings.CREATE_CLIP}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createCollectionParent}
        onPress={() => {
          type('collection');
          toggle();
        }}>
        <Text style={styles.createCollectionText}>
          {strings.CREATE_COLLECTION}
        </Text>
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
  createCollectionParent: {alignSelf: 'center', marginVertical: 28},
  createCollectionText: {
    fontSize: 14,
    fontFamily: 'IBMPlexSerif-SemiBoldItalic',
  },
});

export default FabMenu;
