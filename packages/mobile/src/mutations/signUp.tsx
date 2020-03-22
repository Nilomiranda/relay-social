import { commitMutation, graphql } from 'react-relay';

export interface UserInput {
  email: string;
  password: string;
  name: string;
}

const signUpMutation = graphql`
    mutation signUpMutation (
        $input: UserInput!
    ) {
        addUser(newUserData: $input) {
            email
            name
        }
    }
`

function createNewUser(environment: any, input: UserInput) {
  commitMutation(
    environment,
    {
      mutation: signUpMutation,
      variables: { input },
      onCompleted: (res, err) => {
        console.log(res);
      },
      onError: err => console.log(err),
    }
  )
}

export default createNewUser;