import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SignIn() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>SignIn</Text>
      <Button title="Go to sign up" onPress={() => { navigation.navigate('SignUp') }} />
    </View>
  )
}

function SignUp() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>SignUp</Text>
      <Button title="Go to sign in" onPress={() => { navigation.navigate('SignIn') }} />
    </View>
  )
}

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;