import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/home/Home';
import CollectionList from '../screens/collectionList/CollectionList';
import strings from '../constants/strings';
import screenNames from '../constants/screenNames';
import colors from '../constants/colors';
import HeaderButtons from '../components/headerButtons';

const MainStack = createStackNavigator();
const MainStackScreen = () => (
  <NavigationContainer>
    <MainStack.Navigator
    // initialRouteName={screenNames.CollectionList}
    >
      <MainStack.Screen
        name={screenNames.Home}
        component={Home}
        options={{
          title: strings.APP_NAME,
          headerStyle: {
            backgroundColor: colors.appPrimary,
          },
          headerTintColor: colors.white,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'IBMPlexSerif-SemiBoldItalic',
          },
        }}
      />

      <MainStack.Screen
        name={screenNames.CollectionList}
        component={CollectionList}
        options={{
          title: strings.APP_NAME,
          headerStyle: {
            backgroundColor: colors.appPrimary,
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.white,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'IBMPlexSerif-SemiBoldItalic',
          },
          headerRight: () => (
            <HeaderButtons
              onEditClick={() => alert('edit clicked')}
              onDeleteClick={() => alert('delete clicked')}
            />
          ),
        }}
      />
    </MainStack.Navigator>
  </NavigationContainer>
);

export default MainStackScreen;
