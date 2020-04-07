/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CommentsList_comments$ref: FragmentReference;
declare export opaque type CommentsList_comments$fragmentType: CommentsList_comments$ref;
export type CommentsList_comments = {|
  +edges: $ReadOnlyArray<{|
    +node: {|
      +id: string,
      +content: string,
      +createdDate: any,
      +user: {|
        +name: string
      |},
    |},
    +cursor: string,
  |}>,
  +$refType: CommentsList_comments$ref,
|};
export type CommentsList_comments$data = CommentsList_comments;
export type CommentsList_comments$key = {
  +$data?: CommentsList_comments$data,
  +$fragmentRefs: CommentsList_comments$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CommentsList_comments",
  "type": "CommentsConnection",
  "metadata": null,
  "argumentDefinitions": [],
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
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '7ad8ab7c8b798da8d35e7e399f51149a';

module.exports = node;
