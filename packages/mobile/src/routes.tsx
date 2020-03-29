import React, { useEffect, useState, Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Feed from './pages/Feed';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

function SuspenseFeed() {
  return (
    <Suspense fallback={<Text>Loading posts...</Text>}>
      <Feed />
    </Suspense>
  )
}

function Routes() {
  // const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('FOTO_TOKEN').then(token => {
      if (token) {
        setInitialRouteName('Feed');
        setLoading(false);
      } else {
        setInitialRouteName('SignIn');
        setLoading(false);
      }
    })
  }, [])

  if (loading) {
    return (
      <Text>Loading...</Text>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Feed" component={SuspenseFeed}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;