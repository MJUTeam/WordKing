import { StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const SelectSpeedQuizScreen = ({ navigation }) => {

  const [wordbooks, setWordbooks] = useState([]);

  useEffect(() => {
    getWordBooks();
  }, []);

  const getWordBooks = async () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        const parsedStores = stores.map(([key, value]) => JSON.parse(value));
        const bookshelves = parsedStores.filter((item) => !item.isWord);

        setWordbooks(bookshelves);
      });
    });
  };

  const navigateToSpeedQuiz = (name) => {
    navigation.navigate('SpeedQuiz', { name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>단어장 선택</Text>
      {wordbooks.map((wordbookKey) => (
        <Button
          key={wordbookKey.id}
          title={wordbookKey.name}
          onPress={() => navigateToSpeedQuiz(wordbookKey.name)}
        />
      ))}
      <Button title="뒤로 가기" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    position: 'absolute',
    fontWeight: 'bold',
    top: 70,
    fontSize: 20,
  },
});

export default SelectSpeedQuizScreen;