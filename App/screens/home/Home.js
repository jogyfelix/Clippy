import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  ActivityIndicator
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
  const [showLoading, setShowLoading] =  useState(false);

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
        setShowLoading(false)
        getCollectionList();
      }
    } catch (error) {
      console.log(error);
      setShowLoading(false)
    }
  };

  const addNewClip = async (url, name) => {
    try {
      const obj = collectionsList.find(o => o.Name === name);
      const addResult = await addClip(url, name, obj.id);
      console.log(addResult);
      getCollectionList()
      setShowLoading(false)
    } catch (error) {
      console.log(error);
      setShowLoading(false)
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
      setShowLoading(false)
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
      <ActivityIndicator size="large" color={colors.appPrimary}
       style={styles.loading} animating={showLoading} />
      <FlatList
        data={collectionsList}
        renderItem={item => {
          return (
            <RowItem
              name={item.item.title}
              clips={item.item.data === '' ? strings.NO_CLIPS : item.item.data}
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
              setShowLoading(true)
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
             
              setShowLoading(true)
              addNewClip(value.url, value.collectionName);
            }}
          />
        ) : (
          <AddCollection
            toggle={toggleSubModal}
            collection={name => {
              collectionName = name;
              setShowLoading(true)
              addNewCollection();
            }}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  loading:{position:'absolute',alignSelf:'center',top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'},
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
