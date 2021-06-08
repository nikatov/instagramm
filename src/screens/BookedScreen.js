import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';
import { DATA } from '../data';

export const BookedScreen = ({ navigation }) => {

  const openPostHandler = post => {
    navigation.navigate('Post', {
      postId: post.id,
      date: post.date,
      booked: post.booked
    });
  }
  
  return (
    <PostList
      data={DATA.filter(el => el.booked)}
      openPostHandler={openPostHandler}
    />
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