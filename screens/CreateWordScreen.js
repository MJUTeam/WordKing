import { StyleSheet, View, Text } from 'react-native';

const CreateWordScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CreateWordScreen</Text>
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

export default CreateWordScreen;
