import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../constants/colors';
import strings from '../constants/strings';

const AddCollection = ({toggle, collection}) => {
  const [collectionName, setCollectionName] = useState('');

  return (
    <View>
      <View style={styles.topBar}>
        <Text style={styles.title}>{strings.create_collection}</Text>
      </View>
      <View style={styles.dialogParent}>
        <Text style={styles.collectionText}>{strings.collection_name}</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={collectionName}
          onChangeText={newText => setCollectionName(newText)}
          style={styles.collectionInput}
        />
        <View style={styles.buttonsParent}>
          <TouchableOpacity style={styles.cancelButton} onPress={toggle}>
            <Text style={styles.cancelText}>{strings.cancel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => {
              collection(collectionName);
              toggle();
            }}>
            <Text style={styles.createText}>{strings.create}</Text>
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
