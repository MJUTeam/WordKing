import { StyleSheet, View, Text, FlatList } from 'react-native';
import Button from '../components/Button';
import { getAllItems, getAllKeys, getItemEnglish } from '../util/ItemStorage';

const SelectQuizScreen = ({ navigation }) => {
  // 단어장 선택하는 View & Button -> map으로 AsyncStorage에 존재하는 모든 wordList 버튼 생성
  const items = [1, 2, 3, 4, 5];
  const itemList = items.map(function (item) {
    return <Button title={itemList.key} onPress={() => console.log(itemList.key)} />;
  });

  return (
    <View style={styles.container}>
      <Text>SelectQuizScreen</Text>
      <View style={styles.selectWord}>itemList();</View>
      <Button title={'뒤로가기'} style={styles.backButton} onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectWord: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  backButton: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default SelectQuizScreen;
