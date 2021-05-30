import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';
import Fab from '../../components/Fab';
import screenNames from '../../constants/screenNames';
import strings from '../../constants/strings';
import Modal from 'react-native-modal';
import AddCollection from '../../components/AddCollection';
import {addCollection, getCollections} from '../../data/localStorage';

const Home = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  let collectionName = '';
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
        setCollectionsList(collectionsList);
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getList = async () => {
    try {
      const result = await getCollections();
      setCollectionsList(result);
      console.log(collectionsList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <View style={styles.homeParent}>
      <StatusBar backgroundColor={colors.appPrimary} barStyle="light-content" />
      <View style={styles.fabParent}>
        <Fab onOpen={toggleModal} />
      </View>
      <Modal
        isVisible={isModalVisible}
        coverScreen={false}
        onBackdropPress={() => setModalVisible(false)}
        // when fab menu is shown
        // style={{justifyContent: 'flex-end', margin: 0}}
      >
        <AddCollection
          toggle={toggleModal}
          collection={name => {
            collectionName = name;
            addNewCollection();
            // console.log(collectionsList);
          }}
        />
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
});

export default Home;
