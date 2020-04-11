import { commitMutation, graphql } from 'relay-runtime';
import { RangeAddConfig } from 'relay-runtime/lib/mutations/RelayDeclarativeMutationConfig';

const newCommentMutation = graphql`
    mutation  NewCommentMutation ($content: String!, $postId: String!) {
        postNewComment(commentInput: { content: $content, postId: $postId }) {
            comment {
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

function createNewComment(environment: any, params: { content: string, postId: string }, onComplete: () => void, rootId: string) {
  console.log('rootId -> ', rootId);

  const mutationConfig: RangeAddConfig = {
    type: 'RANGE_ADD',
    parentID: params.postId,
    connectionInfo: [
      {
        key: 'Post_comments',
        rangeBehavior: 'prepend',
      },
    ],
    edgeName: 'comment',
  };

  commitMutation(
    environment,
    {
      mutation: newCommentMutation,
      variables: { content: params.content, postId: params.postId },
      onCompleted: () => {
        onComplete();
      },
      configs: [mutationConfig]
    },
  )
}

export default createNewComment;