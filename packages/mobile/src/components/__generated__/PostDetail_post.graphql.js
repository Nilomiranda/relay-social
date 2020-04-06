/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type CommentsList_comments$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostDetail_post$ref: FragmentReference;
declare export opaque type PostDetail_post$fragmentType: PostDetail_post$ref;
export type PostDetail_post = {|
  +content: string,
  +createdDate: any,
  +user: {|
    +name: string
  |},
  +comments: {|
    +$fragmentRefs: CommentsList_comments$ref
  |},
  +$refType: PostDetail_post$ref,
|};
export type PostDetail_post$data = PostDetail_post;
export type PostDetail_post$key = {
  +$data?: PostDetail_post$data,
  +$fragmentRefs: PostDetail_post$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "PostDetail_post",
  "type": "Post",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
    },
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
          "kind": "FragmentSpread",
          "name": "CommentsList_comments",
          "args": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'aab8acf544264ad2d00257235bb8d2a2';

module.exports = node;
