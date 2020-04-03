import React, { useLayoutEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay/hooks';
import PostDetail from '../components/PostDetail';

function PostDetailModal({ route, navigation }: { route: any; navigation: any }) {
  const { query, result } = route.params;

  const data = usePreloadedQuery(query, result);


  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Publication',
      headerLeft: () => (
        <Button title="Back" onPress={() => { navigation.goBack() }} />
      ),
    }, [navigation])
  })

  return (
    <PostDetail post={data}/>
  )
}

export default PostDetailModal;