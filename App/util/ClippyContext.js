import React, {createContext, useState} from 'react';
import {Linking, Alert} from 'react-native';
import strings from '../constants/strings';

export const ClippyContext = createContext();

export const ClippyContextProvider = ({children}) => {
  const [changingCollectionName, setChangingCollectionName] = useState('');

  const openLink = url => {
    Linking.openURL(url).catch(() =>
      Alert.alert(strings.ERROR_1, strings.TRY_AGAIN),
    );
  };

  const contextValue = {
    changingCollectionName,
    setChangingCollectionName,
    openLink,
  };

  return (
    <ClippyContext.Provider value={contextValue}>
      {children}
    </ClippyContext.Provider>
  );
};
