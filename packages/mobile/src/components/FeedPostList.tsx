import React from 'react';
import { ScrollView } from 'react-native';
import FeedPost from './FeedPost';
import { graphql, useFragment } from 'react-relay/hooks';

function FeedPostList(props: any) {
  const data = useFragment(
    graphql`
        fragment FeedPostList_posts on PostsConnection {
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
        }
    `, props.posts.posts
  )

  return (
    <ScrollView>
      {
        data?.edges.map(edge => (
          <FeedPost post={edge.node} key={edge.node.id}/>
        ))
      }
    </ScrollView>
  )
}

export default FeedPostList;