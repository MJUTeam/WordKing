import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { GRAY, PRIMARY } from '../colors';
import { ContentRoutes } from './routes';
import LoginScreen from '../screens/LoginScreen';
import SettingScreen from '../screens/SettingScreen';
import Navigation from '../navigations/Navigation';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: PRIMARY.DARK,
          tabBarInactiveTintColor: GRAY.DARK,
        }}
        initialRouteName={ContentRoutes.Login.name}
      >      
        <Stack.Screen name={ContentRoutes.Login.name} component={LoginScreen}/>
        <Stack.Screen name={ContentRoutes.Main.name} component={Navigation}/>
    </Stack.Navigator>
    );
};

export default LoginStack;