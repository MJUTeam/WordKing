import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Item = ({bookshelf}) => {
  console.log( bookshelf)
  return (
    <View style={styles.container}>
        <View style={styles.block}>
            <Text style={styles.text}>{bookshelf.name}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  block: {
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 10
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30
  },
});

export default Item;