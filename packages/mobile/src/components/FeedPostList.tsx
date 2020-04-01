import React from 'react';
import { ScrollView } from 'react-native';
import FeedPost from './FeedPost';
import { graphql, useFragment } from 'react-relay/hooks';

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

  return (
    <ScrollView>
      {
        data?.posts.edges.map(edge => (
          <FeedPost post={edge.node} key={edge.node.id}/>
        ))
      }
    </ScrollView>
  )
}

export default FeedPostList;