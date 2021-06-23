import React, {useEffect, useContext, useReducer} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Text,
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
import {ClippyContext} from '../../util/ClippyContext';
import actionTypes from '../../constants/actionTypes';
import {homeReducer} from './homeReducer';
import Toast from 'react-native-simple-toast';
import SplashScreen from 'react-native-splash-screen';

const Home = ({navigation}) => {
  let collectionName = '';

  const [state, dispatch] = useReducer(homeReducer, {
    collectionCount: false,
    isModalVisible: false,
    isSubModalVisible: false,
    collectionsList: [],
    modalType: false,
    showLoading: false,
  });

  const {changingCollectionName, setChangingCollectionName} =
    useContext(ClippyContext);

  const toggleModal = () => {
    dispatch({
      type: actionTypes.CHANGE_IS_MODAL_VISIBLE,
      payload: !state.isModalVisible,
    });
  };

  const toggleSubModal = () => {
    dispatch({
      type: actionTypes.CHANGE_IS_SUB_MODAL_VISIBLE,
      payload: !state.isSubModalVisible,
    });
  };

  const addNewCollection = async () => {
    try {
      if (collectionName !== '') {
        const addResult = await addCollection(collectionName);
        Toast.show(addResult);

        dispatch({type: actionTypes.CHANGE_SHOW_LOADING, payload: false});
        getCollectionList();
      }
    } catch (error) {
      Toast.show(strings.WRONG_ALERT);
      dispatch({type: actionTypes.CHANGE_SHOW_LOADING, payload: false});
    }
  };

  const addNewClip = async (url, name) => {
    try {
      const obj = state.collectionsList.find(o => o.Name === name);
      const addResult = await addClip(url, name, obj.id);
      Toast.show(addResult);
      getCollectionList();

      dispatch({type: actionTypes.CHANGE_SHOW_LOADING, payload: false});
    } catch (error) {
      Toast.show(strings.WRONG_ALERT);
      dispatch({type: actionTypes.CHANGE_SHOW_LOADING, payload: false});
    }
  };

  const getCollectionList = async () => {
    try {
      const result = await getCollectionsHome();
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
      dispatch({type: actionTypes.CHANGE_COLLECTION_LIST, payload: groups});

      dispatch({type: actionTypes.CHANGE_SHOW_LOADING, payload: false});
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCollectionList();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    if (state.collectionsList.length > 0) {
      dispatch({type: actionTypes.CHANGE_COLLECTION_COUNT, payload: true});
    } else {
      dispatch({type: actionTypes.CHANGE_COLLECTION_COUNT, payload: false});
    }
  }, [state.collectionsList.length]);

  return (
    <View style={styles.homeParent}>
      <StatusBar backgroundColor={colors.appPrimary} barStyle="light-content" />
      <ActivityIndicator
        size="large"
        color={colors.appPrimary}
        style={styles.loading}
        animating={state.showLoading}
      />
      <FlatList
        data={state.collectionsList}
        ListEmptyComponent={() => (
          <Text style={styles.emptyView}>
            No Clips! Start by creating a {'\n'}collection using the + button
          </Text>
        )}
        renderItem={item => {
          return (
            <RowItem
              name={item.item.title}
              clips={item.item.data === '' ? strings.NO_CLIPS : item.item.data}
              onPress={() => {
                setChangingCollectionName(item.item.Name);
                navigation.push(screenNames.CollectionList, item.item);
              }}
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
        isVisible={state.isModalVisible}
        coverScreen={false}
        onBackdropPress={() =>
          dispatch({type: actionTypes.CHANGE_IS_MODAL_VISIBLE, payload: false})
        }
        // when fab menu is shown
        style={[
          state.collectionCount ? styles.showFab : styles.showAddCollection,
        ]}>
        {state.collectionCount ? (
          <FabMenu
            toggle={toggleModal}
            type={type => {
              dispatch({
                type: actionTypes.CHANGE_IS_MODAL_VISIBLE,
                payload: false,
              });

              type === 'clip'
                ? dispatch({type: actionTypes.CHANGE_MODAL_TYPE, payload: true})
                : dispatch({
                    type: actionTypes.CHANGE_MODAL_TYPE,
                    payload: false,
                  });
              toggleSubModal();
            }}
          />
        ) : (
          <AddCollection
            toggle={toggleModal}
            collection={name => {
              collectionName = name;

              dispatch({type: actionTypes.CHANGE_SHOW_LOADING, payload: true});
              addNewCollection();
            }}
          />
        )}
      </Modal>

      <Modal
        isVisible={state.isSubModalVisible}
        coverScreen={false}
        onBackdropPress={() =>
          dispatch({
            type: actionTypes.CHANGE_IS_SUB_MODAL_VISIBLE,
            payload: !false,
          })
        }
        style={styles.showAddCollection}>
        {state.modalType ? (
          <AddClip
            toggle={toggleSubModal}
            collectionList={state.collectionsList}
            saveUrl={value => {
              dispatch({type: actionTypes.CHANGE_SHOW_LOADING, payload: true});
              addNewClip(value.url, value.collectionName);
            }}
          />
        ) : (
          <AddCollection
            toggle={toggleSubModal}
            collection={name => {
              collectionName = name;

              dispatch({type: actionTypes.CHANGE_SHOW_LOADING, payload: true});
              addNewCollection();
            }}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyView: {
    alignSelf: 'center',
    marginTop: '80%',
    fontSize: 14,
    fontFamily: 'IBMPlexSerif-SemiBoldItalic',
    color: 'gray',
  },
  loading: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
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
  showFab: {justifyContent: 'flex-end', margin: 0},
  showAddCollection: {},
});

export default Home;
