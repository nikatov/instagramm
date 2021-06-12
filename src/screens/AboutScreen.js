import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

export const AboutScreen = ({}) => {
  return (
    <View style={styles.main}>
      <Text>Это забавный, но серьезный текст,</Text>
      <Text>описывающий идеологию данного приложения.</Text>
      <Text>Оно призвано объединить людей со всего мира.</Text>
      <Text>Наверное.</Text>
      <Text>Версия приложения: <Text style={styles.version}>1.0.0</Text></Text>
    </View>
  );
}

// Компоненту устанавливаем свойство, которое читается внутри Navigator'a
AboutScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'О приложении',
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
  },
  version: {
    fontFamily: 'open-bold'
  }
})