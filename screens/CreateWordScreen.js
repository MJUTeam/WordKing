import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';

const CreateWordScreen = () => {
  const [ wordEnglish, onChangeEnglish ] = useState("INPUT ENG");
  const [ wordKorean, onChangeKorean ] = useState( "INPUT KOR" );

  return (
    <View style={styles.container}>
      <Text>CreateWordScreen</Text>
      <TextInput value={wordEnglish} onChangeText={onChangeEnglish} />
      <TextInput value={wordKorean} onChangeText={onChangeKorean} />
      <Button 
        title="Save"
        onPress={ () => addWord( wordKorean, wordEnglish ) }
      />
      <Button title="RESET" onPress={ () => AsyncStorage.clear() } />
    </View>
  );
};

function addWord( korean, english ){
  AsyncStorage.setItem( english, JSON.stringify( { 'id': english,  'korean': korean, 'english': english, 'bookshelf': 0 } ) );
  console.log( "IN" );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateWordScreen;
