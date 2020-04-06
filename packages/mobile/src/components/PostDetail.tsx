import React, { useEffect, useLayoutEffect, useState } from 'react';
import { graphql, useFragment } from 'react-relay/hooks';
import { Button, Text, View, Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { AppText, Avatar, colors } from '../design/system';
import { format } from 'date-fns';
import CommentIcon from '../assets/icons/comment.svg';
import CommentModal from '../Modals/CommentModal';
// import { Portal, Modal } from 'react-native-paper';

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

const PostInteractionBar = styled.View`
  margin: 20px 0;
  padding: 0 20px;
  flex-direction: row;
  justify-content: flex-end;
`

const Comment = styled(CommentIcon)`
  align-self: flex-end;
`

const CommentWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 30px;
  border-style: dashed;
  border-color: ${colors.lighter};
  border-width: 2px;
`

function PostDetail({ post }) {
  const [modalVisible, setModalVisible] = useState(false);

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

  function openCommentModal() {
    setModalVisible(true);
  }

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
      <PostInteractionBar>
        <CommentWrapper onPress={() => openCommentModal()}>
          <Comment width={20} height={20} fill={colors.white}/>
          <AppText color={colors.white} margin={'0 0 0 7px'}>Comment</AppText>
        </CommentWrapper>
      </PostInteractionBar>

      <CommentModal visible={modalVisible} />


    </MainContainer>
  )
}

export default PostDetail;