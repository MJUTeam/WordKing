import { StyleSheet, View, Text } from 'react-native';
import { GRAY, WHITE } from '../colors';
import MonthCalendarList from '../components/MonthCalendarList';
import WordList from '../components/WordList';
import { useState, useEffect } from 'react';
import HR from '../components/HR';
import IconButton from '../components/IconButton';
import WeekCalendarList from '../components/WeekCalendarList';
import { getAllItemsByDate, getAllItems } from '../utils/ItemStorage';
import { dateToString } from '../utils/UtilFunc';

const CalendarScreen = ({ navigation }) => {
  const [isMonth, setIsMonth] = useState(true);
  const [selected, setSelected] = useState(dateToString(new Date()));
  const [words, setWords] = useState([]);
  const [wordDates, setWordDates] = useState([]);

  useEffect(() => {
    (async () => {
      let wordDateArray = await getAllItems();
      wordDateArray = wordDateArray.map((word) => word.date);
      let set = new Set(wordDateArray);
      wordDateArray = [...set];
      setWordDates(wordDateArray);
    })();
  }, [isMonth]);

  useEffect(() => {
    (async () => {
      const items = await getAllItemsByDate(selected);
      setWords(items);
    })();
  }, [selected, isMonth]);

  return (
    <View style={styles.container}>
      {isMonth ? (
        <MonthCalendarList selected={selected} setSelected={setSelected} wordDates={wordDates} />
      ) : (
        <WeekCalendarList selected={selected} setSelected={setSelected} wordDates={wordDates} />
      )}
      <View style={styles.buttons}>
        <IconButton
          onPress={() => setIsMonth(!isMonth)}
          iconName={isMonth ? 'chevron-double-up' : 'chevron-double-down'}
        />
      </View>
      <HR styles={{ line: { borderBottomColor: GRAY.LIGHT } }} />
      <WordList words={words} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  buttons: {
    flexDirection: 'row-reverse',
  },
});

export default CalendarScreen;
