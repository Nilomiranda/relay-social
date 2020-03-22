import styled from 'styled-components/native';

export const colors = {
  darkBlue: '#204051',
  blue: '#3b6978',
  lightBlue: '#84a9ac',
  lighterBlue: '#cae8d5',

  dark: '#52524e',
  gray: '#9a9b94',
  light: '#d4d6c8',
  lighter: '#e9e9e5',

  black: '#000',
  white: '#FFF',

  red: '#ff677d',
  redLight: '#ffae8f',
}

// common components
interface TextProps {
  color: string;
}

export const AppText = styled.Text<TextProps>`
  color: ${({ color }) => color || colors.black};
`

export const ErrorText = styled.Text`
  color: ${colors.red};
  margin: 10px 0;
`