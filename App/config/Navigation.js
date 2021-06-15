import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home/Home';
import CollectionList from '../screens/collectionList/CollectionList';
import strings from '../constants/strings';
import screenNames from '../constants/screenNames';
import colors from '../constants/colors';
import {ClippyContextProvider} from '../util/ClippyContext';

const MainStack = createStackNavigator();
const MainStackScreen = () => (
  <NavigationContainer>
    <ClippyContextProvider>
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
          }}
        />
      </MainStack.Navigator>
    </ClippyContextProvider>
  </NavigationContainer>
);

export default MainStackScreen;
