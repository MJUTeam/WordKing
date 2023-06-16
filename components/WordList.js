import React from 'react';
import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';
import { GRAY, PRIMARY } from '../colors';

const Word = ({ word, onPress }) => (
  <Pressable onPress={onPress} style={styles.item}>
    <Text style={styles.bookshelf}>{word.bookshelf}</Text>
    <Text style={styles.english}>{word.english}</Text>
  </Pressable>
);

const WordList = ({ words }) => {
  const renderWord = ({ item }) => {
    const onPress = () => {
      console.log(item.english);
    };

    return <Word word={item} onPress={onPress} />;
  };

  return <FlatList data={words} renderItem={renderWord} keyExtractor={(item) => item.id} />;
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: PRIMARY.LIGHT,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  bookshelf: {
    fontSize: 15,
    color: GRAY.DEFAULT,
  },
  english: {
    fontSize: 18,
    color: GRAY.DARK,
  },
});

export default WordList;
