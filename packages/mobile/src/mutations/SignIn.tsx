import { commitMutation, graphql } from 'react-relay';
import Reactotron from 'reactotron-react-native';

export interface LoginInput {
  email: string;
  password: string;
}

const signInMutation = graphql`
    mutation SignInMutation (
        $input: LoginInput!
    ) {
        login(loginInput: $input) {
            token,
            user {
                email
                name,
            }
        }
    }
`

function login(environment: any, input: LoginInput, onComplete: () => void, onError: () => void) {
  commitMutation(
    environment,
    {
      mutation: signInMutation,
      variables: { input },
      onCompleted: (res, err) => {
        console.log('login success -> ', res);
        console.log('login error -> ', err);
        onComplete();
      },
      onError: err => {
        console.log('request errors -> ', err);
        onError();
      },
    }
  )
}

export default login;