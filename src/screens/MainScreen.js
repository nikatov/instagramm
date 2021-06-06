import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export const MainScreen = ({ navigation }) => {

  const goToPost = () => {
    navigation.navigate('Post');
  }
  return (
    <View style={styles.main}>
      <Text>MainScreen</Text>
      <Button title='go to post' onPress={goToPost}/>
    </View>
  );
}
// Компоненту устанавливаем свойство, которое читается внутри Navigator'a
MainScreen.navigationOptions = {
  headerTitle: 'Мой блог'
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})