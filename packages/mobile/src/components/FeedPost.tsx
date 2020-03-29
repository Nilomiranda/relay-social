import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../design/system';
import { Image, Text } from 'react-native';

const MainContainer = styled.View`
  background: ${colors.darkBlue};
  flex-direction: row;
  padding: 10px 50px;
  justify-content: center;
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
`;

function FeedPost() {
  return (
    <MainContainer>
      <Avatar source={{ uri: 'https://res.cloudinary.com/nilomiranda/image/upload/v1585511552/avatar_dpjfur.png' }} />
      <PostWrapper>
        <PostHeader>
          <PostAuthor>Danilo Miranda</PostAuthor>
          <PostDate>July 12, 2020</PostDate>
        </PostHeader>
        <PostContent>
          <PostText>
            This is my first post in this amazing app. And I have to say, this is
            looking really, really awesome. I'm just wondering now, how amazing the person
            who developed this app might be. No, really, think about it!! Look how cool it
            is. The design is clean and amazing, blazing fast app!! I'm loving every piece
            of it! ❤️
          </PostText>
        </PostContent>
      </PostWrapper>
    </MainContainer>
  )
}

export default FeedPost;
