import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';

//const [sentence, setSentence] = useState(0);

// 객관식 4개 선택
function suffle() {
  let array = [];
  for (let i = 0; i < 4; i++) {
    let random = Math.floor(Math.random() * arrayLength);
    if (array.includes(random)) {
      i--;
    } else {
      array.push(random);
    }
  }
}

const SelectQuizStartScreen = () => {
  const [score, setScore] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{'Score: [ / ]'}</Text>
      <Text style={styles.text}> {'[ 번 문제]'} </Text>
      <Text style={styles.sentence}> {'<문제>'}</Text>
      <View style={styles.correct}>
        <Button title={'1'} onPress={() => correctClick(AsyncStorage.getItem)} />
        <Button title={'2'} onPress={() => correctClick(AsyncStorage.getItem)} />
        <Button title={'3'} onPress={() => correctClick(AsyncStorage.getItem)} />
        <Button title={'4'} onPress={() => correctClick(AsyncStorage.getItem)} />
      </View>
    </View>
  );
};

// 버튼 입력 값과 실제 값 비교 -> 정답률 계산
const correctClick = (answer) => {
  if (answer.korean == sentence.korean) {
    setScore(score + 1);
  } else {
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    position: 'absolute',
    left: 20,
    top: 100,
    fontSize: 20,
  },
  text: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
    fontSize: 20,
  },
  sentence: {
    position: 'absolute',
    top: 170,
    padding: 60,
    fontSize: 25,
  },
  correct: {
    alignItems: 'flex-end',
    flex: 0.1,
  },
});

export default SelectQuizStartScreen;
