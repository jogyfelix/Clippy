import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Alert,
  SectionList,
  Image,
} from 'react-native';
import colors from '../../constants/colors';
import Fab from '../../components/Fab';
import HeaderButtons from '../../components/HeaderButtons';
import _ from 'lodash';
import {deleteCollection, getClips} from '../../data/localStorage';

import {TouchableOpacity} from 'react-native-gesture-handler';

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
      const result = await getClips(item.Name);
      const groups = _(result)
        .groupBy('Read')
        .map((details, title) => {
          const data = details.map(detail => ({
            title: detail.Title,
            siteName: detail.SiteName,
            icon: detail.ThumbIcon,
          }));
          return {
            title,
            data,
          };
        })
        .value();

      setClipsList(groups);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.homeParent}>
      <StatusBar backgroundColor={colors.appPrimary} barStyle="light-content" />
      <SectionList
        sections={clipsList}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => {
          return (
            <TouchableOpacity>
              <View>
                <Image
                  style={{width: 50, height: 50}}
                  source={{
                    uri: item.icon,
                  }}
                />
                <Text>{item.title}</Text>
                <Text>{item.siteName}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
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
