import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ContentTab from './ContentTab';

const Navigation = () => {
  return (
    <NavigationContainer  independent={true}>
      <ContentTab />
    </NavigationContainer>
  );
};

export default Navigation;
