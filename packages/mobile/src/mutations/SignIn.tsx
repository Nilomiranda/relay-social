import { commitMutation, graphql } from 'react-relay';
import Reactotron from 'reactotron-react-native';

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  login: {
    token: string;
    user: {
      email: string;
      name: string;
    }
  }
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

function login(environment: any, input: LoginInput, onComplete: (res: any) => void, onError: () => void) {
  commitMutation(
    environment,
    {
      mutation: signInMutation,
      variables: { input },
      onCompleted: (res, err) => {
        onComplete(res);
      },
      onError: err => {
        console.log('request errors -> ', err);
        onError();
      },
    }
  )
}

export default login;