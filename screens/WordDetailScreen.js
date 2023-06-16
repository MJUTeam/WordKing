import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { GRAY, WHITE } from '../colors';
import HR from '../components/HR';
import IconButton from '../components/IconButton';

const WordDetailScreen = ({ route, navigation }) => {
  const { words, id } = route.params;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    for (let i = 0; i < words.length; i++) {
      if (words[i].id === id) {
        setIndex(i);
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton onPress={() => navigation.goBack()} iconName={'chevron-left'} />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.bookshelf}>{words[index].bookshelf}</Text>
        </View>
      </View>
      <View style={{}}></View>
      <HR styles={{ line: { borderBottomColor: GRAY.LIGHT } }} />
      <View style={styles.body}>
        <Text style={styles.english}>{words[index].english}</Text>
        <View style={{ borderRadius: 5, borderWidth: 1.5, borderColor: GRAY.LIGHT }}>
          <Text style={styles.korean}>{words[index].korean}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    height: 70,
  },
  bookshelf: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingRight: 30,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  english: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
    color: GRAY.DARK,
  },
  korean: {
    fontSize: 24,
    textAlign: 'center',
    padding: 2,
    color: GRAY.DARK,
  },
});

export default WordDetailScreen;
