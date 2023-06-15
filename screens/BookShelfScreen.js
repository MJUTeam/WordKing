import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import React, { useState } from 'react';
import Item from '../src/Item';

const wordJSONList = [];

const BookShelfScreen = () => {
  getAllWord();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BookShelfScreen</Text>
      <FlatList
        keyExtractor={item => item.english}
        data={wordJSONList}
        renderItem={({item}) => <Item word={item} />}
      />
    </View>
  );
};

const getAllWord = async () => {
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
      stores.map((result, i, store) => {
        // get at each store's key/value so you can work with it
        let key = store[i][0];
        let value = store[i][1];
      });
      for( var i = 0; i < stores.length; i++ ){
        wordJSONList.push( JSON.parse( stores[i][1] ) );
      }
    });
  });
};

function getWord( ID ){
  AsyncStorage.getItem(ID)
      .then(value => {
        const info = JSON.parse(value);
        console.log( info.korean );
      })
      .catch(error => console.log(error));
}


const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    marginBottom: 20
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
});

export default BookShelfScreen;
