import { StyleSheet, View, Text } from 'react-native';

const QuizScreen = () => {
  return (
    <View style={styles.container}>
      <Text>QuizScreen</Text>
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
