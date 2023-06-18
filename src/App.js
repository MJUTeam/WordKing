import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import LoginNavigation from '../navigations/LoginNavigation';

const App = () => {
  LogBox.ignoreLogs([
    'AsyncStorage has been extracted from react-native core',
  ]);

  return (
    <>
      <StatusBar style="dark" />
      <LoginNavigation />
    </>
  );
};

export default App;
