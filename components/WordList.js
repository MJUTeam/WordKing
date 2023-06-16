import React, { useState } from 'react';
import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';
import { GRAY, PRIMARY } from '../colors';
import { ContentRoutes } from '../navigations/routes';
import IconButton from './IconButton';
import { getColor, nextMarking } from './Marking';
import { setItem } from '../utils/ItemStorage';
import Toast from 'react-native-simple-toast';

const Word = ({ word, onPress }) => {
  const [marking, setMarking] = useState('');
  return (
    <Pressable onPress={onPress} style={styles.word}>
      <View style={styles.header}>
        <Text style={styles.bookshelf}>{word.bookshelf}</Text>
        <IconButton
          onPress={() => {
            word.marking = nextMarking(word.marking);
            setMarking(word.marking);
            setItem(word);
            Toast.show(word.marking + '으로 변경되었습니다.');
          }}
          iconName={'cat'}
          size={20}
          styles={{
            container: { backgroundColor: PRIMARY.LIGHT },
            icon: { color: getColor(word.marking) },
          }}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.english}>{word.english}</Text>
        <View style={{ borderRadius: 5, borderWidth: 1.5, borderColor: GRAY.LIGHT }}>
          <Text style={styles.korean}>{word.korean}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const WordList = ({ words, navigation }) => {
  const renderWord = ({ item }) => {
    const onPress = () => {
      navigation.navigate(ContentRoutes.WordDetail.name, {
        words: words,
        id: item.id,
      });
    };

    return <Word word={item} onPress={onPress} />;
  };

  return <FlatList data={words} renderItem={renderWord} keyExtractor={(item) => item.id} />;
};

const styles = StyleSheet.create({
  word: {
    backgroundColor: PRIMARY.LIGHT,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookshelf: {
    fontSize: 15,
    color: GRAY.DEFAULT,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  english: {
    padding: 3,
    fontWeight: 'bold',
    fontSize: 18,
    color: GRAY.DARK,
  },
  korean: {
    padding: 3,
    fontSize: 18,
    color: GRAY.DARK,
  },
});

export default React.memo(WordList);
