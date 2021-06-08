import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Post } from './Post';

export const PostList = ({data, openPostHandler}) => (
  <View style={styles.main}>
    <FlatList
      data={data}
      keyExtractor={post => post.id.toString()}
      renderItem={({ item }) => {
        return (
          <Post post={item} onOpen={() => openPostHandler(item)}/>
        )
      }}
    />
  </View>
)

const styles = StyleSheet.create({
  main: {
    padding: 10
  }
})