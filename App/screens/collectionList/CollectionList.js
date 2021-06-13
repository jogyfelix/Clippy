import React, {useLayoutEffect, useState, useEffect, useCallback} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Alert,
  SectionList,
  Image,
  Linking,
  ActivityIndicator
} from 'react-native';
import colors from '../../constants/colors';
import Fab from '../../components/Fab';
import FabMenu from '../../components/FabMenu';
import HeaderButtons from '../../components/HeaderButtons';
import _ from 'lodash';
import {
  deleteCollection,
  getClips,
  changeClipRead,
} from '../../data/localStorage';
import Modal from 'react-native-modal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RowSeparator} from '../../components/RowItem';
import ClipItemMenu from '../../components/ClipItemMenu';
import AddCollection from '../../components/AddCollection';
import AddClip from '../../components/AddClip';

import {
  addCollection,
  getCollections,
  addClip,
  deleteClip,
  updateClip,
  updateCollection,
} from '../../data/localStorage';
import strings from '../../constants/strings';

const Collections = ({route, navigation}) => {
  const item = route.params;

  let collectionName = '';
  const [collectionsList, setCollectionsList] = useState([]);
  const [clipsList, setClipsList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [fabClicked, setFabClicked] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [isSubModalVisible, setSubModalVisible] = useState(false);
  const [editValue, setEditValue] = useState(false);
  const [editCollectionValue, setEditCollectionValue] = useState(false);
  const [showLoading, setShowLoading] =  useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons
          onEditClick={() => {
            setModalType(false);
            setEditCollectionValue(true);
            toggleSubModal();
          }}
          onDeleteClick={() => removeCollectionAlert()}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getClipsList(item.Name);
    getCollectionList();
  }, []);

  const toggleSubModal = () => {
    setSubModalVisible(!isSubModalVisible);
  };

  const addNewCollection = async () => {
    try {
      if (collectionName !== '') {
        const addResult = await addCollection(collectionName);
        console.log(addResult);
        const result = await getCollections();
        setCollectionsList(result);
        setShowLoading(false)
      }
    } catch (error) {
      console.log(error);
      setShowLoading(false)
    }
  };

  const addNewClip = async (url, name) => {
    try {
      const addResult = await addClip(url, name, item.id);
      console.log(addResult);
      getClipsList(item.Name);
      setShowLoading(false)
    } catch (error) {
      console.log(error);
      setShowLoading(false)
    }
  };

  const updateSelectedClip = async (url, name) => {
    const obj = collectionsList.find(o => o.Name === name);
    try {
      const addResult = await updateClip(url, name, selectedItem.id, obj.id);
      console.log(addResult);
      getClipsList(item.Name);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCurrentCollection = async newName => {
    try {
      const addResult = await updateCollection(newName, item.Name, item.id);
      console.log(addResult);
      getClipsList(newName);
    } catch (error) {
      console.log(error);
    }
  };

  const removeClipAlert = (collName, url) => {
    Alert.alert(strings.ALERT, strings.DELETE_ALERT, [
      {
        text: strings.CANCEL,
        style: 'cancel',
      },
      {
        text: strings.OK,
        onPress: () => {
          removeClip(collName, url);
        },
        style: 'cancel',
      },
    ]);
  };

  const removeClip = async (name, url) => {
    try {
      const addResult = await deleteClip(name, url, selectedItem.id);
      console.log(addResult);
      getClipsList(item.Name);
    } catch (error) {
      console.log(error);
    }
  };

  const removeCollectionAlert = () => {
    Alert.alert(strings.ALERT, strings.DELETE_COLLECTION_ALERT, [
      {
        text: strings.CANCEL,
        style: 'cancel',
      },
      {
        text: strings.OK,
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
      setShowLoading(false)
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setShowLoading(false)
    }
  };

  const changeRead = async url => {
    try {
      const result = await changeClipRead(url, selectedItem.id);
      getClipsList(item.Name);
      setShowLoading(false)
      console.log(result);
    } catch (error) {
      console.log(error);
      setShowLoading(false)
    }
  };

  const getCollectionList = async () => {
    try {
      const result = await getCollections();
      setCollectionsList(result);
      setShowLoading(false)
    } catch (error) {
      console.log(error);
      setShowLoading(false)
    }
  };

  const getClipsList = async name => {
    try {
      const result = await getClips(name);
      const groups = _(result)
        .groupBy('Read')
        .map((details, title) => {
          const data = details.map(detail => ({
            title: detail.Title,
            siteName: detail.SiteName,
            icon: detail.ThumbIcon,
            url: detail.Url,
            collectionName: detail.CollectionName,
            id: detail.id,
          }));
          return {
            title,
            data,
          };
        })
        .value();

      setClipsList(groups);
      setShowLoading(false)
    } catch (error) {
      console.log(error);
      setShowLoading(false)
    }
  };

  const openLink = url => {
    Linking.openURL(url).catch(() =>
      Alert.alert(strings.ERROR_1, strings.TRY_AGAIN),
    );
  };

  return (
    <View style={styles.homeParent}>
      <StatusBar backgroundColor={colors.appPrimary} barStyle="light-content" />
      <ActivityIndicator size="large" color={colors.appPrimary}
       style={styles.loading} animating={showLoading} />
      <SectionList
        sections={clipsList}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => openLink(item.url)}
              onLongPress={() => {
                setSelectedItem(item);
                toggleModal();
                setFabClicked(false);
              }}>
              <View style={styles.sectionParent}>
                <Image
                  style={styles.sectionImage}
                  source={{
                    uri: item.icon,
                  }}
                  defaultSource={require('../../assets/images/globe.png')}
                />
                <Text
                  style={styles.sectionText}>{`${item.title} - ${item.siteName}`}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <RowSeparator />}
        renderSectionHeader={({section: {title}}) =>
          title === '0' ? null : <Text style={styles.header}>{strings.READ}</Text>
        }
      />
      <View style={styles.fabParent}>
        <Fab
          onOpen={() => {
            toggleModal();
            setFabClicked(true);
          }}
        />
      </View>

      <Modal
        isVisible={isModalVisible}
        style={styles.clipModalStyle}
        onBackdropPress={() => setModalVisible(false)}>
        {fabClicked ? (
          <FabMenu
            toggle={toggleModal}
            type={type => {
              setFabClicked(false);
              setModalVisible(false);
              setEditValue(false);
              setEditCollectionValue(false);
              type === 'clip' ? setModalType(true) : setModalType(false);
              toggleSubModal();
            }}
          />
        ) : (
          <ClipItemMenu
            toggle={toggleModal}
            type={type => {
              switch (type) {
                case 'browser':
                  openLink(selectedItem.url);
                  break;
                case 'read':
                  changeRead(selectedItem.url);
                  break;
                case 'edit':
                  setModalType(true);
                  setEditValue(true);
                  toggleSubModal();
                  break;
                case 'delete':
                  removeClipAlert(
                    selectedItem.collectionName,
                    selectedItem.url,
                  );
                  break;
              }
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
              editValue
                ? updateSelectedClip(value.url, value.collectionName)
                : addNewClip(value.url, value.collectionName);
            }}
            edit={editValue}
            collectionName={selectedItem.collectionName}
            clipName={selectedItem.url}
          />
        ) : (
          <AddCollection
            toggle={toggleSubModal}
            collection={name => {
              setShowLoading(true)
              collectionName = name;
              editCollectionValue
                ? updateCurrentCollection(name)
                : addNewCollection();
            }}
            edit={editCollectionValue}
            name={item.Name}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  loading:{position:'absolute',alignSelf:'center',top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'},
  sectionText:{
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'IBMPlexSerif-SemiBoldItalic',
    flexShrink: 1,
  },
  sectionImage:{width: 42, height: 42, marginHorizontal: 18},
  sectionParent:{flexDirection: 'row', padding: 8},
  clipModalStyle: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  homeParent: {
    flex: 1,
  },
  fabParent: {
    position: 'absolute',
    bottom: 18,
    right: 16,
    alignSelf: 'flex-end',
  },
  header: {
    alignSelf: 'center',
    fontFamily: 'IBMPlexSerif-SemiBoldItalic',
    color: 'gray',
    marginVertical: 10,
  },
});

export default Collections;

//TODO update function check collection
