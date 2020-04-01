/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type FeedPostList_posts$ref: FragmentReference;
declare export opaque type FeedPostList_posts$fragmentType: FeedPostList_posts$ref;
export type FeedPostList_posts = {|
  +posts: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +user: {|
          +name: string
        |},
        +content: string,
        +createdDate: any,
        +id: string,
      |}
    |}>,
    +pageInfo: {|
      +endCursor: ?string,
      +hasNextPage: ?boolean,
    |},
  |},
  +$refType: FeedPostList_posts$ref,
|};
export type FeedPostList_posts$data = FeedPostList_posts;
export type FeedPostList_posts$key = {
  +$data?: FeedPostList_posts$data,
  +$fragmentRefs: FeedPostList_posts$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "FeedPostList_posts",
  "type": "Query",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": null,
        "direction": "forward",
        "path": [
          "posts"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Float",
      "defaultValue": 5
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "posts",
      "name": "__Feed_posts_connection",
      "storageKey": null,
      "args": null,
      "concreteType": "PostsConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "PostEdge",
          "plural": true,
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
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "name",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "content",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "createdDate",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "id",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "__typename",
                  "args": null,
                  "storageKey": null
                }
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
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageInfo",
          "storageKey": null,
          "args": null,
          "concreteType": "PageInfo",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "endCursor",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasNextPage",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '46e5fe5db627aa43dee2a9d632fee8f7';

module.exports = node;
