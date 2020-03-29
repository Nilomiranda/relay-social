import { useNavigation } from '@react-navigation/native';
import { Button, Text, TextInput, View, Alert } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import login, { LoginResponse } from '../mutations/SignIn';
import AsyncStorage from '@react-native-community/async-storage';

// design system
import { AppText, colors, ErrorText } from '../design/system';
import { useRelayEnvironment } from 'react-relay/hooks';

// styles
const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background: ${colors.lighter};
`

const SignUpButton = styled.TouchableOpacity`
  background: ${colors.darkBlue};
  padding: 10px 30px;
  width: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin: 20px 0;
`

const ButtonLabel = styled.Text`
  color: ${colors.lighterBlue};
  font-weight: bold;
  font-size: 14px;
`

const SignUpLink = styled.Text`
  margin: 30px 0;
`

const FormContainer = styled.View`
  align-items: center;
  justify-content: space-between;
`

const AppInput = styled.TextInput<{ invalid?: boolean }>`
  padding: 10px 30px;
  padding-left: 10px;
  width: 300px;
  justify-content: center;
  align-items: center;
  background: ${({ invalid }) => invalid ? colors.redLight : colors.lighter};
  border-bottom-width: 1px;
  border-bottom-color: ${({ invalid }) => invalid ? colors.red : colors.darkBlue};
  margin: 15px 0;
  color: ${({ invalid }) => invalid ? colors.red : colors.blue};
  font-weight: bold;
`

function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValidity] = useState(true);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const environment = useRelayEnvironment();

  function handleEmailChange(email: string) {
    setEmail(email);
  }

  function handlePasswordChange(password: string) {
    setPassword(password);
  }

  function validateEmail() {
    const rgx = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm

    const matched = email.match(rgx);

    setEmailValidity(!!matched);
  }

  function handleSubmit() {
    login(environment, { email, password }, handleSessionCreation, handleErrors)
  }

  async function handleSessionCreation(res: LoginResponse) {
    setLoginError('');
    const { token } = res.login;
    await AsyncStorage.setItem('FOTO_TOKEN', token);
    navigateToFeed();
  }

  function handleErrors() {
    setLoginError('Invalid credentials');
  }

  function navigateToFeed() {
    navigation.navigate('Feed');
  }

  return (
    <MainContainer>
      <FormContainer>
        <AppInput
          autoCapitalize="none"
          onChangeText={text => handleEmailChange(text)}
          placeholder="Email"
          onBlur={() => validateEmail()}
          invalid={!emailValid}
        />

        {
          emailValid ?
            <Text /> :
            <ErrorText>Invalid email</ErrorText>
        }

        <AppInput
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={text => handlePasswordChange(text)}
        />
      </FormContainer>
      <SignUpButton onPress={() => handleSubmit()}>
        <ButtonLabel>Login</ButtonLabel>
      </SignUpButton>
      {
        loginError ?
          <ErrorText>{loginError}</ErrorText> : null
      }
      <SignUpLink>
        Don't have an account?
        <AppText color={colors.darkBlue} onPress={() => navigation.navigate('SignUp')}>
          { ' ' }Create one
        </AppText>
      </SignUpLink>
    </MainContainer>
  )
}

export default SignIn;