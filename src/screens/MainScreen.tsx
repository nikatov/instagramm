import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';
import { loadPosts } from '../store/actions/post';
import { NavigationRoute, NavigationScreenComponent, NavigationScreenProp } from 'react-navigation';
import { useSelector } from '../store/hooks';
import { IPost } from '../interfaces';
import { THEME } from '../theme';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export const MainScreen: NavigationScreenComponent<{}, NavigationScreenProp<NavigationRoute>> = ({ navigation }: { navigation : NavigationScreenProp<NavigationRoute> }) => {

  const openPostHandler = (post: IPost) => {
    navigation.navigate('Post', {
      postId: post.id,
      date: post.date,
      booked: post.booked
    });
  }

  const dispatch = useDispatch();
  // Вызовется, когда весь компонент отрендерится
  useEffect(() => {
    loadPosts()(dispatch);
  }, [])

  const allPosts = useSelector(state => state.post.allPosts)
  const loading = useSelector(state => state.post.loading);
  if (loading) {
    return (
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator
          color={THEME.MAIN_COLOR}
        />
      </View>
    );
  }
  return (
    <PostList
      data={allPosts}
      openPostHandler={openPostHandler}
    />
  );
}

// Компоненту устанавливаем свойство, которое читается внутри Navigator'a
MainScreen.navigationOptions = ({ navigation }: { navigation : any }) => ({
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

const styles = StyleSheet.create({
  indicatorWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});