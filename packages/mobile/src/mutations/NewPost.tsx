import { commitMutation, graphql } from 'relay-runtime';
import { RangeAddConfig } from 'relay-runtime/lib/mutations/RelayDeclarativeMutationConfig';

const newPostMutation = graphql`
    mutation  NewPostMutation ($content: String!) {
        newPost(newPostData: { content: $content }) {
            edge {
                node {
                    user {
                        name
                    }
                    content
                    createdDate
                    id
                }
            }
        }
    }
`;

function createNewPost(environment: any, content: string, onComplete: () => void, rootId: string) {
  console.log('rootId -> ', rootId);

  const mutationConfig: RangeAddConfig = {
    type: 'RANGE_ADD',
    parentID: rootId,
    connectionInfo: [
      {
        key: 'Feed_posts',
        rangeBehavior: 'prepend',
      },
    ],
    edgeName: 'edge',
  };

  commitMutation(
    environment,
    {
      mutation: newPostMutation,
      variables: { content },
      onCompleted: () => {
        onComplete();
      },
      configs: [mutationConfig]
    },
  )
}

export default createNewPost;