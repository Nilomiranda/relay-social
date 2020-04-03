import React from 'react';
import styled from 'styled-components/native';
import { Avatar, colors } from '../design/system';
import { Image, Text, TouchableWithoutFeedback } from 'react-native';
import { graphql, preloadQuery, useFragment, usePreloadedQuery, useRelayEnvironment } from 'react-relay/hooks';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const MainContainer = styled.View`
  background: ${colors.darkBlue};
  flex-direction: row;
  padding: 10px 20px;
  justify-content: flex-start;
  margin-top: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray};
`

const PostWrapper = styled.View`
  padding: 10px;
  padding-top: 0;
`;

const PostHeader = styled.View`
`;

const PostContent = styled.View`
`;

const PostAuthor = styled.Text`
  color: ${colors.white};
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 7px;
`;

const PostDate = styled.Text`
  color: ${colors.light};
  font-size: 13px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  color: ${colors.white};
  font-size: 14px;
  text-align: left;
  flex-shrink: 1;
`;

function FeedPost({ post }: { post: any }) {
  const navigation = useNavigation();
  const environment = useRelayEnvironment();

   const postQuery = graphql`
    query FeedPostQuery($id: String!) {
        post(id: $id) {
            ...PostDetail_post
        }
    }
   `

  function handlePostClick(postId: number) {
    const result = preloadQuery(
      environment,
      postQuery,
      { id: postId },
      { fetchPolicy: 'store-or-network' }
    )

    navigation.navigate('PostDetailModal', { result, query: postQuery });
  }

  return (
    <TouchableWithoutFeedback onPress={() => { handlePostClick(post.id) }}>
      <MainContainer>
        <Avatar source={{ uri: 'https://res.cloudinary.com/nilomiranda/image/upload/v1585511552/avatar_dpjfur.png' }} />
        <PostWrapper>
          <PostHeader>
            <PostAuthor>{post.user.name}</PostAuthor>
            <PostDate>{format(new Date(post.createdDate), 'MMM dd, yyyy')}</PostDate>
          </PostHeader>
          <PostContent>
            <PostText>{post.content}</PostText>
          </PostContent>
        </PostWrapper>
      </MainContainer>
    </TouchableWithoutFeedback>
  )
}

export default FeedPost;
