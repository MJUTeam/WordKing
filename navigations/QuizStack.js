import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContentRoutes } from './routes';
import MeanQuizScreen from '../screens/MeanQuizScreen';
import WordQuizScreen from '../screens/WordQuizScreen';
import SelectQuizScreen from '../screens/SelectQuizScreen';
import { GRAY, PRIMARY } from '../colors';
import QuizScreen from '../screens/QuizScreen';

const Stack = createNativeStackNavigator();

const QuizStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY.DARK,
        tabBarInactiveTintColor: GRAY.DARK,
      }}
      initialRouteName={ContentRoutes.Quiz.name}
    >
      <Stack.Screen name={ContentRoutes.Quiz.name} component={QuizScreen} />
      <Stack.Screen name={ContentRoutes.SelectQuiz.name} component={SelectQuizScreen} />
      <Stack.Screen name={ContentRoutes.MeanQuiz.name} component={MeanQuizScreen} />
      <Stack.Screen name={ContentRoutes.WordQuiz.name} component={WordQuizScreen} />
    </Stack.Navigator>
  );
};
export default QuizStack;
