import { StyleSheet, View, Text } from 'react-native';

const CalenderScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CalenderScreen</Text>
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

export default CalenderScreen;
