import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, TextInput, Button, FlatList, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import Item from '../src/Item';

var JSONList = [];      // 모든 로컬 JSON 파일을 담은 리스트
var wordList = [];      // JSON 파일 중 단어만 담은 리스트
var bookshelfList = []  // JSON 파일 중 단어장만 담은 리스트

/*
JSON File Convention
1. Word
{
  "bookshelf" : 해당 단어가 위치하는 단어장 번호( defualt: 0 )
  "date"      : 해당 단어가 기록된 시간( Date.now().toString()으로 저장되므로 변환 필요 )
  "english"   : 해당 단어의 영어 단어
  "id"        : 해당 단어의 고유 ID ( 영어 단어를 ID로 사용 )
  "isWord"    : 해당 엔티티가 단어인가 단어장인가 구분하는데 사용( true: 단어 / false: 단어장 )
  "korean"    : 해당 단어의 한글 단어
  "marking"   : 마킹 여부
}

2. Bookshelf
{
  "isWord"    : 해당 엔티티가 단어인가 단어장인가 구분하는데 사용( true: 단어 / false: 단어장 )
  "name"      : 단어장 이름
  "id"        : 단어장 ID ( 단어에서 bookshelf칸에 들어가는 값 )
}
*/

const BookShelfScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [bookshelfName, setBookshelfName] = useState("단어장 이름");

  JSONList = [];
  wordList = [];
  bookshelfList = [];
  getAllWord();
  getBookshelf();
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalText}>단어장 추가</Text>
            </View>
            <View style={styles.inputNameView}>
              <Text style={styles.nameText}> 이름: </Text>
              <TextInput style={styles.nameTextInput} value={bookshelfName} onChangeText={setBookshelfName} />
            </View>
            <View style={styles.modalButton}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => addBookshelf(bookshelfName)}>
                <Text style={styles.textStyle}>확인</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>취소</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.titleView}>
        <Text style={styles.title}> 단어장 목록 </Text>
      </View>
      <View style={styles.listView}>
        <FlatList
          keyExtractor={item => item.id}
          data={bookshelfList}
          renderItem={({item}) => <Item bookshelf={item} />}
          
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          title="단어장 추가"
          onPress={ () => setModalVisible(true) }
        />
      </View>
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
      for( let i = 0; i < stores.length; i++ ){
        JSONList.push( JSON.parse( stores[i][1] ) );
      }
      for( let i = 0; i < JSONList.length; i++ ){
        if( JSONList[i].isWord ){
          wordList.push( JSONList[i] );
        }
      }
    });
  });
};

const getBookshelf = async () => {
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
      stores.map((result, i, store) => {
        // get at each store's key/value so you can work with it
        let key = store[i][0];
        let value = store[i][1];
      });
      for( let i = 0; i < stores.length; i++ ){
        JSONList.push( JSON.parse( stores[i][1] ) );
      }
      for( let i = 0; i < JSONList.length; i++ ){
        if( !JSONList[i].isWord ){
          bookshelfList.push( JSONList[i] );
        }
      }
      if( bookshelfList.length == 0 ){
        AsyncStorage.setItem( '0', JSON.stringify( { 
          'id': "0",  
          'name': "지정 없음", 
          'isWord': false
        } ) );
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

function addBookshelf( name ){
  let id = bookshelfList.length + 1;
  AsyncStorage.setItem( id, JSON.stringify( { 
    'id': id,  
    'name': name, 
    'isWord': false
  } ) );
  console.log( "ON" );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    marginBottom: 20
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    height: "100%"
  },
  titleView: {
    flex: 1
  },
  listView: {
    flex: 5
  },
  buttonView: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "75%",
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
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10
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
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold"
  },
  modalButton: {
    flexDirection: 'row',
  },
  inputNameView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 20
  },
  nameText: {
    fontSize: 20
  },
  nameTextInput: {
    fontSize: 20,
    color: "lightgray"
  }
});

export default BookShelfScreen;
