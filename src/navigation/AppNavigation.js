import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';

const PostNavigator = createStackNavigator(
  // Навигация
  {
    Main: MainScreen,
    Post: {
      screen: PostScreen
    },
  },
  // Конфиг
  {
    initialRouteName: 'Main' // экран, который открывается первым (по-умолчанию, первый в навигации)
  });

export const AppNavigation = createAppContainer(PostNavigator);