import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { Post } from '../components/Post';
import { DATA } from '../data';

export const MainScreen = ({ navigation }) => {

  const openPost = post => {
    navigation.navigate('Post', { postId: post.id, date: post.date });
  }
  
  return (
    <View style={styles.main}>
      <FlatList
        data={DATA}
        keyExtractor={post => post.id.toString()}
        renderItem={({ item }) => {
          return (
            <Post post={item} onOpen={() => openPost(item)}/>
          )
        }}
      />
    </View>
  );
}
// Компоненту устанавливаем свойство, которое читается внутри Navigator'a
MainScreen.navigationOptions = {
  headerTitle: 'Мой блог'
}

const styles = StyleSheet.create({
  main: {
    padding: 10
  }
})