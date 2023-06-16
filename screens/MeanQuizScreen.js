import { StyleSheet, View, Text, TextInput } from 'react-native';
import Button from '../components/Button';
const MeanQuizScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>MeanQuizScreen</Text>
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

export default MeanQuizScreen;
