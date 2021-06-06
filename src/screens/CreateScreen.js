import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const CreateScreen = ({}) => {
  return (
    <View style={styles.main}>
      <Text>CreateScreen</Text>
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