import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button, StyleSheet } from 'react-native';

const SelectQuizStartScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> 1번 문제 </Text>
      <Button title="QWER" onPress={() => correctClick(AsyncStorage.getItem)} />
    </View>
  );
};

// 버튼 입력 값과 실제 값 비교 -> 정답률 계산
const correctClick = (answer) => {
  if (answer.korean == sentence.korean) {
    setGoal(goal + 1);
  } else {
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {},
});

export default SelectQuizStartScreen;
