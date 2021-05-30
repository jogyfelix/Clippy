import React, {useLayoutEffect} from 'react';
import {Text, StyleSheet, View, StatusBar, Alert} from 'react-native';
import colors from '../../constants/colors';
import Fab from '../../components/Fab';
import HeaderButtons from '../../components/HeaderButtons';

import {deleteCollection} from '../../data/localStorage';

const Collections = ({route, navigation}) => {
  const item = route.params;

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
