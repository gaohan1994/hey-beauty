import request from '../common/request';
import config from '../common/config';

class PostService {
  public postList = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/postList`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public postDetail = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/order/getPostDetail`,
      'POST',
      {
        biz_content: {
          ...params
        }
      }
    );
  }
}

export default new PostService();