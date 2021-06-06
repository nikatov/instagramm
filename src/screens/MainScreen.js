import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { Post } from '../components/Post';
import { DATA } from '../data';

export const MainScreen = ({ navigation }) => {

  const openPost = post => {
    navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked});
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
      <Item
        title='Take photo'
        iconName='ios-camera'
        onPress={() => console.log('press Take photo')}
      />
    </HeaderButtons>
  ),
  headerLeft: () => (
    // AppHeaderIcon выступает в роле компонента для рендера иконки
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title='Toggle Drawer'
        iconName='ios-menu'
        onPress={() => console.log('press Toggle Drawer')}
      />
    </HeaderButtons>
  )
}

const styles = StyleSheet.create({
  main: {
    padding: 10
  }
})