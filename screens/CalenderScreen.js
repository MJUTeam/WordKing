import { StyleSheet, View, Text } from 'react-native';
import { GRAY, WHITE } from '../colors';
import MonthCalendarList from '../components/MonthCalendarList';
import WordList from '../components/WordList';
import { useState, useEffect } from 'react';
import HR from '../components/HR';
import IconButton from '../components/IconButton';
import WeekCalendarList from '../components/WeekCalendarList';
import { getAllItemsByDate } from '../utils/ItemStorage';
import { dateToString } from '../utils/UtilFunc';

const CalenderScreen = () => {
  const [isMonth, setIsMonth] = useState(true);
  const [selected, setSelected] = useState(dateToString(new Date()));
  const [words, setWords] = useState([]);

  useEffect(() => {
    (async () => {
      const items = await getAllItemsByDate(selected);
      setWords(items);
      console.log('render');
    })();
  }, [selected, isMonth]);

  return (
    <View style={styles.container}>
      {isMonth ? (
        <MonthCalendarList selected={selected} setSelected={setSelected} />
      ) : (
        <WeekCalendarList selected={selected} setSelected={setSelected} />
      )}
      <View style={styles.buttons}>
        <IconButton
          onPress={() => setIsMonth(!isMonth)}
          iconName={isMonth ? 'chevron-double-up' : 'chevron-double-down'}
        />
      </View>
      <HR styles={{ line: { borderBottomColor: GRAY.LIGHT } }} />
      <WordList words={words} />
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

export default CalenderScreen;
