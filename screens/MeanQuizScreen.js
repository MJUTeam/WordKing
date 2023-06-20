import { StyleSheet, View, Text, TextInput, Keyboard, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import IconButton from '../components/IconButton';
import IconTitleButton from '../components/IconTitleButton';
import { getAllItemsByBookshelvesh } from '../utils/ItemStorage';
import { BLACK, WHITE } from '../colors';

const MeanQuizScreen = ({ route, navigation }) => {
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [spelling, setSpelling] = useState('');
  const [meaning, setMeaning] = useState('');
  const [currentItems, setCurrentItems] = useState('');
  const [currentItem, setCurrentItem] = useState('');
  const [gameState, setGameState] = useState(false);
  const [total, setTotal] = useState(0);
  const [initState, setInitState] = useState(true);
  const [feedback, setFeedback] = useState([]);

  const GameOver = () => {
    if (gameState) {
      if (total == score) {
        Alert.alert(
          '결과',
          '정답률:' + Math.ceil((score / total) * 100) + '%',
          [{ text: '확인', onPress: () => navigation.goBack() }],
          {
            cancelable: false,
          }
        );
      } else {
        Alert.alert(
          '결과',
          '정답률:' + Math.ceil((score / total) * 100) + '% \n' + '틀린 문제 \n' + makeFeedBack(),
          [{ text: '확인', onPress: () => navigation.goBack() }],
          {
            cancelable: false,
          }
        );
      }
    }
  };
  function makeFeedBack() {
    feed = '';
    for (i = 0; i < feedback.length; i++) {
      feed = feed + '단어: ' + feedback[i][0] + ' / 의미: ' + feedback[i][1] + '\n';
    }
    return feed;
  }

  useEffect(() => {
    getWord();
  }, []);

  const getWord = async () => {
    try {
      var items = [];
      if (initState) {
        items = await getAllItemsByBookshelvesh(route.params.name);
        if (items.length == 0) {
          Alert.alert(
            '경고',
            '단어가 존재하지 않습니다',
            [{ text: '확인', onPress: () => navigation.goBack() }],
            {
              cancelable: false,
            }
          );
        }
        const randomIndex = Math.floor(Math.random() * items.length);
        const randomItem = items[randomIndex];
        setSpelling(randomItem.english);
        setMeaning(randomItem.korean);
        setCurrentItems(items);
        setCurrentItem(randomItem);
        setTotal(items.length);
        setInitState(false);
      } else {
        items = currentItems.filter((element) => element !== currentItem);
        const randomIndex = Math.floor(Math.random() * items.length);
        const randomItem = items[randomIndex];
        setSpelling(randomItem.english);
        setMeaning(randomItem.korean);
        setCurrentItems(items);
        setCurrentItem(randomItem);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function answerChecker(answer) {
    if (answer == meaning) {
      setScore((score) => {
        return score + 1;
      });
      return true;
    } else {
      feedback.push([spelling, meaning]);
      setFeedback(feedback);
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
      <Text style={styles.title}>의미 맞추기</Text>
      <Text style={styles.text}>{spelling}</Text>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="답을 입력하세요"
          onChangeText={(text) => setAnswer(text.trim())}
        />
        <IconTitleButton
          title="확인"
          onPress={() => {
            answerChecker(answer);
            if (currentItems.length != 1) {
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
    margin: 15,
    height: 50,
    borderColor: BLACK,
    borderWidth: 3,
    borderRadius: 45,
    width: 250,
    padding: 10,
    fontSize: 18,
  },
  title: {
    fontSize: 50,
  },
  text: {
    fontSize: 40,
  },
});

export default MeanQuizScreen;
