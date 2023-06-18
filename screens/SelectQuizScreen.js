import { StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';
import { getAllItems, getAllKeys, getItemEnglish } from '../util/ItemStorage';

const SelectQuizScreen = ({ navigation }) => {
  // 단어장 선택하는 View & Button -> map으로 AsyncStorage에 존재하는 모든 wordList 버튼 생성

  const list = [{ name: 'QWER' }, { name: 'ASDF' }];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>단어장 선택</Text>
      {list.map((string) => (
        <Button
          key={string.name}
          title={string.name}
          onPress={() => navigation.navigate('SelectQuizStart', {})}
        />
      ))}
      <Button title="뒤로 가기" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    position: 'absolute',
    fontWeight: 'bold',
    top: 70,
    fontSize: 20,
  },
});

export default SelectQuizScreen;
