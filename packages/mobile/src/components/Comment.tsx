import React from 'react';
import styled from 'styled-components/native';
import { Avatar, colors } from '../design/system';

const MainContainer = styled.View`
  border-bottom-width: 2px;
  border-bottom-color: ${colors.lighter};
  padding-bottom: 20px;
  margin-bottom: 30px;
`;

const CommentHeader = styled.View`
  flex-direction: row;
`

const CommentHeaderInfo = styled.View`
  align-items: flex-start;
  margin-left: 15px;
`;

const CommentAuthor = styled.Text`
  color: ${colors.white};
  font-size: 15px;
  margin-bottom: 10px;
`;

const CommentDate = styled.Text`
  color: ${colors.lightBlue};
  font-weight: bold;
  font-size: 11px;
`;

const CommentContentContainer = styled.View`
  margin-top: 25px;
`;

const CommentContent = styled.Text`
  color: ${colors.white};
  font-size: 16px;
`;

function Comment() {
  return (
    <MainContainer>
      <CommentHeader>
        <Avatar source={{ uri: 'https://res.cloudinary.com/nilomiranda/image/upload/v1585511552/avatar_dpjfur.png' }} />
        <CommentHeaderInfo>
          <CommentAuthor>Danilo Miranda says:</CommentAuthor>
          <CommentDate>April 6th, 2020</CommentDate>
        </CommentHeaderInfo>
      </CommentHeader>
      <CommentContentContainer>
        <CommentContent>
          Man, I have to say, this is the best comment I've ever seen in my entire life.
          No really, and come to think of it... with such a greatly created app like this one
          we are using, the least we can do is leave a great comment (like this one) in all
          posts!! This APP ROCKSS!!!! 🚀🚀🚀🚀
        </CommentContent>
      </CommentContentContainer>
    </MainContainer>
  )
}

export default Comment;