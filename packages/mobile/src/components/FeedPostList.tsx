import React from 'react';
import { ScrollView, Text } from 'react-native';
import FeedPost from './FeedPost';
import { graphql, useFragment } from 'react-relay/hooks';
import { AppText, colors } from '../design/system';

function FeedPostList(props: any) {

  console.log('posts in feed post list -> ', props);

  const data = useFragment(
    graphql`
        fragment FeedPostList_posts on Query
        @argumentDefinitions(first: { type: "Float", defaultValue: 5 }) {
            posts (first: $first) @connection(key: "Feed_posts") {
                edges {
                    node {
                        user {
                            name
                        }
                        content
                        createdDate
                        id
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    `, props.posts
  )

  console.log('data ->', data);

  if (data?.posts.edges.length === 0) {
    return <AppText color={colors.white} textAlign='center'>No posts to show 😢</AppText>
  }

  return (
    <ScrollView>
      {
        data?.posts.edges.map((edge: any) => (
          <FeedPost post={edge.node} key={edge.node.id}/>
        ))
      }
    </ScrollView>
  )
}

export default FeedPostList;