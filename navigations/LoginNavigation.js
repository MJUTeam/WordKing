import React, {useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginStack from './LoginStack';
import {initFirebase} from '../api/firebase';

const LoginNavigation = () => {
  const [isReady,setIsReady] = useState(false);
  
  useEffect(()=>{(async () =>{
      try{const app = initFirebase();
      }catch(e){console.log(e)}finally{ setIsReady(true);}})();
  },[]);

  return (
    <NavigationContainer independent={true}>
      <LoginStack />
    </NavigationContainer>
  );
};

export default LoginNavigation;

