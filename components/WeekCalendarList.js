import { CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { View, Text, StyleSheet } from 'react-native';
import { PRIMARY, SECONDARY, WHITE } from '../colors';
import { useCallback, useState } from 'react';

const today = new Date();

const convertMonth = [
  'January',
  'February',
  'March',
  'Aprill',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WeekCalendarList = ({ selected, setSelected, wordDates }) => {
  const [currentYearAndMonth, setCurrentYearAndMonth] = useState(
    `${convertMonth[today.getMonth()]} ${today.getFullYear()}`
  );

  const onMonthChange = useCallback(
    (currentMonth) => {
      setCurrentYearAndMonth(`${convertMonth[currentMonth.month - 1]} ${currentMonth.year}`);
    },
    [currentYearAndMonth]
  );

  const reduceWordDates = wordDates.reduce((wd, date) => {
    wd[date] = { marked: true };
    return wd;
  }, {});

  return (
    <View style={styles.container}>
      <Text style={styles.yearAndMonth}>{currentYearAndMonth}</Text>
      <CalendarProvider date={selected} onMonthChange={onMonthChange}>
        <WeekCalendar
          allowShadow={false}
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          theme={{
            backgroundColor: WHITE,
            calendarBackground: WHITE,
            todayTextColor: SECONDARY.DARK,
            todayBackgroundColor: SECONDARY.LIGHT,
            selectedDayTextColor: PRIMARY.DARK,
            selectedDayBackgroundColor: PRIMARY.LIGHT,
          }}
          markedDates={{
            ...reduceWordDates,
            [selected]: { selected: true },
          }}
        />
      </CalendarProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yearAndMonth: {
    fontSize: 18,
    color: PRIMARY.DARK,
  },
});

export default WeekCalendarList;
