import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationRoute, NavigationScreenComponent, NavigationScreenConfig, NavigationScreenConfigProps, NavigationScreenProp } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PhotoPicker } from '../components/PhotoPicker';
import { IPostData } from '../interfaces';
import { addPost } from '../store/actions/post';
import { THEME } from '../theme';




export const CreateScreen: NavigationScreenComponent<{}, NavigationScreenProp<NavigationRoute>> = ({ navigation }: { navigation : NavigationScreenProp<NavigationRoute> }) => {
  const [text, setText] = useState('');
  const [img, setImg] = useState<string | null>(null)

  const dispatch = useDispatch();
  const saveHandler = () => {
    const post: IPostData = {
      date: new Date().toJSON(),
      text: text,
      img: img as string,
      booked: false
    }
    addPost(post)(dispatch);
    navigation.navigate('Main');
  }

  const photoPickHandler = (uri: string) => {
    setImg(uri)
  }
  
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.main}>
          <Text>Создай новый пост</Text>
          <TextInput
            style={styles.textArea}
            placeholder='Введите текст поста'
            value={text}
            onChangeText={setText}
            multiline
          />
          <PhotoPicker
            onPick={photoPickHandler}
          />
          <Button
            title='Создать пост'
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
            disabled={!text || !img}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

// Компоненту устанавливаем свойство, которое читается внутри Navigator'a
CreateScreen.navigationOptions = ({ navigation }) => {
  let optinos: any = {
    headerTitle: 'Создание поста',
  }
  const noDrawer = navigation.getParam('noDrawer');
  if (!noDrawer) {
    optinos.headerLeft = () => (
      // AppHeaderIcon выступает в роле компонента для рендера иконки
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Toggle Drawer'
          iconName='ios-menu'
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      </HeaderButtons>
    )
  }
  return optinos;
}

const styles = StyleSheet.create({
  main: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-regular',
    marginVertical: 10
  },
  textArea: {
    padding: 10,
    marginBottom: 10,
  }
})