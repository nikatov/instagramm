import React from 'react';
import { NavigationParams, NavigationRoute, NavigationRouteConfig, NavigationScreenComponent, NavigationScreenProp, NavigationSwitchScreenComponent } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { StackNavigationOptions, StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';
import { IPost } from '../interfaces';
import { useSelector } from '../store/hooks';

export const BookedScreen: NavigationScreenComponent<{}, NavigationScreenProp<NavigationRoute>> = ({ navigation }: { navigation : NavigationScreenProp<NavigationRoute> }) => {
  const openPostHandler = (post: IPost) => {
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
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
    </HeaderButtons>
  )
})