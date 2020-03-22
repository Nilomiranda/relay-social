import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import Reactotron from 'reactotron-react-native';

// @ts-ignore
function fetchQuery(
  operation: any,
  variables: any,
) {
  return fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;