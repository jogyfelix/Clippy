import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import strings from '../constants/strings';

const FabMenu = ({toggle, type}) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
      }}>
      <TouchableOpacity
        style={{alignSelf: 'center', marginTop: 24}}
        onPress={() => {
          type('clip');
          toggle();
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'IBMPlexSerif-SemiBoldItalic',
            color: colors.secondaryColor,
          }}>
          {strings.create_clip}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{alignSelf: 'center', marginVertical: 28}}
        onPress={() => {
          type('collection');
          toggle();
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'IBMPlexSerif-SemiBoldItalic',
          }}>
          {strings.create_collection}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FabMenu;
