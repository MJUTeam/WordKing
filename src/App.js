import React from 'react';
import { StatusBar } from 'expo-status-bar';
import LoginNavigation from '../navigations/LoginNavigation';

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <LoginNavigation />
    </>
  );
};

export default App;
