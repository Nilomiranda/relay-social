import React from 'react';
import Comment from './Comment';
import { View } from 'react-native';
import styled from 'styled-components/native';

const MainContainer = styled.View`
  margin-top: 40px;
`;

function CommentsList() {
  return (
    <MainContainer>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </MainContainer>
  )
}

export default CommentsList;