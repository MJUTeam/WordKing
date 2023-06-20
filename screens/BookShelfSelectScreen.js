import { StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import IconTitleButton from '../components/IconTitleButton';
import IconButton from '../components/IconButton';

const BookShelfSelectScreen = ({ route, navigation }) => {
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

  return (
    <View style={styles.container}>
      <IconButton
        size={50}
        onPress={() => {
          navigation.goBack();
        }}
        iconName={'arrow-left-bold-box-outline'}
      />
      <Text style={styles.title}>단어장 선택</Text>
      {wordbooks.map((wordbookKey) => (
        <IconTitleButton
          size={50}
          key={wordbookKey.id}
          title={wordbookKey.name}
          onPress={() => navigation.navigate(route.params.quizType, { name: wordbookKey.name })}
          iconName={'numeric-' + (wordbooks.indexOf(wordbookKey) + 1) + '-circle-outline'}
        />
      ))}
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
    fontSize: 60,
  },
});

export default BookShelfSelectScreen;