import PostService from '../service/PostService';
import { DispatchAbstract } from './index';
import { Unpack } from '../common/request';
import { RECEIVE_POST_LIST } from '../constants';

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
}

export default new PostController();