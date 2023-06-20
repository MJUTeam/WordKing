import { StyleSheet, View, Text } from 'react-native';
import { ContentRoutes } from '../navigations/routes';
import IconTitleButton from '../components/IconTitleButton';

const QuizScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <IconTitleButton
        title={ContentRoutes.SelectQuiz.label}
        size={40}
        onPress={() =>
          navigation.navigate('BookShelfSelect', { quizType: ContentRoutes.SelectQuiz.name })
        }
        iconName={'format-list-numbered'}
      />
      <IconTitleButton
        title={ContentRoutes.MeanQuiz.label}
        size={40}
        onPress={() =>
          navigation.navigate('BookShelfSelect', { quizType: ContentRoutes.MeanQuiz.name })
        }
        iconName={'alpha-k-box-outline'}
      />
      <IconTitleButton
        title={ContentRoutes.WordQuiz.label}
        size={40}
        onPress={() =>
          navigation.navigate('BookShelfSelect', { quizType: ContentRoutes.WordQuiz.name })
        }
        iconName={'alpha-e-box-outline'}
      />
      <IconTitleButton
        title={ContentRoutes.SpeedQuiz.label}
        size={40}
        onPress={() =>
          navigation.navigate('BookShelfSelect', { quizType: ContentRoutes.SpeedQuiz.name })
        }
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
