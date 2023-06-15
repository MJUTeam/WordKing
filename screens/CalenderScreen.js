import { StyleSheet, View, Text } from 'react-native';
import { GRAY, WHITE } from '../colors';
import MonthCalendarList from '../components/MonthCalendarList';
import WordList from '../components/WordList';
import { useState } from 'react';
import HR from '../components/HR';
import IconButton from '../components/IconButton';
import WeekCalendarList from '../components/WeekCalendarList';

const today = new Date();

const CalenderScreen = () => {
  const [isMonth, setIsMonth] = useState(true);
  const [selected, setSelected] = useState(
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  );

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
      <WordList />
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
