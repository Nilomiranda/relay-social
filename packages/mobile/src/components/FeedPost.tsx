import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../design/system';
import { Image, Text } from 'react-native';
import { graphql, useFragment } from 'react-relay/hooks';
import { format } from 'date-fns';

const MainContainer = styled.View`
  background: ${colors.darkBlue};
  flex-direction: row;
  padding: 10px 20px;
  justify-content: flex-start;
  margin-top: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray};
`

const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
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

  return (
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
  )
}

export default FeedPost;
