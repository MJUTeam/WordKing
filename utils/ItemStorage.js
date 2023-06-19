import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllWords = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const promiseItems = keys.map(async (key) => {
    const jsonValue = await AsyncStorage.getItem(key);
    const value = JSON.parse(jsonValue);
    if (value.isWord) {
      return value;
    }
  });
  return Promise.all(promiseItems);
};

export const getAllItemsByDate = async (date) => {
  const keys = await AsyncStorage.getAllKeys();
  const promiseItems = keys.map(async (key) => {
    const jsonValue = await AsyncStorage.getItem(key);
    const value = JSON.parse(jsonValue);
    if (value.isWord && date === value.date) {
      return value;
    }
  });
  return Promise.all(promiseItems);
};

export const setItem = async (word) => {
  AsyncStorage.setItem(word.id, JSON.stringify(word));
};
