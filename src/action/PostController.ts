import PostService from '../service/PostService';
import { DispatchAbstract, AbstractParams } from './index';
import { Unpack, UnpackPromise } from '../common/request';
import { RECEIVE_POST_LIST, RECEIVE_POST_DETAIL, RECEIVE_RECOMMEND_POST, RECEIVE_COLLECTION_LIST } from '../constants';
import { store } from '../index';
class PostController {

  public addPostInf = async (params: any) => {
    const { code, biz_content } = await PostService.addPostInf(params);
    if (code === '10000') {
      return { success: true, result: biz_content };
    } else {
      return { success: false };
    }
  }

  public addCollectionInf = async (params: any) => {
    const { code } = await PostService.addCollectionInf(params);
    console.log('addCollectionInf code: ', code);

    if (code === '10000') {
      return { success: true };
    } else {
      return { success: false };
    }
  }
  public cancelCollectionInf = async (params: any) => {
    const { code } = await PostService.cancelCollectionInf(params);
    console.log('cancelCollectionInf code: ', code);
    if (code === '10000') {
      return { success: true };
    } else {
      return { success: false };
    }

  }
  public collectionList = async (params: any) => {
    const { code, biz_content } = await PostService.collectionList(params);
    
    if (code === '10000') {
      console.log('collectionList code: ', code);
      store.dispatch({
        type: RECEIVE_COLLECTION_LIST,
        payload: {
          collectionList: biz_content.collection_list
        }
      });
      return { success: true };
    } else {
      return { success: false };
    }
  }

  public addCommentInf = async (params: any) => {
    const { param } = params;
    const { code, data, msg } = await PostService.addCommentInf(param);

    if (code === '10000') {
      return { success: true, result: data };
    } else {
      return { success: false, result: msg };
    }
  }

  public addLikeInf = async (params: any) => {
    const { param } = params;
    const { code, data, msg } = await PostService.addLikeInf(param);

    if (code === '10000') {
      return { success: true, result: data };
    } else {
      return { success: false, result: msg };
    }
  }

  public postList = async (params: DispatchAbstract<any>): Promise<any> => {
    const { param, dispatch } = params;
    const result = await PostService.postList(param);

    Unpack(result, () => {
      console.log('result: ', result);
      dispatch({
        type: RECEIVE_POST_LIST,
        payload: {
          postList: result.biz_content.post_list,
          postPage: param.page_index
        }
      });
    });
  }

  public postDetail = async (params: AbstractParams<any>): Promise<any> => {
    const { param } = params;
    const state = store.getState();
    const payload: AbstractParams<any> = {
      ...param,
      user_id: state.user.userinfo && state.user.userinfo.user_id || ''
    };
    console.log('payload: ', payload);
    const result = await PostService.postDetail(payload);

    UnpackPromise(result).then((res) => {
      store.dispatch({
        type: RECEIVE_POST_DETAIL,
        payload: { postDetail: result.biz_content }
      });
    });
  }

  public getRandomPosts = async () => {

    const result = await PostService.getRandomPosts();

    UnpackPromise(result).then((res) => {
      store.dispatch({
        type: RECEIVE_RECOMMEND_POST,
        payload: { recommendPosts: result.biz_content.posts }
      });
    });
  }
}

export default new PostController();