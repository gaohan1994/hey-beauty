import {
  RECEIVE_POST_LIST,
  RECEIVE_POST_DETAIL,
  RECEIVE_RECOMMEND_POST,
} from '../constants';
import { Stores } from './index';

import Actions from '../action';
import { RECEIVE_COLLECTION_LIST } from '../constants';

export type Post = {
  postList: any[];
  postDetail: any;
  recommendPosts: any[];
  collectionList: any[];
};

export const initState = {
  postList: [],
  postDetail: {},
  recommendPosts: [],
  collectionList: [],
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

    case RECEIVE_COLLECTION_LIST:
      const { payload: { collectionList } } = action;
      return {
        ...state,
        collectionList,
      };
    
    case RECEIVE_RECOMMEND_POST:
      const { payload: { recommendPosts } } = action;

      return {
        ...state,
        recommendPosts,
      };

    case RECEIVE_POST_DETAIL:
      const { payload: { postDetail } } = action;

      return {
        ...state,
        postDetail: {
          ...state.postDetail,
          [postDetail.post_id]: postDetail
        }
      };

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

export const getPostDetail = (state: Stores, id: string) => state.post.postDetail[id] || {};

export const getRecommendPosts = (state: Stores) => state.post.recommendPosts;

export const getCollectionList = (state: Stores) => state.post.collectionList;