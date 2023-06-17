import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const [sentence, setSentence] = useState(1);

const SelectQuizStartScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> {sentence + '번 문제'} </Text>
      <Text>item[sentence - 1]</Text>
      <Button onPress={() => correctClick(AsyncStorage.getItem)} />
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
