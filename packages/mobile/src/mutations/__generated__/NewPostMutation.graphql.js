/**
 * @flow
 * @relayHash 7b41ef518bbd84228b57e385cadfbd8b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type NewPostMutationVariables = {|
  content: string
|};
export type NewPostMutationResponse = {|
  +newPost: {|
    +post: {|
      +node: {|
        +user: {|
          +name: string
        |},
        +content: string,
        +createdDate: any,
        +id: string,
      |}
    |}
  |}
|};
export type NewPostMutation = {|
  variables: NewPostMutationVariables,
  response: NewPostMutationResponse,
|};
*/


/*
mutation NewPostMutation(
  $content: String!
) {
  newPost(newPostData: {content: $content}) {
    post {
      node {
        user {
          name
          id
        }
        content
        createdDate
        id
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "content",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ObjectValue",
    "name": "newPostData",
    "fields": [
      {
        "kind": "Variable",
        "name": "content",
        "variableName": "content"
      }
    ]
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "content",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "createdDate",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "NewPostMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "newPost",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "PostPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "post",
            "storageKey": null,
            "args": null,
            "concreteType": "PostEdge",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "Post",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "user",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "User",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/)
                    ]
                  },
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "NewPostMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "newPost",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "PostPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "post",
            "storageKey": null,
            "args": null,
            "concreteType": "PostEdge",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "Post",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "user",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "User",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v5/*: any*/)
                    ]
                  },
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "NewPostMutation",
    "id": null,
    "text": "mutation NewPostMutation(\n  $content: String!\n) {\n  newPost(newPostData: {content: $content}) {\n    post {\n      node {\n        user {\n          name\n          id\n        }\n        content\n        createdDate\n        id\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '93a9f5a0502c8040db179ee8174bd454';

module.exports = node;
