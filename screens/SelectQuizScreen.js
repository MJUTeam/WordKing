import { StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';
const SelectQuizScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>SelectQuizScreen</Text>
      <Button title={'뒤로가기'} onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SelectQuizScreen;
