import React, { useEffect } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function Feed(): JSX.Element {
  // useEffect(() => {
  //   AsyncStorage.clear();
  // }, [])
  return (
    <Text>Hi from feed</Text>
  )
}

export default Feed;