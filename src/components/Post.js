import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';

export const Post = ({post, onOpen}) => {
  return (
    <TouchableOpacity onPress={onOpen}>
      <View style={styles.main}>
        <ImageBackground style={styles.image} source={{uri: post.img}}>
          <View style={styles.textWrap}>
            <Text style={styles.title}>{new Date(post.date).toLocaleDateString()}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    marginBottom: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200
  },
  textWrap: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    alignItems: 'center',
    width: '100%'
  },
  title: {
    color: '#fff',
    fontFamily: 'open-regular'
  }
});