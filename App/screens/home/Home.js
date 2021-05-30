import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import colors from '../../constants/colors';
import Fab from '../../components/Fab';
import screenNames from '../../constants/screenNames';
import strings from '../../constants/strings';
import Modal from 'react-native-modal';
import AddCollection from '../../components/AddCollection';
import {RowItem, RowSeparator, RowFooter} from '../../components/RowItem';

import {addCollection, getCollections} from '../../data/localStorage';
import FabMenu from '../../components/FabMenu';

const Home = ({navigation}) => {
  let collectionName = '';
  const [collectionCount, setCollectionCount] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [collectionsList, setCollectionsList] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addNewCollection = async () => {
    try {
      if (collectionName !== '') {
        const addResult = await addCollection(collectionName);
        console.log(addResult);
        const result = await getCollections();
        setCollectionsList(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCollectionList = async () => {
    try {
      const result = await getCollections();
      setCollectionsList(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCollectionList();
  }, []);

  useEffect(() => {
    if (collectionsList.length > 0) {
      setCollectionCount(true);
    } else {
      setCollectionCount(false);
    }
  }, [collectionsList.length]);

  return (
    <View style={styles.homeParent}>
      <StatusBar backgroundColor={colors.appPrimary} barStyle="light-content" />

      <FlatList
        data={collectionsList}
        renderItem={item => {
          return (
            <RowItem
              name={item.item.Name}
              clips="No clips!"
              onPress={() => navigation.push(screenNames.CollectionList)}
            />
          );
        }}
        ItemSeparatorComponent={() => <RowSeparator />}
        ListFooterComponent={() => <RowFooter />}
        keyExtractor={item => item.id}
      />

      <View style={styles.fabParent}>
        <Fab onOpen={toggleModal} />
      </View>
      <Modal
        isVisible={isModalVisible}
        coverScreen={false}
        onBackdropPress={() => setModalVisible(false)}
        // when fab menu is shown
        style={[collectionCount ? styles.showFab : styles.showAddCollection]}>
        {collectionCount ? (
          <FabMenu toggle={toggleModal} />
        ) : (
          <AddCollection
            toggle={toggleModal}
            collection={name => {
              collectionName = name;
              addNewCollection();
            }}
          />
        )}
      </Modal>
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
  showFab: {justifyContent: 'flex-end', margin: 0},
  showAddCollection: {},
});

export default Home;
