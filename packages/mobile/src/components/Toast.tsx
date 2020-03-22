import React, { ReactElement, useState } from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

import { colors } from '../design/system';

const Container = styled.View`
  background: ${colors.black};
  padding: 15px 25px;
  width: 330px;
  border-radius: 6px;
  position: absolute;
  bottom: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const ToastMessage = styled.Text`
  color: ${colors.white};
  font-size: 14px;
`

const ToastClose = styled.Button`
  color: ${colors.white};
`

export interface ToastProps {
  visible: boolean;
  message: string;
  buttonText?: string;
}

function Toast(props: ToastProps) {
  const { message } = props;
  let { visible, buttonText } = props;
  visible = visible || false;
  buttonText = buttonText || 'X';

  const [closed, setClosed] = useState(false);

  function dismissToast() {
    setClosed(true);
  }

  return (
    <>
      {
        visible && !closed ?
          <Container>
            <ToastMessage>{message}</ToastMessage>
            <ToastClose title={buttonText} color={colors.white} onPress={() => dismissToast()} />
          </Container> :
          null
      }

    </>
  )
}

export default Toast;