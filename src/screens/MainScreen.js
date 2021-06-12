import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';
import { loadPosts } from '../store/actions/post';

export const MainScreen = ({ navigation }) => {

  const openPostHandler = post => {
    navigation.navigate('Post', {
      postId: post.id,
      date: post.date,
      booked: post.booked
    });
  }

  const dispatch = useDispatch();
  // Вызовется, когда весь компонент отрендерится
  useEffect(() => {
    dispatch(loadPosts())
  }, [])

  const allPosts = useSelector(state => state.post.allPosts)
  
  return (
    <PostList
      data={allPosts}
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
        onPress={() => navigation.push('CreateFromPost', { noDrawer: true })}
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