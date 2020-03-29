import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import FeedPost from '../components/FeedPost';

import { DarkMainContainer } from '../design/system';

function Feed(): JSX.Element {
  return (
    <DarkMainContainer>
      <ScrollView>
        <FeedPost/>
        <FeedPost/>
        <FeedPost/>
        <FeedPost/>
        <FeedPost/>
        <FeedPost/>
      </ScrollView>
    </DarkMainContainer>
  )
}

export default Feed;