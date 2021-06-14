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
import Toast from 'react-native-simple-toast';

const AddCollection = ({toggle, collection, edit, name}) => {
  const [collectionName, setCollectionName] = useState('');

  useEffect(() => {
    if (edit) {
      setCollectionName(name);
    }
  }, []);

  return (
    <View>
      <View style={styles.topBar}>
        <Text style={styles.title}>
          {edit ? 'Update Collection' : strings.CREATE_COLLECTION}
        </Text>
      </View>
      <View style={styles.dialogParent}>
        <Text style={styles.collectionText}>{strings.COLLECTION_NAME}</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={collectionName}
          onChangeText={newText => setCollectionName(newText)}
          style={styles.collectionInput}
        />
        <View style={styles.buttonsParent}>
          <TouchableOpacity style={styles.cancelButton} onPress={toggle}>
            <Text style={styles.cancelText}>{strings.CANCEL}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => {
              if (collectionName !== '') {
                collection(collectionName);
                toggle();
              } else {
                Toast.show(strings.ERROR_ALERT);
              }
            }}>
            <Text style={styles.createText}>
              {edit ? 'Update' : strings.CREATE}
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
    height: 160,
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
  collectionInput: {
    backgroundColor: colors.lightGray,
    marginHorizontal: 8,
    marginTop: 4,
    height: 40,
    borderRadius: 4,
  },
  buttonsParent: {
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

export default AddCollection;
