import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { AppText, colors } from '../design/system';


const CommentModalWrapper = styled.Modal`
  opacity: 0.9;
`

const CommentModalContent = styled.View`
  height: 50%;
  background: ${colors.white};
  margin-top: auto;
`

const CommentTextArea = styled.TextInput`
  background: ${colors.lighter};
  color: ${colors.blue};
  padding: 20px;
  width: 95%;
  margin: 0 auto;
  margin-top: 25px;
  border-left-width: 4px;
  border-left-color: ${colors.lightBlue};
  height: 70%;
  font-size: 16px;
`

const CommentButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  padding: 0 30px;
  margin-top: 15px;
`

const PostButton = styled.TouchableOpacity`
  padding: 10px 30px;
  background: ${colors.darkBlue};
  border-radius: 6px;
  margin-left: 30px;
`;

const CancelButton = styled.Button`
  color: ${colors.blue};
`;

export interface CommentModalProps {
  modalVisible: boolean;
  setModalVisible: () => void;
}

function CommentModal ({ visible }) {
  const [modalVisible, setModalVisible] = useState(visible);

  return (
    <CommentModalWrapper visible={modalVisible} transparent={true} animationType='slide'>
      <CommentModalContent>
        <CommentTextArea placeholder="Write your comments..." multiline={true} placeholderTextColor={colors.gray}/>
        <CommentButtonsWrapper>
          <CancelButton title="Cancel" onPress={() => {}} />
          <PostButton>
            <AppText color={colors.white} margin="0" onPress={() => { setModalVisible(false) }}>Post</AppText>
          </PostButton>
        </CommentButtonsWrapper>
      </CommentModalContent>
    </CommentModalWrapper>
  )
}

export default CommentModal;