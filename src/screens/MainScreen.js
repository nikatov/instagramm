import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { DATA } from '../data';
import { PostList } from '../components/PostList';

export const MainScreen = ({ navigation }) => {

  const openPostHandler = post => {
    navigation.navigate('Post', {
      postId: post.id,
      date: post.date,
      booked: post.booked
    });
  }
  
  return (
    <PostList
      data={DATA}
      openPostHandler={openPostHandler}
    />
  );
}

// Компоненту устанавливаем свойство, которое читается внутри Navigator'a
MainScreen.navigationOptions = ({ navigation }) => ({
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
        onPress={() => navigation.openDrawer()}
      />
    </HeaderButtons>
  )
})