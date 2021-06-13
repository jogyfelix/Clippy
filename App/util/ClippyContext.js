import React, { createContext, useState } from 'react';

export const ClippyContext = createContext();

export const ClippyContextProvider = ({ children }) => {
    const [changingCollectionName, setChangingCollectionName] =  useState('');

 
  const contextValue = {
    changingCollectionName,
    setChangingCollectionName,
  };

  return (
    <ClippyContext.Provider value={contextValue}>
      {children}
    </ClippyContext.Provider>
  );
};