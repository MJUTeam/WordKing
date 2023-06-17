import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, TextInput, Button, Modal, Pressable } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { Marking } from '../components/Marking';
import { dateToString } from '../utils/UtilFunc';

const CreateWordScreen = () => {
  const [wordEnglish, onChangeEnglish] = useState('단어를 입력하세요');
  const [wordKorean, onChangeKorean] = useState('단어를 입력하세요');
  const [bookshelf, selectBookshelf] = useState('');

  const bookshelfList = [];
  const JSONList = [];
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
      stores.map((result, i, store) => {
        // get at each store's key/value so you can work with it
        let key = store[i][0];
        let value = store[i][1];
      });
      for (let i = 0; i < stores.length; i++) {
        JSONList.push(JSON.parse(stores[i][1]));
      }
      for (let i = 0; i < JSONList.length; i++) {
        if (!JSONList[i].isWord) {
          bookshelfList.push(JSONList[i]);
        }
      }
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}> 단어 등록 </Text>
        <Text style={styles.infoText}> 새로운 단어를 등록할 수 있습니다. </Text>
      </View>
      <View style={styles.inputEnglishView}>
        <Text style={styles.checkText}> 영어 단어: </Text>
        <TextInput style={styles.inputStyle} value={wordEnglish} onChangeText={onChangeEnglish} />
      </View>
      <View style={styles.inputKoreanView}>
        <Text style={styles.checkText}> 한글 단어: </Text>
        <TextInput style={styles.inputStyle} value={wordKorean} onChangeText={onChangeKorean} />
      </View>
      <View style={styles.chooseBookshelfView}>
        <Text style={styles.checkText}> 단어장: </Text>
        <SelectList
          setSelected={(val) => selectBookshelf(val)}
          data={bookshelfList}
          save="name"
          dropdownStyles={styles.chooseBookshelfDropdown}
        />
      </View>
      <View style={styles.buttonView}>
        <Button title="Save" onPress={() => addWord(wordEnglish, wordKorean)} />
        <Button title="RESET" onPress={() => AsyncStorage.clear()} />
      </View>
    </View>
  );
};

// prettier 적용하니 'id' 같은 부분 다 빠져서 이렇게 바꿈.
// date랑 marking 부분도 바꿈 (성제 확인하면 주석 지워주세요)
function addWord(korean, english) {
  AsyncStorage.setItem(
    english,
    JSON.stringify({
      id: english,
      korean: korean,
      english: english,
      bookshelf: 0,
      marking: Marking.NONE.toString(),
      date: dateToString(new Date()),
      isWord: true,
    })
  );
  console.log('IN');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  inputEnglishView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginHorizontal: 30,
  },
  inputKoreanView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginHorizontal: 30,
  },
  chooseBookshelfView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginHorizontal: 30,
  },
  chooseBookshelfDropdown: {
    flex: 1,
    fontSize: 25,
    color: 'lightgray',
  },
  buttonView: {},
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 20,
    color: 'gray',
  },
  checkText: {
    fontSize: 25,
    flex: 1,
    fontWeight: 'bold',
  },
  inputStyle: {
    flex: 1,
    fontSize: 25,
    color: 'lightgray',
  },
  enteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CreateWordScreen;
