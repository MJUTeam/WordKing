import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import { useState } from 'react';
import Button from '../components/Button';

const WordQuizScreen = ({ navigation }) => {
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  function answerChecker(answer) {
    if (answer == 'qq') {
      return true;
    } else {
      return false;
    }
  }
  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <Button title={'뒤로가기'} onPress={() => navigation.goBack()} />
      <Text>WordQuizScreen</Text>
      <Text>ddd</Text>
      <TextInput placeholder="답을 입력하세요" onChangeText={(text) => setAnswer(text.trim())} />
      <Button
        title="확인"
        onPress={() => {
          if (answerChecker(answer)) {
            setScore(score + 1);
          }
        }}
        buttonStyle={{ width: 100, height: 100 }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderBottomWidth: 1,
    borderRadius: 8,
    height: 42,
    paddingHorizontal: 10,
  },
});

export default WordQuizScreen;
