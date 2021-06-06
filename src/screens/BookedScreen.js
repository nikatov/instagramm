import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { Post } from '../components/Post';
import { DATA } from '../data';

export const BookedScreen = ({ navigation }) => {

  const openPost = post => {
    navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked});
  }
  
  return (
    <View style={styles.main}>
      <FlatList
        data={DATA.filter(el => el.booked)}
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
BookedScreen.navigationOptions = {
  headerTitle: 'Избранное',
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