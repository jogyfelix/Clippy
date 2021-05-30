import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import strings from '../constants/strings';

const AddCollection = ({toggle, collection}) => {
  const [collectionName, setCollectionName] = useState('');

  return (
    <View>
      <View style={{backgroundColor: colors.appPrimary, height: 48}}>
        <Text
          style={{
            color: colors.white,
            fontSize: 18,
            fontFamily: 'IBMPlexSerif-SemiBoldItalic',
            alignSelf: 'center',
            marginTop: 12,
          }}>
          {strings.create_collection}
        </Text>
      </View>
      <View style={{height: 160, backgroundColor: colors.white}}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'IBMPlexSerif-SemiBoldItalic',
            marginHorizontal: 8,
            marginTop: 20,
          }}>
          {strings.collection_name}
        </Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={collectionName}
          onChangeText={newText => setCollectionName(newText)}
          style={{
            backgroundColor: colors.lightGray,
            marginHorizontal: 8,
            marginTop: 4,
            height: 40,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginHorizontal: 8,
            marginTop: 20,
            marginBottom: 16,
          }}>
          <TouchableOpacity
            style={{
              borderColor: colors.secondaryColor,
              borderWidth: 1,
              flex: 1,
              height: 34,
              borderRadius: 4,
            }}
            onPress={toggle}>
            <Text
              style={{
                alignSelf: 'center',
                marginTop: 6,
                fontFamily: 'IBMPlexSerif-SemiBoldItalic',
                color: colors.secondaryColor,
              }}>
              {strings.cancel}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.secondaryColor,
              flex: 1,
              marginLeft: 8,
              borderRadius: 4,
            }}
            onPress={() => {
              collection(collectionName);
              toggle();
            }}>
            <Text
              style={{
                alignSelf: 'center',
                marginTop: 6,
                fontFamily: 'IBMPlexSerif-SemiBoldItalic',
                color: colors.white,
              }}>
              {strings.create}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddCollection;
