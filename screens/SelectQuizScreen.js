import { StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectQuizScreen = ({ navigation }) => {
  // getAllwordList();
  // 단어장 선택하는 View & Button
  return (
    <View style={styles.container}>
      <Text>SelectQuizScreen</Text>
      <View style={styles.selectWord}>
        <Button title={'단어장 이름'} onPress={() => navigation.navigate('SelectQuizStart')} />
      </View>
      <Button title={'뒤로가기'} style={styles.backButton} onPress={() => navigation.goBack()} />
    </View>
  );
};

// 비동기함수를 동기함수처럼 변경 -> async (), await
async function getAllwordList() {
  AsyncStorage.getAllKeys();
  if ((storageData = null)) {
    <Text>현재 만들어진 단어장이 존재하지 않습니다.</Text>;
  }
}

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
