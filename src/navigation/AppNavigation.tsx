import React from 'react'
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { BookedScreen } from '../screens/BookedScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { THEME } from '../theme';

const navigationOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
  },
}

type PostStackParamList = {
  Main: undefined,
  Post: undefined,
  CreateFromPost: undefined,
};

const PostNavigator = createStackNavigator(
  { // Навигация
    Main: MainScreen,
    Post: PostScreen,
    CreateFromPost: CreateScreen
  },
  { // Конфиг
    // initialRouteName: 'Main', // экран открывается первым по-умолчанию, тк первый в навигации
    navigationOptions
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
    navigationOptions
  });

// ========== Объединение двух навигаторов (отдельные стеки переходов для Post (все) и Booked (избранное)) ==========

// Конфиг с нижней навигацией между двумя навигаторами
const bottomTabsConfig =
{ // Навигация
  Post: { // Страница по-умолчанию, поэтому первая, чтобы не писать в конфиге 'initialRouteName: Post'
    screen: PostNavigator, // передача навигатора
    navigationOptions: {
      tabBarLabel: 'Все',
      tabBarIcon: (info: any) => <Ionicons name='ios-albums' size={25} color={info.tintColor} /> // иконка, соотстветствующая скрину
    }
  },
  Booked: {
    screen: BookedNavigator, // передача навигатора
    navigationOptions: {
      tabBarLabel: 'Избранное',
      tabBarIcon: (info: any) => <Ionicons name='ios-star' size={25} color={info.tintColor} /> // иконка, соотстветствующая скрину
    }
  }
}

// Функция возвращает нужный BottomNavigator в зависимости от платформы
const getBottomNavigator = () => {
  // Отдельный нижний навигатор для андроида + доп. настройки
  if (Platform.OS === 'android') {
    return createMaterialBottomTabNavigator(bottomTabsConfig, {
      activeColor: '#fff', // Цвет иконок и текста под ними
      shifting: true, // текст только у иконки с выбранным навигатором
      barStyle: {
        backgroundColor: THEME.MAIN_COLOR
      }
    })
  } // Отдельный нижний навигатор для ios + доп. настройки
  else {
    return createBottomTabNavigator(bottomTabsConfig, {
      tabBarOptions: {
        activeTintColor: THEME.MAIN_COLOR // Цвет иконок и текста под ними
      }
    })
  };
}
const BottomNavigator = getBottomNavigator();

const AboutNavigator = createStackNavigator(
  {
    About: AboutScreen
  },
  navigationOptions
);

const CreateNavigator = createStackNavigator(
  {
    Create: CreateScreen
  },
  navigationOptions
);

const MainNavigator = createDrawerNavigator({
  PostTabs: {
    screen: BottomNavigator,
    navigationOptions: {
      drawerLabel: 'Главная'
    }
  },
  Create: {
    screen: CreateNavigator,
    navigationOptions: {
      drawerLabel: 'Новый пост'
    }
  },
  About: {
    screen: AboutNavigator,
    navigationOptions: {
      drawerLabel: 'О приложении'
    }
  },
}, {
  contentOptions: {
    activeTintColor: THEME.MAIN_COLOR,
    labelStyle: {
      fontFamily: 'open-bold'
    }
  }
});

export const AppNavigation = createAppContainer(MainNavigator);