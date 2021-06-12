import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';

export const BookedScreen = ({ navigation }) => {

  const openPostHandler = post => {
    navigation.navigate('Post', {
      postId: post.id,
      date: post.date,
      booked: post.booked
    });
  }

  const bookedPosts = useSelector(state => state.post.bookedPosts)

  return (
    <PostList
      data={bookedPosts}
      openPostHandler={openPostHandler}
    />
  );
}

// Компоненту устанавливаем свойство, которое читается внутри Navigator'a
BookedScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Избранное',
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