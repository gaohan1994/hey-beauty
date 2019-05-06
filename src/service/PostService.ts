import request from '../common/request';
import config from '../common/config';

class PostService {

  public addLikeInf = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/addLikeInf`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

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
      `${config.FETCH_ENTRY}/app/getPostDetail`,
      'POST',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public getRandomPosts = () => {
    return request(
      `${config.FETCH_ENTRY}/app/getRandomPosts`,
      'post',
      {
        biz_content: {
          
        }
      }
    );
  }
}

export default new PostService();