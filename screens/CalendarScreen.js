import { StyleSheet, Text, View } from 'react-native';
import { GRAY, WHITE } from '../colors';
import MonthCalendarList from '../components/MonthCalendarList';
import WordList from '../components/WordList';
import { useState, useEffect, useRef } from 'react';
import HR from '../components/HR';
import IconButton from '../components/IconButton';
import WeekCalendarList from '../components/WeekCalendarList';
import { getAllItemsByDate, getAllWords } from '../utils/ItemStorage';
import { dateToString } from '../utils/UtilFunc';
import VisibleSettingModal from '../components/VisibleSettingModal';
import { HideWord, Marking } from '../components/Marking';

const CalendarScreen = ({ navigation }) => {
  const [isMonth, setIsMonth] = useState(true);
  const [selected, setSelected] = useState(dateToString(new Date()));
  const [words, setWords] = useState([]);
  const [wordDates, setWordDates] = useState([]);
  const [hideWord, setHideWord] = useState(HideWord.NONE);
  const [modalVisible, setModalVisible] = useState(false);
  const [none, setNone] = useState(true);
  const [memorized, setMemorized] = useState(true);
  const [confusion, setConfusion] = useState(true);
  const calendarRef = useRef(null);

  const filterMark = (marking) => {
    switch (marking) {
      case Marking.NONE:
        return none;
      case Marking.MEMORIZED:
        return memorized;
      case Marking.CONFUSION:
        return confusion;
      default:
        console.log('error');
        break;
    }
  };

  const jumpToday = (date) => {
    calendarRef.current?.scrollToDay(date, 0, true);
  };

  const calcMemorizedNum = () => {
    return words.filter((word) => word.marking === Marking.MEMORIZED).length;
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
      items = items.filter((word) => filterMark(word.marking));
      setWords(items);
    });
  }, [selected, isMonth, none, memorized, confusion]);

  return (
    <>
      <VisibleSettingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        hideWord={hideWord}
        setHideWord={setHideWord}
        none={none}
        setNone={setNone}
        memorized={memorized}
        setMemorized={setMemorized}
        confusion={confusion}
        setConfusion={setConfusion}
      />
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
          <IconButton onPress={() => setModalVisible(true)} iconName={'dots-vertical'} />
          <IconButton
            onPress={() => {
              setSelected(dateToString(new Date()));
              jumpToday(new Date());
            }}
            iconName={'calendar-today'}
          />
          <IconButton
            onPress={() =>
              setHideWord((pre) => (pre === HideWord.KOREAN ? HideWord.NONE : HideWord.KOREAN))
            }
            iconName={hideWord === HideWord.KOREAN ? 'eye-off' : 'eye-outline'}
          />
          <Text style={styles.progressText}>
            {words.length > 0
              ? `진행도 ${calcMemorizedNum()} / ${words.length} (${Math.ceil(
                  (calcMemorizedNum() / words.length) * 100
                )}%)`
              : null}
          </Text>
        </View>
        <HR styles={{ line: { borderBottomColor: GRAY.LIGHT } }} />
        <WordList words={words} navigation={navigation} hideWord={hideWord} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignContent: 'center',
    flex: 1,
    backgroundColor: WHITE,
    paddingTop: 10,
  },
  buttons: {
    flexDirection: 'row-reverse',
  },
  progressText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 9,
    color: GRAY.DEFAULT,
  },
});

export default CalendarScreen;
