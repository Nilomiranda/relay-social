import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Button, Text } from 'react-native';
import { DarkMainContainer } from '../design/system';
import TextArea from '../components/TextArea';
import { Button as DialogButton, Paragraph, Dialog, Portal  } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

function NewPostModal({ navigation }: { navigation: any }) {
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [content, setContent] = useState('');
  const [exitDialogVisible, setExitDialogVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('POST_DRAFT').then(content => {
      if (content) {
        setContent(content);
        setButtonEnabled(true);
      }
    })
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'New posts',
      headerLeft: () => (
        <Button title="Back" onPress={() => { handleBackButtonPress() }} />
      ),
      headerRight: () => (
        <Button title="Publish" onPress={() => { publishNewPost() }} disabled={!buttonEnabled} />
      )
    }, [navigation, setButtonEnabled])
  })

  function handleBackButtonPress() {
    if (content) {
      setExitDialogVisible(true);
    } else {
      setExitDialogVisible(false);
      navigation.goBack();
    }
  }

  function handleContentChange(text: string) {
    setContent(text);
    if (text) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }

  function handleExitConfirmation() {
    setExitDialogVisible(false)
    navigation.goBack();
  }

  function savePostDraft() {
    AsyncStorage.setItem('POST_DRAFT', content);
    setExitDialogVisible(false);
    navigation.goBack();
  }

  function publishNewPost() {
    // clear draft
    AsyncStorage.setItem('POST_DRAFT', '');
    Alert.alert('Published');
    setExitDialogVisible(false);
    navigation.goBack();
  }

  return (
    <DarkMainContainer>
      <TextArea onContentChange={(text: string) => handleContentChange(text)} value={content}/>
      <Portal>
        <Dialog
          visible={exitDialogVisible}
          onDismiss={() => { handleExitConfirmation() }}
        >
          <Dialog.Title>Save draft?</Dialog.Title>
          <Dialog.Actions>
            <DialogButton onPress={() => { savePostDraft() }}>Yes</DialogButton>
            <DialogButton onPress={() => { handleExitConfirmation() }}>No</DialogButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </DarkMainContainer>
  )
}

export default NewPostModal;