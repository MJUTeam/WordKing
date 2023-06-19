import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import { getAllItemsByBookshelves } from '../utils/ItemStorage';

//const [sentence, setSentence] = useState(0);

const SelectQuizStartScreen = ({ navigation, route }) => {
  // 점수
  const [score, setScore] = useState(0);
  // 정답 리스트
  const [answer, setAnswer] = useState([]);
  // 모든 데이터 - 문제용
  const [allItem, setAllItem] = useState([]);
  // 모든 데이터 - 정답용
  const [allAnswerItem, setallAnswerItem] = useState([]);
  // 첫 문제 저장 - 0번 배열
  const [currentQuestion, setCurrentQuestion] = useState('');
  // 현재 문제에 대한 정답
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
      // 전부 가져옴
      getAllItemsByBookshelves(route.params.name).then((items) => {
        items = items.filter((word) => word !== undefined);
        // 가져온 값들 전부 저장
        setAllItem(items);
        setallAnswerItem(items);
        // 정답 리스트
        const answerList = [];
        // 정답 로직 - 4지선다
        for (let i = 0; answerList.length < 4; i++) {
          let random = Math.floor(Math.random() * items.length);
          // 중복 체크
          if (!answerList.includes(items[random])) {
            answerList.push(items[random]);
          }
        }
        // 현재 문제 0번 배열 - default
        const randomindex = Math.floor(Math.random() * items.length);
        setCurrentQuestion(items[randomindex]);
        // 정답 리스트 상태 저장
        setAnswer(answerList);
        setTotal(items.length);
        setInitState(false);
      });
    } else {
      // 이전 문제 제외하고 나머지 영어 전부 뽑기
      const answerList = [];
      for (let i = 0; answerList.length < 4; i++) {
        let random = Math.floor(Math.random() * allItem.length);
        // 중복 체크
        if (!answerList.includes(allItem[random])) {
          answerList.push(allItem[random]);
        }
      }
      items = allAnswerItem.filter((element) => element != currentQuestion);
      console.log(items);
      setallAnswerItem(items);
      const randomindex = Math.floor(Math.random() * items.length);
      setCurrentQuestion(items[randomindex]);

      setAnswer(answerList);
      setInitState(false);
    }
  };

  // 버튼 입력 값(영어)과 실제 값(문제에 대한 영어값) 비교 -> 정답률 계산
  const correctClick = (word) => {
    if (word.korean == currentQuestion.korean) {
      setScore((score) => score + 1);
      // 현재 문제를 word(영어)로 저장
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <Gameover />
      <Text style={styles.text}> {'[' + '번 문제]'} </Text>
      <Text style={styles.sentence}> {'<문제>' + currentQuestion.english}</Text>
      <View style={styles.correct}>
        {answer.map((word) => (
          <Button
            key={word.id}
            title={word.korean}
            onPress={() => {
              correctClick(word);
              if (allAnswerItem.length != 1) {
                getAllWord();
              } else {
                setGameState(true);
              }
            }}
          />
        ))}
      </View>
    </View>
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
