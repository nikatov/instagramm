import React, { useCallback, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { THEME } from '../theme';
import { removePost, toggleBooked } from '../store/actions/post';

export const PostScreen = ({ navigation }) => {
  const postId = navigation.getParam('postId');
  // получение текущего поста
  const allPosts = useSelector(state => state.post.allPosts)
  const post = allPosts.find(el => el.id === postId);

  // Определение находится ли текущий пост в избранном или нет
  const bookedPosts = useSelector(state => state.post.bookedPosts)
  const booked = bookedPosts.some(post => post.id === postId); // some возвращает true, если хотя бы один удовлетворяет условию
  // Передача флага booked в navigation
  useEffect(() => {
    navigation.setParams({ booked })
  }, [booked])

  // useEffetc зависит от toggleHandler => произойдет зацикливание, тк при перерисовке функция пересоздается (изменяется)
  // чтобы она не изменялась каждый раз при перерисовке используется useCallback с параметрами, изменение которых приведет
  // к изменению функции toggleHandler
  const dispatch = useDispatch();
  const toggleHandler = useCallback(
    () => dispatch(toggleBooked(postId)),
    [postId]
  );
  // useEffect используется для передачи toggleHandler в navigation
  // при изменении postId произойдет изменение toggleHandler
  // при изменении toggleHandler новый toggleHandler передастся в navigation
  useEffect(() => {
    navigation.setParams({ toggleHandler })
  }, [toggleHandler])

  const removeHandler = () => (
    Alert.alert(
      'Внимание!',
      'Вы уверены, что хотите удалить пост?',
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        {
          text: 'Удалить',
          onPress: () => {
            navigation.pop()
            dispatch(removePost(postId)
          )},
          style: 'danger'
        }
      ],
      { cancelable: false } // чтобы нельзя было закрыть окно по бекграунду
    )
  )

  if(!post) {
    return null;
  }

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
  const booked = navigation.getParam('booked')
  const iconName = booked ? 'ios-star' : 'ios-star-outline';
  const toggleHandler = navigation.getParam('toggleHandler');
  return ({
    headerTitle: 'Пост от ' + new Date(date).toLocaleDateString(),
    headerRight: () => (
      // AppHeaderIcon выступает в роле компонента для рендера иконки
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Star'
          iconName={iconName}
          onPress={toggleHandler}
        />
      </HeaderButtons>
    ),
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