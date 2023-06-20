import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import SpeedQuizButton, { ButtonTypes } from '../components/SpeedQuizButton';
import IconButton from '../components/IconButton';
import Timer from '../components/Timer';
import { useEffect, useState } from 'react';
import { getAllItemsByBookshelves } from '../utils/ItemStorage';

const SpeedQuizScreen = ({ navigation, route }) => {
  const { name } = route.params;

  const [result, setResult] = useState('');
  const [spelling, setSpelling] = useState('');
  const [meaning, setMeaning] = useState('');
  const [point, setPoint] = useState(0);
  const [letters, setLetters] = useState([]);

  const windowWidth = useWindowDimensions().width;
  const width = (windowWidth - 5) / 4;

  const maxLength = letters.length - 1;

  const getWord = async () => {
    try {
      const items = await getAllItemsByBookshelves(name);
      const filteredItems = items.filter(item => item !== undefined);
      if(filteredItems.length<4){
        handleNoWord();
      }else{
        const randomIndex = Math.floor(Math.random() * filteredItems.length);
        const randomItem = filteredItems[randomIndex];
          if(randomItem.english===spelling){
            getWord();  
          }else{
            setSpelling(randomItem.english);
            setMeaning(randomItem.korean);
            setLetters((letters) => {
              return randomItem.english.split('');
            });
          }
      }

    } catch (error) {
      getWord();
    }
  };

  useEffect(() => {
    getWord();
  }, []);

  function shuffleArray(array) {
    const uniqueValues = Array.from(new Set(array));
    const shuffledArray = [];
    while (uniqueValues.length > 0) {
      const randomIndex = Math.floor(Math.random() * uniqueValues.length);
      const randomValue = uniqueValues.splice(randomIndex, 1)[0];
      shuffledArray.push(randomValue);
    }
    return shuffledArray;
  }

  const handleNoWord = () => {
    Alert.alert(
      '오류',
      '단어가 4개 이상 필요합니다.',
      [{ text: '확인', onPress: () => navigation.goBack() }],
      { cancelable: false }
    );
  };

  const handleTimeUp = () => {
    Alert.alert(
      '결과',
      '시간이 종료되었습니다! 점수:' + point,
      [{ text: '확인', onPress: () => navigation.goBack() }],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.pointContainer}>
        <IconButton
          size={50}
          onPress={() => {
            navigation.goBack();
          }}
          iconName={'arrow-left-bold-box-outline'}
        />
        <Image
          source={require('../assets/quizkar.png')}
          style={{ height: '100%', width: '10%' }}
          resizeMode="center"
        />
        <Text style={styles.text}>점수 : {point}</Text>
      </View>
      <View style={styles.goalContainer}>
        <Image
          source={require('../assets/crown.png')}
          style={{ height: '100%', width: '10%' }}
          resizeMode="center"
        />
        <Text style={styles.goal}>{meaning} </Text>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.text}> {result} </Text>
      </View>
      <Timer timeLimit={100} onTimeUp={handleTimeUp} />
      <View style={styles.buttonContainer}>
        <ImageBackground
          source={require('../assets/quiz.png')}
          style={{ width: '100%' }}
          resizeMode="cover"
        >
          <View style={styles.number}>
            <SpeedQuizButton
              title="삭제"
              onPress={() => {
                setResult((result) => {
                  return '';
                });
              }}
              buttonStyle={{ width: width * 2, height: width, marginTop: 1 }}
              buttonTypes={ButtonTypes.OPERATOR}
            />
            <SpeedQuizButton
              title="정답"
              onPress={() => {
                if (result === spelling) {
                  getWord();
                  setPoint((point) => {
                    return point + 10;
                  });
                }
                setResult((result) => {
                  return '';
                });
              }}
              buttonTypes={ButtonTypes.OPERATOR}
              buttonStyle={{ width: width * 2, height: width, marginBottom: 1 }}
            />
          </View>
        </ImageBackground>
        <View>
          <ImageBackground
            source={require('../assets/quiz.png')}
            style={{ width: '100%' }}
            resizeMode="cover"
          >
            <View style={styles.number}>
              {shuffleArray(letters.slice(0, maxLength + 1)).map((alpha, index) => (
                <SpeedQuizButton
                  key={alpha + index}
                  title={alpha.toString()}
                  onPress={() => {
                    setResult((result) => {
                      return result + alpha;
                    });
                  }}
                  buttonStyle={{ width, height: width, marginBottom: 1 }}
                />
              ))}
            </View>
          </ImageBackground>
        </View>
        <Image
          source={require('../assets/quiz.png')}
          style={{ width: '100%', height: '50%' }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  pointContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'space-between',
    paddingTop: 20,
  },
  goalContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  problem: {
    fontSize: 20,
    color: '#ffffff',
    backgroundColor: '#000000',
  },
  goal: {
    fontSize: 40,
    fontWeight: '700',
    color: '#000000',
  },
  resultContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 40,
    fontWeight: '700',
    color: '#b11000',
    paddingBottom: 10,
    paddingRight: 30,
  },
  buttonContainer: {
    flex: 0.5,
  },
  number: {
    flexWrap: 'wrap-reverse',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default SpeedQuizScreen;
