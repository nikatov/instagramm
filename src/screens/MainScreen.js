import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
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
  headerTitle: 'Мой блог',
  headerRight: () => (
    // AppHeaderIcon выступает в роле компонента для рендера иконки
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item title='Сделать фото' iconName='ios-camera' onPress={() => console.log('press photo')}></Item>
    </HeaderButtons>
  )
}

const styles = StyleSheet.create({
  main: {
    padding: 10
  }
})