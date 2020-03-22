import { commitMutation, graphql } from 'react-relay';

export interface UserInput {
  email: string;
  password: string;
  name: string;
}

const signUpMutation = graphql`
    mutation SignUpMutation (
        $input: UserInput!
    ) {
        addUser(newUserData: $input) {
            email
            name
        }
    }
`

function createNewUser(environment: any, input: UserInput, onComplete: () => void) {
  commitMutation(
    environment,
    {
      mutation: signUpMutation,
      variables: { input },
      onCompleted: (res, err) => {
        onComplete();
      },
      onError: err => console.log('request errors -> ', err),
    }
  )
}

export default createNewUser;