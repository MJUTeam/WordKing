import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, TextInput, Button, FlatList, Modal, Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Item from '../src/Item';

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
  const [bookshelfModalVisible, setBookshelfModalVisible] = useState( false );
  const [modifyModalVisible, setModifyModalVisible] = useState( false );
  const [bookshelfName, setBookshelfName] = useState("");
  const [bookshelfList, setBookshelfList] = useState([]);
  const [wordList, setWordList] = useState([]);
  const [selectedID, setSelectedID] = useState("0");
  const [tempList, setTempList] = useState();
  const [selectedBookshelf, setSelectedBookshelf] = useState("");
  const [tempBookshelfName, setTempBookshelfName] = useState("");
  const [modifyedBookshelfID, setModifyedBookshelfID] = useState();

  const deleteBookshelfAlert = () => 
    Alert.alert('단어장 삭제', '삭제가 완료되었습니다', [
    {
      text: '확인',
      onPress: () => console.log('OnPress'),
      style: 'cancel',
    },
  ]);

  JSONList = [];
  useEffect(() => {
    getAllWord();
    getBookshelf();
  }, []);

  function getAllWord() {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        const parsedStores = stores.map(([key, value]) => JSON.parse(value));
        const words = parsedStores.filter(item => item.isWord);
        const bookshelves = parsedStores.filter(item => !item.isWord);

        setWordList(words);
        setBookshelfList(bookshelves);
      });
    });
  }

  function getBookshelf() {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        const parsedStores = stores.map(([key, value]) => JSON.parse(value));
        const bookshelves = parsedStores.filter(item => !item.isWord);

        setBookshelfList(bookshelves);
      });
    });
  }

  function getBookshelfById( id ){
    AsyncStorage.getItem(id)
      .then(value => {
        const info = JSON.parse(value);
        setSelectedBookshelf( info.name );
        getBookshelfWords( info.name );
      })
      .catch(error => console.log(error));
  }
  function getBookshelfWords( id ){
    console.log( id );
    var temp = wordList.filter( word => id==word.bookshelf );
    setTempList( temp );
  }

  const clickAddButoon = ( name ) => {
    addBookshelf( name ); 
    setModalVisible(!modalVisible);
  }

  const clickBookshelf = ( item ) => {
    setSelectedID( item.id );
    openBookshelfModal( item.name );
    getBookshelfById( item.id );
  }


  function addBookshelf(name) {
    const id = bookshelfList.length;
    const newBookshelf = {
      id: id.toString(),
      name: name,
      isWord: false
    };
    
    AsyncStorage.setItem(id.toString(), JSON.stringify(newBookshelf))
      .then(() => {
        setBookshelfList(prevList => [...prevList, newBookshelf]);
        console.log("ON");
      })
      .catch(error => console.log(error));
  }

  function deb(){
    console.log( wordList );
    console.log( bookshelfList );
  }

  function openBookshelfModal( id ){
    setBookshelfModalVisible( !bookshelfModalVisible );
  }

  function deleteBookshelf(){
    console.log( selectedID );
    if( selectedID == 0 ){
      console.log( "Default 단어장은 삭제할 수 없습니다.");
    }
    else {
      AsyncStorage.removeItem( selectedID );
      deleteBookshelfAlert();
    }
    getBookshelf();
    setBookshelfModalVisible( !bookshelfModalVisible );
  }

  function modifyBookshelf( item ){
    /*
    if( item.id == 0 ){
      console.log( "기본 단어장은 수정할 수 없습니다" );
    } else {
      setModifyedBookshelfID( item.id );
      setTempBookshelfName( item.name );
      setModifyModalVisible(!modifyModalVisible);
    } 
    */
  }

  function modifyText(){
    /*
    AsyncStorage.getItem( modifyedBookshelfID )
      .then(value => {
        const info = JSON.parse(value);
        console.log( info );

        AsyncStorage.removeItem( info.id );
        const newBookshelf = {
          id: info.id,
          name: tempBookshelfName,
          isWord: false
        };
        
        AsyncStorage.setItem(info.id, JSON.stringify(newBookshelf))
          .then(() => {
            setBookshelfList(prevList => [...prevList, newBookshelf]);
            console.log("MODIFY");
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
      */
  }

  return (
    <View style={styles.container}>
      { /* 단어장 추가 모달 */ }
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
              <TextInput style={styles.nameTextInput} placeholder="단어장 이름" value={bookshelfName} onChangeText={setBookshelfName} />
            </View>
            <View style={styles.modalButton}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => clickAddButoon(bookshelfName)}>
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
      
      { /* 단어장 단어 목록 모달 */ }
      <Modal
        animationType="slide"
        transparent={true}
        visible={bookshelfModalVisible}
        onRequestClose={() => {
          setModalVisible(!bookshelfModalVisible);
        }}>
        
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.bookshelfModalTitle}>
              <Text style={styles.bookshelfTitleText}> { selectedBookshelf }</Text>
            </View>
            <View style={styles.bookshelfModalContent}>
              <FlatList 
                data={ tempList }
                renderItem={ 
                  ({item}) => 
                    <View style={styles.wordListView}>
                      <View style={styles.koreanView}>
                        <Text style={styles.wordItem}> {item.korean} </Text>
                      </View>
                      <View style={styles.classView}>
                        <Text style={styles.wordClassItem}> {item.class} </Text>
                      </View>
                      <View style={styles.englishView}>
                        <Text style={styles.wordItem}> {item.english} </Text>
                      </View>
                    </View>
                }
              />
            </View>
            <View style={styles.bookshelfModalButton}>
                <Pressable
                  style={[styles.button, styles.buttonDelete]}
                  onPress={() => deleteBookshelf()}>
                  <Text style={styles.textStyle}>삭제</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setBookshelfModalVisible(!bookshelfModalVisible)}>
                  <Text style={styles.textStyle}>닫기</Text>
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
          renderItem={({item}) => <Item bookshelf={item} onLongPress={() => modifyBookshelf(item)} onPress={() => clickBookshelf(item)} />}
        />
      </View>
      <View style={styles.buttonView}>
      <Pressable
          style={[styles.button, styles.buttonAdd]}
          onPress={() => setModalVisible(true) }>
          <Text style={styles.textStyle}>단어장 추가</Text>
        </Pressable>  
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
    margin: 10,
    width: "75%",
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
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
    backgroundColor: 'gray',
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
    color: "gray"
  },
  bookshelfModalTitle: {
    height: "10%",
    justifyContent: "center"
  },
  bookshelfModalContent: {
    height: "70%"
  },
  bookshelfModalButton: {
    flexDirection: 'row'
  },
  buttonModify: {
    backgroundColor: 'green',
  },
  buttonDelete: {
    backgroundColor: 'red',
  },
  bookshelfTitleText: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  wordItem: {
    margin: 10,
    fontSize: 20
  },
  modifyContentInput: {
    color: 'gray',
    fontSize: 20
  },
  modifyContentText: {
    fontSize: 20
  },
  modifyTitleText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  modifyContent: {
    flexDirection: 'row',
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modifyContentInputView: {
    width: "50%"
  },
  modifyButton: {
    flexDirection: "row",
    margin: 5
  },
  modifyModalButton: {
    backgroundColor: "blue"
  },
  modifyTitle: {
    margin: 10
  },
  buttonAdd: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  wordListView: {
    flexDirection: 'row',
    width: "100%"
  },
  koreanView: {
    
  },
  englishView: {
    
  },
  classView: {
    
  },
  wordClassItem: {
    color: 'gray',
    margin: 10,
    marginRight: 30,
    marginLeft: 5,
    fontSize: 20
  }
});

export default BookShelfScreen;
