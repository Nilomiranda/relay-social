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
  "type": "PostsConnection",
  "metadata": null,
  "argumentDefinitions": [],
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
            }
          ]
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'f909bff4f0789a004ecb88080869cce2';

module.exports = node;
