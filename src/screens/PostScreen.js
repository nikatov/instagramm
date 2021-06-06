import React from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import { DATA } from '../data';
import { THEME } from '../theme';

export const PostScreen = ({ navigation }) => {
  const postId = navigation.getParam('postId');
  const post = DATA.find(el => el.id === postId);

  const removeHandler = () => (
    Alert.alert(
      'Удаление поста',
      'Вы уверены, что хотите удалить пост?',
      [
        {
          text: 'Отмена',
          onPress: () => console.log('Отменено удаление'),
          style: 'cancel'
        },
        {
          text: 'Удалить',
          onPress: () => console.log('Удаление поста'),
          style: 'danger'
        }
      ],
      { cancelable: false } // чтобы нельзя было закрыть окно по бекграунду
    )
  )

  return (
    <ScrollView style={styles.main}>
      <Image style={styles.image} source={{uri: post.img}} />
      <View style={styles.textWrap}>
        <Text style={styles.text}>{post.text}</Text>
      </View>
      <Button
        title='Удалить'
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </ScrollView>
  );
}

PostScreen.navigationOptions = ({ navigation }) => {
  const date = navigation.getParam('date');
  return ({
    headerTitle: 'Пост от ' + new Date(date).toLocaleDateString()
  });
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200
  },
  textWrap: {
    padding: 10
  },
  text: {
    fontFamily: 'open-regular'
  }
})