import React from 'react';
import Comment from './Comment';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { graphql, useFragment } from 'react-relay/hooks';
import { AppText, colors } from '../design/system';

const MainContainer = styled.View`
  margin-top: 40px;
`;

function CommentsList({ comments }) {
  const data = useFragment(
    graphql`
        fragment CommentsList_comments on CommentsConnection {
            edges {
                node {
                    id
                    content
                    createdDate
                    user {
                        name
                    }
                }
                cursor
            }
        }
    `, comments
  )

  if (data.edges.length === 0) {
    return (
      <MainContainer>
        <AppText color={colors.white}>This post has no comments 😢</AppText>
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      {
        data?.edges.map((edge: any) => (<Comment comment={edge} key={edge.id}/>))
      }
    </MainContainer>
  )
}

export default CommentsList;