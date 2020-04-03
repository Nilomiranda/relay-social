/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostDetail_post$ref: FragmentReference;
declare export opaque type PostDetail_post$fragmentType: PostDetail_post$ref;
export type PostDetail_post = {|
  +content: string,
  +createdDate: any,
  +user: {|
    +name: string
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
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '7a2ce85fb7bd24bc7852a6311fc57087';

module.exports = node;
