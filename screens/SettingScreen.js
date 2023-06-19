import { StyleSheet, View, Text } from 'react-native';
import { firebaseAuth } from '../api/firebase';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const signOut = () => {
  firebaseAuth.signOut();
};

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SettingScreen</Text>
      <Button title="Logout" onPress={signOut} />
      <Button title="Clear Data" onPress={ () => AsyncStorage.clear() } />
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

export default SettingScreen;
