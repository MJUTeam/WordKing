import { StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';
import { ContentRoutes } from '../navigations/routes';

const QuizScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>QuizScreen</Text>
      <Button
        title={ContentRoutes.SelectQuiz.label}
        onPress={() => navigation.navigate('SelectQuiz')}
      />
      <Button
        title={ContentRoutes.MeanQuiz.label}
        onPress={() => navigation.navigate('MeanQuiz')}
      />
      <Button
        title={ContentRoutes.WordQuiz.label}
        onPress={() => navigation.navigate('WordQuiz')}
      />
      <Button
        title={ContentRoutes.SpeedQuiz.label}
        onPress={() => navigation.navigate('SpeedQuiz')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QuizScreen;
