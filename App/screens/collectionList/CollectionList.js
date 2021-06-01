import React, {useLayoutEffect, useState, useEffect} from 'react';
import {Text, StyleSheet, View, StatusBar, Alert} from 'react-native';
import colors from '../../constants/colors';
import Fab from '../../components/Fab';
import HeaderButtons from '../../components/HeaderButtons';

import {deleteCollection, getClips} from '../../data/localStorage';

const Collections = ({route, navigation}) => {
  const item = route.params;

  const [clipsList, setClipsList] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons
          onEditClick={() => alert('edit clicked')}
          onDeleteClick={() => removeCollectionAlert()}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getClipsList();
    console.log(clipsList);
  }, []);

  const removeCollectionAlert = () => {
    Alert.alert('Alert', 'Are you sure you want to delete the collection ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          removeCollection();
        },
        style: 'cancel',
      },
    ]);
  };

  const removeCollection = async () => {
    try {
      const result = await deleteCollection(item.id, item.Name);
      console.log(result);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const getClipsList = async () => {
    try {
      const result = await getClips();
      setClipsList(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.homeParent}>
      <StatusBar backgroundColor={colors.appPrimary} barStyle="light-content" />
      <View style={styles.fabParent}>
        <Fab onOpen={() => alert('clicked')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeParent: {
    flex: 1,
  },
  fabParent: {
    position: 'absolute',
    bottom: 18,
    right: 16,
    alignSelf: 'flex-end',
  },
});

export default Collections;
