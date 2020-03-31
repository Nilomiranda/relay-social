import React, { useEffect, Suspense } from 'react';
import FeedPostList from '../components/FeedPostList';
import styled from 'styled-components/native';
import { FAB } from 'react-native-paper';
import { DarkMainContainer } from '../design/system';
import { graphql, preloadQuery, usePreloadedQuery, useRelayEnvironment } from 'react-relay/hooks';
import { useNavigation } from '@react-navigation/native';

const NewPostFAB = styled(FAB)`
  position: absolute;
  right: 30px;
  bottom: 40px;
`

function Feed(): JSX.Element {
  const environment = useRelayEnvironment();
  const navigation = useNavigation();

  const postsQuery = graphql`
    query FeedQuery {
        posts {
            ...FeedPostList_posts
        }
    }
  `

  const result = preloadQuery(
    environment,
    postsQuery,
    {},
    { fetchPolicy: 'store-or-network' }
  )

  const posts = usePreloadedQuery(postsQuery, result);

  return (
      <DarkMainContainer>
        {
          posts ? (<FeedPostList posts={posts} />) : null
        }
        <NewPostFAB
          small
          icon={require('../assets/icons/add_black.png')}
          onPress={() => navigation.navigate('NewPostModal')}
        />
      </DarkMainContainer>

  )
}

export default Feed;