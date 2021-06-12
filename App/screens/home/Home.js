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
import AddClip from '../../components/AddClip';
import {RowItem, RowSeparator, RowFooter} from '../../components/RowItem';
import _ from 'lodash';
import {
  addCollection,
  getCollectionsHome,
  addClip,
} from '../../data/localStorage';
import FabMenu from '../../components/FabMenu';

const Home = ({navigation}) => {
  let collectionName = '';
  const [collectionCount, setCollectionCount] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSubModalVisible, setSubModalVisible] = useState(false);
  const [collectionsList, setCollectionsList] = useState([]);
  const [modalType, setModalType] = useState(false);
  const [childClips, setChildClips] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSubModal = () => {
    setSubModalVisible(!isSubModalVisible);
  };

  const addNewCollection = async () => {
    try {
      if (collectionName !== '') {
        const addResult = await addCollection(collectionName);
        console.log(addResult);
        getCollectionList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNewClip = async (url, name) => {
    try {
      const addResult = await addClip(url, name, collectionsList.CollectionId);
      console.log(addResult);
    } catch (error) {
      console.log(error);
    }
  };

  const getCollectionList = async () => {
    try {
      const result = await getCollectionsHome();
      console.log(result);
      const groups = _(result)
        .groupBy('Name')
        .map((details, title) => {
          const data = details
            .slice(0, 3)
            .map(o => o['Title'])
            .join('\n');
          const id = details[0].id;
          const Name = details[0].Name;
          return {
            title,
            data,
            id,
            Name,
          };
        })
        .value();
      console.log(groups);
      setCollectionsList(groups);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCollectionList();
    });

    return unsubscribe;
  }, [navigation]);

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
              name={item.item.title}
              clips={item.item.data === '' ? 'No clips!' : item.item.data}
              onPress={() =>
                navigation.push(screenNames.CollectionList, item.item)
              }
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
          <FabMenu
            toggle={toggleModal}
            type={type => {
              setModalVisible(false);
              type === 'clip' ? setModalType(true) : setModalType(false);
              toggleSubModal();
            }}
          />
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

      <Modal
        isVisible={isSubModalVisible}
        coverScreen={false}
        onBackdropPress={() => setSubModalVisible(false)}
        // when fab menu is shown
        style={styles.showAddCollection}>
        {modalType ? (
          <AddClip
            toggle={toggleSubModal}
            collectionList={collectionsList}
            saveUrl={value => {
              console.log(value);
              addNewClip(value.url, value.collectionName);
            }}
          />
        ) : (
          <AddCollection
            toggle={toggleSubModal}
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
