import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Pressable, Keyboard, TouchableOpacity } from 'react-native';
import { getAllItemsByBookshelves } from '../utils/ItemStorage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SelectQuizScreen = ({ route, navigation }) => {
  const [score, setScore] = useState(0);
  const [questionStack, setQuestionStack] = useState(1);
  const [answer, setAnswer] = useState([]);
  const [allItem, setAllItem] = useState([]);
  const [allAnswerItem, setallAnswerItem] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [gameState, setGameState] = useState(false);
  const [total, setTotal] = useState(0);
  const [initState, setInitState] = useState(true);

  const Gameover = () => {
    if (gameState) {
      Alert.alert(
        '결과',
        '정답률:' + Math.ceil((score / total) * 100) + '%',
        [{ text: '확인', onPress: () => navigation.goBack() }],
        {
          cancelable: false,
        }
      );
    }
  };

  useEffect(() => {
    getAllWord();
  }, []);

  const getAllWord = () => {
    if (initState) {
      getAllItemsByBookshelves(route.params.name).then((items) => {
        items = items.filter((word) => word !== undefined);
        if (items.length < 4) {
          return navigation.goBack();
        }
        setAllItem(items);
        setallAnswerItem(items);
        const answerList = [];
        for (let i = 0; answerList.length < 4; i++) {
          let random = Math.floor(Math.random() * items.length);
          if (!answerList.includes(items[random])) {
            answerList.push(items[random]);
          }
        }
        const randomindex = Math.floor(Math.random() * items.length);
        setCurrentQuestion(items[randomindex]);
        setAnswer(answerList);
        setTotal(items.length);
        setInitState(false);
      });
    } else {
      const answerList = [];
      for (let i = 0; answerList.length < 4; i++) {
        let random = Math.floor(Math.random() * allItem.length);
        if (!answerList.includes(allItem[random])) {
          answerList.push(allItem[random]);
        }
      }
      items = allAnswerItem.filter((element) => element != currentQuestion);
      setallAnswerItem(items);
      const randomindex = Math.floor(Math.random() * items.length);
      setCurrentQuestion(items[randomindex]);

      setAnswer(answerList);
      setInitState(false);
    }
  };

  const correctClick = (word) => {
    if (word.korean == currentQuestion.korean) {
      setScore((score) => score + 1);
      setQuestionStack((questionStack) => questionStack + 1);
      return true;
    } else {
      return false;
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <Gameover />
      <Text style={styles.text}> {'[문제 : ' + questionStack + ' / ' + allItem.length + ']'} </Text>
      <Text style={styles.sentence}> {'<문제>'}</Text>
      <Text style={styles.question}> {currentQuestion.english}</Text>
      <View style={styles.correct}>
        {answer.map((word) => (
          <TouchableOpacity
            key={word.id}
            style={styles.answerButton}
            onPress={() => {
              correctClick(word);
              if (allAnswerItem.length != 1) {
                getAllWord();
              } else {
                setGameState(true);
              }
            }}
          >
            <Text style={styles.answer}>{' ' + word.korean + ' '}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <MaterialCommunityIcons name="arrow-left-bold-box-outline" size={50} />
      </TouchableOpacity>
    </Pressable>
  );
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
    top: 60,
    alignItems: 'center',
    fontSize: 20,
  },
  sentence: {
    position: 'absolute',
    alignItems: 'center',
    top: 150,
    padding: 60,
    fontSize: 40,
  },
  question: {
    position: 'absolute',
    top: 250,
    fontSize: 40,
  },
  correct: {
    alignItems: 'flex-end',
    flex: 0.1,
  },
  answer: {
    fontSize: 40,
  },
  answerButton: {
    width: 150,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    alignItem: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  iconButton: {
    position: 'absolute',
    bottom: 70,
  },
});

export default SelectQuizScreen;
