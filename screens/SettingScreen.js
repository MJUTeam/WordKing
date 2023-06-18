import { StyleSheet, View, Text } from 'react-native';
import { firebaseAuth } from '../api/firebase';
import Button from '../components/Button';

const signOut = () => {
  firebaseAuth.signOut();
};

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SettingScreen</Text>
      <Button title="Logout" onPress={signOut} />
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
