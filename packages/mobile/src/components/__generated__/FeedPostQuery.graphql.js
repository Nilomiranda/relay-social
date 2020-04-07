/**
 * @flow
 * @relayHash 6b799605053b0b7dbf74e304a5f23eb0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type PostDetail_post$ref = any;
export type FeedPostQueryVariables = {|
  id: string
|};
export type FeedPostQueryResponse = {|
  +post: {|
    +$fragmentRefs: PostDetail_post$ref
  |}
|};
export type FeedPostQuery = {|
  variables: FeedPostQueryVariables,
  response: FeedPostQueryResponse,
|};
*/


/*
query FeedPostQuery(
  $id: String!
) {
  post(id: $id) {
    ...PostDetail_post
    id
  }
}

fragment CommentsList_comments on CommentsConnection {
  edges {
    node {
      id
      content
      createdDate
      user {
        name
        id
      }
    }
    cursor
  }
}

fragment PostDetail_post on Post {
  content
  createdDate
  user {
    name
    id
  }
  comments {
    ...CommentsList_comments
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "content",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "createdDate",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "user",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    (v4/*: any*/)
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FeedPostQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "post",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "PostDetail_post",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FeedPostQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "post",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v5/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "comments",
            "storageKey": null,
            "args": null,
            "concreteType": "CommentsConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "CommentEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Comment",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v5/*: any*/)
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "cursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          (v4/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "FeedPostQuery",
    "id": null,
    "text": "query FeedPostQuery(\n  $id: String!\n) {\n  post(id: $id) {\n    ...PostDetail_post\n    id\n  }\n}\n\nfragment CommentsList_comments on CommentsConnection {\n  edges {\n    node {\n      id\n      content\n      createdDate\n      user {\n        name\n        id\n      }\n    }\n    cursor\n  }\n}\n\nfragment PostDetail_post on Post {\n  content\n  createdDate\n  user {\n    name\n    id\n  }\n  comments {\n    ...CommentsList_comments\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '102d157b251a9e9749cc5eac8bf8e079';

module.exports = node;
