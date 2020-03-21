import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import React from 'react';

function SignUp() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>SignUp</Text>
      <Button title="Go to sign in" onPress={() => { navigation.navigate('SignIn') }} />
    </View>
  )
}

export default SignUp;