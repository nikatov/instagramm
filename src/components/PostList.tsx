import React from 'react';
import { View, StyleSheet, FlatList, GestureResponderEvent } from 'react-native';
import { Post } from './Post';
import { IPost } from '../interfaces';

interface PostListProps {
  data: IPost[],
  openPostHandler: (post: IPost) => void;
}

export const PostList: React.FC<PostListProps> = ({data, openPostHandler}) => (
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