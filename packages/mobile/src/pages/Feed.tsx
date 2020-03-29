import React, { useEffect, Suspense } from 'react';
import FeedPostList from '../components/FeedPostList';

import { DarkMainContainer } from '../design/system';
import { graphql, preloadQuery, usePreloadedQuery, useRelayEnvironment } from 'react-relay/hooks';

function Feed(): JSX.Element {
  const environment = useRelayEnvironment();

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
    <Suspense fallback={"Loading posts..."}>
      <DarkMainContainer>
        {
          posts ? (<FeedPostList posts={posts} />) : null
        }
      </DarkMainContainer>
    </Suspense>

  )
}

export default Feed;