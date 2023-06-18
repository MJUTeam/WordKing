import { StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';
import { ContentRoutes } from '../navigations/routes';
import IconTitleButton from '../components/IconTitleButton';

const QuizScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>QuizScreen</Text>
      <IconTitleButton
        title={ContentRoutes.SelectQuiz.label}
        size={40}
        onPress={() => navigation.navigate('SelectQuiz')}
        iconName={'format-list-numbered'}
      />
      <IconTitleButton
        title={ContentRoutes.MeanQuiz.label}
        size={40}
        onPress={() => navigation.navigate('MeanQuiz')}
        iconName={'alpha-k-box-outline'}
      />
      <IconTitleButton
        title={ContentRoutes.WordQuiz.label}
        size={40}
        onPress={() => navigation.navigate('WordQuiz')}
        iconName={'alpha-e-box-outline'}
      />
      <IconTitleButton
        title={ContentRoutes.SpeedQuiz.label}
        size={40}
        onPress={() => navigation.navigate('SpeedQuiz')}
        iconName={'timer-outline'}
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
