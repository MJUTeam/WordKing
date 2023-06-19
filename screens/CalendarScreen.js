import { StyleSheet, View } from 'react-native';
import { GRAY, WHITE } from '../colors';
import MonthCalendarList from '../components/MonthCalendarList';
import WordList from '../components/WordList';
import { useState, useEffect, useRef } from 'react';
import HR from '../components/HR';
import IconButton from '../components/IconButton';
import WeekCalendarList from '../components/WeekCalendarList';
import { getAllItemsByDate, getAllWords } from '../utils/ItemStorage';
import { dateToString } from '../utils/UtilFunc';

const CalendarScreen = ({ navigation }) => {
  const [isMonth, setIsMonth] = useState(true);
  const [selected, setSelected] = useState(dateToString(new Date()));
  const [words, setWords] = useState([]);
  const [wordDates, setWordDates] = useState([]);
  const [hideWord, setHideWord] = useState(false);
  const calendarRef = useRef(null);

  const jumpToday = (date) => {
    calendarRef.current?.scrollToDay(date, 0, true);
  };

  useEffect(() => {
    getAllWords().then((items) => {
      items = items.filter((word) => word !== undefined).map((word) => word.date);
      let set = new Set(items);
      wordDateArray = [...set];
      setWordDates(wordDateArray);
    });
    jumpToday(selected);
  }, [isMonth]);

  useEffect(() => {
    getAllItemsByDate(selected).then((items) => {
      items = items.filter((word) => word !== undefined);
      setWords(items);
    });
  }, [selected, isMonth]);

  return (
    <View style={styles.container}>
      {isMonth ? (
        <MonthCalendarList
          selected={selected}
          setSelected={setSelected}
          wordDates={wordDates}
          calenderRef={calendarRef}
        />
      ) : (
        <WeekCalendarList selected={selected} setSelected={setSelected} wordDates={wordDates} />
      )}
      <View style={styles.buttons}>
        <IconButton
          onPress={() => {
            setIsMonth(!isMonth);
          }}
          iconName={isMonth ? 'chevron-double-up' : 'chevron-double-down'}
        />
        <IconButton
          onPress={() => {
            setSelected(dateToString(new Date()));
            jumpToday(new Date());
          }}
          iconName={'calendar-today'}
        />
        <IconButton
          onPress={() => setHideWord(!hideWord)}
          iconName={hideWord ? 'eye-outline' : 'eye-off'}
        />
      </View>
      <HR styles={{ line: { borderBottomColor: GRAY.LIGHT } }} />
      <WordList words={words} navigation={navigation} hideWord={hideWord} />
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
