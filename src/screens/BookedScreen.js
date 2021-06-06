import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const BookedScreen = ({}) => {
  return (
    <View style={styles.main}>
      <Text>BookedScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})