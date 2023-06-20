import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { GRAY, WHITE } from '../colors';
import HR from '../components/HR';
import IconButton from '../components/IconButton';
import { getColor, nextMarking } from '../components/Marking';
import { setItem } from '../utils/ItemStorage';
import Toast from 'react-native-simple-toast';

const WordDetailScreen = ({ route, navigation }) => {
  const { words, id } = route.params;
  const [index, setIndex] = useState(0);
  const [marking, setMarking] = useState('');
  const [hideKorean, setHideKorean] = useState(true);

  useEffect(() => {
    for (let i = 0; i < words.length; i++) {
      if (words[i].id === id) {
        setIndex(i);
      }
    }
  }, []);

  const word = words[index];
  const rightDisabled = index === words.length - 1;
  const leftDisabled = index === 0;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton onPress={() => navigation.goBack()} iconName={'chevron-left'} />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.bookshelf}>{word.bookshelf}</Text>
        </View>
      </View>
      <HR styles={{ line: { borderBottomColor: GRAY.LIGHT } }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: GRAY.DEFAULT, fontSize: 18, padding: 10 }}>
          {index + 1 + '/' + words.length}
        </Text>
        <IconButton
          onPress={() => {
            word.marking = nextMarking(word.marking);
            setMarking(word.marking);
            setItem(word);
            Toast.show(word.marking + '으로 변경되었습니다.');
          }}
          iconName={'cat'}
          size={25}
          styles={{
            icon: { color: getColor(word.marking) },
          }}
        />
      </View>
      <TouchableOpacity style={styles.body} onPressOut={() => setHideKorean(!hideKorean)}>
        <Text style={styles.english}>{word.english}</Text>
        {hideKorean ? null : (
          <View style={{ borderRadius: 5, borderWidth: 1.5, borderColor: GRAY.LIGHT }}>
            <Text style={styles.korean}>{word.korean}</Text>
          </View>
        )}
      </TouchableOpacity>
      <HR styles={{ line: { borderBottomColor: GRAY.LIGHT } }} />
      <View style={styles.footer}>
        <IconButton
          onPress={() => {
            setIndex(index - 1);
            setHideKorean(true);
          }}
          iconName={'chevron-left'}
          size={25}
          disabled={leftDisabled}
          styles={{
            container: { flex: 1, paddingHorizontal: 0, paddingVertical: 0 },
            icon: [
              styles.moveItem,
              {
                borderColor: leftDisabled ? GRAY.LIGHT : GRAY.DARK,
                color: leftDisabled ? GRAY.LIGHT : GRAY.DARK,
              },
            ],
          }}
        />
        <IconButton
          onPress={() => {
            setIndex(index + 1);
            setHideKorean(true);
          }}
          iconName={'chevron-right'}
          size={25}
          disabled={rightDisabled}
          styles={{
            container: { flex: 1, paddingHorizontal: 0, paddingVertical: 0 },
            icon: [
              styles.moveItem,
              {
                borderColor: rightDisabled ? GRAY.LIGHT : GRAY.DARK,
                color: rightDisabled ? GRAY.LIGHT : GRAY.DARK,
              },
            ],
          }}
        />
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
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
    color: GRAY.DARK,
  },
  korean: {
    fontSize: 30,
    textAlign: 'center',
    padding: 2,
    color: GRAY.DARK,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 20,
    height: 70,
  },
  moveItem: {
    borderWidth: 1,
    borderRadius: 13,
    padding: 5,
  },
});

export default WordDetailScreen;
