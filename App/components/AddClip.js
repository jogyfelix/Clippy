import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../constants/colors';
import strings from '../constants/strings';
import DropDownPicker from 'react-native-dropdown-picker';

const AddClip = ({
  toggle,
  collectionList,
  saveUrl,
  edit,
  collectionName,
  clipName,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [urlName, setUrlName] = useState('');

  const collections = collectionList.map(currentValue => {
    const list = {
      label: currentValue.Name,
      value: currentValue.Name,
    };
    return list;
  });

  useEffect(() => {
    if (edit) {
      setUrlName(clipName);
      setValue(collectionName);
    }
  }, []);

  return (
    <View>
      <View style={styles.topBar}>
        <Text style={styles.title}>
          {edit ? strings.update_clip : strings.CREATE_CLIP}
        </Text>
      </View>
      <View style={styles.dialogParent}>
        <Text style={styles.collectionText}>{strings.COLLECTION}</Text>
        <View style={styles.dropDownParent}>
          <DropDownPicker
            open={open}
            value={value}
            items={collections}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.dropDown}
            dropDownContainerStyle={styles.dropDownContainer}
            textStyle={styles.dropDownText}
          />
        </View>

        <Text style={styles.urlTitle}>{strings.URL}</Text>
        <TextInput
          style={styles.urlInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={urlName}
          onChangeText={newText => setUrlName(newText)}
        />
        <View style={styles.buttonParent}>
          <TouchableOpacity style={styles.cancelButton} onPress={toggle}>
            <Text style={styles.cancelText}>{strings.CANCEL}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => {
              console.log(value);
              saveUrl({
                url: urlName,
                collectionName: value,
              });

              toggle();
            }}>
            <Text style={styles.createText}>
              {edit ? strings.UPDATE : strings.CREATE}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: colors.appPrimary,
    height: 48,
    borderTopLeftRadius: 4,
    borderTopEndRadius: 4,
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'IBMPlexSerif-SemiBoldItalic',
    alignSelf: 'center',
    marginTop: 12,
  },
  dialogParent: {
    height: 240,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
    borderBottomEndRadius: 4,
  },
  collectionText: {
    fontSize: 14,
    fontFamily: 'IBMPlexSerif-SemiBoldItalic',
    marginHorizontal: 8,
    marginTop: 20,
  },
  dropDownParent: {marginTop: 4, marginHorizontal: 8},
  dropDown: {
    backgroundColor: colors.lightGray,
    height: 40,
    borderColor: colors.lightGray,
  },
  dropDownText: {
    fontFamily: 'IBMPlexSerif-SemiBoldItalic',
  },
  dropDownContainer: {
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
  },
  urlTitle: {
    fontSize: 14,
    fontFamily: 'IBMPlexSerif-SemiBoldItalic',
    marginHorizontal: 8,
    marginTop: 20,
  },
  urlInput: {
    backgroundColor: colors.lightGray,
    marginHorizontal: 8,
    marginTop: 4,
    height: 40,
    borderRadius: 4,
  },
  buttonParent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 8,
    marginTop: 20,
    marginBottom: 16,
  },
  cancelButton: {
    borderColor: colors.secondaryColor,
    borderWidth: 1,
    flex: 1,
    height: 34,
    borderRadius: 4,
  },
  cancelText: {
    alignSelf: 'center',
    marginTop: 6,
    fontFamily: 'IBMPlexSerif-SemiBoldItalic',
    color: colors.secondaryColor,
  },
  createButton: {
    backgroundColor: colors.secondaryColor,
    flex: 1,
    marginLeft: 8,
    borderRadius: 4,
  },
  createText: {
    alignSelf: 'center',
    marginTop: 6,
    fontFamily: 'IBMPlexSerif-SemiBoldItalic',
    color: colors.white,
  },
});

export default AddClip;
