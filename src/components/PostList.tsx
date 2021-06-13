import React from 'react';
import { View, StyleSheet, FlatList, GestureResponderEvent, Text } from 'react-native';
import { Post } from './Post';
import { IPost } from '../interfaces';

interface PostListProps {
  data: IPost[],
  openPostHandler: (post: IPost) => void;
}

export const PostList: React.FC<PostListProps> = ({data, openPostHandler}) => {
  if (!data.length) {
    return (
      <View style={styles.main}>
        <Text style={styles.noItems}>Постов пока нет</Text>
      </View>
    );
  }

  return (
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
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 10
  },
  noItems: {
    fontFamily: 'open-regular',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18
  }
})