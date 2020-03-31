import React from 'react';
import { TextInput } from 'react-native';
import { Avatar, colors } from '../design/system';
import styled from 'styled-components/native';

const MainContainer = styled.View`
`

const RowContainer = styled.View`
  align-items: flex-start;
  flex-direction: row;
  padding: 30px;
`

const TextAreaInput = styled.TextInput`
  color: ${colors.white};
  margin-left: 15px;
  padding: 10px;
  flex: 1;
`

function TextArea({ onContentChange, value }: { onContentChange: (text: string) => void; value: string } ) {


  return (
    <MainContainer>
      <RowContainer>
        <Avatar source={{ uri: 'https://res.cloudinary.com/nilomiranda/image/upload/v1585511552/avatar_dpjfur.png' }} />
        <TextAreaInput
          multiline={true}
          editable={true}
          placeholder="What's in your mind?"
          placeholderTextColor={colors.light}
          underlineColorAndroid="transparent"
          maxLength={250}
          onChangeText={(text: string) => onContentChange(text)}
          value={value}
        />
      </RowContainer>
    </MainContainer>
  )
}

export default TextArea;