/**
 * @flow
 * @relayHash 0e84273661df7507ff21cd38aef3bfbf
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
    +edge: {|
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
    edge {
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
        "concreteType": "Edge",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edge",
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
        "concreteType": "Edge",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edge",
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
    "text": "mutation NewPostMutation(\n  $content: String!\n) {\n  newPost(newPostData: {content: $content}) {\n    edge {\n      node {\n        user {\n          name\n          id\n        }\n        content\n        createdDate\n        id\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0728d3168fd101c7e0baed07b74c4d0c';

module.exports = node;
