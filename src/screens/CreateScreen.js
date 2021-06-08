import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

export const CreateScreen = ({}) => {
  return (
    <View style={styles.main}>
      <Text>CreateScreen</Text>
    </View>
  );
}

// Компоненту устанавливаем свойство, которое читается внутри Navigator'a
CreateScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Создание поста',
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
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})