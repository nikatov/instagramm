import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const PostScreen = ({ navigation }) => {
  const postId = navigation.getParam('postId');
  return (
    <View style={styles.main}>
      <Text>{postId}</Text>
    </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  }
})