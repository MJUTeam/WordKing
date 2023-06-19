import { StyleSheet, View, Text, TextInput, Keyboard, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import IconButton from '../components/IconButton';
import IconTitleButton from '../components/IconTitleButton';
import { getAllItemsByBookshelves } from '../utils/ItemStorage';

const WordQuizScreen = ({ route, navigation }) => {
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [spelling, setSpelling] = useState('');
  const [meaning, setMeaning] = useState('');
  const [currentItems, setCurrentItems] = useState('');
  const [currentItem, setCurrentItem] = useState('');
  const [gameState, setGameState] = useState(false);
  const [total, setTotal] = useState(0);
  const [initState, setInitState] = useState(true);

  const GameOver = () => {
    if (gameState) {
      Alert.alert(
        '결과',
        '정답률:' + Math.ceil((score / total) * 100, '%'),
        [{ text: '확인', onPress: () => navigation.goBack() }],
        {
          cancelable: false,
        }
      );
    }
  };

  useEffect(() => {
    getWord();
  }, []);

  const getWord = async () => {
    try {
      var items = [];
      if (initState) {
        items = await getAllItemsByBookshelves(route.params.name);
        if (!items) {
          Alert.alert('에러', '단어장이 비어있습니다.');
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
      <Text>{score}</Text>
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
    borderBottomWidth: 1,
    borderRadius: 8,
    height: 42,
    paddingHorizontal: 10,
  },
});

export default WordQuizScreen;
