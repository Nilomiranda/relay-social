import React, { useEffect, useLayoutEffect, useState } from 'react';
import { graphql, useFragment } from 'react-relay/hooks';
import { Button, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { Avatar, colors } from '../design/system';
import { format } from 'date-fns';

const MainContainer = styled.ScrollView`
  background: ${colors.darkBlue}
  padding: 40px 20px;
`;

const PostHeader = styled.View`
  flex-direction: row;
`

const PostAuthor = styled.Text`
  flex: 1;
  color: ${colors.white};
  font-weight: bold;
  margin-left: 25px;
`;

const PostDate = styled.Text`
  flex: 1;
  color: ${colors.light};
  margin-left: 25px;
  font-size: 16px;
`;

const PostContent = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  margin-top: 40px;
`;

function PostDetail({ post }) {
  const data = useFragment(
    graphql`
        fragment PostDetail_post on Post {
            content
            createdDate
            user {
                name
            }
        }
    `
    , post.post
  )

  return (
    <MainContainer>
      <PostHeader>
        <Avatar source={{ uri: 'https://res.cloudinary.com/nilomiranda/image/upload/v1585511552/avatar_dpjfur.png' }} />
        <View>
          <PostAuthor>{data.user.name}</PostAuthor>
          <PostDate>Posted in {format(new Date(data.createdDate), 'MMMM dd, yyyy')}</PostDate>
        </View>
      </PostHeader>
      <PostContent>{data.content}</PostContent>
    </MainContainer>
  )
}

export default PostDetail;