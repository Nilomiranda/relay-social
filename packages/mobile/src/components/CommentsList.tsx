import React from 'react';
import Comment from './Comment';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { graphql, useFragment } from 'react-relay/hooks';
import { AppText, colors } from '../design/system';
import Reactotron from 'reactotron-react-native';

const MainContainer = styled.View`
  margin-top: 40px;
`;

function CommentsList(props) {
  const data = useFragment(
    graphql`
        fragment CommentsList_comments on Post 
        @argumentDefinitions(first: { type: "Float", defaultValue: 10 }) {
            comments (first: $first) @connection(key: "Post_comments") {
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
        }
    `, props.comments
  )


  if (data?.comments.edges.length === 0) {
    return (
      <MainContainer>
        <AppText color={colors.white}>This post has no comments 😢</AppText>
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      {
        data?.comments.edges.map((edge: any) => (<Comment comment={edge} key={edge.node.id}/>))
      }
    </MainContainer>
  )
}

export default CommentsList;