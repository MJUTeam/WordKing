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

const WeekCalendarList = ({ selected, setSelected }) => {
  const [currentYearAndMonth, setCurrentYearAndMonth] = useState(
    `${convertMonth[today.getMonth()]} ${today.getFullYear()}`
  );

  const onMonthChange = useCallback(
    (currentMonth) => {
      setCurrentYearAndMonth(`${convertMonth[currentMonth.month - 1]} ${currentMonth.year}`);
    },
    [currentYearAndMonth]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.yearAndMonth}>{currentYearAndMonth}</Text>
      <CalendarProvider
        date={selected}
        onMonthChange={onMonthChange}
        onDayPress={(day) => {
          setSelected(day.dateString);
          console.log('선택한 날짜:', day.dateString);
        }}
        markedDates={{
          // '2023-06-01': { selected: true, marked: true, selectedColor: 'blue' },
          // '2023-06-10': { marked: true },
          // '2023-06-15': { marked: true, dotColor: 'red', activeOpacity: 0 },
          [selected]: { selected: true },
        }}
      >
        <WeekCalendar
          allowShadow={false}
          theme={{
            backgroundColor: WHITE,
            calendarBackground: WHITE,
            todayTextColor: SECONDARY.DARK,
            todayBackgroundColor: SECONDARY.LIGHT,
            selectedDayTextColor: PRIMARY.DARK,
            selectedDayBackgroundColor: PRIMARY.LIGHT,
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
