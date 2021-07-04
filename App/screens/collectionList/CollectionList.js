import React, {useLayoutEffect, useReducer, useEffect, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Alert,
  SectionList,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import colors from '../../constants/colors';
import Fab from '../../components/Fab';
import FabMenu from '../../components/FabMenu';
import HeaderButtons from '../../components/HeaderButtons';
import R from 'ramda';
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
import Toast from 'react-native-simple-toast';

import {
  addCollection,
  getCollections,
  addClip,
  deleteClip,
  updateClip,
  updateCollection,
} from '../../data/localStorage';
import strings from '../../constants/strings';
import {ClippyContext} from '../../util/ClippyContext';
import actionTypes from '../../constants/actionTypes';
import {collectionReducer} from './collectionReducer';

const Collections = ({route, navigation}) => {
  const item = route.params;

  let collectionName = '';

  const [state, dispatch] = useReducer(collectionReducer, {
    collectionsList: [],
    clipsList: [],
    isModalVisible: false,
    selectedItem: {},
    fabClicked: false,
    modalType: false,
    isSubModalVisible: false,
    editValue: false,
    editCollectionValue: false,
    showLoading: false,
  });

  const {changingCollectionName, setChangingCollectionName} =
    useContext(ClippyContext);

  const toggleModal = () => {
    dispatch({
      type: actionTypes.CHANGE_IS_MODAL_VISIBLE_CLIP,
      payload: !state.isModalVisible,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons
          onEditClick={() => {
            dispatch({
              type: actionTypes.CHANGE_MODAL_TYPE_CLIP,
              payload: false,
            });

            dispatch({
              type: actionTypes.CHANGE_EDIT_COLLECTION_VALUE,
              payload: true,
            });
            toggleSubModal();
          }}
          onDeleteClick={() => removeCollectionAlert()}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getClipsList(changingCollectionName);
    getCollectionList();
  }, []);

  const toggleSubModal = () => {
    dispatch({
      type: actionTypes.CHANGE_IS_SUB_MODAL_VISIBLE_CLIP,
      payload: !state.isSubModalVisible,
    });
  };

  const addNewCollection = async () => {
    try {
      if (collectionName !== '') {
        const addResult = await addCollection(collectionName);
        const result = await getCollections();

        dispatch({
          type: actionTypes.CHANGE_COLLECTION_LIST_CLIP,
          payload: result,
        });

        dispatch({
          type: actionTypes.CHANGE_SHOW_LOADING_CLIP,
          payload: false,
        });
        Toast.show(addResult);
      }
    } catch (error) {
      Toast.show(strings.WRONG_ALERT);
      dispatch({
        type: actionTypes.CHANGE_SHOW_LOADING_CLIP,
        payload: false,
      });
    }
  };

  const addNewClip = async (url, name) => {
    try {
      await addClip(url, name, item.id);
      getClipsList(changingCollectionName);
    } catch (error) {
      Toast.show(strings.WRONG_ALERT);
      dispatch({
        type: actionTypes.CHANGE_SHOW_LOADING_CLIP,
        payload: false,
      });
    }
  };

  const updateSelectedClip = async (url, name) => {
    try {
      const obj = state.collectionsList.find(o => o.Name === name);
      await updateClip(url, name, state.selectedItem.id, obj.id);
      getClipsList(changingCollectionName);
    } catch (error) {
      Toast.show(strings.WRONG_ALERT);
      dispatch({
        type: actionTypes.CHANGE_SHOW_LOADING_CLIP,
        payload: false,
      });
    }
  };

  const updateCurrentCollection = async newName => {
    try {
      setChangingCollectionName(newName);
      await updateCollection(newName, item.Name, item.id);
      getClipsList(newName);
    } catch (error) {
      Toast.show(strings.WRONG_ALERT);
      dispatch({
        type: actionTypes.CHANGE_SHOW_LOADING_CLIP,
        payload: false,
      });
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
      await deleteClip(name, url, state.selectedItem.id);
      getClipsList(changingCollectionName);
    } catch (error) {
      Toast.show(strings.WRONG_ALERT);
      dispatch({
        type: actionTypes.CHANGE_SHOW_LOADING_CLIP,
        payload: false,
      });
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
      await deleteCollection(item.id, item.Name);

      dispatch({
        type: actionTypes.CHANGE_SHOW_LOADING_CLIP,
        payload: false,
      });
      navigation.goBack();
    } catch (error) {
      Toast.show(strings.WRONG_ALERT);
      dispatch({
        type: actionTypes.CHANGE_SHOW_LOADING_CLIP,
        payload: false,
      });
    }
  };

  const changeRead = async url => {
    try {
      const result = await changeClipRead(url, state.selectedItem.id);
      getClipsList(changingCollectionName);
      Toast.show(result);
    } catch (error) {
      Toast.show(strings.WRONG_ALERT);
      dispatch({
        type: actionTypes.CHANGE_SHOW_LOADING_CLIP,
        payload: false,
      });
    }
  };

  const getCollectionList = async () => {
    try {
      const result = await getCollections();

      dispatch({
        type: actionTypes.CHANGE_COLLECTION_LIST_CLIP,
        payload: result,
      });

      dispatch({
        type: actionTypes.CHANGE_SHOW_LOADING_CLIP,
        payload: false,
      });
    } catch (error) {
      Toast.show(strings.WRONG_ALERT);
      dispatch({
        type: actionTypes.CHANGE_SHOW_LOADING_CLIP,
        payload: false,
      });
    }
  };

  const getClipsList = async name => {
    try {
      const res = await getClips(name);
      const groups = _(res)
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

      dispatch({
        type: actionTypes.CHANGE_CLIP_LIST,
        payload: groups,
      });

      dispatch({
        type: actionTypes.CHANGE_SHOW_LOADING_CLIP,
        payload: false,
      });
    } catch (error) {
      Toast.show(strings.WRONG_ALERT);
      dispatch({
        type: actionTypes.CHANGE_SHOW_LOADING_CLIP,
        payload: false,
      });
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
      <ActivityIndicator
        size="large"
        color={colors.appPrimary}
        style={styles.loading}
        animating={state.showLoading}
      />
      <SectionList
        sections={state.clipsList}
        keyExtractor={(item, index) => item + index}
        ListEmptyComponent={() => (
          <Text style={styles.emptyView}>
            No Clips to show. Use + button to add
          </Text>
        )}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => openLink(item.url)}
              onLongPress={() => {
                dispatch({
                  type: actionTypes.CHANGE_SELECTED_ITEM,
                  payload: item,
                });
                toggleModal();

                dispatch({
                  type: actionTypes.CHANGE_FAB_CLICKED,
                  payload: false,
                });
              }}>
              <View style={styles.sectionParent}>
                <Image
                  style={styles.sectionImage}
                  source={{
                    uri: item.icon,
                  }}
                  defaultSource={require('../../assets/images/globe.png')}
                />
                <Text style={styles.sectionText}>{`${item.title} - ${
                  item.siteName !== null ? item.siteName : ''
                }`}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <RowSeparator />}
        renderSectionHeader={({section: {title}}) =>
          title === '0' ? null : (
            <Text style={styles.header}>{strings.READ}</Text>
          )
        }
      />
      <View style={styles.fabParent}>
        <Fab
          onOpen={() => {
            toggleModal();

            dispatch({
              type: actionTypes.CHANGE_FAB_CLICKED,
              payload: true,
            });
          }}
        />
      </View>

      <Modal
        isVisible={state.isModalVisible}
        style={styles.clipModalStyle}
        coverScreen={false}
        onBackdropPress={() =>
          dispatch({
            type: actionTypes.CHANGE_IS_MODAL_VISIBLE_CLIP,
            payload: false,
          })
        }>
        {state.fabClicked ? (
          <FabMenu
            toggle={toggleModal}
            type={type => {
              dispatch({
                type: actionTypes.CHANGE_FAB_CLICKED,
                payload: false,
              });

              dispatch({
                type: actionTypes.CHANGE_IS_MODAL_VISIBLE_CLIP,
                payload: false,
              });

              dispatch({
                type: actionTypes.CHANGE_EDIT_VALUE,
                payload: false,
              });

              dispatch({
                type: actionTypes.CHANGE_EDIT_COLLECTION_VALUE,
                payload: false,
              });
              type === 'clip'
                ? dispatch({
                    type: actionTypes.CHANGE_MODAL_TYPE_CLIP,
                    payload: true,
                  })
                : dispatch({
                    type: actionTypes.CHANGE_MODAL_TYPE_CLIP,
                    payload: false,
                  });
              toggleSubModal();
            }}
          />
        ) : (
          <ClipItemMenu
            toggle={toggleModal}
            type={type => {
              switch (type) {
                case 'browser':
                  openLink(state.selectedItem.url);
                  break;
                case 'read':
                  changeRead(state.selectedItem.url);
                  break;
                case 'edit':
                  dispatch({
                    type: actionTypes.CHANGE_MODAL_TYPE_CLIP,
                    payload: true,
                  });

                  dispatch({
                    type: actionTypes.CHANGE_EDIT_VALUE,
                    payload: true,
                  });
                  toggleSubModal();
                  break;
                case 'delete':
                  removeClipAlert(
                    state.selectedItem.collectionName,
                    state.selectedItem.url,
                  );
                  break;
              }
            }}
          />
        )}
      </Modal>

      <Modal
        isVisible={state.isSubModalVisible}
        coverScreen={false}
        onBackdropPress={() =>
          dispatch({
            type: actionTypes.CHANGE_IS_SUB_MODAL_VISIBLE_CLIP,
            payload: false,
          })
        }
        // when fab menu is shown
        style={styles.showAddCollection}>
        {state.modalType ? (
          <AddClip
            toggle={toggleSubModal}
            collectionList={state.collectionsList}
            saveUrl={value => {
              dispatch({
                type: actionTypes.CHANGE_SHOW_LOADING_CLIP,
                payload: true,
              });
              state.editValue
                ? updateSelectedClip(value.url, value.collectionName)
                : addNewClip(value.url, value.collectionName);
            }}
            edit={state.editValue}
            collectionName={state.selectedItem.collectionName}
            clipName={state.selectedItem.url}
          />
        ) : (
          <AddCollection
            toggle={toggleSubModal}
            collection={name => {
              dispatch({
                type: actionTypes.CHANGE_SHOW_LOADING_CLIP,
                payload: true,
              });
              collectionName = name;
              state.editCollectionValue
                ? updateCurrentCollection(name)
                : addNewCollection();
            }}
            edit={state.editCollectionValue}
            name={item.Name}
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
    left: 0,
    right: 0,
    bottom: 100,
    justifyContent: 'center',
  },
  sectionText: {
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'IBMPlexSerif-SemiBoldItalic',
    flexShrink: 1,
  },
  sectionImage: {width: 42, height: 42, marginHorizontal: 18},
  sectionParent: {flexDirection: 'row', padding: 8},
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
