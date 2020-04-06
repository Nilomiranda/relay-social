import React from 'react';
import styled from 'styled-components/native';
import { Avatar, colors } from '../design/system';
import { format } from "date-fns";

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

function Comment({ comment }) {
  return (
    <MainContainer>
      <CommentHeader>
        <Avatar source={{ uri: 'https://res.cloudinary.com/nilomiranda/image/upload/v1585511552/avatar_dpjfur.png' }} />
        <CommentHeaderInfo>
          <CommentAuthor>Danilo Miranda says:</CommentAuthor>
          <CommentDate>{format(new Date(comment.node.createdDate), 'MMMM dd, yyyy')}</CommentDate>
        </CommentHeaderInfo>
      </CommentHeader>
      <CommentContentContainer>
        <CommentContent>{ comment.node.content }</CommentContent>
      </CommentContentContainer>
    </MainContainer>
  )
}

export default Comment;