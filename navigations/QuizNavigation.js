import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import QuizStack from './QuizStack';

const QuizNavigation = () => {
  return (
    <NavigationContainer>
      <QuizStack />
    </NavigationContainer>
  );
};

export default QuizNavigation;
