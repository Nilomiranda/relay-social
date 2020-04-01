import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
const { installRelayDevTools } = require('relay-devtools');

// @ts-ignore
async function fetchQuery(
  operation: any,
  variables: any,
) {
  const token = await AsyncStorage.getItem('FOTO_TOKEN');
  return fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(async response => {
    const parsedResponse = await response.json();

    // if (parsedResponse.errors) {
    //   return parsedResponse.errors;
    // }
    return parsedResponse;
  })
}

installRelayDevTools();

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;