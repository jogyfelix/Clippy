import React, {useState} from 'react';
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
import DropDownPicker from 'react-native-dropdown-picker';

const Home = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
      ></Modal>
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
