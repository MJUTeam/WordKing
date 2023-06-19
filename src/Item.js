import React from 'react';
import {StyleSheet, View, Text, Button, Pressable} from 'react-native';

const Item = ({bookshelf, onPress, onLongPress}) => {
  //console.log( bookshelf)
  return (
    <View style={styles.container}>
        <View style={styles.block}>
            <Pressable
              onPress={ onPress }
              onLongPress={ onLongPress }
              style={styles.btn}
            >
                <Text style={styles.text}>{bookshelf.name}</Text>
            </Pressable>
        </View>
    </View>
  );
};

function deleteBookshelf( id ){
  //console.log( "DEL" + id );
}
function retrieveBookshelf( id ){
  //console.log( "RED" + id );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'center'
  }, 
  btnText: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  block: {
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    width: "95%",
    borderBottomWidth: 1
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    marginHorizontal: 30,
    flex: 3
  },
  btn: {
    marginHorizontal: 30,
    flex: 1
  }
});

export default Item;