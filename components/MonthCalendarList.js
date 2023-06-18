import { StyleSheet, Dimensions, View, Animated } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { PRIMARY, SECONDARY, WHITE } from '../colors';
import { useCallback } from 'react';

const minHeight = 310;
const maxHeight = 350;
const calendarHeight = new Animated.Value(minHeight);

const MonthCalendarList = ({ selected, setSelected, wordDates, calenderRef }) => {
  const animateCalendarView = (newCalendarHeight) => {
    Animated.timing(calendarHeight, {
      toValue: newCalendarHeight,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const onMonthChange = useCallback(
    (currentMonth) => {
      const lastMonthDayNum = new Date(currentMonth.year, currentMonth.month - 1).getDay();
      const currentMonthDayNum = new Date(currentMonth.year, currentMonth.month, 0).getDate();
      const totalDay = 36 - lastMonthDayNum;
      const newCalendarHeight = totalDay <= currentMonthDayNum ? maxHeight : minHeight;
      animateCalendarView(newCalendarHeight);
    },
    [calendarHeight]
  );

  const reduceWordDates = wordDates.reduce((wd, date) => {
    wd[date] = { marked: true };
    return wd;
  }, {});

  return (
    <Animated.View style={{ height: calendarHeight }}>
      <CalendarList
        ref={calenderRef}
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
        }}
        markedDates={{
          ...reduceWordDates,
          [selected]: { selected: true },
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MonthCalendarList;
