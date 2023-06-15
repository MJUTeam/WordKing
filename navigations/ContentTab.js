import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookShelfScreen from '../screens/BookShelfScreen';
import CalenderScreen from '../screens/CalenderScreen';
import CreateWordScreen from '../screens/CreateWordScreen';
import QuizScreen from '../screens/QuizScreen';
import SettingScreen from '../screens/SettingScreen';
import { ContentRoutes } from './routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GRAY, PRIMARY } from '../colors';
import WordQuizScreen from '../screens/WordQuizScreen';
import QuizStack from './QuizStack';
const Tab = createBottomTabNavigator();

const getTabBarIcon = ({ focused, color, size, name }) => {
  const iconName = focused ? name : `${name}-outline`;
  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
};

const ContentTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY.DARK,
        tabBarInactiveTintColor: GRAY.DARK,
      }}
      initialRouteName={ContentRoutes.CreateWord.name}
    >
      <Tab.Screen
        name={ContentRoutes.CreateWord.name}
        component={CreateWordScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'book' }),
          tabBarLabel: ContentRoutes.CreateWord.label,
        }}
      />
      <Tab.Screen
        name={ContentRoutes.BookShelf.name}
        component={BookShelfScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'folder' }),
          tabBarLabel: ContentRoutes.BookShelf.label,
        }}
      />
      <Tab.Screen
        name={ContentRoutes.Quiz.name}
        component={QuizStack}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'chat-question' }),
          tabBarLabel: ContentRoutes.Quiz.label,
        }}
      />
      <Tab.Screen
        name={ContentRoutes.Calender.name}
        component={CalenderScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'calendar' }),
          tabBarLabel: ContentRoutes.Calender.label,
        }}
      />
      <Tab.Screen
        name={ContentRoutes.Setting.name}
        component={SettingScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'cog' }),
          tabBarLabel: ContentRoutes.Setting.label,
        }}
      />
    </Tab.Navigator>
  );
};

export default ContentTab;
