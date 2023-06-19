import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllKeys = async () => {
  return await AsyncStorage.getAllKeys();
};

export const getAllItems = async () => {
  const keys = await getAllKeys();
  const items = [];
  for (const key of keys) {
    const jsonValue = await AsyncStorage.getItem(key);
    const value = JSON.parse(jsonValue);
    items.push(value);
  }
  return items;
};

export const getAllItemsByBookshelves = async (name) => {
  const keys = await AsyncStorage.getAllKeys();
  const allItems = keys.map(async (key) => {
    const jsonValue = await AsyncStorage.getItem(key);
    const value = JSON.parse(jsonValue);
    if (value.isWord && name === value.bookshelf) {
      return value;
    }
  });
  return Promise.all(allItems);
};

export const getAllItemsByDate = async (date) => {
  const keys = await getAllKeys();
  const items = [];
  for (const key of keys) {
    const jsonValue = await AsyncStorage.getItem(key);
    const value = JSON.parse(jsonValue);
    if (date === value.date) {
      items.push(value);
    }
  }
  return items;
};

export const setItem = async (word) => {
  AsyncStorage.setItem(word.id, JSON.stringify(word));
};
