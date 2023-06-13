import { StyleSheet, View, Text } from 'react-native';

const BookShelfScreen = () => {
  return (
    <View style={styles.container}>
      <Text>BookShelfScreen</Text>
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

export default BookShelfScreen;
