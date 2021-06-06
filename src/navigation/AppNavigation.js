import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { BookedScreen } from '../screens/BookedScreen';
import { THEME } from '../theme';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

const PostNavigator = createStackNavigator(
  { // Навигация
    Main: MainScreen,
    Post: {
      screen: PostScreen
    },
  },
  { // Конфиг
    // initialRouteName: 'Main', // экран открывается первым по-умолчанию, тк первый в навигации
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
      },
      headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
    },
  });

// Тк страницы списка постов и списка избранных постов идентичны, имеются лишь разные данные,
// то Навигатор необходим чтобы избежать лишнего перерендера лишь изменяя состояние страницы,
// а не открывая новую.
const BookedNavigator = createStackNavigator(
  { // Навигация
    Booked: BookedScreen,
    Post: PostScreen
  },
  { // Конфиг
    // initialRouteName: 'Booked', // экран открывается первым по-умолчанию, тк первый в навигации
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
      },
      headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
    },
  });

// Объединение двух навигаторов
const BottomNavigator = createBottomTabNavigator(
  { // Навигация
  Post: { // Страница по-умолчанию, поэтому первая, чтобы не писать в конфиге 'initialRouteName: Post'
    screen: PostNavigator, // передача навигатора
    navigationOptions: {
      tabBarLabel: 'Все',
      tabBarIcon: info => <Ionicons name='ios-albums' size={25} color={info.tintColor} /> // иконка, соотстветствующая скрину
    }
  },
  Booked: {
    screen: BookedNavigator, // передача навигатора
    navigationOptions: {
      tabBarLabel: 'Избранное',
      tabBarIcon: info => <Ionicons name='ios-star' size={25} color={info.tintColor} /> // иконка, соотстветствующая скрину
    }
  }
},
{ // Конфиг
  tabBarOptions: {
    activeTintColor: THEME.MAIN_COLOR // Цвет иконок и текста под ними
  }
})

export const AppNavigation = createAppContainer(BottomNavigator);