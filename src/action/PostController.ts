import PostService from '../service/PostService';
import { DispatchAbstract, AbstractParams } from './index';
import { Unpack, UnpackPromise } from '../common/request';
import { RECEIVE_POST_LIST } from '../constants';
import { store } from '../index';
class PostController {

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
      user_id: state.user.userinfo && state.user.userinfo.user_id
    };
    console.log('payload: ', payload);
    const result = await PostService.postDetail(payload);

    UnpackPromise(result).then((res) => {
      store.dispatch({
        type: '',
      });
    });
  }
}

export default new PostController();