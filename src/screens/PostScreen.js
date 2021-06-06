import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const PostScreen = ({}) => {
  return (
    <View style={styles.main}>
      <Text>PostScreen</Text>
    </View>
  );
}

PostScreen.navigationOptions = {
  headerTitle: 'Пост номер 42'
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})