import React, { useEffect, useState, Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert, Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Feed from './pages/Feed';
import AsyncStorage from '@react-native-community/async-storage';
import NewPostModal from './Modals/NewPost';
import PostDetailModal from './Modals/PostDetailModal';

const Stack = createStackNavigator();

function SuspenseFeed() {
  return (
    <Suspense fallback={<Text>Loading posts...</Text>}>
      <Feed />
    </Suspense>
  )
}

const ModalStack = createStackNavigator();

function MainStack({ initialRouteName }: { initialRouteName: string }) {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen name="SignIn" component={SignIn}/>
      <Stack.Screen name="SignUp" component={SignUp}/>
      <Stack.Screen name="Feed" component={SuspenseFeed}/>
    </Stack.Navigator>
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
      <ModalStack.Navigator mode="modal" initialRouteName="main">
        <ModalStack.Screen name="main" options={{ headerShown: false }}>
          { props => <MainStack initialRouteName={initialRouteName} /> }
        </ModalStack.Screen>
        <ModalStack.Screen
          name="NewPostModal"
          component={NewPostModal}
          options={({ navigation }) => (
            {
              headerTitle: props => (<Text { ...props } />)
            }
          )}
        />
        <ModalStack.Screen
          name="PostDetailModal"
          options={({ navigation }) => (
            {
              headerTitle: props => (<Text { ...props } />)
            }
          )}
        >
          { props => (
            <Suspense fallback={<Text>Loading post</Text>}>
              <PostDetailModal { ...props } />
            </Suspense>
          ) }
        </ModalStack.Screen>
      </ModalStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;