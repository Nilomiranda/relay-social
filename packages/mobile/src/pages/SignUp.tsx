import { useNavigation } from '@react-navigation/native';
import { Button, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import createNewUser from '../mutations/signUp';

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

function SignUp() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValidity] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValidity] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsValid, setPasswordsValidity] = useState(true);
  const environment = useRelayEnvironment();

  function handleEmailChange(email: string) {
    setEmail(email);
  }

  function handlePasswordChange(password: string) {
    setPassword(password);
  }

  function handleConfirmPasswordChange(password: string) {
    setConfirmPassword(password);
  }

  function handleNameChange(name: string) {
    setName(name);
  }

  function validatePassword() {
    setPasswordValidity(password.length >= 8);
  }

  function validateBothPasswords() {
    setPasswordsValidity(password === confirmPassword);
  }

  function validateEmail() {
    const rgx = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm

    const matched = email.match(rgx);

    setEmailValidity(!!matched);
  }

  function handleSubmit() {
    validateEmail();
    validateBothPasswords();
    if (!emailValid || !passwordsValid) {
      return;
    }

    createNewUser(environment, { email, password, name });
  }

  return (
    <MainContainer>
      <FormContainer>
        <AppInput
          autoCapitalize="none"
          onChangeText={text => handleNameChange(text)}
          placeholder="Name"
        />

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
          invalid={!passwordsValid || !passwordValid}
          onChangeText={text => handlePasswordChange(text)}
          onBlur={() => validatePassword()}
        />

        {
          passwordValid ?
            <Text/> :
            <ErrorText>Password must contain 8 characters</ErrorText>
        }

        <AppInput
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder="Confirm password"
          invalid={!passwordsValid}
          onChangeText={text => handleConfirmPasswordChange(text)}
          onBlur={() => validateBothPasswords()}
        />

        {
          passwordsValid ?
            <Text /> :
            <ErrorText>Passwords don't match</ErrorText>
        }
      </FormContainer>
      <SignUpButton onPress={() => handleSubmit()}>
        <ButtonLabel onPress={() => { validateBothPasswords(); validateEmail()}}>Create account</ButtonLabel>
      </SignUpButton>
      <SignUpLink>
        Already have an account?
        <AppText color={colors.darkBlue} onPress={() => navigation.navigate('SignIn')}>
          { ' ' }Login
        </AppText>
      </SignUpLink>
    </MainContainer>
  )
}

export default SignUp;