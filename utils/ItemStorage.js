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

export const getAllItemsByBook = async () => {
  const keys = await getAllKeys();
  const items = [];
  for (const key of keys) {
    const jsonValue = await AsyncStorage.getItem(key);
    const value = JSON.parse(jsonValue);
    items.push(value);
  }
  return items;
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

export const getAllItemsByBookshelvesh = async (name) => {
  const keys = await AsyncStorage.getAllKeys();
  const items = [];
  for (const key of keys) {
    const jsonValue = await AsyncStorage.getItem(key);
    const value = JSON.parse(jsonValue);
    if (name === value.bookshelf) {
      items.push(value);
    }
  }
  return items;
};

export const setItem = async (word) => {
  AsyncStorage.setItem(word.id, JSON.stringify(word));
};
