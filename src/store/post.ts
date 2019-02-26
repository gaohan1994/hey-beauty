import {
  RECEIVE_POST_LIST
} from '../constants';
import { Stores } from './index';

import Actions from '../action';

export type Post = {
  postList: any[];
};

export const initState = {
  postList: [],
};

/**
 * Post 仓库
 *
 * @export
 * @param {Post} [state=initState]
 * @param {*} action
 * @returns {Post}
 */
export default function post (state: Post = initState,  action: Actions): Post {
  switch (action.type) {
    case RECEIVE_POST_LIST:
      const { payload: { postList, postPage } } = action;

      if (postPage === 1) {
        return {
          ...state,
          postList,
        };
      } else {
        return {
          ...state,
          postList: state.postList.concat(postList),
        };
      }
    
    default: return state;
  }
}

export const getPostList = (state: Stores) => state.post.postList;