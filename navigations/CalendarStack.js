import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContentRoutes } from './routes';
import { GRAY, PRIMARY } from '../colors';
import CalendarScreen from '../screens/CalendarScreen';
import WordDetailScreen from '../screens/WordDetailScreen';

const Stack = createNativeStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY.DARK,
        tabBarInactiveTintColor: GRAY.DARK,
      }}
      initialRouteName={ContentRoutes.Calendar.name}
    >
      <Stack.Screen name={ContentRoutes.Calendar.name} component={CalendarScreen} />
      <Stack.Screen name={ContentRoutes.WordDetail.name} component={WordDetailScreen} />
    </Stack.Navigator>
  );
};
export default CalendarStack;
