import { StyleSheet, Dimensions, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { PRIMARY, SECONDARY, WHITE } from '../colors';
import { useState, useCallback } from 'react';

const minHeight = 310;
const maxHeight = 350;

const MonthCalendarList = ({ selected, setSelected }) => {
  const [calendarHeight, setCalendarHeight] = useState(minHeight);

  const onMonthChange = useCallback(
    (currentMonth) => {
      const lastMonthDayNum = new Date(currentMonth.year, currentMonth.month - 1).getDay();
      const currentMonthDayNum = new Date(currentMonth.year, currentMonth.month, 0).getDate();
      const totalDay = 36 - lastMonthDayNum;
      const newCalendarHeight = totalDay <= currentMonthDayNum ? maxHeight : minHeight;
      setCalendarHeight(newCalendarHeight);
    },
    [calendarHeight]
  );

  return (
    <View style={{ height: calendarHeight }}>
      <CalendarList
        calendarWidth={Dimensions.get('window').width}
        onMonthChange={onMonthChange}
        theme={{
          backgroundColor: WHITE,
          calendarBackground: WHITE,
          todayTextColor: SECONDARY.DARK,
          todayBackgroundColor: SECONDARY.LIGHT,
          monthTextColor: PRIMARY.DARK,
          selectedDayTextColor: PRIMARY.DARK,
          selectedDayBackgroundColor: PRIMARY.LIGHT,
          'stylesheet.calendar.header': {
            dayTextAtIndex0: {
              color: PRIMARY.DARK,
            },
            dayTextAtIndex6: {
              color: PRIMARY.DARK,
            },
          },
        }}
        horizontal
        pagingEnabled
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MonthCalendarList;
