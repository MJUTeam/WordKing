import { NavigationContainer } from '@react-navigation/native';
import LoginStack from './LoginStack';

const LoginNavigation = () => {
  return (
    <NavigationContainer independent={true}>
      <LoginStack />
    </NavigationContainer>
  );
};

export default LoginNavigation;

