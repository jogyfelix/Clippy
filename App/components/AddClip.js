import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

const AddClip = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  return (
    <View>
      <View
        style={{
          backgroundColor: colors.appPrimary,
          height: 48,
          borderTopLeftRadius: 4,
          borderTopEndRadius: 4,
        }}>
        <Text
          style={{
            color: colors.white,
            fontSize: 18,
            fontFamily: 'IBMPlexSerif-SemiBoldItalic',
            alignSelf: 'center',
            marginTop: 12,
          }}>
          {strings.create_clip}
        </Text>
      </View>
      <View
        style={{
          height: 240,
          backgroundColor: colors.white,
          borderBottomLeftRadius: 4,
          borderBottomEndRadius: 4,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'IBMPlexSerif-SemiBoldItalic',
            marginHorizontal: 8,
            marginTop: 20,
          }}>
          {strings.collection}
        </Text>
        <View style={{marginTop: 4, marginHorizontal: 8}}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            itemSeparator={true}
            style={{
              backgroundColor: colors.lightGray,
              height: 40,
              borderColor: colors.lightGray,
            }}
            dropDownContainerStyle={{
              backgroundColor: colors.lightGray,
              borderColor: colors.lightGray,
            }}
            textStyle={{
              fontFamily: 'IBMPlexSerif-SemiBoldItalic',
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 14,
            fontFamily: 'IBMPlexSerif-SemiBoldItalic',
            marginHorizontal: 8,
            marginTop: 20,
          }}>
          {strings.url}
        </Text>
        <TextInput
          style={{
            backgroundColor: colors.lightGray,
            marginHorizontal: 8,
            marginTop: 4,
            height: 40,
            borderRadius: 4,
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
            onPress={toggleModal}>
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
            onPress={toggleModal}>
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

export default AddClip;
