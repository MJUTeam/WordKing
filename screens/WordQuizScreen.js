import { StyleSheet, View, Text, TextInput, Keyboard, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import IconButton from '../components/IconButton';
import IconTitleButton from '../components/IconTitleButton';

const WordQuizScreen = ({ navigation }) => {
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [spelling, setSpelling] = useState('');
  const [meaning, setMeaning] = useState('');
  const [currentKeys, setCurrentKeys] = useState('');
  const [currentKey, setCurrentKey] = useState('');
  const [gameState, setGameState] = useState(false);
  const [total, setTotal] = useState(0);

  const initWord = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      setTotal(keys.length);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      const value = await AsyncStorage.getItem(randomKey);
      const info = JSON.parse(value);
      setSpelling(info.english);
      setMeaning(info.korean);
      setCurrentKeys(keys);
      setCurrentKey(randomKey);
    } catch (error) {
      console.log(error);
    }
  };
  const GameOver = () => {
    if (gameState) {
      Alert.alert(
        '결과',
        '점수:' + Math.ceil((score / total) * 100),
        [{ text: '확인', onPress: () => navigation.goBack() }],
        {
          cancelable: false,
        }
      );
    }
  };

  useEffect(() => {
    initWord();
  }, []);

  const getWord = async () => {
    try {
      const keys = currentKeys.filter((element) => element !== currentKey);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      setCurrentKeys(keys);
      setCurrentKey(randomKey);
      AsyncStorage.getItem(randomKey)
        .then((value) => {
          const info = JSON.parse(value);
          setMeaning((mean) => {
            return info.korean;
          });
          setSpelling((spelling) => {
            return info.english;
          });
          return info;
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  function answerChecker(answer) {
    if (answer == spelling) {
      setScore((score) => {
        return score + 1;
      });
      return true;
    } else {
      return false;
    }
  }
  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <GameOver />
      <IconButton
        size={50}
        onPress={() => {
          navigation.goBack();
        }}
        iconName={'arrow-left-bold-box-outline'}
      />
      <Text>WordQuizScreen</Text>
      <Text>{meaning}</Text>
      <View>
        <TextInput placeholder="답을 입력하세요" onChangeText={(text) => setAnswer(text.trim())} />
        <IconTitleButton
          title="확인"
          onPress={() => {
            answerChecker(answer);
            if (currentKeys.length != 1) {
              getWord();
            } else {
              setGameState(true);
            }
          }}
          iconName={'check'}
        />
      </View>
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
