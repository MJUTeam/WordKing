import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, TextInput, Button, Modal, Pressable, Alert } from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { Marking } from '../components/Marking';
import { dateToString } from '../utils/UtilFunc';

const CreateWordScreen = () => {
  const [wordEnglish, onChangeEnglish] = useState('');
  const [wordKorean, onChangeKorean] = useState('');
  const [wordClass, onChangeClass] = useState('');
  const [selectedBookshelf, selectBookshelf] = useState('0');
  const [bookshelfList, setBookshelfList] = useState([]);
  const [wordList, setWordList] = useState([]);
  const [, setState] = useState();

  useEffect(() => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        const parsedStores = stores.map(([key, value]) => JSON.parse(value));
        const bookshelves = parsedStores.filter((item) => !item.isWord);
        const words = parsedStores.filter((item) => item.isWord);
        setWordList(words);

        const bookshelfNames = bookshelves.map((item) => ({ id: item.id, value: item.name }));
        setBookshelfList(bookshelfNames);
      });
    });
  }, []);

  useEffect(() => {
    initBookshelf(); // 컴포넌트가 처음 렌더링될 때 한 번만 실행됩니다.
  }, []);

  const addWordAlert = () =>
    Alert.alert('단어 추가', '단어가 추가되었습니다', [
      {
        text: '확인',
        onPress: () => console.log('확인'),
        style: 'cancel',
      },
    ]);

  const duplicateAlert = () =>
    Alert.alert('단어 중복', '이미 단어가 존재합니다.', [
      {
        text: '확인',
        onPress: () => console.log('확인'),
        style: 'cancel',
      },
    ]);

  function addWord(english, korean, wordClass) {
    console.log(wordList);
    for (let i = 0; i < wordList.length; i++) {
      if (wordList[i].english == english) {
        duplicateAlert();
        return;
      }
    }

    AsyncStorage.setItem(
      english,
      JSON.stringify({
        id: english,
        korean: korean,
        english: english,
        bookshelf: selectedBookshelf,
        marking: Marking.NONE.toString(),
        date: dateToString(new Date()),
        isWord: true,
        class: wordClass,
      })
    );
    console.log('IN');
    addWordAlert();
    setState();
  }

  function initBookshelf() {
    const id = 0;
    const newBookshelf = {
      id: id.toString(),
      name: 'Default',
      isWord: false,
    };

    AsyncStorage.setItem(id.toString(), JSON.stringify(newBookshelf))
      .then(() => {
        setBookshelfList((prevList) => [...prevList, newBookshelf]);
      })
      .catch((error) => console.log(error));
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}> 단어 등록 </Text>
        <Text style={styles.infoText}> 새로운 단어를 등록할 수 있습니다. </Text>
      </View>
      <View style={styles.inputEnglishView}>
        <Text style={styles.checkText}> 영어 단어: </Text>
        <View style={styles.inputTextline}>
          <TextInput
            style={styles.inputStyle}
            placeholder="단어를 입력하세요"
            value={wordEnglish}
            onChangeText={onChangeEnglish}
          />
        </View>
      </View>
      <View style={styles.inputKoreanView}>
        <Text style={styles.checkText}> 한글 단어: </Text>
        <View style={styles.inputTextline}>
          <TextInput
            style={styles.inputStyle}
            placeholder="단어를 입력하세요"
            value={wordKorean}
            onChangeText={onChangeKorean}
          />
        </View>
      </View>
      <View style={styles.inputClassView}>
        <Text style={styles.checkText}> 품사: </Text>
        <View style={styles.inputTextline}>
          <TextInput
            style={styles.inputStyle}
            placeholder="품사를 입력하세요"
            value={wordClass}
            onChangeText={onChangeClass}
          />
        </View>
      </View>
      <View style={styles.chooseBookshelfView}>
        <Text style={styles.checkText}> 단어장: </Text>
        <View style={styles.selectListContainer}>
          <SelectList
            setSelected={(val) => selectBookshelf(val)}
            data={bookshelfList}
            save="value"
            defaultOption={{ key: 'Default', value: 'Default' }}
          />
        </View>
      </View>
      <View style={styles.buttonView}>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => addWord(wordEnglish, wordKorean, wordClass)}
        >
          <Text style={styles.buttonText}>저장</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    flex: 1,
  },
  inputEnglishView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginHorizontal: 30,
    flex: 1,
  },
  inputKoreanView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginHorizontal: 30,
    flex: 1,
  },
  inputClassView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginHorizontal: 30,
    flex: 1,
  },
  chooseBookshelfView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    marginHorizontal: 30,
    marginTop: 25,
    flex: 3,
  },
  chooseBookshelfDropdown: {
    flex: 1,
    fontSize: 25,
    color: 'lightgray',
  },
  selectListContainer: {
    width: '60%',
  },
  buttonView: {},
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  inputTextline: {
    marginRight: 30,
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
    color: 'gray',
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
  buttonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: 'green',
  },
});

export default CreateWordScreen;
