import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const AboutScreen = ({}) => {
  return (
    <View style={styles.main}>
      <Text>AboutScreen</Text>
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